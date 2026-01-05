import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, AlertCircle, Clock, Network, Hash } from 'lucide-react';

export const BMSModule7Section4ContentPart2 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Settings className="h-5 w-5 text-elec-yellow" />
          Controller Setup
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">Post-Upload Configuration</h4>
          <p className="text-foreground mb-4">
            After software upload, controllers must be configured to operate correctly within the BMS network. This involves 
            setting unique identifiers, network parameters, timing references, and validating all operational parameters.
          </p>
        </div>

        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">Address and ID Assignment</h4>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h5 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                <Hash className="h-4 w-4" />
                BACnet Device IDs
              </h5>
              <div className="space-y-2 text-sm">
                <p className="text-foreground">Unique identifier for each BACnet device</p>
                <ul className="ml-4 space-y-1">
                  <li>• Must be unique across entire network</li>
                  <li>• Typically 6-digit numbers (e.g., 100001)</li>
                  <li>• Cannot be changed without system disruption</li>
                  <li>• Required for device discovery and communication</li>
                </ul>
                <div className="bg-gray-700 rounded p-2 mt-2">
                  <p className="text-xs text-foreground">
                    <strong>Example:</strong> AHU-1 Controller = Device ID 100025
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <h5 className="text-green-400 font-semibold mb-2">Modbus Addresses</h5>
              <div className="space-y-2 text-sm">
                <p className="text-foreground">Numeric addresses for Modbus devices</p>
                <ul className="ml-4 space-y-1">
                  <li>• Range: 1-247 per network segment</li>
                  <li>• Sequential numbering recommended</li>
                  <li>• Address 0 reserved for broadcast</li>
                  <li>• Must match documentation exactly</li>
                </ul>
                <div className="bg-gray-700 rounded p-2 mt-2">
                  <p className="text-xs text-foreground">
                    <strong>Example:</strong> Energy meters numbered 1-12 per floor
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
              <h5 className="text-purple-400 font-semibold mb-2">KNX Addresses</h5>
              <div className="space-y-2 text-sm">
                <p className="text-foreground">Physical addressing for KNX devices</p>
                <ul className="ml-4 space-y-1">
                  <li>• Format: Area.Line.Device (1.1.12)</li>
                  <li>• Physical topology based</li>
                  <li>• Group addresses for functional control</li>
                  <li>• ETS software manages assignments</li>
                </ul>
                <div className="bg-gray-700 rounded p-2 mt-2">
                  <p className="text-xs text-foreground">
                    <strong>Example:</strong> Floor 2, Line 3, Device 15 = 2.3.15
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">Network Configuration</h4>
          
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg p-4">
            <h5 className="text-cyan-400 font-semibold mb-2 flex items-center gap-2">
              <Network className="h-4 w-4" />
              IP Network Settings
            </h5>
            <div className="space-y-3 text-sm">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-700 rounded-lg p-3">
                  <p className="text-foreground font-semibold mb-2">Required IP Settings:</p>
                  <ul className="space-y-1 ml-4">
                    <li>• <strong>IP Address:</strong> Unique on subnet (e.g., 192.168.1.100)</li>
                    <li>• <strong>Subnet Mask:</strong> Network boundary (e.g., 255.255.255.0)</li>
                    <li>• <strong>Default Gateway:</strong> Router IP for remote access</li>
                    <li>• <strong>DNS Servers:</strong> For name resolution (optional)</li>
                  </ul>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-3">
                  <p className="text-foreground font-semibold mb-2">Configuration Process:</p>
                  <ol className="space-y-1 ml-4">
                    <li>1. Connect to controller via USB/console</li>
                    <li>2. Access network configuration menu</li>
                    <li>3. Enter IP settings from documentation</li>
                    <li>4. Save configuration and restart</li>
                    <li>5. Test network connectivity (ping)</li>
                  </ol>
                </div>
              </div>
              
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded p-3 mt-3">
                <p className="text-yellow-400 font-semibold mb-1">⚠️ Network Coordination:</p>
                <p className="text-xs text-foreground">
                  All IP addresses must be coordinated with IT department to avoid conflicts. Static IP addresses are 
                  preferred for BMS controllers to ensure consistent addressing and network stability.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">Clock Synchronisation</h4>
          
          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-4">
            <h5 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Time Management
            </h5>
            <div className="space-y-3 text-sm">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-700 rounded-lg p-3">
                  <p className="text-foreground font-semibold mb-2">Why Synchronisation Matters:</p>
                  <ul className="space-y-1 ml-4">
                    <li>• Accurate data logging timestamps</li>
                    <li>• Coordinated equipment scheduling</li>
                    <li>• Alarm sequence correlation</li>
                    <li>• Energy monitoring accuracy</li>
                    <li>• Maintenance schedule coordination</li>
                  </ul>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-3">
                  <p className="text-foreground font-semibold mb-2">Synchronisation Methods:</p>
                  <ul className="space-y-1 ml-4">
                    <li>• <strong>NTP Server:</strong> Network Time Protocol</li>
                    <li>• <strong>BMS Master:</strong> Central time reference</li>
                    <li>• <strong>Manual Setting:</strong> Individual configuration</li>
                    <li>• <strong>GPS Reference:</strong> High-precision timing</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-blue-500/10 border border-blue-500/20 rounded p-3 mt-3">
                <p className="text-blue-400 font-semibold mb-1">Typical Configuration:</p>
                <p className="text-xs text-foreground">
                  All controllers synchronise to BMS server every 24 hours. Server maintains NTP connection to ensure 
                  system-wide time accuracy within ±2 seconds. Daylight saving time changes handled automatically.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">Default Parameter Verification</h4>
          
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg p-4">
              <h5 className="text-orange-400 font-semibold mb-2">Critical Parameter Check</h5>
              <div className="space-y-3 text-sm">
                <div className="grid md:grid-cols-3 gap-3">
                  <div className="bg-gray-700 rounded-lg p-3">
                    <p className="text-foreground font-semibold mb-2">Temperature Setpoints:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• Supply air: 16-18°C (cooling)</li>
                      <li>• Room temperature: 21-23°C</li>
                      <li>• Hot water: 60-80°C</li>
                      <li>• Chilled water: 6-12°C</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-700 rounded-lg p-3">
                    <p className="text-foreground font-semibold mb-2">Operating Limits:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• High/low pressure alarms</li>
                      <li>• Flow rate minimums</li>
                      <li>• Motor current limits</li>
                      <li>• Differential pressure ranges</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-700 rounded-lg p-3">
                    <p className="text-foreground font-semibold mb-2">Timing Parameters:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• Startup delay timers</li>
                      <li>• Minimum run times</li>
                      <li>• Alarm delay settings</li>
                      <li>• Sequence step timing</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-red-500/10 border border-red-500/20 rounded p-3 mt-3">
                  <p className="text-red-400 font-semibold mb-1">⚠️ Parameter Validation:</p>
                  <p className="text-xs text-foreground">
                    Verify all default parameters against design specifications before enabling automatic control. 
                    Incorrect setpoints can cause equipment damage, energy waste, or comfort problems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">Communication Testing</h4>
          
          <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg p-4">
            <h5 className="text-purple-400 font-semibold mb-2">Network Connectivity Verification</h5>
            <div className="space-y-3 text-sm">
              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <p className="text-foreground font-semibold mb-2">Local Network Tests:</p>
                  <ul className="ml-4 space-y-1">
                    <li>• Ping controller from BMS server</li>
                    <li>• Verify device discovery and enumeration</li>
                    <li>• Test read commands to all I/O points</li>
                    <li>• Confirm write command execution</li>
                  </ul>
                </div>
                <div>
                  <p className="text-foreground font-semibold mb-2">Integration Tests:</p>
                  <ul className="ml-4 space-y-1">
                    <li>• Data appearing in BMS trending</li>
                    <li>• Alarm notifications functioning</li>
                    <li>• Schedule execution verification</li>
                    <li>• Remote override capability</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-foreground font-semibold mb-2">Inline Check</h4>
              <p className="text-sm text-foreground mb-2">
                👉 Why is time synchronisation important across BMS controllers?
              </p>
              <p className="text-xs text-foreground">
                <strong>Answer:</strong> Time synchronisation ensures accurate data logging, coordinated equipment scheduling, 
                proper alarm sequencing, and reliable energy monitoring. Without synchronisation, trend data becomes unreliable, 
                scheduled operations may not coordinate properly, and troubleshooting becomes difficult due to inconsistent timestamps.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};