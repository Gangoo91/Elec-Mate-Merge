import { ArrowLeft, ArrowRight, AlertTriangle, BookOpen, Target, Zap, Shield, CheckCircle, Lightbulb, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { EVChargingModule4Section2Quiz } from '@/components/upskilling/quiz/EVChargingModule4Section2Quiz';

const EVChargingModule4Section2 = () => {
  useEffect(() => {
    document.title = 'Open PEN Fault Protection Methods - EV Charging Module 4 Section 2';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn protection methods against open PEN conductor faults in EV charging installations. Covers detection systems, mitigation strategies, and BS 7671 compliance.');
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
            <AlertTriangle className="h-8 w-8 text-yellow-400" />
            <Badge 
              variant="secondary" 
              className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 4 - Section 2
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Open PEN Fault Protection Methods
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Protecting against open PEN conductor faults in EV charging installations with advanced detection and mitigation systems
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
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
                Open PEN (Protective Earth and Neutral) faults represent one of the most serious electrical hazards in EV charging installations using TN-C-S earthing systems. When the combined PEN conductor breaks or becomes disconnected, dangerous voltages can appear on exposed metalwork, creating severe shock and fire risks.
              </p>
              <p>
                This section covers the detection, protection, and mitigation methods required to maintain safety during open PEN fault conditions. Understanding these protection systems is essential for designing compliant EV charging installations that meet BS 7671 requirements and ensure user safety.
              </p>
              <p>
                Modern protection methods include voltage monitoring relays, current monitoring systems, and earth electrode switching arrangements that provide comprehensive protection against open PEN conductor failures whilst maintaining operational continuity.
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
                <li>Identify the causes and consequences of open PEN conductor faults</li>
                <li>Specify appropriate protection devices for open PEN fault detection</li>
                <li>Design voltage monitoring systems for EV charging installations</li>
                <li>Implement current-based protection methods and earth switching systems</li>
                <li>Apply BS 7671 requirements for PEN conductor protection</li>
                <li>Coordinate protection systems with existing earthing arrangements</li>
              </ul>
            </CardContent>
          </Card>

          {/* Understanding Open PEN Faults */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-400" />
                Understanding Open PEN Faults
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-red-400 mb-2">Fault Mechanisms and Causes</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>Overhead line conductor failure due to weather or vehicle impact</li>
                    <li>Underground cable damage from excavation or corrosion</li>
                    <li>Joint failure in distribution networks or service connections</li>
                    <li>Deliberate disconnection during network maintenance</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-red-400 mb-2">Voltage Rise Consequences</h4>
                  <div className="bg-gray-800 p-4 rounded-lg space-y-3">
                    <h5 className="font-medium text-red-300 mb-2">Voltage Distribution During Open PEN</h5>
                    <div className="text-sm space-y-2">
                      <p><strong>Normal Operation:</strong> Installation earth at 0V (referenced to supply neutral)</p>
                      <p><strong>Open PEN Condition:</strong> Installation earth rises to dangerous potentials</p>
                      <p><strong>Worst Case:</strong> Up to 230V on exposed metalwork relative to true earth</p>
                      <p><strong>Load Dependent:</strong> Voltage rise depends on installation load balance</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-red-400 mb-2">Safety Implications</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-600 text-sm">
                      <thead>
                        <tr className="bg-gray-800">
                          <th className="border border-gray-600 p-2 text-left">Hazard Type</th>
                          <th className="border border-gray-600 p-2 text-left">Risk Level</th>
                          <th className="border border-gray-600 p-2 text-left">Potential Consequences</th>
                          <th className="border border-gray-600 p-2 text-left">Protection Required</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-600 p-2">Electric shock</td>
                          <td className="border border-gray-600 p-2 text-red-400">Critical</td>
                          <td className="border border-gray-600 p-2">Fatal injury from touch voltage</td>
                          <td className="border border-gray-600 p-2">Voltage monitoring</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 p-2">Equipment damage</td>
                          <td className="border border-gray-600 p-2 text-orange-400">High</td>
                          <td className="border border-gray-600 p-2">Insulation failure, component damage</td>
                          <td className="border border-gray-600 p-2">Fast disconnection</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 p-2">Fire risk</td>
                          <td className="border border-gray-600 p-2 text-orange-400">High</td>
                          <td className="border border-gray-600 p-2">Arcing, overheating, ignition</td>
                          <td className="border border-gray-600 p-2">Current monitoring</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 p-2">Vehicle damage</td>
                          <td className="border border-gray-600 p-2 text-yellow-400">Medium</td>
                          <td className="border border-gray-600 p-2">Battery system damage</td>
                          <td className="border border-gray-600 p-2">Isolation systems</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-red-400 mb-2">Detection Challenges</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>Fault may not trip conventional protective devices</li>
                    <li>Installation continues to operate normally in many cases</li>
                    <li>Dangerous voltages may persist for extended periods</li>
                    <li>Users may be unaware of the hazardous condition</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Voltage Monitoring Protection */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                Voltage Monitoring Protection Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-yellow-400 mb-2">Voltage Monitoring Relay (VMR) Operation</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>Continuous monitoring of neutral-earth voltage difference</li>
                    <li>Trip threshold typically set at 50V (adjustable 25-70V)</li>
                    <li>Fast response time: typically &lt;40ms for safety critical applications</li>
                    <li>Automatic reconnection when fault clears (with time delay)</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-yellow-400 mb-2">VMR System Components</h4>
                  <div className="space-y-3">
                    <div className="bg-gray-800 p-3 rounded">
                      <h5 className="font-medium text-blue-300 mb-2">Monitoring Circuit</h5>
                      <ul className="text-sm space-y-1">
                        <li>• High impedance voltage measurement (typically 1MΩ)</li>
                        <li>• Isolated measurement to prevent nuisance tripping</li>
                        <li>• Built-in filtering for transient immunity</li>
                        <li>• LED indication for status monitoring</li>
                      </ul>
                    </div>
                    <div className="bg-gray-800 p-3 rounded">
                      <h5 className="font-medium text-blue-300 mb-2">Switching Circuit</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Contactor control for main circuit isolation</li>
                        <li>• Earth changeover switching capability</li>
                        <li>• Auxiliary contacts for alarm and monitoring</li>
                        <li>• Manual override and test facilities</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-yellow-400 mb-2">Installation Requirements</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-600 text-sm">
                      <thead>
                        <tr className="bg-gray-800">
                          <th className="border border-gray-600 p-2 text-left">Parameter</th>
                          <th className="border border-gray-600 p-2 text-left">Standard Setting</th>
                          <th className="border border-gray-600 p-2 text-left">EV Charging Setting</th>
                          <th className="border border-gray-600 p-2 text-left">Rationale</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-600 p-2">Trip voltage</td>
                          <td className="border border-gray-600 p-2">50V</td>
                          <td className="border border-gray-600 p-2">35-50V</td>
                          <td className="border border-gray-600 p-2">Enhanced safety for outdoor use</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 p-2">Trip time</td>
                          <td className="border border-gray-600 p-2">1 second</td>
                          <td className="border border-gray-600 p-2">40ms</td>
                          <td className="border border-gray-600 p-2">Fast disconnection for touch safety</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 p-2">Reconnect delay</td>
                          <td className="border border-gray-600 p-2">30 seconds</td>
                          <td className="border border-gray-600 p-2">3 minutes</td>
                          <td className="border border-gray-600 p-2">Prevent cycling on intermittent faults</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 p-2">Test facility</td>
                          <td className="border border-gray-600 p-2">Manual only</td>
                          <td className="border border-gray-600 p-2">Automatic + Manual</td>
                          <td className="border border-gray-600 p-2">Regular system verification</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-yellow-400 mb-2">Connection and Wiring</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>Sensing connections to neutral and earth terminals in main panel</li>
                    <li>Separate control circuit isolated from main power circuits</li>
                    <li>Direct connection to earth electrode where fitted</li>
                    <li>Integration with charge point control and safety systems</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current-Based Protection */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-400" />
                Current-Based Protection Methods
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-green-400 mb-2">Neutral Current Monitoring</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>Current transformer monitoring of neutral conductor</li>
                    <li>Detection of abnormal neutral current flow patterns</li>
                    <li>Discrimination between normal load imbalance and fault conditions</li>
                    <li>Integration with smart charging systems for load management</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-green-400 mb-2">Earth Fault Current Detection</h4>
                  <div className="space-y-3">
                    <div className="bg-gray-800 p-3 rounded">
                      <h5 className="font-medium text-green-300 mb-2">Residual Current Monitoring</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Core balance current transformers on main supply</li>
                        <li>• Sensitive detection of earth fault currents (&gt;10mA)</li>
                        <li>• Directional discrimination for selective protection</li>
                        <li>• Time-graded coordination with downstream RCDs</li>
                      </ul>
                    </div>
                    <div className="bg-gray-800 p-3 rounded">
                      <h5 className="font-medium text-green-300 mb-2">Active Current Monitoring</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Continuous measurement of earth electrode current</li>
                        <li>• Detection of abnormal earth current flow</li>
                        <li>• Alarm and protection trip coordination</li>
                        <li>• Data logging for fault analysis and reporting</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-green-400 mb-2">Protection Coordination</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-600 text-sm">
                      <thead>
                        <tr className="bg-gray-800">
                          <th className="border border-gray-600 p-2 text-left">Protection Level</th>
                          <th className="border border-gray-600 p-2 text-left">Detection Method</th>
                          <th className="border border-gray-600 p-2 text-left">Trip Time</th>
                          <th className="border border-gray-600 p-2 text-left">Application</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-600 p-2">Primary (VMR)</td>
                          <td className="border border-gray-600 p-2">Voltage monitoring</td>
                          <td className="border border-gray-600 p-2">40ms</td>
                          <td className="border border-gray-600 p-2">Immediate safety protection</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 p-2">Secondary (Current)</td>
                          <td className="border border-gray-600 p-2">Neutral current</td>
                          <td className="border border-gray-600 p-2">200ms</td>
                          <td className="border border-gray-600 p-2">Backup voltage protection</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 p-2">Tertiary (RCD)</td>
                          <td className="border border-gray-600 p-2">Earth leakage</td>
                          <td className="border border-gray-600 p-2">300ms</td>
                          <td className="border border-gray-600 p-2">Final protection level</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 p-2">Alarm only</td>
                          <td className="border border-gray-600 p-2">Earth current trend</td>
                          <td className="border border-gray-600 p-2">N/A</td>
                          <td className="border border-gray-600 p-2">Preventive maintenance</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-green-400 mb-2">Implementation Considerations</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>Coordination with charge point communication systems</li>
                    <li>Integration with building management and monitoring systems</li>
                    <li>Remote monitoring and diagnostic capabilities</li>
                    <li>Maintenance access and test procedures</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real-World Examples */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Eye className="h-5 w-5 text-cyan-400" />
                Real-World Case Studies
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <div className="space-y-6">
                <div className="border-l-4 border-cyan-400 pl-4 bg-gray-800 p-4 rounded-r">
                  <h4 className="font-semibold text-cyan-400 mb-2">Case Study 1: Motorway Service Station</h4>
                  <div className="space-y-3">
                    <p><strong>Situation:</strong> 22kW rapid chargers installed at remote motorway services with unreliable TN-C-S supply</p>
                    <p><strong>Challenge:</strong> Frequent PEN conductor issues due to overhead line exposure to weather</p>
                    <p><strong>Solution:</strong> Implemented automatic earth changeover with 15Ω earth electrode and VMR set to 35V/40ms</p>
                    <p><strong>Outcome:</strong> Zero safety incidents, 99.8% uptime maintained during network faults</p>
                  </div>
                </div>
                
                <div className="border-l-4 border-cyan-400 pl-4 bg-gray-800 p-4 rounded-r">
                  <h4 className="font-semibold text-cyan-400 mb-2">Case Study 2: Urban Car Park</h4>
                  <div className="space-y-3">
                    <p><strong>Situation:</strong> Multiple 7kW charge points in underground car park</p>
                    <p><strong>Challenge:</strong> Limited space for earth electrodes, high earth resistance</p>
                    <p><strong>Solution:</strong> Current-based protection with smart load management to reduce neutral current</p>
                    <p><strong>Outcome:</strong> Successful detection of two PEN faults, prevented equipment damage</p>
                  </div>
                </div>
                
                <div className="border-l-4 border-cyan-400 pl-4 bg-gray-800 p-4 rounded-r">
                  <h4 className="font-semibold text-cyan-400 mb-2">Case Study 3: Industrial Site</h4>
                  <div className="space-y-3">
                    <p><strong>Situation:</strong> Fleet charging for delivery vehicles, high-power DC chargers</p>
                    <p><strong>Challenge:</strong> Integration with existing site earthing system</p>
                    <p><strong>Solution:</strong> Coordinated protection with existing systems, selective VMR settings</p>
                    <p><strong>Outcome:</strong> Seamless integration, no interference with plant operations</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQs Section */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-amber-400" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-4">
                <div className="border border-gray-600 rounded-lg p-4">
                  <h4 className="font-semibold text-amber-400 mb-2">Q: Why is 50V the typical VMR trip setting?</h4>
                  <p className="text-sm">A: 50V is considered the maximum safe touch voltage for general applications. For EV charging, lower settings (35-50V) are preferred due to outdoor installation and higher exposure risks.</p>
                </div>
                
                <div className="border border-gray-600 rounded-lg p-4">
                  <h4 className="font-semibold text-amber-400 mb-2">Q: Can I use existing earth electrodes for PEN protection?</h4>
                  <p className="text-sm">A: Yes, but they must meet resistance requirements (&lt;200Ω for 30mA RCD protection). Additional electrodes may be needed to achieve adequate performance.</p>
                </div>
                
                <div className="border border-gray-600 rounded-lg p-4">
                  <h4 className="font-semibold text-amber-400 mb-2">Q: What happens during VMR testing?</h4>
                  <p className="text-sm">A: The VMR should trip within the set time when test voltage is applied. Manual and automatic test functions verify correct operation without affecting the installation.</p>
                </div>
                
                <div className="border border-gray-600 rounded-lg p-4">
                  <h4 className="font-semibold text-amber-400 mb-2">Q: How often should PEN protection be tested?</h4>
                  <p className="text-sm">A: Monthly automatic tests plus annual manual verification. More frequent testing may be required in high-risk environments or critical applications.</p>
                </div>
                
                <div className="border border-gray-600 rounded-lg p-4">
                  <h4 className="font-semibold text-amber-400 mb-2">Q: Do I need PEN protection for every charge point?</h4>
                  <p className="text-sm">A: Not necessarily. A single system can protect multiple charge points on the same supply, but consider selective protection for large installations.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Earth Switching Systems */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-orange-400" />
                Earth Switching and Changeover Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-orange-400 mb-2">Automatic Earth Changeover</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>Switching from TN-C-S to TT system during PEN fault</li>
                    <li>Pre-installed earth electrode activated automatically</li>
                    <li>Contactor-based switching with position indication</li>
                    <li>Manual override capability for testing and maintenance</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-purple-400 mb-2">System Architecture</h4>
                  <div className="space-y-3">
                    <div className="bg-gray-800 p-4 rounded">
                      <h5 className="font-medium text-purple-300 mb-2">Normal Operation (TN-C-S Mode)</h5>
                      <div className="text-sm space-y-2">
                        <p><strong>Earth Connection:</strong> Installation earth connected to DNO PEN</p>
                        <p><strong>Protection:</strong> Standard TN system protection (MCB + RCD)</p>
                        <p><strong>Earth Electrode:</strong> Isolated and monitored</p>
                        <p><strong>Fault Loop:</strong> Low impedance through DNO network</p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-800 p-4 rounded">
                      <h5 className="font-medium text-purple-300 mb-2">Fault Operation (TT Mode)</h5>
                      <div className="text-sm space-y-2">
                        <p><strong>Earth Connection:</strong> Switched to local earth electrode</p>
                        <p><strong>Protection:</strong> RCD protection mandatory (≤200Ω electrode)</p>
                        <p><strong>PEN Isolation:</strong> Complete isolation from faulty PEN</p>
                        <p><strong>Fault Loop:</strong> High impedance requiring RCD operation</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-purple-400 mb-2">Switching Sequence and Timing</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-600 text-sm">
                      <thead>
                        <tr className="bg-gray-800">
                          <th className="border border-gray-600 p-2 text-left">Time</th>
                          <th className="border border-gray-600 p-2 text-left">Event</th>
                          <th className="border border-gray-600 p-2 text-left">Action</th>
                          <th className="border border-gray-600 p-2 text-left">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-600 p-2">T+0ms</td>
                          <td className="border border-gray-600 p-2">PEN fault detected</td>
                          <td className="border border-gray-600 p-2">VMR initiates trip sequence</td>
                          <td className="border border-gray-600 p-2">System armed</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 p-2">T+40ms</td>
                          <td className="border border-gray-600 p-2">Main contactor opens</td>
                          <td className="border border-gray-600 p-2">Load disconnection</td>
                          <td className="border border-gray-600 p-2">Installation isolated</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 p-2">T+100ms</td>
                          <td className="border border-gray-600 p-2">Earth changeover</td>
                          <td className="border border-gray-600 p-2">Switch to TT electrode</td>
                          <td className="border border-gray-600 p-2">TT mode active</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 p-2">T+200ms</td>
                          <td className="border border-gray-600 p-2">System verification</td>
                          <td className="border border-gray-600 p-2">Check earth integrity</td>
                          <td className="border border-gray-600 p-2">Ready for reconnection</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-purple-400 mb-2">Design Requirements</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>Make-before-break earth switching to prevent momentary isolation</li>
                    <li>Mechanical interlocking to prevent simultaneous connection</li>
                    <li>Fail-safe operation with battery backup for control circuits</li>
                    <li>Position indication and remote monitoring capabilities</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Practical Implementation */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-orange-400" />
                Practical Implementation Examples
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-orange-400 mb-3">Example 1: Domestic Driveway Installation</h4>
                  <div className="bg-gray-800 p-4 rounded-lg space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-orange-300 mb-2">System Configuration</h5>
                        <ul className="text-sm space-y-1">
                          <li>• 7kW home charge point (32A, single phase)</li>
                          <li>• Existing TN-C-S supply with PME restrictions</li>
                          <li>• VMR protection with earth changeover</li>
                          <li>• 1.2m earth rod with 45Ω resistance</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-orange-300 mb-2">Protection Settings</h5>
                        <ul className="text-sm space-y-1">
                          <li>• VMR trip: 50V, 1-second delay</li>
                          <li>• RCD: 30mA Type A for socket protection</li>
                          <li>• MCB: 32A Type B for overcurrent</li>
                          <li>• Earth switching: Automatic with manual override</li>
                        </ul>
                      </div>
                    </div>
                    <div>
                      <h5 className="font-medium text-orange-300 mb-2">Cost-Benefit Analysis</h5>
                      <p className="text-sm">
                        Additional cost of £800-1,200 for VMR and earth electrode system vs. £25,000+ liability 
                        exposure and potential safety issues. ROI achieved through insurance compliance and enhanced safety.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-orange-400 mb-3">Example 2: Commercial Car Park (50 Charging Points)</h4>
                  <div className="bg-gray-800 p-4 rounded-lg space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-orange-300 mb-2">System Architecture</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Zone-based protection with 5 VMR units</li>
                          <li>• Central monitoring and control system</li>
                          <li>• Integrated earth electrode network</li>
                          <li>• Load management coordination</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-orange-300 mb-2">Advanced Features</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Predictive fault detection algorithms</li>
                          <li>• Remote diagnostics and maintenance alerts</li>
                          <li>• Integration with building management system</li>
                          <li>• Automatic fault reporting to DNO</li>
                        </ul>
                      </div>
                    </div>
                    <div>
                      <h5 className="font-medium text-orange-300 mb-2">Protection Coordination</h5>
                      <p className="text-sm">
                        Selective protection allows unaffected zones to continue operation during localised PEN faults. 
                        Fast fault clearing (&lt;100ms) minimises disruption and maintains service availability.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-orange-400 mb-2">Testing and Maintenance</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>Monthly automatic self-test sequences for VMR systems</li>
                    <li>Annual earth electrode resistance testing (BS 7430)</li>
                    <li>Coordination testing with upstream and downstream protection</li>
                    <li>Documentation and certification requirements</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <EVChargingModule4Section2Quiz />

          {/* Navigation */}
          <div className="flex justify-between items-center pt-8">
            <Link to="../ev-charging-module-4-section-1">
              <Button variant="outline" className="bg-card border-gray-600 text-white hover:bg-gray-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../ev-charging-module-4-section-3">
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

export default EVChargingModule4Section2;