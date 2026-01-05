import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, AlertCircle, CheckCircle, Wrench } from 'lucide-react';

export const BMSModule5Section6ContentPart3 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Clock className="h-5 w-5 text-elec-yellow" />
          Latency Management
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <p>
          Latency is the delay between sending a message and receiving a response. In BMS, high latency means commands take too long to action — e.g., a damper taking 10 seconds to respond to a fire alarm signal. Understanding and managing latency is critical for safe and efficient building operation.
        </p>

        <div className="bg-red-600/20 border border-red-600/40 rounded-lg p-4 mb-6">
          <p className="text-red-100 font-medium">
            <strong>Safety Critical:</strong> High latency in life safety systems can mean the difference between a successful evacuation and a disaster. Fire dampers must respond within seconds, not minutes. BS EN 54 requires fire safety system response times under 10 seconds.
          </p>
        </div>

        <h3 className="text-xl font-semibold text-foreground mb-4">Understanding Latency Components</h3>

        <div className="bg-elec-dark p-6 rounded-lg border border-gray-600 mb-6">
          <h4 className="font-semibold text-yellow-300 text-lg mb-4">Total System Latency Breakdown</h4>
          <p className="text-gray-300 mb-4">
            Total system latency is the sum of multiple components. Understanding each helps identify where improvements can be made:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded">
                <p className="font-medium text-blue-200">1. Network Access Time</p>
                <ul className="text-sm text-blue-100 mt-2 space-y-1">
                  <li>• Time to gain network access (token passing)</li>
                  <li>• BACnet MSTP: 5-50ms per device in token rotation</li>
                  <li>• Modbus RTU: Master polling cycle time</li>
                  <li>• Increases linearly with device count</li>
                </ul>
              </div>
              
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded">
                <p className="font-medium text-green-200">2. Transmission Time</p>
                <ul className="text-sm text-green-100 mt-2 space-y-1">
                  <li>• Physical transmission of data packets</li>
                  <li>• Depends on baud rate and message size</li>
                  <li>• 9600 baud: ~1ms per 10 characters</li>
                  <li>• Usually smallest component</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded">
                <p className="font-medium text-orange-200">3. Processing Time</p>
                <ul className="text-sm text-orange-100 mt-2 space-y-1">
                  <li>• Device CPU processing of commands</li>
                  <li>• Database lookups and calculations</li>
                  <li>• Typically 5-20ms for simple devices</li>
                  <li>• Can be 100ms+ for complex controllers</li>
                </ul>
              </div>
              
              <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded">
                <p className="font-medium text-purple-200">4. Physical Response Time</p>
                <ul className="text-sm text-purple-100 mt-2 space-y-1">
                  <li>• Actuator movement time</li>
                  <li>• Damper operation: 15-90 seconds typical</li>
                  <li>• Valve operation: 30-300 seconds typical</li>
                  <li>• Often the largest component</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-foreground mb-4">Detailed Latency Analysis</h3>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Root Causes */}
          <div className="bg-elec-dark p-5 rounded-lg border border-gray-600">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="h-6 w-6 text-red-400" />
              <h4 className="font-semibold text-red-300 text-lg">Root Causes Analysis</h4>
            </div>
            <div className="space-y-4">
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded">
                <p className="font-medium text-red-200">Network Overloading</p>
                <p className="text-sm text-red-100 mb-2">Mathematical relationship between devices and latency:</p>
                <div className="bg-red-400/10 rounded p-2">
                  <p className="font-mono text-red-100 text-xs">Latency = N × (Token_Time + Processing_Time)</p>
                  <p className="text-xs text-red-100 mt-1">Where N = device count on segment</p>
                </div>
                <ul className="text-xs text-red-100 mt-2 space-y-1">
                  <li>• 25 devices: ~1.25 second cycle time</li>
                  <li>• 50 devices: ~2.5 second cycle time</li>
                  <li>• 100 devices: ~5 second cycle time</li>
                </ul>
              </div>
              
              <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded">
                <p className="font-medium text-orange-200">Electromagnetic Interference (EMI)</p>
                <ul className="text-sm text-orange-100 mt-2 space-y-1">
                  <li>• VSDs create harmonics that corrupt data</li>
                  <li>• Unshielded cables act as aerials</li>
                  <li>• Fluorescent lights cause data errors</li>
                  <li>• Corrupted packets require retransmission</li>
                  <li>• Each retry adds 50-200ms delay</li>
                </ul>
              </div>
              
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded">
                <p className="font-medium text-yellow-200">Network Infrastructure Issues</p>
                <ul className="text-sm text-yellow-100 mt-2 space-y-1">
                  <li>• Shared bandwidth with IT traffic</li>
                  <li>• Low-priority queue for BMS data</li>
                  <li>• Switch buffer overflow during peaks</li>
                  <li>• Inadequate Quality of Service (QoS) policies</li>
                  <li>• Broadcast storms affecting performance</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Engineering Solutions */}
          <div className="bg-elec-dark p-5 rounded-lg border border-gray-600">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="h-6 w-6 text-green-400" />
              <h4 className="font-semibold text-green-300 text-lg">Engineering Solutions</h4>
            </div>
            <div className="space-y-4">
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded">
                <p className="font-medium text-green-200">Segment Size Optimisation</p>
                <ul className="text-sm text-green-100 mt-2 space-y-1">
                  <li>• Apply 75% rule: Max 24 devices on Modbus RTU (32 limit)</li>
                  <li>• Max 95 devices on BACnet MSTP (127 limit)</li>
                  <li>• Critical systems: Max 16 devices per segment</li>
                  <li>• Monitor actual cycle times during commissioning</li>
                  <li>• Use protocol analysers to verify performance</li>
                </ul>
              </div>
              
              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded">
                <p className="font-medium text-blue-200">Advanced Network Hardware</p>
                <ul className="text-sm text-blue-100 mt-2 space-y-1">
                  <li>• BACnet/IP routers with priority queues</li>
                  <li>• Managed Ethernet switches with QoS</li>
                  <li>• Dedicated VLANs for BMS traffic</li>
                  <li>• Bandwidth allocation and traffic shaping</li>
                  <li>• Redundant network paths for critical systems</li>
                </ul>
              </div>
              
              <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded">
                <p className="font-medium text-purple-200">Installation Best Practices</p>
                <ul className="text-sm text-purple-100 mt-2 space-y-1">
                  <li>• Separate cable trays: 300mm minimum from power</li>
                  <li>• Shielded twisted pair for all RS-485 installations</li>
                  <li>• Proper earthing of cable shields at one end only</li>
                  <li>• EMC filters near VSDs and motor starters</li>
                  <li>• Star-quad cable in high-noise environments</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-foreground mb-4">Latency Requirements by Application</h3>

        <div className="bg-elec-dark p-6 rounded-lg border border-gray-600 mb-6">
          <h4 className="font-semibold text-blue-300 text-lg mb-4">Professional Latency Standards</h4>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded">
              <h5 className="font-medium text-red-200 mb-2">Life Safety Systems</h5>
              <div className="space-y-2">
                <div className="text-sm">
                  <p className="font-medium text-red-100">Target: &lt;100ms</p>
                  <p className="text-xs text-red-100">BS EN 54 compliant</p>
                </div>
                <ul className="text-xs text-red-100 space-y-1">
                  <li>• Fire damper control</li>
                  <li>• Smoke extract fans</li>
                  <li>• Emergency ventilation</li>
                  <li>• Access control integration</li>
                </ul>
              </div>
            </div>
            
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded">
              <h5 className="font-medium text-yellow-200 mb-2">HVAC Control Systems</h5>
              <div className="space-y-2">
                <div className="text-sm">
                  <p className="font-medium text-yellow-100">Target: &lt;500ms</p>
                  <p className="text-xs text-yellow-100">CIBSE Guide H</p>
                </div>
                <ul className="text-xs text-yellow-100 space-y-1">
                  <li>• Temperature control loops</li>
                  <li>• VAV damper control</li>
                  <li>• Fan speed control</li>
                  <li>• Lighting integration</li>
                </ul>
              </div>
            </div>
            
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded">
              <h5 className="font-medium text-green-200 mb-2">Monitoring & Reporting</h5>
              <div className="space-y-2">
                <div className="text-sm">
                  <p className="font-medium text-green-100">Target: &lt;2 seconds</p>
                  <p className="text-xs text-green-100">User experience</p>
                </div>
                <ul className="text-xs text-green-100 space-y-1">
                  <li>• Energy monitoring</li>
                  <li>• Trend data collection</li>
                  <li>• Alarm acknowledgment</li>
                  <li>• Remote system access</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-foreground mb-4">Latency Testing and Verification</h3>

        <div className="bg-elec-dark p-6 rounded-lg border border-gray-600">
          <h4 className="font-semibold text-orange-300 text-lg mb-4">Professional Testing Methodology</h4>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-medium text-orange-200 mb-3">Testing Equipment Required:</h5>
              <ul className="text-sm text-orange-100 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 mt-1">•</span>
                  <span><strong>Protocol Analyser:</strong> Wireshark for Ethernet, dedicated tools for serial protocols</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 mt-1">•</span>
                  <span><strong>Network Tester:</strong> Fluke Networks or similar for cable testing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 mt-1">•</span>
                  <span><strong>Oscilloscope:</strong> For signal quality analysis on RS-485</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 mt-1">•</span>
                  <span><strong>BMS Software:</strong> Built-in diagnostics and timing tools</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-medium text-orange-200 mb-3">Test Procedures:</h5>
              <ol className="text-sm text-orange-100 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 font-bold">1.</span>
                  <span><strong>Baseline Testing:</strong> Measure response times with minimal load</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 font-bold">2.</span>
                  <span><strong>Load Testing:</strong> Add devices gradually, measure impact</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 font-bold">3.</span>
                  <span><strong>Stress Testing:</strong> Maximum load with multiple simultaneous commands</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 font-bold">4.</span>
                  <span><strong>EMI Testing:</strong> Measure performance near noise sources</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 font-bold">5.</span>
                  <span><strong>Documentation:</strong> Record all results for commissioning report</span>
                </li>
              </ol>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded">
            <p className="font-medium text-blue-200">Acceptance Criteria:</p>
            <p className="text-sm text-blue-100 mt-1">
              95% of commands must meet target latency under normal operating conditions. 
              100% must meet safety requirements under all conditions including single point failures.
            </p>
          </div>
        </div>

        <div className="bg-elec-dark p-5 rounded-lg border border-gray-600">
          <div className="flex items-center gap-3 mb-4">
            <Wrench className="h-6 w-6 text-yellow-400" />
            <h4 className="font-semibold text-yellow-300 text-lg">Acceptable Latency Targets</h4>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-3 bg-green-500/10 border border-green-500/20 rounded">
              <p className="font-medium text-green-200">General BMS</p>
              <p className="text-sm text-green-100">Under 1 second for most functions</p>
            </div>
            <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded">
              <p className="font-medium text-yellow-200">HVAC Control</p>
              <p className="text-sm text-yellow-100">Under 500ms for comfort systems</p>
            </div>
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded">
              <p className="font-medium text-red-200">Life Safety</p>
              <p className="text-sm text-red-100">Under 100ms for fire/security systems</p>
            </div>
          </div>
        </div>

        <div className="bg-orange-600/20 border border-orange-600/40 rounded-lg p-4">
          <p className="text-orange-100 font-medium">
            <strong>Commissioning Tip:</strong> Always test response times with a protocol analyser during commissioning. Don't rely on "it seems to work" — measure actual latency and document the results.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};