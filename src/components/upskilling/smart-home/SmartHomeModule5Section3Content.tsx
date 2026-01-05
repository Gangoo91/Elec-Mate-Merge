import { Eye, DoorOpen, Radar, Shield, Home, Settings, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const SmartHomeModule5Section3Content = () => {
  return (
    <div className="space-y-8">
      {/* Door/Window Contact Sensors */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <DoorOpen className="h-6 w-6 text-blue-500" />
            Door/Window Contact Sensors
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-6">
          <div className="bg-blue-600/10 p-4 rounded-lg border border-blue-600/30">
            <h4 className="text-foreground font-semibold mb-3">How Contact Sensors Work</h4>
            <p className="text-sm mb-3">
              Door and window contact sensors consist of two components: a magnetic switch (sensor) 
              mounted on the frame and a magnet mounted on the moving door or window. When the door 
              or window opens, the magnet moves away from the sensor, breaking the magnetic field 
              and triggering an alert.
            </p>
            <p className="text-sm">
              These sensors provide immediate detection of unauthorised entry attempts at perimeter 
              access points, forming the first line of defence in a layered security system.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-foreground font-semibold text-lg mb-4">Optimal Placement Locations</h4>
              <div className="space-y-3">
                <div className="bg-green-600/20 p-3 rounded border border-green-600/40">
                  <p className="text-green-400 font-semibold text-sm mb-1">Primary Entry Points</p>
                  <p className="text-xs text-foreground">Front door, back door, patio doors, main access routes</p>
                </div>
                <div className="bg-blue-600/20 p-3 rounded border border-blue-600/40">
                  <p className="text-blue-400 font-semibold text-sm mb-1">Ground Floor Windows</p>
                  <p className="text-xs text-foreground">Accessible windows, bay windows, French windows</p>
                </div>
                <div className="bg-purple-600/20 p-3 rounded border border-purple-600/40">
                  <p className="text-purple-400 font-semibold text-sm mb-1">Secondary Access</p>
                  <p className="text-xs text-foreground">Garage doors, side gates, basement access</p>
                </div>
                <div className="bg-orange-600/20 p-3 rounded border border-orange-600/40">
                  <p className="text-orange-400 font-semibold text-sm mb-1">Vulnerable Areas</p>
                  <p className="text-xs text-foreground">Basement windows, roof access, conservatory doors</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-foreground font-semibold text-lg mb-4">Key Advantages & Limitations</h4>
              <div className="space-y-3">
                <div className="bg-elec-dark p-3 rounded border border-gray-600">
                  <p className="text-green-400 font-semibold text-sm mb-1">✓ Advantages</p>
                  <ul className="text-xs text-foreground space-y-1">
                    <li>• Immediate detection at entry points</li>
                    <li>• Very low power consumption</li>
                    <li>• Simple installation and maintenance</li>
                    <li>• No false alarms from pets or weather</li>
                    <li>• Works in all lighting conditions</li>
                  </ul>
                </div>
                <div className="bg-elec-dark p-3 rounded border border-gray-600">
                  <p className="text-red-400 font-semibold text-sm mb-1">⚠ Limitations</p>
                  <ul className="text-xs text-foreground space-y-1">
                    <li>• Only detects when door/window opens</li>
                    <li>• Cannot detect glass breakage</li>
                    <li>• Vulnerable to tampering if visible</li>
                    <li>• May not detect slow, careful opening</li>
                    <li>• Requires proper alignment for reliability</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-elec-dark p-4 rounded-lg">
            <h4 className="text-elec-yellow font-semibold mb-3">Smart Features & Integration</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-foreground font-semibold text-sm mb-2">Automation Triggers:</p>
                <ul className="text-xs space-y-1">
                  <li>• Automatic lighting activation</li>
                  <li>• HVAC system responses</li>
                  <li>• Security camera recording</li>
                  <li>• Notification alerts</li>
                </ul>
              </div>
              <div>
                <p className="text-foreground font-semibold text-sm mb-2">Monitoring Features:</p>
                <ul className="text-xs space-y-1">
                  <li>• Open/close history logging</li>
                  <li>• Battery level monitoring</li>
                  <li>• Signal strength indicators</li>
                  <li>• Tamper detection alerts</li>
                </ul>
              </div>
              <div>
                <p className="text-foreground font-semibold text-sm mb-2">Integration Options:</p>
                <ul className="text-xs space-y-1">
                  <li>• Smart locks coordination</li>
                  <li>• Alarm system integration</li>
                  <li>• Mobile app notifications</li>
                  <li>• Voice assistant compatibility</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* PIR Motion Sensors */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Radar className="h-6 w-6 text-green-500" />
            PIR Motion Sensors
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-6">
          <div className="bg-green-600/10 p-4 rounded-lg border border-green-600/30">
            <h4 className="text-foreground font-semibold mb-3">PIR Technology & Operation</h4>
            <p className="text-sm mb-3">
              Passive Infrared (PIR) sensors detect changes in infrared radiation caused by moving 
              warm objects, such as people or animals. They use fresnel lenses to focus infrared 
              energy onto pyroelectric sensors that generate electrical signals when heat patterns change.
            </p>
            <p className="text-sm">
              PIR sensors provide interior motion detection, creating a secondary layer of security 
              that activates when intruders move through protected spaces after bypassing perimeter defences.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-foreground font-semibold text-lg mb-4">Strategic Placement Principles</h4>
              <div className="space-y-3">
                <div className="bg-blue-600/20 p-3 rounded border border-blue-600/40">
                  <p className="text-blue-400 font-semibold text-sm mb-1">High-Traffic Areas</p>
                  <p className="text-xs text-foreground">Hallways, staircases, main corridors, living rooms</p>
                </div>
                <div className="bg-purple-600/20 p-3 rounded border border-purple-600/40">
                  <p className="text-purple-400 font-semibold text-sm mb-1">Corner Mounting</p>
                  <p className="text-xs text-foreground">Room corners for maximum coverage and discrete positioning</p>
                </div>
                <div className="bg-green-600/20 p-3 rounded border border-green-600/40">
                  <p className="text-green-400 font-semibold text-sm mb-1">Entry Monitoring</p>
                  <p className="text-xs text-foreground">Monitor movement from doorways and access points</p>
                </div>
                <div className="bg-orange-600/20 p-3 rounded border border-orange-600/40">
                  <p className="text-orange-400 font-semibold text-sm mb-1">Height Considerations</p>
                  <p className="text-xs text-foreground">2.4-3m mounting height for optimal detection coverage</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-foreground font-semibold text-lg mb-4">Performance Factors</h4>
              <div className="space-y-3">
                <div className="bg-elec-dark p-3 rounded border border-gray-600">
                  <p className="text-green-400 font-semibold text-sm mb-1">✓ Optimal Conditions</p>
                  <ul className="text-xs text-foreground space-y-1">
                    <li>• Stable ambient temperature</li>
                    <li>• Clear line of sight</li>
                    <li>• Minimal air movement</li>
                    <li>• Away from heat sources</li>
                    <li>• Protected from direct sunlight</li>
                  </ul>
                </div>
                <div className="bg-elec-dark p-3 rounded border border-gray-600">
                  <p className="text-red-400 font-semibold text-sm mb-1">⚠ Interference Sources</p>
                  <ul className="text-xs text-foreground space-y-1">
                    <li>• Radiators and heating vents</li>
                    <li>• Direct sunlight exposure</li>
                    <li>• Moving curtains or plants</li>
                    <li>• Pets in detection zones</li>
                    <li>• Rapid temperature changes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-elec-dark p-4 rounded-lg">
            <h4 className="text-elec-yellow font-semibold mb-3">Advanced PIR Features</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-foreground font-semibold text-sm mb-2">Detection Patterns:</p>
                <ul className="text-xs space-y-1">
                  <li>• Wide-angle coverage (90-120°)</li>
                  <li>• Long-range detection (8-12m)</li>
                  <li>• Pet-immune sensitivity</li>
                  <li>• Adjustable detection zones</li>
                </ul>
              </div>
              <div>
                <p className="text-foreground font-semibold text-sm mb-2">Smart Capabilities:</p>
                <ul className="text-xs space-y-1">
                  <li>• Temperature compensation</li>
                  <li>• False alarm reduction</li>
                  <li>• Occupancy-based automation</li>
                  <li>• Energy-saving integration</li>
                </ul>
              </div>
              <div>
                <p className="text-foreground font-semibold text-sm mb-2">Integration Benefits:</p>
                <ul className="text-xs space-y-1">
                  <li>• Automatic lighting control</li>
                  <li>• HVAC presence detection</li>
                  <li>• Security system activation</li>
                  <li>• Wellness monitoring</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Combined Benefits & Layered Security */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Shield className="h-6 w-6 text-purple-500" />
            Layered Security Benefits
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-6">
          <div className="bg-purple-600/10 p-4 rounded-lg border border-purple-600/30">
            <h4 className="text-foreground font-semibold mb-3">Perimeter + Interior Detection Strategy</h4>
            <p className="text-sm mb-3">
              Combining contact sensors at entry points with PIR sensors for interior detection 
              creates multiple detection layers that significantly improve security effectiveness. 
              This approach provides redundancy and catches different types of intrusion attempts.
            </p>
            <p className="text-sm">
              Contact sensors detect the initial breach at doors and windows, while PIR sensors 
              catch movement inside the property, ensuring comprehensive coverage even if perimeter 
              sensors are bypassed or disabled.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-foreground font-semibold text-lg mb-4">Security Enhancement</h4>
              <div className="space-y-3">
                <div className="bg-blue-600/20 p-3 rounded border border-blue-600/40">
                  <p className="text-blue-400 font-semibold text-sm mb-1">Redundant Detection</p>
                  <p className="text-xs text-foreground">Multiple sensors reduce risk of undetected intrusion</p>
                </div>
                <div className="bg-green-600/20 p-3 rounded border border-green-600/40">
                  <p className="text-green-400 font-semibold text-sm mb-1">Different Detection Methods</p>
                  <p className="text-xs text-foreground">Physical contact and thermal movement detection</p>
                </div>
                <div className="bg-purple-600/20 p-3 rounded border border-purple-600/40">
                  <p className="text-purple-400 font-semibold text-sm mb-1">Bypass Protection</p>
                  <p className="text-xs text-foreground">Interior sensors catch intruders who avoid entry points</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-foreground font-semibold text-lg mb-4">Automation Integration</h4>
              <div className="space-y-3">
                <div className="bg-elec-dark p-3 rounded border border-gray-600">
                  <p className="text-yellow-400 font-semibold text-sm mb-1">Lighting Automation</p>
                  <p className="text-xs text-foreground">Automatic lights deter intruders and assist response</p>
                </div>
                <div className="bg-elec-dark p-3 rounded border border-gray-600">
                  <p className="text-blue-400 font-semibold text-sm mb-1">CCTV Activation</p>
                  <p className="text-xs text-foreground">Triggered recording provides evidence and monitoring</p>
                </div>
                <div className="bg-elec-dark p-3 rounded border border-gray-600">
                  <p className="text-green-400 font-semibold text-sm mb-1">Alert Systems</p>
                  <p className="text-xs text-foreground">Immediate notifications enable rapid response</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Installation Best Practices & Limitations */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Settings className="h-6 w-6 text-orange-500" />
            Installation & Limitations
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-foreground font-semibold text-lg mb-4">Installation Best Practices</h4>
              <div className="space-y-3">
                <div className="bg-green-600/20 p-3 rounded border border-green-600/40">
                  <p className="text-green-400 font-semibold text-sm mb-1">Contact Sensor Alignment</p>
                  <ul className="text-xs text-foreground space-y-1">
                    <li>• Maximum 15mm gap when closed</li>
                    <li>• Secure mounting prevents tampering</li>
                    <li>• Consider door/window movement</li>
                    <li>• Test operation through full range</li>
                  </ul>
                </div>
                <div className="bg-blue-600/20 p-3 rounded border border-blue-600/40">
                  <p className="text-blue-400 font-semibold text-sm mb-1">PIR Positioning</p>
                  <ul className="text-xs text-foreground space-y-1">
                    <li>• 2.4-3m mounting height optimal</li>
                    <li>• Avoid direct heat sources</li>
                    <li>• Test coverage patterns</li>
                    <li>• Consider pet movements</li>
                  </ul>
                </div>
                <div className="bg-purple-600/20 p-3 rounded border border-purple-600/40">
                  <p className="text-purple-400 font-semibold text-sm mb-1">Network Considerations</p>
                  <ul className="text-xs text-foreground space-y-1">
                    <li>• Signal strength testing</li>
                    <li>• Battery monitoring setup</li>
                    <li>• Hub proximity planning</li>
                    <li>• Mesh network optimization</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-foreground font-semibold text-lg mb-4">Limitations & Challenges</h4>
              <div className="space-y-3">
                <div className="bg-red-600/20 p-3 rounded border border-red-600/40">
                  <p className="text-red-400 font-semibold text-sm mb-1">Battery Dependencies</p>
                  <ul className="text-xs text-foreground space-y-1">
                    <li>• Regular battery replacement needed</li>
                    <li>• Low battery affects reliability</li>
                    <li>• Cold weather reduces battery life</li>
                    <li>• Backup power planning required</li>
                  </ul>
                </div>
                <div className="bg-yellow-600/20 p-3 rounded border border-yellow-600/40">
                  <p className="text-yellow-400 font-semibold text-sm mb-1">Environmental Factors</p>
                  <ul className="text-xs text-foreground space-y-1">
                    <li>• Temperature extremes affect operation</li>
                    <li>• Humidity can cause issues</li>
                    <li>• UV exposure degrades components</li>
                    <li>• Wind affects outdoor sensors</li>
                  </ul>
                </div>
                <div className="bg-gray-600/20 p-3 rounded border border-gray-600/40">
                  <p className="text-foreground font-semibold text-sm mb-1">Technical Limitations</p>
                  <ul className="text-xs text-foreground space-y-1">
                    <li>• Range limitations with wireless</li>
                    <li>• Interference from other devices</li>
                    <li>• Physical obstruction issues</li>
                    <li>• Maintenance access requirements</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-orange-600/10 p-4 rounded-lg border border-orange-600/30">
            <h4 className="text-orange-400 font-semibold mb-3">Professional Installation Considerations</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-foreground font-semibold text-sm mb-2">System Integration:</p>
                <ul className="text-xs space-y-1">
                  <li>• Hub compatibility verification</li>
                  <li>• Network capacity planning</li>
                  <li>• Sensor placement optimisation</li>
                  <li>• Coverage gap analysis</li>
                </ul>
              </div>
              <div>
                <p className="text-foreground font-semibold text-sm mb-2">Ongoing Maintenance:</p>
                <ul className="text-xs space-y-1">
                  <li>• Regular testing schedules</li>
                  <li>• Battery monitoring systems</li>
                  <li>• Firmware update management</li>
                  <li>• Performance monitoring tools</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};