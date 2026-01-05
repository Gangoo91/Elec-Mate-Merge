import { ArrowLeft, ArrowRight, Shield, Zap, AlertTriangle, Book, CheckCircle2, Brain, Target, Settings, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import InstrumentationQuiz from '@/components/upskilling/quiz/InstrumentationQuiz';

const InstrumentationModule7Section5 = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-8 pt-8 pb-12">
        <Link to="../instrumentation-module-7">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 7
          </Button>
        </Link>
        
        <div className="space-y-8">
          {/* Header */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Shield className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-4xl font-bold text-white">
                  Barriers, Isolators, and Intrinsically Safe Loops
                </h1>
                <p className="text-xl text-gray-400">
                  Module 7, Section 5
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 7.5
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                25 minutes
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
                Instrumentation used in hazardous or explosive environments requires special safety measures 
                to prevent ignition of flammable gases, vapours, or dust. This section covers how isolation 
                and intrinsic safety are achieved through proper barrier selection, installation practices, 
                and certification requirements.
              </p>
              <p>
                Understanding these safety systems is critical for any instrumentation engineer working in 
                petrochemical, oil and gas, pharmaceutical, or other process industries where explosive 
                atmospheres may be present.
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
                  <span>Understand the role of barriers and isolators in hazardous area protection</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Learn what makes a loop intrinsically safe and energy limitation principles</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Identify components and certification requirements for hazardous areas</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Master installation best practices for ATEX/IECEx zones</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Zener Barriers */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                Zener Barriers and Voltage/Current Limitation
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">How Zener Barriers Provide Intrinsic Safety</h4>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-white font-semibold mb-2">Operating Principle</h5>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Voltage Limitation:</strong> Zener diodes clamp maximum voltage</li>
                    <li>• <strong>Current Limitation:</strong> Series resistors limit fault current</li>
                    <li>• <strong>Energy Limitation:</strong> Combination prevents ignition energy</li>
                    <li>• <strong>Fault Protection:</strong> Two-fault tolerance for safety</li>
                    <li>• <strong>Ground Reference:</strong> Essential for proper operation</li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">Typical Specifications</h5>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Voltage Rating:</strong> 28V maximum open circuit</li>
                    <li>• <strong>Current Rating:</strong> 93mA maximum short circuit</li>
                    <li>• <strong>Power Rating:</strong> 0.65W maximum power transfer</li>
                    <li>• <strong>Response Time:</strong> &lt;1μs clamping speed</li>
                    <li>• <strong>Temperature Range:</strong> -40°C to +60°C operation</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4">
                <h5 className="text-white font-semibold mb-2">Installation Requirements</h5>
                <div className="bg-card p-4 rounded border border-gray-600">
                  <ul className="text-sm space-y-2">
                    <li>• <strong>Mounting:</strong> Must be mounted in safe area on DIN rail</li>
                    <li>• <strong>Earthing:</strong> Dedicated earth connection to earth bar (required)</li>
                    <li>• <strong>Cable Separation:</strong> Minimum 50mm from non-IS circuits</li>
                    <li>• <strong>Cable Types:</strong> Use IS-approved cable throughout hazardous zone</li>
                    <li>• <strong>Documentation:</strong> Maintain certificates and loop calculations</li>
                    <li>• <strong>Identification:</strong> Clear labelling of IS and non-IS circuits</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Galvanic Isolators */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="h-5 w-5 text-yellow-400" />
                Galvanic Isolators and Signal Isolation
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">Electrical Isolation Technology</h4>
              
              <div className="space-y-4">
                <div>
                  <h5 className="text-white font-semibold mb-2">Isolation Methods</h5>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h6 className="text-yellow-400 font-semibold text-sm mb-2">Transformer Isolation</h6>
                      <ul className="text-xs space-y-1">
                        <li>• Magnetic coupling</li>
                        <li>• AC signal transfer</li>
                        <li>• High isolation voltage</li>
                        <li>• Wide frequency response</li>
                      </ul>
                    </div>
                    
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h6 className="text-yellow-400 font-semibold text-sm mb-2">Optical Isolation</h6>
                      <ul className="text-xs space-y-1">
                        <li>• Light-based coupling</li>
                        <li>• Digital signal transfer</li>
                        <li>• Immune to EMI</li>
                        <li>• Fast response time</li>
                      </ul>
                    </div>
                    
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h6 className="text-yellow-400 font-semibold text-sm mb-2">Capacitive Isolation</h6>
                      <ul className="text-xs space-y-1">
                        <li>• Capacitive coupling</li>
                        <li>• High-frequency transfer</li>
                        <li>• Compact design</li>
                        <li>• Low power consumption</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">Key Benefits and Applications</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-white font-medium mb-2">Protection Benefits</h6>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>Ground Loop Elimination:</strong> Breaks earth paths</li>
                        <li>• <strong>Voltage Spike Protection:</strong> Isolates transients</li>
                        <li>• <strong>System Protection:</strong> Protects control systems</li>
                        <li>• <strong>Signal Integrity:</strong> Reduces noise pickup</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h6 className="text-white font-medium mb-2">Typical Applications</h6>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>DCS Interface:</strong> Field to control room isolation</li>
                        <li>• <strong>SCADA Systems:</strong> Remote monitoring protection</li>
                        <li>• <strong>Multi-drop Networks:</strong> Node isolation</li>
                        <li>• <strong>Hazardous Areas:</strong> Combined with IS barriers</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Intrinsic Safety Principles */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lock className="h-5 w-5 text-yellow-400" />
                Intrinsic Safety Principles and Energy Limitation
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">Understanding Intrinsic Safety Concepts</h4>
              
              <div className="space-y-4">
                <div>
                  <h5 className="text-white font-semibold mb-2">Energy Limitation Theory</h5>
                  <p className="text-sm mb-3">
                    Intrinsic safety ensures that electrical energy in a circuit is insufficient to ignite 
                    a specific explosive atmosphere under both normal and fault conditions.
                  </p>
                  
                  <div className="bg-card p-3 rounded border border-gray-600">
                    <h6 className="text-yellow-400 font-semibold text-sm mb-2">Ignition Energy Thresholds</h6>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Hydrogen:</strong> 20μJ (most sensitive gas)</li>
                      <li>• <strong>Acetylene:</strong> 19μJ (very sensitive)</li>
                      <li>• <strong>Methane:</strong> 280μJ (typical process gas)</li>
                      <li>• <strong>Propane:</strong> 250μJ (common hydrocarbon)</li>
                      <li>• <strong>IS Circuits:</strong> Must be &lt;20% of minimum ignition energy</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">IS Equipment Categories</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-white font-medium mb-2">Equipment Protection Levels</h6>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>ia:</strong> Safe with two faults (Zone 0)</li>
                        <li>• <strong>ib:</strong> Safe with one fault (Zone 1)</li>
                        <li>• <strong>ic:</strong> Safe under normal conditions (Zone 2)</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h6 className="text-white font-medium mb-2">Gas Group Classifications</h6>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>Group IIA:</strong> Propane (least sensitive)</li>
                        <li>• <strong>Group IIB:</strong> Ethylene (intermediate)</li>
                        <li>• <strong>Group IIC:</strong> Hydrogen (most sensitive)</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">Design Calculations and Safety Factors</h5>
                  <div className="bg-card p-3 rounded border border-gray-600">
                    <p className="text-sm mb-2">
                      <strong>Energy Calculation Formula:</strong>
                    </p>
                    <ul className="text-sm space-y-1">
                      <li>• Capacitive Energy: E = ½CV² (joules)</li>
                      <li>• Inductive Energy: E = ½LI² (joules)</li>
                      <li>• Safety Factor: 50% of minimum ignition energy</li>
                      <li>• Temperature Factor: Derated for surface temperature</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Installation and Certification */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-5 w-5 text-yellow-400" />
                Installation Best Practices and Certification Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">ATEX/IECEx Zone Requirements</h4>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-white font-semibold mb-2">Hazardous Area Zones</h5>
                  <div className="space-y-3">
                    <div className="bg-red-900/20 p-3 rounded border border-red-600/30">
                      <h6 className="text-red-400 font-semibold text-sm mb-1">Zone 0 (Continuous)</h6>
                      <ul className="text-xs space-y-1">
                        <li>• Explosive atmosphere continuously present</li>
                        <li>• Requires 'ia' equipment only</li>
                        <li>• Highest safety requirements</li>
                      </ul>
                    </div>
                    
                    <div className="bg-yellow-900/20 p-3 rounded border border-yellow-600/30">
                      <h6 className="text-yellow-400 font-semibold text-sm mb-1">Zone 1 (Likely)</h6>
                      <ul className="text-xs space-y-1">
                        <li>• Explosive atmosphere likely during operation</li>
                        <li>• Requires 'ia' or 'ib' equipment</li>
                        <li>• Most common process area classification</li>
                      </ul>
                    </div>
                    
                    <div className="bg-green-900/20 p-3 rounded border border-green-600/30">
                      <h6 className="text-green-400 font-semibold text-sm mb-1">Zone 2 (Unlikely)</h6>
                      <ul className="text-xs space-y-1">
                        <li>• Explosive atmosphere unlikely</li>
                        <li>• Allows 'ia', 'ib', or 'ic' equipment</li>
                        <li>• More installation options available</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">Certification and Documentation</h5>
                  <ul className="text-sm space-y-1 mb-4">
                    <li>• <strong>ATEX Directive:</strong> European Union requirements</li>
                    <li>• <strong>IECEx Scheme:</strong> International certification</li>
                    <li>• <strong>Ex Certificate:</strong> Equipment type approval</li>
                    <li>• <strong>System Calculation:</strong> Loop energy analysis</li>
                    <li>• <strong>Installation Records:</strong> As-built documentation</li>
                  </ul>
                  
                  <h5 className="text-white font-semibold mb-2">Required Documentation</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Equipment certificates (Ex d, Ex e, Ex ia, etc.)</li>
                    <li>• System calculations and safety parameters</li>
                    <li>• Installation drawings and cable schedules</li>
                    <li>• Maintenance procedures and inspection records</li>
                    <li>• Competent person declarations</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4">
                <h5 className="text-white font-semibold mb-2">Installation Best Practices</h5>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-card p-3 rounded border border-gray-600">
                    <h6 className="text-yellow-400 font-semibold text-sm mb-2">Earthing Requirements</h6>
                    <ul className="text-xs space-y-1">
                      <li>• Dedicated IS earth bar</li>
                      <li>• Maximum 1Ω earth resistance</li>
                      <li>• No shared earths with power circuits</li>
                      <li>• Continuous earth monitoring</li>
                    </ul>
                  </div>
                  
                  <div className="bg-card p-3 rounded border border-gray-600">
                    <h6 className="text-yellow-400 font-semibold text-sm mb-2">Cable Segregation</h6>
                    <ul className="text-xs space-y-1">
                      <li>• Separate cable trays for IS circuits</li>
                      <li>• Minimum 50mm separation distance</li>
                      <li>• Dedicated cable glands and entries</li>
                      <li>• Clear marking and identification</li>
                    </ul>
                  </div>
                  
                  <div className="bg-card p-3 rounded border border-gray-600">
                    <h6 className="text-yellow-400 font-semibold text-sm mb-2">System Integration</h6>
                    <ul className="text-xs space-y-1">
                      <li>• Loop parameter calculations</li>
                      <li>• Barrier selection and sizing</li>
                      <li>• Cable capacitance and inductance</li>
                      <li>• End-to-end system verification</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real World Scenario */}
          <Card className="bg-gradient-to-r from-elec-gray to-elec-dark border-yellow-400/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Brain className="h-5 w-5 text-yellow-400" />
                Real World Scenario
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <p className="font-semibold text-yellow-400">
                Oil Refinery Tank Level Monitoring in Zone 1 Hazardous Area
              </p>
              <p>
                An oil refinery uses intrinsically safe loops to monitor tank levels in a Zone 1 hazardous area, 
                preventing spark risk from signal wiring. The system must comply with ATEX directives and provide 
                reliable level indication to prevent overflow incidents.
              </p>
              <div className="bg-card p-3 rounded border border-gray-600">
                <h5 className="text-yellow-400 font-semibold text-sm mb-2">System Requirements:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Tank farm in Zone 1 area (crude oil storage)</li>
                  <li>• 12 tanks requiring level monitoring</li>
                  <li>• 300m cable runs from tank farm to control room</li>
                  <li>• ATEX Group IIA (hydrocarbon environment)</li>
                  <li>• Temperature range: -20°C to +60°C</li>
                </ul>
              </div>
              <div className="bg-yellow-900/20 p-3 rounded border border-yellow-600/30">
                <h5 className="text-yellow-400 font-semibold text-sm mb-2">Implementation:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Radar level transmitters with Ex ia IIA T4 certification</li>
                  <li>• Zener barriers (24V, 93mA) mounted in safe area control room</li>
                  <li>• IS-approved multicore cable in dedicated cable tray</li>
                  <li>• System calculations verified by certified engineer</li>
                  <li>• Cable parameters: C=200nF/km, L=0.4mH/km per conductor</li>
                </ul>
              </div>
              <div className="bg-green-900/20 p-3 rounded border border-green-600/30">
                <h5 className="text-green-400 font-semibold text-sm mb-2">Safety Verification:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Maximum stored energy: 60μJ capacitive, 40μJ inductive</li>
                  <li>• Well below 280μJ ignition threshold for propane</li>
                  <li>• Two-fault tolerance maintained throughout</li>
                  <li>• Annual inspection and calibration programme implemented</li>
                  <li>• Zero incidents since commissioning in 2018</li>
                </ul>
              </div>
              <p className="text-sm italic text-green-400">
                Result: Safe and reliable tank level monitoring prevents overflow incidents whilst maintaining 
                full compliance with explosive atmosphere regulations. The intrinsically safe design eliminates 
                ignition risk even during maintenance or fault conditions.
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
                Safe loop design in explosive environments relies on limiting energy below ignition thresholds 
                and using certified isolation methods. Proper barrier selection, installation practices, and 
                system documentation ensure both safety and regulatory compliance whilst maintaining reliable 
                instrumentation performance.
              </p>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <InstrumentationQuiz 
            questions={[
              {
                id: 1,
                question: "What does a Zener barrier do in an intrinsically safe system?",
                options: [
                  "Amplifies the signal strength",
                  "Limits voltage and current entering hazardous zones to prevent ignition of explosive atmospheres",
                  "Converts analog to digital signals",
                  "Provides power to field devices"
                ],
                correctAnswer: 1,
                explanation: "A Zener barrier limits both voltage and current entering hazardous zones using Zener diodes for voltage clamping and series resistors for current limiting, ensuring energy remains below ignition thresholds."
              },
              {
                id: 2,
                question: "When are intrinsically safe loops required?",
                options: [
                  "Only in outdoor installations",
                  "In hazardous areas where explosive atmospheres may be present (Zones 0, 1, 2)",
                  "When using digital communication",
                  "For high-accuracy measurements only"
                ],
                correctAnswer: 1,
                explanation: "Intrinsically safe loops are required in hazardous areas classified as Zone 0, 1, or 2 where explosive gas/vapour atmospheres may be present, ensuring electrical energy cannot cause ignition."
              },
              {
                id: 3,
                question: "What's the key benefit of a galvanic isolator?",
                options: [
                  "Increases signal strength",
                  "Electrically separates control systems from field wiring, eliminating ground loops and providing protection",
                  "Reduces cable costs",
                  "Improves signal accuracy only"
                ],
                correctAnswer: 1,
                explanation: "Galvanic isolators electrically separate control systems from field wiring, eliminating ground loops, reducing noise, and protecting equipment from voltage spikes and transients."
              },
              {
                id: 4,
                question: "What's one common certification standard for IS systems?",
                options: [
                  "ISO 9001",
                  "ATEX (European) or IECEx (International) certification for explosive atmosphere equipment",
                  "IEEE 802.11",
                  "NEMA 4X"
                ],
                correctAnswer: 1,
                explanation: "ATEX (European Union) and IECEx (International) are the primary certification schemes for equipment used in explosive atmospheres, ensuring Ex-rated equipment meets safety requirements."
              },
              {
                id: 5,
                question: "Why must IS circuits be properly earthed?",
                options: [
                  "To improve signal quality only",
                  "For proper barrier operation and safety - barriers require a dedicated earth connection to function correctly",
                  "To reduce cable resistance",
                  "To comply with colour coding standards"
                ],
                correctAnswer: 1,
                explanation: "IS circuits must be properly earthed because Zener barriers require a dedicated earth connection to operate correctly and safely clamp voltages. Poor earthing can compromise barrier protection."
              }
            ]}
            title="Section 5 Knowledge Check"
          />

          {/* Navigation */}
          <div className="flex justify-between">
            <Link to="../instrumentation-module-7-section-4">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../instrumentation-module-7-section-6">
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

export default InstrumentationModule7Section5;