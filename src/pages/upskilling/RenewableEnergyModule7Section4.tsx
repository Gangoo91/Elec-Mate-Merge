import { ArrowLeft, ArrowRight, Search, CheckCircle, AlertCircle, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { section4Questions } from '@/data/upskilling/renewableEnergyModule7QuizData';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import FaultFindingPractical from '@/components/upskilling/renewable-energy/FaultFindingPractical';
import FaultFindingFAQ from '@/components/upskilling/renewable-energy/FaultFindingFAQ';

const RenewableEnergyModule7Section4 = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-8 pt-8 pb-12">
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
            <div className="flex items-center gap-4 mb-4">
              <Search className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-4xl font-bold text-white">
                  Fault-Finding in PV, Battery, and Inverter Systems
                </h1>
                <p className="text-xl text-gray-400">
                  Systematic diagnostics to reduce downtime and unnecessary repairs
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 7
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                Section 4
              </Badge>
            </div>
          </div>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Introduction</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p>
                Systematic diagnostics reduce downtime and unnecessary part swaps. A logical approach to 
                fault-finding saves time, money, and builds client trust through efficient problem resolution.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Learning Objectives</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                <span>Use logical steps for fault isolation</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                <span>Interpret error codes and warning signals</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                <span>Differentiate between hardware and configuration issues</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Systematic Fault-Finding Approach</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-yellow-400/10 border border-blue-600/20 rounded-md p-4">
                <h4 className="text-yellow-400 font-semibold mb-2">Fault Tree Methodology:</h4>
                <p className="text-sm">
                  Start with the symptom, work backwards through possible causes, test hypotheses systematically. 
                  Use checklists to ensure no steps are missed.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-white">Initial Assessment:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Document symptoms and error codes</li>
                    <li>Check system status indicators</li>
                    <li>Review recent changes or events</li>
                    <li>Gather historical performance data</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-white">Isolation Techniques:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Test individual components separately</li>
                    <li>Use bypass methods where safe</li>
                    <li>Compare with known good references</li>
                    <li>Validate with multiple test methods</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Common PV System Faults and Diagnostic Techniques</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>Understanding fault patterns and their signatures enables rapid diagnosis and targeted repairs:</p>
              
              <div className="space-y-4">
                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                  <h4 className="font-semibold text-red-400 mb-3">Complete String Failure:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-white font-medium mb-2">Symptoms:</p>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Zero current reading on affected string</li>
                        <li>• No voltage under load conditions</li>
                        <li>• Inverter shows string fault alarm</li>
                        <li>• Monitoring shows complete production loss</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-white font-medium mb-2">Diagnostic Steps:</p>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Check DC isolators and fuses first</li>
                        <li>• Measure Voc at combiner box</li>
                        <li>• Trace cable route for visible damage</li>
                        <li>• Test connector integrity at each joint</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-card rounded border border-gray-600">
                    <p className="text-red-300 font-medium">Common Causes:</p>
                    <p className="text-gray-300 text-sm">Blown string fuse (most common), loose MC4 connector, cable damage from wildlife, failed DC isolator, or module junction box failure</p>
                  </div>
                </div>

                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="font-semibold text-orange-400 mb-3">Module Mismatch and Underperformance:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-white font-medium mb-2">Symptoms:</p>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Uneven string currents ({">"} 5% variation)</li>
                        <li>• Reduced power output despite good irradiance</li>
                        <li>• Thermal hotspots visible in IR imaging</li>
                        <li>• Gradual performance degradation</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-white font-medium mb-2">Diagnostic Tools:</p>
                      <ul className="text-gray-300 space-y-1">
                        <li>• I-V curve tracing for individual modules</li>
                        <li>• Thermal imaging during peak sunlight</li>
                        <li>• String current comparison under load</li>
                        <li>• Visual inspection for soiling patterns</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-card rounded border border-gray-600">
                    <p className="text-orange-300 font-medium">Typical Causes:</p>
                    <p className="text-gray-300 text-sm">Partial shading from new obstructions, uneven soiling accumulation, module manufacturing tolerances, bypass diode failure, or cell-level degradation</p>
                  </div>
                </div>

                <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="font-semibold text-yellow-400 mb-3">Arc Fault Detection and Response:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-white font-medium mb-2">Warning Signs:</p>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Intermittent inverter shutdowns</li>
                        <li>• Arc fault circuit interrupter (AFCI) trips</li>
                        <li>• Burning smell or scorch marks</li>
                        <li>• High frequency noise in monitoring</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-white font-medium mb-2">Investigation Protocol:</p>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Immediate system shutdown for safety</li>
                        <li>• Visual inspection of all connections</li>
                        <li>• Thermal imaging of suspected areas</li>
                        <li>• Connection torque verification</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-card rounded border border-gray-600">
                    <p className="text-yellow-300 font-medium">Critical Safety Note:</p>
                    <p className="text-gray-300 text-sm">Arc faults can ignite fires and cause electrocution. Never ignore AFCI trips - always investigate thoroughly before re-energising the system</p>
                  </div>
                </div>

                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="font-semibold text-yellow-400 mb-3">Grounding and Earthing Faults:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-white font-medium mb-2">Fault Indicators:</p>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Ground fault detection device activation</li>
                        <li>• Reduced insulation resistance readings</li>
                        <li>• Current flowing in equipment grounding conductor</li>
                        <li>• Voltage between frame and earth</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-white font-medium mb-2">Testing Procedures:</p>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Insulation resistance testing (500V DC)</li>
                        <li>• Ground fault resistance measurement</li>
                        <li>• Equipment grounding conductor continuity</li>
                        <li>• Step and touch potential assessment</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Battery and Inverter Fault Diagnosis</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>Battery storage and power electronics introduce additional complexity requiring specialised diagnostic approaches:</p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="font-semibold text-purple-400 mb-3">Battery Management System (BMS) Faults:</h4>
                  <div className="space-y-3 text-sm">
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">Protection Lockouts:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Overvoltage protection: Cell voltage {">"} 4.2V (Li-ion)</li>
                        <li>• Undervoltage protection: Cell voltage {"<"} 2.5V (Li-ion)</li>
                        <li>• Overcurrent protection: Charge/discharge limits exceeded</li>
                        <li>• Temperature protection: Operating outside safe range</li>
                        <li>• Insulation monitoring: Ground fault detection</li>
                      </ul>
                    </div>
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">Cell Balancing Issues:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Voltage imbalance {">"} 100mV between cells</li>
                        <li>• Capacity imbalance reducing usable energy</li>
                        <li>• Temperature gradient across battery pack</li>
                        <li>• Failed balancing resistors or circuits</li>
                        <li>• Communication errors between BMS modules</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="font-semibold text-yellow-400 mb-3">Advanced Inverter Diagnostics:</h4>
                  <div className="space-y-3 text-sm">
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">Grid Interaction Faults:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Voltage regulation outside 230V ±10%</li>
                        <li>• Frequency deviation beyond 50Hz ±1%</li>
                        <li>• Phase imbalance in three-phase systems</li>
                        <li>• Power quality issues (THD, flicker)</li>
                        <li>• Anti-islanding protection activation</li>
                      </ul>
                    </div>
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">Internal Component Failures:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• IGBT or MOSFET switching device failure</li>
                        <li>• DC bus capacitor degradation</li>
                        <li>• Cooling system malfunction</li>
                        <li>• Control board or sensor failure</li>
                        <li>• EMC filter component breakdown</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                <h4 className="font-semibold text-green-400 mb-3">Systematic Fault Isolation Methodology:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">1. Information Gathering:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Review error logs and fault codes</li>
                      <li>• Check environmental conditions</li>
                      <li>• Interview system users about symptoms</li>
                      <li>• Examine recent maintenance activities</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">2. Physical Inspection:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Visual examination for obvious damage</li>
                      <li>• Thermal imaging for hotspots</li>
                      <li>• Connection tightness verification</li>
                      <li>• Ventilation and cooling assessment</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">3. Electrical Testing:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Isolation testing before energising</li>
                      <li>• Step-by-step component verification</li>
                      <li>• Load testing under controlled conditions</li>
                      <li>• Documentation of all findings</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                <h4 className="font-semibold text-red-400 mb-3">Safety Considerations for Advanced Diagnostics:</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>High Voltage Hazards:</strong> Battery systems can maintain dangerous voltages even when isolated. Always use appropriate PPE and follow LOTO procedures.</p>
                  <p><strong>Arc Flash Risk:</strong> Power electronics switching can create arc flash conditions. Ensure proper arc-rated PPE when working on live equipment.</p>
                  <p><strong>Chemical Hazards:</strong> Battery electrolytes can be corrosive. Ensure proper ventilation and have appropriate neutralising agents available.</p>
                  <p><strong>Stored Energy:</strong> Capacitors and inductors can store energy after isolation. Allow adequate discharge time and verify zero energy state.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Site vs Equipment Root Causes</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-md p-4">
                <h4 className="text-yellow-400 font-semibold mb-2">Key Principle:</h4>
                <p className="text-sm">
                  Always determine whether the fault originates from site conditions (environmental, installation) 
                  or equipment failure before ordering replacement parts.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-white mb-2">Site-Related Causes:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Poor earthing or bonding</li>
                    <li>Inadequate cable sizing</li>
                    <li>Environmental exposure</li>
                    <li>Grid supply quality issues</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Equipment Failures:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Component wear or damage</li>
                    <li>Manufacturing defects</li>
                    <li>Software corruption</li>
                    <li>Age-related degradation</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Real World Scenario</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <div className="bg-green-600/10 border border-green-600/20 rounded-md p-4">
                <p className="text-sm">
                  <strong>Case Study:</strong> Battery inverter flagged overvoltage fault—turned out to be loose 
                  grid-neutral connection causing voltage instability. The systematic approach prevented unnecessary 
                  inverter replacement and identified the real site issue.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p>
                Structured fault-finding saves time and builds client trust. A methodical approach using fault trees, 
                proper testing procedures, and logical elimination of causes leads to efficient problem resolution.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
                Test Your Knowledge
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SingleQuestionQuiz 
                questions={section4Questions}
                title="Fault-Finding Quiz"
              />
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Link to="../renewable-energy-module-7-section-3">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../renewable-energy-module-7">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
                Complete Module
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule7Section4;