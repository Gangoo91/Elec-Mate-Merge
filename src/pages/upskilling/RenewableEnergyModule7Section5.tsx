import { ArrowLeft, ArrowRight, Activity, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { section5Questions } from '@/data/upskilling/renewableEnergyModule7QuizData';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import TestEquipmentPractical from '@/components/upskilling/renewable-energy/TestEquipmentPractical';
import TestEquipmentFAQ from '@/components/upskilling/renewable-energy/TestEquipmentFAQ';

const RenewableEnergyModule7Section5 = () => {
  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in overflow-x-hidden bg-[#1a1a1a]">
      <div className="px-8 pt-8 pb-12">
        <Link to="../renewable-energy-module-7">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md touch-manipulation active:scale-[0.98]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 7
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Activity className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-4xl font-bold text-white">
                  Using Meters, Test Equipment, and Diagnostics
                </h1>
                <p className="text-xl text-gray-400">
                  Accurate data assessment for performance and safety evaluation
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 7
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                Section 5
              </Badge>
            </div>
          </div>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Introduction</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p>
                Using the right tools gives accurate data to assess performance and safety. Modern diagnostic 
                equipment reduces guesswork and provides reliable evidence for compliance and troubleshooting.
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
                <span>Select the right meter or instrument</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                <span>Use equipment safely and correctly</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                <span>Interpret test results confidently</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Essential Test Equipment Selection</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>Choosing appropriate test equipment ensures accurate measurements and safe operation during diagnostics:</p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="font-semibold text-yellow-400 mb-3">Clamp Meters vs Digital Multimeters:</h4>
                  <div className="space-y-3 text-sm">
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">Clamp Meters (AC/DC Types):</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• <strong>Advantages:</strong> Non-intrusive measurement, safer for live work</li>
                        <li>• <strong>DC Capability:</strong> Essential for PV string current measurement</li>
                        <li>• <strong>Range:</strong> Typically 0.1A to 1000A with 1% accuracy</li>
                        <li>• <strong>Limitations:</strong> Cannot measure voltage or resistance</li>
                        <li>• <strong>Best for:</strong> String current balancing, load monitoring</li>
                      </ul>
                    </div>
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">True RMS Digital Multimeters:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• <strong>Precision:</strong> High accuracy voltage and resistance readings</li>
                        <li>• <strong>CAT Rating:</strong> Must be CAT III 1000V for PV systems</li>
                        <li>• <strong>Functions:</strong> DC/AC voltage, resistance, diode test</li>
                        <li>• <strong>Safety:</strong> Proper input protection and arc-rated leads</li>
                        <li>• <strong>Best for:</strong> Voc measurement, insulation testing verification</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="font-semibold text-orange-400 mb-3">Thermal Imaging Technology:</h4>
                  <div className="space-y-3 text-sm">
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">Professional Thermal Cameras:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• <strong>Resolution:</strong> Minimum 160×120 pixels for solar applications</li>
                        <li>• <strong>Temperature range:</strong> -20°C to +150°C for typical faults</li>
                        <li>• <strong>Accuracy:</strong> ±2°C or ±2% for reliable diagnosis</li>
                        <li>• <strong>Features:</strong> Image blending, temperature measurement tools</li>
                        <li>• <strong>Documentation:</strong> Built-in image storage and WiFi transfer</li>
                      </ul>
                    </div>
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">Diagnostic Applications:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• <strong>Connection faults:</strong> Loose MC4 connectors show 10-30°C rise</li>
                        <li>• <strong>Module defects:</strong> Failed cells appear as cool spots</li>
                        <li>• <strong>Bypass diode failure:</strong> Hot bypass diode boxes</li>
                        <li>• <strong>Inverter issues:</strong> Overheating components or cooling failures</li>
                        <li>• <strong>String mismatch:</strong> Temperature differences indicate current imbalance</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                <h4 className="font-semibold text-green-400 mb-3">Measurement Best Practices:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Environmental Conditions:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Minimum 200W/m² irradiance for meaningful readings</li>
                      <li>• Stable weather conditions (no passing clouds)</li>
                      <li>• Record ambient temperature and wind speed</li>
                      <li>• Avoid early morning condensation periods</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Measurement Technique:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Allow readings to stabilise before recording</li>
                      <li>• Take multiple measurements for consistency</li>
                      <li>• Use appropriate measurement range settings</li>
                      <li>• Maintain safe working distances from live parts</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Safety Protocols:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Verify equipment CAT rating before use</li>
                      <li>• Check test lead condition and insulation</li>
                      <li>• Use appropriate PPE for voltage levels</li>
                      <li>• Follow LOTO procedures for invasive testing</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Advanced Diagnostic Tools and Techniques</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>Sophisticated diagnostic equipment provides detailed system analysis and performance validation:</p>
              
              <div className="space-y-6">
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="font-semibold text-purple-400 mb-3">PV Analysers and I-V Curve Tracers:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="text-white font-medium mb-2">Technical Capabilities:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• <strong>I-V curve tracing:</strong> Complete characterisation under actual conditions</li>
                        <li>• <strong>Maximum Power Point (MPP):</strong> Verification against STC ratings</li>
                        <li>• <strong>Fill factor calculation:</strong> Indicator of cell quality and connections</li>
                        <li>• <strong>Series resistance:</strong> Detection of resistive losses</li>
                        <li>• <strong>Shunt resistance:</strong> Identification of leakage currents</li>
                        <li>• <strong>Temperature compensation:</strong> Normalisation to standard conditions</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Diagnostic Applications:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• <strong>Module degradation:</strong> Power output comparison over time</li>
                        <li>• <strong>Shading analysis:</strong> Multi-step curves indicate partial shading</li>
                        <li>• <strong>Bypass diode faults:</strong> Irregular curve shapes</li>
                        <li>• <strong>Cell mismatch:</strong> Reduced fill factor and current steps</li>
                        <li>• <strong>Connection issues:</strong> High series resistance values</li>
                        <li>• <strong>Soiling impact:</strong> Reduced short-circuit current</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-card rounded border border-gray-600">
                    <h5 className="text-purple-300 font-medium mb-2">I-V Curve Interpretation Guide:</h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                      <div>
                        <p className="text-white font-medium">Normal Curve:</p>
                        <p className="text-gray-300">Smooth knee, high fill factor ({">"} 70%), matches STC specifications</p>
                      </div>
                      <div>
                        <p className="text-white font-medium">Shading Issues:</p>
                        <p className="text-gray-300">Multiple steps, reduced Isc, irregular MPP region</p>
                      </div>
                      <div>
                        <p className="text-white font-medium">Degraded Module:</p>
                        <p className="text-gray-300">Reduced Voc and Isc, lower maximum power output</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="font-semibold text-yellow-400 mb-3">Monitoring System Integration and Data Analysis:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="text-white font-medium mb-2">Remote Monitoring Capabilities:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• <strong>Real-time performance:</strong> Live power, energy, and efficiency data</li>
                        <li>• <strong>String-level monitoring:</strong> Individual string current and voltage</li>
                        <li>• <strong>Environmental data:</strong> Irradiance, temperature, wind speed</li>
                        <li>• <strong>Grid interaction:</strong> Power quality and grid voltage monitoring</li>
                        <li>• <strong>Fault detection:</strong> Automated alarm generation and notification</li>
                        <li>• <strong>Historical trends:</strong> Long-term performance degradation tracking</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Data Communication Protocols:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• <strong>Modbus RTU/TCP:</strong> Standard industrial communication protocol</li>
                        <li>• <strong>SunSpec Alliance:</strong> Standardised data models for interoperability</li>
                        <li>• <strong>Wireless options:</strong> WiFi, cellular, LoRaWAN for remote sites</li>
                        <li>• <strong>Ethernet backbone:</strong> Reliable communication for large installations</li>
                        <li>• <strong>Cloud platforms:</strong> Data storage and analysis services</li>
                        <li>• <strong>API integration:</strong> Third-party software integration capabilities</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="font-semibold text-yellow-400 mb-3">Performance Data Analysis Techniques:</h4>
                  <div className="space-y-3 text-sm">
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">Key Performance Indicators (KPIs):</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <p className="text-yellow-300 font-medium">Performance Ratio (PR):</p>
                          <p className="text-gray-300">PR = (Actual Energy / Theoretical Energy) × 100%</p>
                          <p className="text-gray-400 text-xs">Target: {">"} 80% for well-maintained systems</p>
                        </div>
                        <div>
                          <p className="text-yellow-300 font-medium">Capacity Factor (CF):</p>
                          <p className="text-gray-300">CF = (Actual Energy / Rated Power × Time) × 100%</p>
                          <p className="text-gray-400 text-xs">Typical range: 10-25% depending on location</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">Trend Analysis Methods:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• <strong>Seasonal normalisation:</strong> Account for irradiance variations</li>
                        <li>• <strong>Weather-corrected performance:</strong> Temperature and soiling adjustments</li>
                        <li>• <strong>Degradation rate calculation:</strong> Year-over-year performance decline</li>
                        <li>• <strong>String comparison:</strong> Identify underperforming sections</li>
                        <li>• <strong>Availability tracking:</strong> System uptime and fault frequency</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Safety Considerations and Risk Assessment</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>Testing renewable energy systems involves unique hazards requiring comprehensive safety protocols:</p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                  <h4 className="text-red-400 font-semibold mb-3">Equipment-Related Hazards:</h4>
                  <div className="space-y-3 text-sm">
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">Meter Category Ratings:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• <strong>CAT I:</strong> Electronic equipment, not suitable for PV</li>
                        <li>• <strong>CAT II:</strong> Portable equipment, max 300V to earth</li>
                        <li>• <strong>CAT III:</strong> Fixed installations, required for PV systems</li>
                        <li>• <strong>CAT IV:</strong> Service entrance, overhead lines</li>
                        <li>• <strong>DC capability:</strong> Must be explicitly DC-rated for solar</li>
                      </ul>
                    </div>
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">Test Lead Safety:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• <strong>Insulation rating:</strong> Must match or exceed system voltage</li>
                        <li>• <strong>Finger guards:</strong> Prevent accidental contact with live probes</li>
                        <li>• <strong>Condition check:</strong> Inspect for cracks or damage before use</li>
                        <li>• <strong>Storage:</strong> Protect from UV and mechanical damage</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Personal Protective Equipment (PPE):</h4>
                  <div className="space-y-3 text-sm">
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">Arc Flash Protection:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• <strong>Arc-rated clothing:</strong> Minimum 8 cal/cm² for low voltage</li>
                        <li>• <strong>Face protection:</strong> Arc-rated face shield or hood</li>
                        <li>• <strong>Gloves:</strong> Class 0 (1000V) electrical gloves with leather protectors</li>
                        <li>• <strong>Footwear:</strong> Electrical hazard rated safety boots</li>
                        <li>• <strong>Eye protection:</strong> Safety glasses under face shield</li>
                      </ul>
                    </div>
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">Environmental Protection:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• <strong>Sun protection:</strong> Hat, sunglasses, long sleeves</li>
                        <li>• <strong>Weather gear:</strong> Appropriate for wet conditions</li>
                        <li>• <strong>Fall protection:</strong> Harness and anchor points for roof work</li>
                        <li>• <strong>Communication:</strong> Two-way radio or mobile phone</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-400/30">
                <h4 className="text-yellow-400 font-semibold mb-3">Pre-Work Safety Checklist:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Equipment Verification:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Calibration certificates current</li>
                      <li>• Battery levels adequate</li>
                      <li>• Test lead integrity verified</li>
                      <li>• Function test completed</li>
                      <li>• CAT rating appropriate</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Environmental Assessment:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Weather conditions suitable</li>
                      <li>• Adequate lighting available</li>
                      <li>• Escape routes identified</li>
                      <li>• Emergency contacts available</li>
                      <li>• First aid kit accessible</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Personnel Readiness:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• PPE donned and checked</li>
                      <li>• Training certificates current</li>
                      <li>• Physical fitness adequate</li>
                      <li>• Work permits obtained</li>
                      <li>• Supervisor notification given</li>
                    </ul>
                  </div>
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
                  <strong>Case Study:</strong> Customer thought inverter had failed—thermal scan revealed overheated 
                  MC4 connector. Simple connector replacement restored full system performance, avoiding expensive 
                  inverter replacement.
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
                Modern diagnostics tools reduce guesswork and prove compliance. Selecting the appropriate equipment 
                for each task ensures accurate results and safe working practices.
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
                questions={section5Questions}
                title="Testing Equipment Quiz"
              />
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Link to="../renewable-energy-module-7-section-4">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card touch-manipulation active:scale-[0.98]">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../renewable-energy-module-7-section-6">
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

export default RenewableEnergyModule7Section5;