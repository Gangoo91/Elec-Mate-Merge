import { ArrowLeft, ArrowRight, Cog, Book, AlertTriangle, CheckCircle2, Settings, Thermometer, Gauge, Zap, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import InstrumentationQuiz from '@/components/upskilling/quiz/InstrumentationQuiz';

const InstrumentationModule6Section3 = () => {
  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in overflow-x-hidden bg-[#1a1a1a]">
      <div className="px-8 pt-8 pb-12">
        <Link to="/study-centre/upskilling/instrumentation-module-6">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md touch-manipulation active:scale-[0.98]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 6
          </Button>
        </Link>
        
        <div className="space-y-8">
          {/* Header */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Cog className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-4xl font-bold text-white">
                  Step-by-Step Calibration of Pressure, Temperature, and Electrical Devices
                </h1>
                <p className="text-xl text-gray-400">
                  Module 6, Section 3
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 6.3
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                20 minutes
              </Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Book className="h-5 w-5 text-yellow-400" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                This section provides practical, step-by-step instructions for calibrating the most common 
                industrial instruments: pressure, temperature, and electrical devices. Each calibration 
                requires a systematic approach to ensure accuracy, safety, and regulatory compliance.
              </p>
              <p>
                By following these proven procedures, technicians can achieve consistent, traceable 
                calibration results whilst maintaining the highest safety standards.
              </p>
            </CardContent>
          </Card>

          {/* Learning Objectives */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-yellow-400" />
                Learning Objectives
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Perform basic calibration on pressure, temperature, and electrical devices</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Understand safe setup and procedure requirements</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Identify essential pre-calibration and post-calibration check steps</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Universal Safety and Pre-Calibration Checks */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-yellow-400" />
                Universal Safety and Pre-Calibration Checks
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="mb-4">
                <h4 className="text-red-400 font-semibold mb-2">CRITICAL SAFETY REQUIREMENTS</h4>
                <p className="text-sm mb-4">
                  These steps MUST be completed before any calibration work begins.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-yellow-400 font-semibold mb-2">Device Isolation</h4>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Power Isolation:</strong> Switch off and lock out electrical supplies</li>
                    <li>• <strong>Process Isolation:</strong> Close isolation valves for process connections</li>
                    <li>• <strong>Pressure Relief:</strong> Vent any trapped pressure safely</li>
                    <li>• <strong>Tag Out:</strong> Apply warning tags to prevent accidental re-energising</li>
                    <li>• <strong>Verify Isolation:</strong> Test with appropriate instruments</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-yellow-400 font-semibold mb-2">Equipment Status Confirmation</h4>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Calibration Standards:</strong> Check certificate validity dates</li>
                    <li>• <strong>Test Equipment:</strong> Verify calibration and battery levels</li>
                    <li>• <strong>Environmental Conditions:</strong> Record temperature and humidity</li>
                    <li>• <strong>Documentation:</strong> Ensure procedures and forms are available</li>
                    <li>• <strong>PPE:</strong> Verify appropriate personal protective equipment</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pressure Device Calibration */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Gauge className="h-5 w-5 text-yellow-400" />
                Pressure Device Calibration Procedure
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">Step-by-Step Process</h4>
              
              <div className="space-y-4">
                <div>
                  <h5 className="text-white font-semibold mb-2">1. Initial Setup</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Connect calibrated pressure source (deadweight tester or pressure calibrator)</li>
                    <li>• Ensure all connections are tight and leak-free</li>
                    <li>• Allow system to stabilise for 5-10 minutes</li>
                    <li>• Record ambient conditions and reference standard details</li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">2. Zero Calibration</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Ensure zero pressure applied (atmospheric pressure if gauge type)</li>
                    <li>• Record device reading at zero point</li>
                    <li>• Adjust zero setting if within adjustment capability</li>
                    <li>• If non-adjustable, record error for certificate</li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">3. Span Adjustment</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Apply full-scale pressure (or 80% if full scale not achievable)</li>
                    <li>• Record device reading at span point</li>
                    <li>• Adjust span setting to match reference pressure</li>
                    <li>• Return to zero and re-check (may need iteration)</li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">4. Multi-Point Verification</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Test at 0%, 25%, 50%, 75%, and 100% of range</li>
                    <li>• Perform both ascending and descending readings</li>
                    <li>• Calculate hysteresis and linearity errors</li>
                    <li>• Record all readings with timestamps</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Temperature Device Calibration */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-yellow-400" />
                Temperature Device Calibration Procedure
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">Dry Block Calibrator Method</h4>
              
              <div className="space-y-4">
                <div>
                  <h5 className="text-white font-semibold mb-2">1. Equipment Setup</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Pre-heat dry block calibrator to first test temperature</li>
                    <li>• Insert reference RTD probe into calibrator well</li>
                    <li>• Insert device under test (DUT) probe adjacent to reference</li>
                    <li>• Allow 10-15 minutes for thermal equilibrium</li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">2. RTD Probe Comparison</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Monitor both reference and DUT readings until stable</li>
                    <li>• Stability criterion: &lt;0.01°C change over 2 minutes</li>
                    <li>• Record simultaneous readings from both instruments</li>
                    <li>• Note any significant difference for adjustment</li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">3. Multi-Point Testing</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Test at minimum 3 temperatures across operating range</li>
                    <li>• Common test points: 0°C, 50°C, 100°C (adjust for range)</li>
                    <li>• Allow full stabilisation at each temperature</li>
                    <li>• Record ambient conditions at each test point</li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">4. Adjustment and Verification</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Apply corrections if device has adjustment capability</li>
                    <li>• Re-test all points after adjustment</li>
                    <li>• If non-adjustable, document errors for end user</li>
                    <li>• Verify performance meets required specifications</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Electrical Device Calibration */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                Electrical Device Calibration Procedure
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">Multimeter Calibration with Known Inputs</h4>
              
              <div className="space-y-4">
                <div>
                  <h5 className="text-white font-semibold mb-2">1. DC Voltage Calibration</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Connect precision voltage calibrator to DUT input</li>
                    <li>• Apply test voltages: 0V, 1V, 5V, 10V (range dependent)</li>
                    <li>• Allow 30 seconds settling time between readings</li>
                    <li>• Record DUT reading vs. calibrator output</li>
                    <li>• Test both positive and negative polarities</li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">2. DC Current Calibration</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Connect precision current source in series with DUT</li>
                    <li>• Apply test currents across measurement range</li>
                    <li>• Typical points: 4mA, 12mA, 20mA for 4-20mA loops</li>
                    <li>• Monitor for burden voltage effects</li>
                    <li>• Record linearity and accuracy errors</li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">3. Resistance Calibration</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Connect precision resistance standards to DUT</li>
                    <li>• Use 4-wire connection for best accuracy</li>
                    <li>• Test common values: 100Ω, 1kΩ, 10kΩ</li>
                    <li>• Account for lead resistance in measurements</li>
                    <li>• Verify ohms function across multiple ranges</li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">4. AC Calibration (if applicable)</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Use AC voltage/current calibrator</li>
                    <li>• Test at power frequency (50Hz/60Hz)</li>
                    <li>• Verify RMS vs. peak measurement modes</li>
                    <li>• Check frequency response if specified</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Recording and Re-verification */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="h-5 w-5 text-yellow-400" />
                Data Recording and Re-verification Process
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-yellow-400 font-semibold mb-2">During Calibration</h4>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Real-time Logging:</strong> Record all readings immediately</li>
                    <li>• <strong>Environmental Data:</strong> Temperature, humidity, pressure</li>
                    <li>• <strong>Reference Standards:</strong> Certificate numbers and due dates</li>
                    <li>• <strong>Technician ID:</strong> Operator identification and signature</li>
                    <li>• <strong>Timestamp:</strong> Date and time of each measurement</li>
                    <li>• <strong>Adjustments Made:</strong> Document any corrections applied</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-yellow-400 font-semibold mb-2">Post-Calibration Verification</h4>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Repeat Key Points:</strong> Verify critical measurement points</li>
                    <li>• <strong>System Check:</strong> Confirm device operates normally</li>
                    <li>• <strong>Range Verification:</strong> Test across full operating range</li>
                    <li>• <strong>Alarm Functions:</strong> Check setpoints and alarm outputs</li>
                    <li>• <strong>Documentation Review:</strong> Ensure all data recorded</li>
                    <li>• <strong>Certificate Generation:</strong> Complete calibration certificate</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real World Scenario */}
          <Card className="bg-gradient-to-r from-elec-gray to-elec-dark border-yellow-400/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                Real World Scenario
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <p className="font-semibold text-yellow-400">
                Hospital Biomedical Engineer - Vaccine Storage Calibration
              </p>
              <p>
                A hospital biomedical engineer calibrates temperature sensors in vaccine storage units 
                to ensure exact temperature conditions for pharmaceutical storage compliance.
              </p>
              <div className="bg-card p-3 rounded border border-gray-600">
                <h5 className="text-yellow-400 font-semibold text-sm mb-2">Procedure Followed:</h5>
                <ul className="text-sm space-y-1">
                  <li>• <strong>Isolation:</strong> Temporarily moves vaccines to backup storage</li>
                  <li>• <strong>Equipment:</strong> Uses UKAS-calibrated dry block calibrator</li>
                  <li>• <strong>Test Points:</strong> 2°C, 4°C, 6°C, 8°C (vaccine storage range)</li>
                  <li>• <strong>Acceptance:</strong> ±0.5°C accuracy required for compliance</li>
                  <li>• <strong>Documentation:</strong> Complete traceability for regulatory audit</li>
                  <li>• <strong>Verification:</strong> Post-calibration stability check over 24 hours</li>
                </ul>
              </div>
              <p className="text-sm italic text-green-400">
                Result: All sensors calibrated within specification, maintaining pharmaceutical 
                compliance and preventing costly vaccine loss due to temperature excursions.
              </p>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p>
                Every calibration requires a systematic approach, suitable tools, and a traceable process 
                to ensure consistency. Following proper safety procedures, using calibrated reference 
                standards, and maintaining detailed records are essential for reliable calibration results 
                and regulatory compliance.
              </p>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <InstrumentationQuiz 
            questions={[
              {
                id: 1,
                question: "What is the first critical safety step before any calibration work?",
                options: [
                  "Check the weather conditions",
                  "Switch off and lock out electrical supplies, close isolation valves, and vent trapped pressure",
                  "Call the supervisor",
                  "Read the manual"
                ],
                correctAnswer: 1,
                explanation: "Device isolation is the first critical safety step. This includes electrical isolation, process isolation, pressure relief, tag out procedures, and verification of isolation."
              },
              {
                id: 2,
                question: "For pressure device calibration, what points should be tested at minimum?",
                options: [
                  "Just 0% and 100%",
                  "0%, 25%, 50%, 75%, and 100% of range",
                  "Only the mid-point",
                  "Whatever is convenient"
                ],
                correctAnswer: 1,
                explanation: "Multi-point verification should test at 0%, 25%, 50%, 75%, and 100% of range, performing both ascending and descending readings to calculate hysteresis and linearity errors."
              },
              {
                id: 3,
                question: "What is the stability criterion for temperature calibration?",
                options: [
                  "±1°C change over 5 minutes",
                  "±0.1°C change over 5 minutes", 
                  "±0.01°C change over 2 minutes",
                  "Any stable reading"
                ],
                correctAnswer: 2,
                explanation: "The stability criterion for temperature calibration is less than 0.01°C change over 2 minutes, ensuring thermal equilibrium has been reached before taking readings."
              },
              {
                id: 4,
                question: "For electrical calibration, why is 4-wire connection recommended for resistance measurements?",
                options: [
                  "It looks more professional",
                  "It accounts for lead resistance and provides best accuracy",
                  "It's required by regulation",
                  "It's faster to connect"
                ],
                correctAnswer: 1,
                explanation: "4-wire (Kelvin) connection eliminates the effect of lead resistance in precision resistance measurements, providing the highest accuracy by separating current and voltage paths."
              },
              {
                id: 5,
                question: "What should be recorded during calibration besides the actual readings?",
                options: [
                  "Only the final results",
                  "Environmental conditions, reference standards used, technician ID, timestamps, and any adjustments made",
                  "Just the pass/fail status",
                  "Only if something goes wrong"
                ],
                correctAnswer: 1,
                explanation: "Comprehensive documentation must include environmental data, reference standards, technician identification, timestamps, and all adjustments made for traceability and audit compliance."
            }
            ]}
            title="Section 3 Knowledge Check"
          />

          {/* Navigation */}
          <div className="flex justify-between">
            <Link to="/study-centre/upskilling/instrumentation-module-6-section-2">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card touch-manipulation active:scale-[0.98]">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="/study-centre/upskilling/instrumentation-module-6-section-4">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600 touch-manipulation active:scale-[0.98]">
                Next Section
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstrumentationModule6Section3;