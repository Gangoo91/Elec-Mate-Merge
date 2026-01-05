import { ArrowLeft, ArrowRight, Eye, BookOpen, Target, Zap, Shield, CheckCircle, Lightbulb, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { EVChargingModule4Section3Quiz } from '@/components/upskilling/quiz/EVChargingModule4Section3Quiz';

const EVChargingModule4Section3 = () => {
  useEffect(() => {
    document.title = 'Use of Monitoring Devices and Relays - EV Charging Module 4 Section 3';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn to install and configure monitoring devices and relays for enhanced EV charging protection. Covers current monitoring, voltage protection relays, and advanced diagnostic systems.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="../ev-charging-module-4">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 4
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Eye className="h-8 w-8 text-yellow-400" />
            <Badge 
              variant="secondary" 
              className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 4 - Section 3
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Use of Monitoring Devices and Relays
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Installing monitoring equipment for enhanced protection and diagnostic capabilities in EV charging systems
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          
          {/* Introduction */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <BookOpen className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Introduction</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                Advanced monitoring devices and protective relays are essential components of modern EV charging installations, providing enhanced protection, diagnostics, and operational intelligence beyond conventional protection devices. These systems enable proactive maintenance, fault prediction, and optimised performance.
              </p>
              <p>
                This section covers the specification, installation, and configuration of monitoring equipment including current transformers, voltage relays, power quality monitors, and intelligent protection systems that enhance the safety and reliability of EV charging infrastructure.
              </p>
              <p>
                Modern monitoring systems integrate with building management systems, remote monitoring platforms, and predictive maintenance programmes to provide comprehensive oversight of charging infrastructure performance and condition.
              </p>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Target className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Learning Outcomes</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p className="mb-4">Upon completion of this section, you will be able to:</p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Select appropriate monitoring devices for different EV charging applications</li>
                <li>Install and configure current transformers and voltage monitoring systems</li>
                <li>Implement power quality monitoring and harmonic analysis equipment</li>
                <li>Design protective relay schemes for complex charging installations</li>
                <li>Integrate monitoring systems with building management and remote platforms</li>
                <li>Establish maintenance schedules and diagnostic procedures for monitoring equipment</li>
              </ul>
            </CardContent>
          </Card>

          {/* Current Monitoring Systems */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="h-5 w-5 text-yellow-400" />
                Current Monitoring and Measurement Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-yellow-400 mb-2">Current Transformer (CT) Selection</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>Split-core CTs for retrofit installations without cable disconnection</li>
                    <li>Window-type CTs for new installations with optimal accuracy</li>
                    <li>Rogowski coils for flexible installation and high-frequency measurement</li>
                    <li>Precision CTs for revenue-grade metering and billing applications</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-yellow-400 mb-2">CT Sizing and Accuracy Classes</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-600 text-sm">
                      <thead>
                        <tr className="bg-gray-800">
                          <th className="border border-gray-600 p-2 text-left">Application</th>
                          <th className="border border-gray-600 p-2 text-left">Primary Rating</th>
                          <th className="border border-gray-600 p-2 text-left">Accuracy Class</th>
                          <th className="border border-gray-600 p-2 text-left">Burden (VA)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-600 p-2">7kW single charger</td>
                          <td className="border border-gray-600 p-2">50/5A</td>
                          <td className="border border-gray-600 p-2">Class 1</td>
                          <td className="border border-gray-600 p-2">2.5VA</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 p-2">22kW three-phase</td>
                          <td className="border border-gray-600 p-2">100/5A</td>
                          <td className="border border-gray-600 p-2">Class 0.5</td>
                          <td className="border border-gray-600 p-2">5VA</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 p-2">Distribution board</td>
                          <td className="border border-gray-600 p-2">200/5A</td>
                          <td className="border border-gray-600 p-2">Class 0.5</td>
                          <td className="border border-gray-600 p-2">10VA</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 p-2">Main incomer</td>
                          <td className="border border-gray-600 p-2">400/5A</td>
                          <td className="border border-gray-600 p-2">Class 0.2S</td>
                          <td className="border border-gray-600 p-2">15VA</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-yellow-400 mb-2">Installation Requirements</h4>
                  <div className="space-y-3">
                    <div className="bg-gray-800 p-3 rounded">
                      <h5 className="font-medium text-blue-300 mb-2">Physical Installation</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Minimum clearance: 200mm from adjacent conductors</li>
                        <li>• Secure mounting to prevent vibration and movement</li>
                        <li>• Environmental protection appropriate to location (IP54 minimum)</li>
                        <li>• Access provision for testing and maintenance</li>
                      </ul>
                    </div>
                    <div className="bg-gray-800 p-3 rounded">
                      <h5 className="font-medium text-blue-300 mb-2">Electrical Connections</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Short secondary leads to minimise voltage drop (&lt;4m typical)</li>
                        <li>• Twisted pair cable for immunity to electromagnetic interference</li>
                        <li>• Terminal blocks rated for connected burden</li>
                        <li>• Test terminals for commissioning and maintenance</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-yellow-400 mb-2">Safety Considerations</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>Secondary circuits must never be open-circuited during operation</li>
                    <li>Shorting links required during CT installation and testing</li>
                    <li>Earth one point of secondary circuit only to prevent circulating currents</li>
                    <li>Warning labels and identification for maintenance personnel</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Voltage Protection Relays */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-5 w-5 text-green-400" />
                Voltage Protection and Monitoring Relays
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-green-400 mb-2">Undervoltage and Overvoltage Protection</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>Three-phase voltage monitoring with individual phase surveillance</li>
                    <li>Adjustable trip thresholds (typically 80-110% of nominal voltage)</li>
                    <li>Time delay settings to prevent nuisance tripping (1-60 seconds)</li>
                    <li>Automatic reconnection when voltage returns to normal limits</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-green-400 mb-2">Phase Sequence and Phase Loss Detection</h4>
                  <div className="space-y-3">
                    <div className="bg-gray-800 p-3 rounded">
                      <h5 className="font-medium text-green-300 mb-2">Phase Sequence Monitoring</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Automatic detection of correct L1-L2-L3 rotation</li>
                        <li>• Protection against motor damage from incorrect rotation</li>
                        <li>• Essential for three-phase EV charging equipment</li>
                        <li>• Indication and alarm for maintenance purposes</li>
                      </ul>
                    </div>
                    <div className="bg-gray-800 p-3 rounded">
                      <h5 className="font-medium text-green-300 mb-2">Phase Loss Protection</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Detection of open-circuit or high-impedance faults</li>
                        <li>• Voltage unbalance measurement and protection</li>
                        <li>• Adjustable sensitivity for different load conditions</li>
                        <li>• Coordination with charge point control systems</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-green-400 mb-2">Voltage Relay Settings</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-600 text-sm">
                      <thead>
                        <tr className="bg-gray-800">
                          <th className="border border-gray-600 p-2 text-left">Parameter</th>
                          <th className="border border-gray-600 p-2 text-left">Normal Range</th>
                          <th className="border border-gray-600 p-2 text-left">EV Charging Setting</th>
                          <th className="border border-gray-600 p-2 text-left">Time Delay</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-600 p-2">Undervoltage trip</td>
                          <td className="border border-gray-600 p-2">85% nominal</td>
                          <td className="border border-gray-600 p-2">90% (207V)</td>
                          <td className="border border-gray-600 p-2">5 seconds</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 p-2">Overvoltage trip</td>
                          <td className="border border-gray-600 p-2">110% nominal</td>
                          <td className="border border-gray-600 p-2">106% (244V)</td>
                          <td className="border border-gray-600 p-2">1 second</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 p-2">Phase unbalance</td>
                          <td className="border border-gray-600 p-2">5%</td>
                          <td className="border border-gray-600 p-2">3%</td>
                          <td className="border border-gray-600 p-2">10 seconds</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 p-2">Phase loss</td>
                          <td className="border border-gray-600 p-2">70% nominal</td>
                          <td className="border border-gray-600 p-2">80% (184V)</td>
                          <td className="border border-gray-600 p-2">2 seconds</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-green-400 mb-2">Advanced Voltage Monitoring Features</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>Voltage trend recording and analysis for preventive maintenance</li>
                    <li>Power quality assessment including THD and flicker</li>
                    <li>Remote monitoring integration with SCADA systems</li>
                    <li>Event logging with time stamps for fault analysis</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Power Quality Monitoring */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-orange-400" />
                Power Quality Monitoring and Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-orange-400 mb-2">Harmonic Distortion Monitoring</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>Total Harmonic Distortion (THD) measurement for voltage and current</li>
                    <li>Individual harmonic analysis up to 50th harmonic</li>
                    <li>Compliance monitoring against G5/4 and IEEE 519 standards</li>
                    <li>Trending and alarm systems for harmonic limit exceedance</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-orange-400 mb-2">Power Quality Parameters</h4>
                  <div className="space-y-3">
                    <div className="bg-gray-800 p-3 rounded">
                      <h5 className="font-medium text-orange-300 mb-2">Voltage Quality Metrics</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Voltage variation: ±10% limits for charging equipment</li>
                        <li>• Flicker severity: P99 &lt; 1.0 for lighting compatibility</li>
                        <li>• Frequency variation: ±1% (49.5-50.5Hz)</li>
                        <li>• Voltage unbalance: &lt;2% for three-phase loads</li>
                      </ul>
                    </div>
                    <div className="bg-gray-800 p-3 rounded">
                      <h5 className="font-medium text-purple-300 mb-2">Current Quality Assessment</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Current THD limits: &lt;8% at nominal power</li>
                        <li>• Individual harmonic limits per IEC 61851</li>
                        <li>• DC component measurement (&lt;6mA)</li>
                        <li>• Inrush current characterisation</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-purple-400 mb-2">EV Charging Specific Monitoring</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-600 text-sm">
                      <thead>
                        <tr className="bg-gray-800">
                          <th className="border border-gray-600 p-2 text-left">Parameter</th>
                          <th className="border border-gray-600 p-2 text-left">Standard Limit</th>
                          <th className="border border-gray-600 p-2 text-left">Monitoring Threshold</th>
                          <th className="border border-gray-600 p-2 text-left">Action Required</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-600 p-2">Voltage THD</td>
                          <td className="border border-gray-600 p-2">&lt;8%</td>
                          <td className="border border-gray-600 p-2">6%</td>
                          <td className="border border-gray-600 p-2">Investigation required</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 p-2">Current THD</td>
                          <td className="border border-gray-600 p-2">&lt;8%</td>
                          <td className="border border-gray-600 p-2">6%</td>
                          <td className="border border-gray-600 p-2">Filter assessment</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 p-2">DC injection</td>
                          <td className="border border-gray-600 p-2">&lt;6mA</td>
                          <td className="border border-gray-600 p-2">4mA</td>
                          <td className="border border-gray-600 p-2">Equipment check</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 p-2">Power factor</td>
                          <td className="border border-gray-600 p-2">&gt;0.85</td>
                          <td className="border border-gray-600 p-2">0.90</td>
                          <td className="border border-gray-600 p-2">Optimisation review</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-purple-400 mb-2">Data Logging and Reporting</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>Continuous data logging with configurable sample rates</li>
                    <li>Automated report generation for regulatory compliance</li>
                    <li>Trend analysis for predictive maintenance planning</li>
                    <li>Integration with energy management systems</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Intelligent Protection Systems */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-orange-400" />
                Intelligent Protection and Control Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-orange-400 mb-2">Multifunction Digital Relays</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>Combined overcurrent, earth fault, and voltage protection</li>
                    <li>Programmable logic for complex protection schemes</li>
                    <li>Communication protocols (Modbus, IEC 61850, DNP3)</li>
                    <li>Integrated monitoring and control functions</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-orange-400 mb-2">Arc Fault Detection Systems</h4>
                  <div className="space-y-3">
                    <div className="bg-gray-800 p-3 rounded">
                      <h5 className="font-medium text-orange-300 mb-2">Detection Technologies</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Light-based arc detection for rapid response (&lt;2ms)</li>
                        <li>• Current signature analysis for series arc faults</li>
                        <li>• Combined light and current detection for selectivity</li>
                        <li>• Integration with charging point safety systems</li>
                      </ul>
                    </div>
                    <div className="bg-gray-800 p-3 rounded">
                      <h5 className="font-medium text-orange-300 mb-2">Application Considerations</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Essential for DC charging installations</li>
                        <li>• Required in enclosed charging equipment</li>
                        <li>• Coordination with fire suppression systems</li>
                        <li>• Remote monitoring and alarm integration</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-orange-400 mb-2">Load Management Integration</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-600 text-sm">
                      <thead>
                        <tr className="bg-gray-800">
                          <th className="border border-gray-600 p-2 text-left">Function</th>
                          <th className="border border-gray-600 p-2 text-left">Monitoring Input</th>
                          <th className="border border-gray-600 p-2 text-left">Control Output</th>
                          <th className="border border-gray-600 p-2 text-left">Response Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-600 p-2">Peak demand control</td>
                          <td className="border border-gray-600 p-2">Power measurement</td>
                          <td className="border border-gray-600 p-2">Load shedding</td>
                          <td className="border border-gray-600 p-2">1 second</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 p-2">Voltage regulation</td>
                          <td className="border border-gray-600 p-2">Phase voltages</td>
                          <td className="border border-gray-600 p-2">Tap changing</td>
                          <td className="border border-gray-600 p-2">30 seconds</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 p-2">Frequency response</td>
                          <td className="border border-gray-600 p-2">System frequency</td>
                          <td className="border border-gray-600 p-2">Load reduction</td>
                          <td className="border border-gray-600 p-2">200ms</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 p-2">Harmonic management</td>
                          <td className="border border-gray-600 p-2">THD measurement</td>
                          <td className="border border-gray-600 p-2">Filter switching</td>
                          <td className="border border-gray-600 p-2">5 seconds</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-orange-400 mb-2">Cybersecurity Considerations</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>Secure communication protocols with encryption</li>
                    <li>Regular firmware updates and security patches</li>
                    <li>Network segmentation and access control</li>
                    <li>Audit trails and event logging for security monitoring</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Practical Implementation */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-cyan-400" />
                Practical Implementation and Maintenance
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-cyan-400 mb-3">Installation Example: Smart Commercial Charging Hub</h4>
                  <div className="bg-gray-800 p-4 rounded-lg space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-cyan-300 mb-2">Monitoring Infrastructure</h5>
                        <ul className="text-sm space-y-1">
                          <li>• 20 charging points with individual CT monitoring</li>
                          <li>• Main incomer power quality analyser</li>
                          <li>• Distributed voltage monitoring relays</li>
                          <li>• Central monitoring and control system</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-cyan-300 mb-2">Advanced Features</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Predictive maintenance algorithms</li>
                          <li>• Dynamic load balancing based on demand</li>
                          <li>• Integration with renewable energy sources</li>
                          <li>• Remote diagnostics and support</li>
                        </ul>
                      </div>
                    </div>
                    <div>
                      <h5 className="font-medium text-cyan-300 mb-2">ROI and Benefits</h5>
                      <p className="text-sm">
                        Advanced monitoring reduces maintenance costs by 30%, improves uptime to 99.5%, and enables 
                        15% energy savings through optimisation. Payback period typically 3-4 years for commercial installations.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-cyan-400 mb-2">Commissioning and Testing Procedures</h4>
                  <div className="space-y-3">
                    <div className="bg-gray-800 p-3 rounded">
                      <h5 className="font-medium text-cyan-300 mb-2">Initial Commissioning</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Verify CT polarity and ratio using primary injection</li>
                        <li>• Test all protection relay functions and settings</li>
                        <li>• Commission communication links and protocols</li>
                        <li>• Validate integration with charge point controllers</li>
                      </ul>
                    </div>
                    <div className="bg-gray-800 p-3 rounded">
                      <h5 className="font-medium text-cyan-300 mb-2">Periodic Testing Schedule</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Monthly: Visual inspection and alarm testing</li>
                        <li>• Quarterly: Communication link verification</li>
                        <li>• Annually: Full functional testing and calibration</li>
                        <li>• Bi-annually: Firmware updates and security assessment</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-cyan-400 mb-2">Documentation and Compliance</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>As-built drawings showing all monitoring equipment locations</li>
                    <li>Setting schedules and protection coordination studies</li>
                    <li>Commissioning test certificates and calibration records</li>
                    <li>Maintenance procedures and spare parts schedules</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <EVChargingModule4Section3Quiz />

          {/* Navigation */}
          <div className="flex justify-between items-center pt-8">
            <Link to="../ev-charging-module-4-section-2">
              <Button variant="outline" className="bg-card border-gray-600 text-white hover:bg-gray-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../ev-charging-module-4-section-4">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
                Next Section
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
};

export default EVChargingModule4Section3;