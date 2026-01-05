import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Zap, Network, Lightbulb, Camera, FileText, Thermometer, Clock } from 'lucide-react';

export const BMSModule4Section3Content = () => {
  return (
    <div className="space-y-8">
      {/* Access Control in BMS */}
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Shield className="h-5 w-5 text-elec-yellow" />
            Access Control in a BMS
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-6">
          <p>
            Access control systems are designed to restrict or monitor movement through a building. When integrated with a Building Management System (BMS), they transform into intelligent security and operational tools that go far beyond simple door unlocking.
          </p>

          <p>
            Modern access control systems can interface with virtually every building system, creating a cohesive ecosystem that responds intelligently to occupancy patterns, security threats, and operational requirements.
          </p>

          {/* Mobile-Friendly Integration Cards */}
          <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
            <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 border border-green-600/40 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <Lightbulb className="h-6 w-6 text-green-400" />
                <h4 className="font-semibold text-green-300">Energy Management Integration</h4>
              </div>
              <div className="space-y-2 text-sm">
                <p><strong>Function:</strong> Lighting and HVAC activation based on occupancy</p>
                <p><strong>Benefit:</strong> Reduces energy consumption by up to 30% in commercial buildings</p>
                <p><strong>Example:</strong> Badge-in triggers floor lighting, HVAC setpoint adjustment, and desk lamp activation</p>
                <p><strong>Advanced Feature:</strong> Predictive pre-conditioning based on calendar integration</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-900/30 to-red-800/20 border border-red-600/40 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <Camera className="h-6 w-6 text-red-400" />
                <h4 className="font-semibold text-red-300">Security Integration</h4>
              </div>
              <div className="space-y-2 text-sm">
                <p><strong>Function:</strong> Automated alarm and CCTV triggering</p>
                <p><strong>Benefit:</strong> Enhanced security response and evidence collection</p>
                <p><strong>Example:</strong> Unauthorised access attempts trigger recording and security alerts</p>
                <p><strong>Advanced Feature:</strong> Facial recognition correlation with access card data</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 border border-blue-600/40 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <FileText className="h-6 w-6 text-blue-400" />
                <h4 className="font-semibold text-blue-300">Audit Trails & Compliance</h4>
              </div>
              <div className="space-y-2 text-sm">
                <p><strong>Function:</strong> Comprehensive access logging and reporting</p>
                <p><strong>Benefit:</strong> Ensures compliance and supports investigations</p>
                <p><strong>Example:</strong> Detailed reports showing who entered when for security reviews</p>
                <p><strong>Advanced Feature:</strong> Real-time compliance monitoring and automatic alerts</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 border border-purple-600/40 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="h-6 w-6 text-purple-400" />
                <h4 className="font-semibold text-purple-300">Time & Attendance</h4>
              </div>
              <div className="space-y-2 text-sm">
                <p><strong>Function:</strong> Badge swipes double as time tracking</p>
                <p><strong>Benefit:</strong> Eliminates separate clocking systems</p>
                <p><strong>Example:</strong> First badge-in of the day starts timesheet, last badge-out ends it</p>
                <p><strong>Advanced Feature:</strong> Integration with payroll and HR systems</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-600/20 border border-blue-600/40 rounded-lg p-4">
            <p className="text-blue-100">
              <strong>Real-world scenario:</strong> A pharmaceutical office uses integrated access control where employee badge-in triggers: floor lighting to 80%, HVAC to occupied mode, desk booking system activation, and security camera recording. If someone attempts unauthorised access, the system immediately alerts security and increases lighting to 100% for better visibility.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Door Relays and Locking */}
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Zap className="h-5 w-5 text-elec-yellow" />
            Door Relays and Locking Mechanisms
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-6">
          <p>
            Door relays are the critical interface between electronic access control and physical security. They receive low-voltage control signals from card readers or the BMS and switch higher-power circuits that operate locks, strikes, and other security hardware.
          </p>

          <p>
            Understanding the different types of locking mechanisms and their failure modes is essential for both security and life safety compliance.
          </p>

          {/* Enhanced Lock Types Section */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-elec-yellow">Lock Technologies</h4>
            
            <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
              <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 border border-blue-600/40 rounded-lg p-5">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="h-6 w-6 text-blue-400" />
                  <h5 className="font-semibold text-blue-300 text-lg">Electromagnetic Locks (Maglocks)</h5>
                </div>
                <div className="space-y-3 text-sm">
                  <p><strong>Operation:</strong> Hold doors shut using powerful electromagnets. No mechanical parts to wear out.</p>
                  <p><strong>Power:</strong> Typically 12V or 24V DC, consuming 0.3-0.8A depending on holding force.</p>
                  <p><strong>Installation:</strong> Surface-mounted on door frame and door leaf. Minimal modification required.</p>
                  <p><strong>Holding Force:</strong> Available from 150kg to 500kg+ holding force.</p>
                  <p><strong>Advantages:</strong> Weather-resistant, silent operation, instant release.</p>
                  <p><strong>Disadvantages:</strong> High power consumption, requires backup power for security.</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 border border-green-600/40 rounded-lg p-5">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="h-6 w-6 text-green-400" />
                  <h5 className="font-semibold text-green-300 text-lg">Electric Strikes</h5>
                </div>
                <div className="space-y-3 text-sm">
                  <p><strong>Operation:</strong> Release the door latch mechanism when energised.</p>
                  <p><strong>Power:</strong> 12V or 24V DC/AC, typically 0.1-0.3A consumption.</p>
                  <p><strong>Installation:</strong> Replaces standard door frame strike plate. May require frame modification.</p>
                  <p><strong>Types:</strong> Rim strikes (surface-mount) and mortice strikes (concealed).</p>
                  <p><strong>Advantages:</strong> Low power consumption, maintains door's original appearance.</p>
                  <p><strong>Disadvantages:</strong> More complex installation, mechanical wear over time.</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 border border-purple-600/40 rounded-lg p-5">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="h-6 w-6 text-purple-400" />
                  <h5 className="font-semibold text-purple-300 text-lg">Electric Mortice Locks</h5>
                </div>
                <div className="space-y-3 text-sm">
                  <p><strong>Operation:</strong> Motorised deadbolt that extends/retracts under electronic control.</p>
                  <p><strong>Power:</strong> 12V DC motor, higher current draw during operation (1-2A).</p>
                  <p><strong>Installation:</strong> Requires mortice preparation in door leaf. Professional fitting essential.</p>
                  <p><strong>Security:</strong> Highest security level with anti-tamper features.</p>
                  <p><strong>Advantages:</strong> Concealed installation, very high security, mechanical key backup.</p>
                  <p><strong>Disadvantages:</strong> Expensive, complex installation, regular maintenance required.</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-900/30 to-orange-800/20 border border-orange-600/40 rounded-lg p-5">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="h-6 w-6 text-orange-400" />
                  <h5 className="font-semibold text-orange-300 text-lg">Electrified Hardware</h5>
                </div>
                <div className="space-y-3 text-sm">
                  <p><strong>Operation:</strong> Standard door hardware with built-in electric release mechanisms.</p>
                  <p><strong>Types:</strong> Electric hinges, electrified panic bars, power transfer hinges.</p>
                  <p><strong>Integration:</strong> Works with existing door hardware while adding electronic control.</p>
                  <p><strong>Power:</strong> Various voltages depending on hardware type (12V, 24V, mains).</p>
                  <p><strong>Advantages:</strong> Maintains door aesthetics, meets building codes easily.</p>
                  <p><strong>Disadvantages:</strong> Higher cost, specific hardware requirements.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Fail-Safe vs Fail-Secure Enhanced */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-elec-yellow">Safety Configuration: Critical Decision</h4>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-5 bg-green-900/30 rounded-lg border border-green-600/40">
                  <h5 className="font-semibold mb-3 text-green-400 text-lg">Fail-Safe Configuration</h5>
                  <div className="space-y-2 text-sm">
                    <p><strong>Behaviour:</strong> Lock releases when power is removed</p>
                    <p><strong>Use Cases:</strong> Fire exits, emergency egress routes, high-traffic areas</p>
                    <p><strong>Compliance:</strong> Required by fire regulations for escape routes</p>
                    <p><strong>Implementation:</strong> Power cut = door unlocks automatically</p>
                    <p><strong>Backup Considerations:</strong> UPS required for security during outages</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-5 bg-red-900/30 rounded-lg border border-red-600/40">
                  <h5 className="font-semibold mb-3 text-red-400 text-lg">Fail-Secure Configuration</h5>
                  <div className="space-y-2 text-sm">
                    <p><strong>Behaviour:</strong> Lock remains engaged when power is removed</p>
                    <p><strong>Use Cases:</strong> Server rooms, vaults, high-security zones</p>
                    <p><strong>Security:</strong> Maintains protection during power failures</p>
                    <p><strong>Implementation:</strong> Power cut = door stays locked</p>
                    <p><strong>Emergency Access:</strong> Manual override systems essential</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Technical Specifications */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-elec-yellow">Technical Specifications Comparison</h4>
            
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-gray-800 rounded-lg p-4">
                <h5 className="font-semibold mb-3 text-foreground">300kg Maglock</h5>
                <div className="space-y-2 text-sm text-gray-300">
                  <p><strong>Power:</strong> 12V/24V DC, 0.5A</p>
                  <p><strong>Holding Force:</strong> 300kg (2943N)</p>
                  <p><strong>Fail Mode:</strong> Fail-safe</p>
                  <p><strong>Typical Use:</strong> Main entrances, fire exits</p>
                  <p><strong>Installation:</strong> Surface mount</p>
                  <p><strong>Cable:</strong> 2-core for basic, 4-core with monitoring</p>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-4">
                <h5 className="font-semibold mb-3 text-foreground">Electric Strike</h5>
                <div className="space-y-2 text-sm text-gray-300">
                  <p><strong>Power:</strong> 12V DC, 0.2A (momentary)</p>
                  <p><strong>Operation:</strong> Latch release</p>
                  <p><strong>Fail Mode:</strong> Configurable</p>
                  <p><strong>Typical Use:</strong> Internal doors</p>
                  <p><strong>Installation:</strong> Frame mortice</p>
                  <p><strong>Cable:</strong> 2-core minimum</p>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-4">
                <h5 className="font-semibold mb-3 text-foreground">Mortice Lock</h5>
                <div className="space-y-2 text-sm text-gray-300">
                  <p><strong>Power:</strong> 12V DC, 0.8A (operating)</p>
                  <p><strong>Holding Force:</strong> 1000kg+ mechanical</p>
                  <p><strong>Fail Mode:</strong> Configurable</p>
                  <p><strong>Typical Use:</strong> High security</p>
                  <p><strong>Installation:</strong> Door mortice</p>
                  <p><strong>Cable:</strong> 4-core minimum</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-600/20 border border-yellow-600/40 rounded-lg p-4">
            <p className="text-yellow-100">
              <strong>Critical Point:</strong> The choice between fail-safe and fail-secure operation is not just about security preference—it's often mandated by building regulations and fire safety codes. Always consult local fire authorities and building control before finalising lock configurations.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Integration with Other Systems */}
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Network className="h-5 w-5 text-elec-yellow" />
            Multi-System Integration Architecture
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-6">
          <p>
            Modern access control systems function as central hubs that integrate with multiple building systems. This integration transforms simple door control into comprehensive building intelligence that enhances security, improves operational efficiency, and ensures regulatory compliance.
          </p>

          {/* Enhanced Integration Cards */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-elec-yellow">Critical System Integrations</h4>
            
            <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
              <div className="bg-gradient-to-br from-red-900/40 to-red-800/30 border border-red-500/50 rounded-lg p-5">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-7 w-7 text-red-400" />
                  <h5 className="font-semibold text-red-300 text-lg">Fire Alarm Integration</h5>
                </div>
                <div className="space-y-3 text-sm">
                  <p><strong>Function:</strong> Automatic door unlock during fire alarm activation</p>
                  <p><strong>Implementation:</strong> Fire alarm panel outputs connect to access control relays</p>
                  <p><strong>Safety Benefit:</strong> Ensures clear evacuation routes during emergencies</p>
                  <p><strong>Compliance:</strong> BS 5839-1, BS 7273-4 (fire safety codes)</p>
                  <p><strong>Testing:</strong> Monthly fire alarm tests must include door release verification</p>
                  <p><strong>Override:</strong> Fire service override key switches for emergency access</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/30 border border-blue-500/50 rounded-lg p-5">
                <div className="flex items-center gap-3 mb-4">
                  <Camera className="h-7 w-7 text-blue-400" />
                  <h5 className="font-semibold text-blue-300 text-lg">CCTV & Surveillance</h5>
                </div>
                <div className="space-y-3 text-sm">
                  <p><strong>Function:</strong> Automated recording triggered by access events</p>
                  <p><strong>Implementation:</strong> Access control events trigger camera recording and PTZ positioning</p>
                  <p><strong>Security Benefit:</strong> Visual verification and evidence collection</p>
                  <p><strong>Compliance:</strong> GDPR data protection requirements</p>
                  <p><strong>Features:</strong> Face matching, tailgating detection, real-time alerts</p>
                  <p><strong>Storage:</strong> Event-triggered recording reduces storage requirements</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-900/40 to-green-800/30 border border-green-500/50 rounded-lg p-5">
                <div className="flex items-center gap-3 mb-4">
                  <Thermometer className="h-7 w-7 text-green-400" />
                  <h5 className="font-semibold text-green-300 text-lg">HVAC & Environmental</h5>
                </div>
                <div className="space-y-3 text-sm">
                  <p><strong>Function:</strong> Occupancy-based climate control and energy management</p>
                  <p><strong>Implementation:</strong> Badge events trigger zone conditioning, lighting, and ventilation</p>
                  <p><strong>Efficiency Benefit:</strong> Up to 40% energy savings in commercial buildings</p>
                  <p><strong>Compliance:</strong> Building regulations Part L (energy efficiency)</p>
                  <p><strong>Advanced Features:</strong> Predictive conditioning, personal climate preferences</p>
                  <p><strong>Reporting:</strong> Energy usage analytics and carbon footprint tracking</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/30 border border-purple-500/50 rounded-lg p-5">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="h-7 w-7 text-purple-400" />
                  <h5 className="font-semibold text-purple-300 text-lg">Time & Attendance Systems</h5>
                </div>
                <div className="space-y-3 text-sm">
                  <p><strong>Function:</strong> Dual-purpose access control and time recording</p>
                  <p><strong>Implementation:</strong> First/last badge events mark work periods</p>
                  <p><strong>Operational Benefit:</strong> Eliminates separate clocking systems</p>
                  <p><strong>Compliance:</strong> Working Time Regulations, employment law</p>
                  <p><strong>Integration:</strong> Payroll system connectivity, absence management</p>
                  <p><strong>Analytics:</strong> Occupancy patterns, space utilisation reporting</p>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Integration Features */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-elec-yellow">Advanced Integration Capabilities</h4>
            
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
              <div className="bg-gray-800/60 rounded-lg p-4">
                <h5 className="font-semibold mb-3 text-foreground">Elevator Integration</h5>
                <div className="space-y-2 text-sm text-gray-300">
                  <p>• Card readers control lift access to specific floors</p>
                  <p>• Automatic floor selection based on user permissions</p>
                  <p>• Visitor escort requirements and time-limited access</p>
                  <p>• Emergency evacuation floor override capabilities</p>
                </div>
              </div>

              <div className="bg-gray-800/60 rounded-lg p-4">
                <h5 className="font-semibold mb-3 text-foreground">Intrusion Detection</h5>
                <div className="space-y-2 text-sm text-gray-300">
                  <p>• Automatic arming/disarming based on occupancy</p>
                  <p>• Zone-based security with keypad management</p>
                  <p>• Duress alarm integration with panic codes</p>
                  <p>• Anti-passback and tailgating prevention</p>
                </div>
              </div>

              <div className="bg-gray-800/60 rounded-lg p-4">
                <h5 className="font-semibold mb-3 text-foreground">Visitor Management</h5>
                <div className="space-y-2 text-sm text-gray-300">
                  <p>• Temporary access card programming and control</p>
                  <p>• Escort requirements and restricted area access</p>
                  <p>• Visitor tracking and location monitoring</p>
                  <p>• Emergency evacuation visitor accountability</p>
                </div>
              </div>

              <div className="bg-gray-800/60 rounded-lg p-4">
                <h5 className="font-semibold mb-3 text-foreground">Building Automation</h5>
                <div className="space-y-2 text-sm text-gray-300">
                  <p>• Automatic lighting scenes based on user preferences</p>
                  <p>• Desk booking integration with occupancy sensors</p>
                  <p>• Meeting room access with calendar integration</p>
                  <p>• Equipment control based on authorised personnel</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-red-600/20 border border-red-600/40 rounded-lg p-5">
            <h4 className="font-semibold mb-3 text-red-300">Critical Safety Integration Requirements</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-semibold mb-2 text-red-400">Fire Safety (Mandatory)</h5>
                <ul className="space-y-1 text-red-100">
                  <li>• BS 7273-4 compliance for door release</li>
                  <li>• Fire alarm panel integration required</li>
                  <li>• Emergency services override provisions</li>
                  <li>• Monthly testing and documentation</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold mb-2 text-red-400">Security Integration</h5>
                <ul className="space-y-1 text-red-100">
                  <li>• Intruder alarm coordination</li>
                  <li>• CCTV event correlation</li>
                  <li>• Duress alarm connectivity</li>
                  <li>• Security monitoring centre links</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-blue-600/20 border border-blue-600/40 rounded-lg p-4">
            <p className="text-blue-100">
              <strong>Integration Success Story:</strong> A corporate headquarters integrated access control with their entire building ecosystem. Employee badge-in triggers personalised lighting scenes, adjusts HVAC to preferred temperatures, books available meeting rooms, activates desk equipment, and notifies security of VIP arrivals. The system reduced energy costs by 35% and improved employee satisfaction scores significantly.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};