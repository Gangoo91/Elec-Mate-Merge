import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, AlertTriangle, Shield } from 'lucide-react';

export const MedicalLocationsSection = () => {
  return (
    <Card className="bg-gradient-to-r from-red-900/20 to-elec-gray border-red-600/30">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Heart className="h-5 w-5 text-elec-yellow" />
          Medical Locations Requirements
        </CardTitle>
        <Badge variant="secondary" className="w-fit bg-red-600 text-foreground">BS 7671 Section 710</Badge>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="bg-elec-dark p-3 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-2">Code Reference: BS 7671:2018+A2:2022 Section 710</h5>
          <p className="text-sm">Medical locations - Requirements for electrical installations in healthcare facilities</p>
        </div>

        <div className="grid gap-6">
          {/* Medical Groups Classification */}
          <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
            <h5 className="text-elec-yellow font-semibold mb-3">Medical Location Classification System</h5>
            
            {/* Group 0 */}
            <div className="mb-6 p-4 bg-green-900/20 border border-green-600/50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h6 className="font-bold text-green-300">Group 0 Medical Locations</h6>
                <Badge className="bg-green-600">Standard Risk</Badge>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h6 className="text-elec-yellow font-medium mb-2">Definition & Risk Level:</h6>
                  <ul className="text-sm space-y-1">
                    <li>• No direct physical contact with patient</li>
                    <li>• No applied parts in contact with patient</li>
                    <li>• Standard electrical safety requirements</li>
                    <li>• Normal environment conditions</li>
                  </ul>
                </div>
                <div>
                  <h6 className="text-elec-yellow font-medium mb-2">Typical Locations:</h6>
                  <ul className="text-sm space-y-1">
                    <li>• Waiting areas and reception desks</li>
                    <li>• Corridors and general office spaces</li>
                    <li>• Staff rest areas and canteens</li>
                    <li>• Administrative and records offices</li>
                  </ul>
                </div>
              </div>
              <div className="mt-3 p-3 bg-green-800/30 border border-green-600/50 rounded">
                <p className="text-green-200 text-sm">
                  <strong>Electrical Requirements:</strong> Standard TN-S or TT earthing systems with normal RCD protection (30mA for socket outlets).
                </p>
              </div>
            </div>

            {/* Group 1 */}
            <div className="mb-6 p-4 bg-yellow-900/20 border border-yellow-600/50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h6 className="font-bold text-yellow-300">Group 1 Medical Locations</h6>
                <Badge className="bg-yellow-600">Enhanced Protection</Badge>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h6 className="text-elec-yellow font-medium mb-2">Definition & Risk Level:</h6>
                  <ul className="text-sm space-y-1">
                    <li>• Patient contact with applied parts</li>
                    <li>• External applied parts only</li>
                    <li>• Enhanced electrical protection required</li>
                    <li>• Increased supervision and maintenance</li>
                  </ul>
                </div>
                <div>
                  <h6 className="text-elec-yellow font-medium mb-2">Typical Locations:</h6>
                  <ul className="text-sm space-y-1">
                    <li>• General patient wards and rooms</li>
                    <li>• Outpatient examination rooms</li>
                    <li>• Physiotherapy and rehabilitation</li>
                    <li>• Radiography and imaging suites</li>
                  </ul>
                </div>
              </div>
              <div className="mt-3 p-3 bg-yellow-800/30 border border-yellow-600/50 rounded">
                <p className="text-yellow-200 text-sm">
                  <strong>Electrical Requirements:</strong> Enhanced RCD protection, additional equipotential bonding, and increased insulation requirements for medical equipment.
                </p>
              </div>
            </div>

            {/* Group 2 */}
            <div className="mb-6 p-4 bg-red-900/20 border border-red-600/50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h6 className="font-bold text-red-300">Group 2 Medical Locations</h6>
                <Badge className="bg-red-600">Critical - IT System Required</Badge>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h6 className="text-elec-yellow font-medium mb-2">Definition & Risk Level:</h6>
                  <ul className="text-sm space-y-1">
                    <li>• Applied parts in direct cardiac contact</li>
                    <li>• Internal applied parts or implants</li>
                    <li>• Maximum electrical safety required</li>
                    <li>• Life-critical applications</li>
                  </ul>
                </div>
                <div>
                  <h6 className="text-elec-yellow font-medium mb-2">Typical Locations:</h6>
                  <ul className="text-sm space-y-1">
                    <li>• Operating theatres and surgical suites</li>
                    <li>• Intensive care units (ICU/ITU)</li>
                    <li>• Cardiac catheterisation laboratories</li>
                    <li>• Angiography and interventional suites</li>
                  </ul>
                </div>
              </div>
              <div className="mt-3 p-3 bg-red-800/30 border border-red-600/50 rounded">
                <p className="text-red-200 text-sm">
                  <strong>Electrical Requirements:</strong> Medical IT systems with isolating transformers, insulation monitoring devices, and comprehensive alarm systems.
                </p>
              </div>
            </div>
          </div>

          {/* Medical IT Systems */}
          <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="h-4 w-4 text-blue-400" />
              <h5 className="text-blue-400 font-semibold">Medical IT System Requirements (Group 2)</h5>
            </div>
            
            <div className="grid gap-4">
              <div>
                <h6 className="text-elec-yellow font-medium mb-2">System Components:</h6>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <ul className="text-sm space-y-1">
                      <li>• Isolating transformer (1:1 ratio, minimum 0.5kVA)</li>
                      <li>• Insulation monitoring device (IMD)</li>
                      <li>• Automatic changeover switch (ATS)</li>
                      <li>• Uninterruptible power supply (UPS)</li>
                    </ul>
                  </div>
                  <div>
                    <ul className="text-sm space-y-1">
                      <li>• Audio and visual alarm systems</li>
                      <li>• Remote monitoring and logging</li>
                      <li>• Test and reset facilities</li>
                      <li>• Emergency backup transformer</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div>
                <h6 className="text-elec-yellow font-medium mb-2">Performance Parameters:</h6>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h6 className="text-blue-300 font-medium mb-1">Insulation Levels:</h6>
                    <ul className="text-sm space-y-1">
                      <li>• Normal operation: ≥50kΩ</li>
                      <li>• First alarm threshold: 50kΩ</li>
                      <li>• Second alarm threshold: 25kΩ</li>
                      <li>• Automatic disconnection: &lt;25kΩ</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="text-blue-300 font-medium mb-1">Current Limits:</h6>
                    <ul className="text-sm space-y-1">
                      <li>• Normal leakage: ≤0.5mA</li>
                      <li>• First fault current: ≤5mA</li>
                      <li>• Maximum load: 8kVA per transformer</li>
                      <li>• Transformer rating: 0.5-10kVA</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="text-blue-300 font-medium mb-1">Response Times:</h6>
                    <ul className="text-sm space-y-1">
                      <li>• Changeover time: ≤0.5 seconds</li>
                      <li>• Alarm delay: 5-10 seconds</li>
                      <li>• UPS backup: ≥10 minutes</li>
                      <li>• Generator start: ≤10 seconds</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Socket Outlet Requirements */}
          <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
            <h5 className="text-elec-yellow font-semibold mb-3">Medical Socket Outlet Specifications</h5>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h6 className="text-purple-400 font-medium mb-2">Construction Requirements:</h6>
                <ul className="text-sm space-y-1">
                  <li>• BS EN 60601-1 compliant outlets</li>
                  <li>• Enhanced earthing pin (6mm diameter)</li>
                  <li>• Insulated earth contact system</li>
                  <li>• Colour-coded identification system</li>
                  <li>• Dedicated circuit protection</li>
                  <li>• Individual isolation capability</li>
                </ul>
              </div>
              <div>
                <h6 className="text-purple-400 font-medium mb-2">Installation Standards:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Orange outlets: IT system supply</li>
                  <li>• Blue outlets: TN system supply</li>
                  <li>• Green outlets: Emergency supply</li>
                  <li>• Minimum 8 outlets per ICU bed space</li>
                  <li>• Maximum 500mm from patient bed head</li>
                  <li>• Minimum 200mm above floor level</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Emergency Power Systems */}
          <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-4 w-4 text-orange-400" />
              <h5 className="text-orange-400 font-semibold">Emergency Power Supply Systems</h5>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h6 className="text-elec-yellow font-medium mb-2">UPS Systems:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Online double-conversion type</li>
                  <li>• Minimum 10-minute battery backup</li>
                  <li>• Automatic bypass capability</li>
                  <li>• Battery monitoring and alarms</li>
                  <li>• Maintenance bypass facility</li>
                  <li>• Remote monitoring capability</li>
                </ul>
              </div>
              <div>
                <h6 className="text-elec-yellow font-medium mb-2">Standby Generators:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Automatic start within 10 seconds</li>
                  <li>• Minimum 24-hour fuel capacity</li>
                  <li>• Weekly automated testing</li>
                  <li>• Fuel monitoring and alarms</li>
                  <li>• Exhaust and ventilation systems</li>
                  <li>• Noise level compliance</li>
                </ul>
              </div>
              <div>
                <h6 className="text-elec-yellow font-medium mb-2">System Coordination:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Load priority classification</li>
                  <li>• Automatic load shedding</li>
                  <li>• Synchronised changeover systems</li>
                  <li>• Building management integration</li>
                  <li>• Staff notification systems</li>
                  <li>• Emergency procedure protocols</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};