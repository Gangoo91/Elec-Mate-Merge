import { Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const SmartHomeModule5Section5PracticalSetup = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Settings className="h-6 w-6 text-purple-500" />
          4. Practical Setup Considerations
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="bg-purple-600/10 p-4 rounded-lg border border-purple-600/30">
          <h4 className="text-foreground font-semibold mb-3">Critical Infrastructure Requirements</h4>
          <p className="text-sm mb-3">
            Electricians must ensure circuits are wired correctly for automation triggers, with 
            proper neutral connections for smart switches and adequate power supply for hub devices. 
            Scenes require reliable communication between hubs, sensors, and smart switches, which 
            depends on robust network infrastructure and proper device placement.
          </p>
          <p className="text-sm">
            Clients should be trained to adjust and test their emergency lighting scenes regularly, 
            understanding how to override automatic systems and manually activate emergency protocols 
            when needed.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-foreground font-semibold text-lg mb-4">Electrical Infrastructure</h4>
            <div className="space-y-3">
              <div className="bg-red-600/20 p-3 rounded border border-red-600/40">
                <p className="text-red-400 font-semibold text-sm mb-1">Circuit Design Requirements</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Neutral wire availability for smart switches</li>
                  <li>• Adequate load calculations for LED retrofits</li>
                  <li>• Emergency circuit isolation capabilities</li>
                  <li>• Battery backup power distribution</li>
                </ul>
              </div>
              <div className="bg-orange-600/20 p-3 rounded border border-orange-600/40">
                <p className="text-orange-400 font-semibold text-sm mb-1">Smart Switch Integration</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Compatible dimmer selection for LED loads</li>
                  <li>• Multi-way switching conversion</li>
                  <li>• Load balancing across phases</li>
                  <li>• Interference minimisation strategies</li>
                </ul>
              </div>
              <div className="bg-blue-600/20 p-3 rounded border border-blue-600/40">
                <p className="text-blue-400 font-semibold text-sm mb-1">Power Supply Considerations</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Hub and controller power requirements</li>
                  <li>• UPS backup for critical components</li>
                  <li>• Solar integration for outdoor lighting</li>
                  <li>• Generator integration planning</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-foreground font-semibold text-lg mb-4">Communication Networks</h4>
            <div className="space-y-3">
              <div className="bg-elec-dark p-3 rounded border border-gray-600">
                <p className="text-cyan-400 font-semibold text-sm mb-1">Wireless Protocol Selection</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Zigbee mesh network advantages</li>
                  <li>• Z-Wave reliability considerations</li>
                  <li>• Wi-Fi bandwidth and security</li>
                  <li>• Thread/Matter future-proofing</li>
                </ul>
              </div>
              <div className="bg-elec-dark p-3 rounded border border-gray-600">
                <p className="text-yellow-400 font-semibold text-sm mb-1">Network Reliability</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Mesh network redundancy planning</li>
                  <li>• Signal strength optimisation</li>
                  <li>• Interference source identification</li>
                  <li>• Range extender placement</li>
                </ul>
              </div>
              <div className="bg-elec-dark p-3 rounded border border-gray-600">
                <p className="text-green-400 font-semibold text-sm mb-1">Integration Protocols</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Hub compatibility verification</li>
                  <li>• Device pairing procedures</li>
                  <li>• Firmware update management</li>
                  <li>• Cross-platform integration testing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-lg">
          <h4 className="text-elec-yellow font-semibold mb-3">Installation Best Practices</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Planning Phase:</p>
              <ul className="text-xs space-y-1">
                <li>• Lighting zone mapping</li>
                <li>• Scene requirement analysis</li>
                <li>• Emergency exit route planning</li>
                <li>• Load assessment and calculations</li>
              </ul>
            </div>
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Installation Phase:</p>
              <ul className="text-xs space-y-1">
                <li>• Sequential device commissioning</li>
                <li>• Network topology optimisation</li>
                <li>• Testing at each installation stage</li>
                <li>• Documentation of all configurations</li>
              </ul>
            </div>
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Configuration Phase:</p>
              <ul className="text-xs space-y-1">
                <li>• Scene programming and testing</li>
                <li>• Sensor calibration and adjustment</li>
                <li>• Emergency protocol verification</li>
                <li>• User interface customisation</li>
              </ul>
            </div>
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Handover Phase:</p>
              <ul className="text-xs space-y-1">
                <li>• Comprehensive system demonstration</li>
                <li>• Emergency procedure training</li>
                <li>• Troubleshooting guide provision</li>
                <li>• Maintenance schedule establishment</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-yellow-600/10 p-4 rounded-lg border border-yellow-600/30">
          <h4 className="text-yellow-400 font-semibold mb-3">Common Installation Challenges</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Technical Challenges:</p>
              <ul className="text-xs space-y-1">
                <li>• Existing wiring limitations and upgrades</li>
                <li>• Load compatibility with smart dimmers</li>
                <li>• Network coverage in large properties</li>
                <li>• Integration with existing security systems</li>
              </ul>
            </div>
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Solutions and Workarounds:</p>
              <ul className="text-xs space-y-1">
                <li>• Bypass modules for switch neutrals</li>
                <li>• LED-compatible dimmer selection</li>
                <li>• Mesh network optimisation strategies</li>
                <li>• API-based integration approaches</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};