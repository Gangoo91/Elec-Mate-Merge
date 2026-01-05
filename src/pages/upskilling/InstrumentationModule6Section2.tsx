import { ArrowLeft, ArrowRight, Wrench, Book, AlertTriangle, CheckCircle2, Activity, Zap, Thermometer, Gauge } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import InstrumentationQuiz from '@/components/upskilling/quiz/InstrumentationQuiz';

const InstrumentationModule6Section2 = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-8 pt-8 pb-12">
        <Link to="../instrumentation-module-6">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 6
          </Button>
        </Link>
        
        <div className="space-y-8">
          {/* Header */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Wrench className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-4xl font-bold text-white">
                  Calibration Equipment and Reference Standards
                </h1>
                <p className="text-xl text-gray-400">
                  Module 6, Section 2
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 6.2
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                18 minutes
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
                Accurate calibration depends entirely on the quality and traceability of the equipment and 
                standards used. This section explores the essential tools, reference standards, and environmental 
                considerations that ensure calibration validity and reliability.
              </p>
              <p>
                Understanding the hierarchy of measurement standards and the importance of traceability 
                forms the foundation for trustworthy calibration practices.
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
                  <span>Identify and understand common calibration equipment and their applications</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Understand reference standards and the concept of measurement traceability</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Learn the hierarchy of measurement standards from national to working level</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Recognise environmental factors that affect calibration accuracy</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Common Calibration Equipment */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Wrench className="h-5 w-5 text-yellow-400" />
                Essential Calibration Equipment
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">Calibration Equipment by Type</h4>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <h5 className="text-white font-semibold mb-2 flex items-center gap-2">
                      <Gauge className="h-4 w-4 text-yellow-400" />
                      Pressure Calibration Equipment
                    </h5>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Deadweight Testers:</strong> Primary pressure standards using known masses</li>
                      <li>• <strong>Pressure Comparators:</strong> Pneumatic and hydraulic reference instruments</li>
                      <li>• <strong>Digital Pressure Calibrators:</strong> Portable electronic standards</li>
                      <li>• <strong>Pressure Modules:</strong> Interchangeable range-specific sensors</li>
                      <li>• <strong>Hand Pumps:</strong> Manual pressure generation for field use</li>
                      <li>• <strong>Vacuum Pumps:</strong> For negative pressure calibration</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-white font-semibold mb-2 flex items-center gap-2">
                      <Thermometer className="h-4 w-4 text-yellow-400" />
                      Temperature Calibration Equipment
                    </h5>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Dry Block Calibrators:</strong> Precise temperature sources</li>
                      <li>• <strong>Fluid Baths:</strong> Liquid temperature references</li>
                      <li>• <strong>Furnaces:</strong> High-temperature calibration systems</li>
                      <li>• <strong>RTD/Thermocouple Simulators:</strong> Electrical temperature signals</li>
                      <li>• <strong>Ice Point References:</strong> 0°C reference standards</li>
                      <li>• <strong>Infrared Calibrators:</strong> Non-contact temperature sources</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h5 className="text-white font-semibold mb-2 flex items-center gap-2">
                      <Zap className="h-4 w-4 text-yellow-400" />
                      Electrical Calibration Equipment
                    </h5>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Precision Multimeters:</strong> High-accuracy electrical measurements</li>
                      <li>• <strong>Multifunction Calibrators:</strong> Multiple signal generation</li>
                      <li>• <strong>Current/Voltage Sources:</strong> Precise signal generation</li>
                      <li>• <strong>Resistance Standards:</strong> Known resistance values</li>
                      <li>• <strong>Frequency Generators:</strong> AC signal calibration</li>
                      <li>• <strong>Oscilloscopes:</strong> Waveform analysis and verification</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-white font-semibold mb-2 flex items-center gap-2">
                      <Activity className="h-4 w-4 text-yellow-400" />
                      Specialised Calibration Equipment
                    </h5>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Flow Calibrators:</strong> Liquid and gas flow references</li>
                      <li>• <strong>Torque Calibrators:</strong> Mechanical torque standards</li>
                      <li>• <strong>Data Loggers:</strong> Automated measurement recording</li>
                      <li>• <strong>Signal Generators:</strong> Complex waveform generation</li>
                      <li>• <strong>pH Simulators:</strong> Chemical measurement standards</li>
                      <li>• <strong>Vibration Calibrators:</strong> Mechanical oscillation references</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reference Standards and Traceability */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Reference Standards and Traceability</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">What is Measurement Traceability?</h4>
              <p className="mb-3">
                Traceability is an unbroken chain of calibrations linking a measurement to a stated reference, 
                typically national or international standards, with documented measurement uncertainty at each step.
              </p>
              <p className="mb-4">
                This chain ensures that measurements made anywhere in the world can be compared and trusted, 
                forming the backbone of international trade and safety.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-yellow-400 font-semibold mb-2">UKAS (United Kingdom Accreditation Service)</h5>
                  <ul className="text-sm space-y-1">
                    <li>• UK's national accreditation body</li>
                    <li>• Provides internationally recognised calibration certificates</li>
                    <li>• Ensures compliance with ISO/IEC 17025 standards</li>
                    <li>• Maintains traceability to SI units</li>
                    <li>• Regular assessment of calibration laboratories</li>
                    <li>• Mutual recognition agreements with international bodies</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-yellow-400 font-semibold mb-2">NPL (National Physical Laboratory)</h5>
                  <ul className="text-sm space-y-1">
                    <li>• UK's national measurement institute</li>
                    <li>• Maintains UK's primary measurement standards</li>
                    <li>• Provides highest level of measurement accuracy</li>
                    <li>• Research and development of new standards</li>
                    <li>• International collaboration on measurement science</li>
                    <li>• Direct link to SI (International System of Units)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hierarchy of Measurement Standards */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Hierarchy of Measurement Standards</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-gradient-to-b from-yellow-900/20 to-transparent p-4 rounded-md border border-yellow-600/30">
                <div className="space-y-4">
                  <div className="bg-yellow-900/40 p-3 rounded border border-yellow-600/50">
                    <h4 className="text-yellow-400 font-semibold mb-1">Level 1: Primary Standards</h4>
                    <p className="text-sm">
                      Highest accuracy standards maintained by national measurement institutes (NPL). 
                      Direct realisation of SI units with lowest possible uncertainty.
                    </p>
                  </div>
                  <div className="bg-yellow-900/30 p-3 rounded border border-yellow-600/40 ml-4">
                    <h4 className="text-yellow-400 font-semibold mb-1">Level 2: Secondary Standards</h4>
                    <p className="text-sm">
                      Calibrated against primary standards. Used by commercial calibration laboratories. 
                      Certified by UKAS or equivalent accreditation bodies.
                    </p>
                  </div>
                  <div className="bg-yellow-900/20 p-3 rounded border border-yellow-600/30 ml-8">
                    <h4 className="text-yellow-400 font-semibold mb-1">Level 3: Working Standards</h4>
                    <p className="text-sm">
                      Used for day-to-day calibration work in industry. Calibrated against secondary standards. 
                      Portable and ruggedised for field use.
                    </p>
                  </div>
                  <div className="bg-yellow-900/10 p-3 rounded border border-yellow-600/20 ml-12">
                    <h4 className="text-yellow-400 font-semibold mb-1">Level 4: Process Instruments</h4>
                    <p className="text-sm">
                      Instruments used for process control and measurement. Calibrated against working standards. 
                      Require regular calibration to maintain accuracy.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Environmental Considerations */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Environmental Factors Affecting Calibration</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">Critical Environmental Controls</h4>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <h5 className="text-white font-semibold mb-2">Temperature Effects</h5>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Reference Temperature:</strong> Most calibrations at 20°C ± 2°C</li>
                      <li>• <strong>Thermal Expansion:</strong> Affects mechanical and dimensional measurements</li>
                      <li>• <strong>Electronic Drift:</strong> Temperature coefficients in electronic devices</li>
                      <li>• <strong>Stability Time:</strong> Allow thermal equilibrium before calibration</li>
                      <li>• <strong>Gradients:</strong> Minimise temperature variations across workspace</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-white font-semibold mb-2">Humidity Control</h5>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Optimal Range:</strong> 45-65% relative humidity</li>
                      <li>• <strong>Corrosion Prevention:</strong> Protects sensitive components</li>
                      <li>• <strong>Static Electricity:</strong> Controlled humidity reduces static build-up</li>
                      <li>• <strong>Hygroscopic Materials:</strong> Moisture absorption affects accuracy</li>
                      <li>• <strong>Condensation:</strong> Prevent moisture on cold surfaces</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h5 className="text-white font-semibold mb-2">Vibration and Shock</h5>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Isolation:</strong> Vibration-isolated calibration benches</li>
                      <li>• <strong>Sensitive Instruments:</strong> Mechanical balances and precision devices</li>
                      <li>• <strong>Building Vibration:</strong> Traffic, machinery, and structural movement</li>
                      <li>• <strong>Acoustic Noise:</strong> Sound waves can affect sensitive measurements</li>
                      <li>• <strong>Handling:</strong> Careful transport and setup procedures</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-white font-semibold mb-2">Electromagnetic Interference</h5>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Shielding:</strong> Faraday cages for sensitive measurements</li>
                      <li>• <strong>Grounding:</strong> Proper earthing to minimise noise</li>
                      <li>• <strong>Cable Routing:</strong> Separate power and signal cables</li>
                      <li>• <strong>RF Sources:</strong> Mobile phones, radio transmitters, wireless devices</li>
                      <li>• <strong>Power Quality:</strong> Clean, stable power supply</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Calibration Certificate Requirements */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Calibration Certificate Requirements</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">Essential Certificate Information</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-white font-semibold mb-2">Administrative Details</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Unique certificate number</li>
                    <li>• Calibration date and validity period</li>
                    <li>• Customer and laboratory details</li>
                    <li>• Instrument identification</li>
                    <li>• Calibration standard used</li>
                    <li>• Environmental conditions</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-white font-semibold mb-2">Technical Information</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Measurement results and uncertainties</li>
                    <li>• Calibration procedure reference</li>
                    <li>• Traceability statement</li>
                    <li>• Conformity assessment (if applicable)</li>
                    <li>• Adjustments made during calibration</li>
                    <li>• Recommendations for use</li>
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
                Food Processing Plant Compliance Audit
              </p>
              <p>
                A food processing plant undergoes a regulatory audit. The inspector checks temperature 
                monitoring systems critical for food safety. The technician produces UKAS-certified 
                calibration certificates for all temperature sensors, demonstrating:
              </p>
              <ul className="text-sm space-y-1 ml-4">
                <li>• Traceability to national temperature standards</li>
                <li>• Calibration within the last 12 months</li>
                <li>• Measurement uncertainty appropriate for food safety requirements</li>
                <li>• Compliance with HACCP (Hazard Analysis Critical Control Points)</li>
                <li>• Proper environmental controls during calibration</li>
              </ul>
              <p className="text-sm italic text-green-400">
                The plant passes the audit successfully, maintaining their food safety certification 
                and avoiding potential production shutdowns.
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
                Calibration equipment and reference standards form the foundation of accurate measurement. 
                Understanding traceability, environmental factors, and proper equipment selection ensures 
                reliable calibration results. UKAS certification provides the trust and legal compliance 
                required in regulated industries.
              </p>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <InstrumentationQuiz
            title="Section 2 Knowledge Check"
            questions={[
              {
                id: 1,
                question: "What does UKAS stand for?",
                options: [
                  "United Kingdom Accreditation Service",
                  "Universal Knowledge Assessment System",
                  "UK Advanced Standards",
                  "United Kingdom Assessment Standards"
                ],
                correctAnswer: 0,
                explanation: "UKAS stands for United Kingdom Accreditation Service - the UK's national accreditation body for calibration and testing laboratories."
              },
              {
                id: 2,
                question: "Why is traceability important in calibration?",
                options: [
                  "It reduces calibration costs",
                  "It ensures measurements can be linked to national standards",
                  "It makes equipment last longer",
                  "It simplifies documentation"
                ],
                correctAnswer: 1,
                explanation: "Traceability ensures measurements can be linked to national/international standards, providing confidence in accuracy and enabling global measurement compatibility."
              },
              {
                id: 3,
                question: "Which is an example of pressure calibration equipment?",
                options: [
                  "Dry block calibrator",
                  "Deadweight tester",
                  "Precision multimeter",
                  "RTD simulator"
                ],
                correctAnswer: 1,
                explanation: "A deadweight tester is a primary pressure standard that uses known masses to generate precise pressure references for calibration."
              },
              {
                id: 4,
                question: "What environmental factors can affect calibration accuracy?",
                options: [
                  "Only temperature",
                  "Temperature and humidity only",
                  "Temperature, humidity, vibration, and electromagnetic interference",
                  "Only electromagnetic interference"
                ],
                correctAnswer: 2,
                explanation: "Temperature, humidity, vibration, electromagnetic interference, and atmospheric pressure can all affect calibration accuracy and must be controlled."
              },
              {
                id: 5,
                question: "What is a reference standard?",
                options: [
                  "Any measuring device",
                  "A written calibration procedure",
                  "A measurement device with known accuracy, traceable to national standards",
                  "A certificate showing calibration results"
                ],
                correctAnswer: 2,
                explanation: "A reference standard is a measurement device with known accuracy, traceable to national standards, used to calibrate other instruments."
              }
            ]}
          />

          {/* Navigation */}
          <div className="flex justify-between">
            <Link to="../instrumentation-module-6-section-1">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../instrumentation-module-6-section-3">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
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

export default InstrumentationModule6Section2;