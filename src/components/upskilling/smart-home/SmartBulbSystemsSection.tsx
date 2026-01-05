import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

export const SmartBulbSystemsSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-elec-yellow" />
          Smart Bulb Systems
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="bg-elec-dark p-4 rounded-lg">
          <p className="text-lg leading-relaxed mb-4">
            Smart bulbs place intelligence in each individual light fitting, communicating wirelessly to control systems. Understanding their technical limitations and optimal use cases prevents costly mistakes.
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-elec-yellow font-bold text-lg">Wi-Fi</div>
              <p className="text-xs">Direct router connection</p>
            </div>
            <div className="text-center">
              <div className="text-elec-yellow font-bold text-lg">Zigbee</div>
              <p className="text-xs">Mesh network via hub</p>
            </div>
            <div className="text-center">
              <div className="text-elec-yellow font-bold text-lg">Bluetooth</div>
              <p className="text-xs">Direct phone control</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-elec-yellow">Technical Comparison Matrix</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left p-2">Brand/Protocol</th>
                  <th className="text-left p-2">Price Range</th>
                  <th className="text-left p-2">Hub Required</th>
                  <th className="text-left p-2">Max Range</th>
                  <th className="text-left p-2">Colour Options</th>
                </tr>
              </thead>
              <tbody className="space-y-1">
                <tr className="border-b border-gray-700">
                  <td className="p-2"><strong>Philips Hue (Zigbee)</strong></td>
                  <td className="p-2">£45-90</td>
                  <td className="p-2 text-yellow-400">Yes (£50)</td>
                  <td className="p-2">10m through walls</td>
                  <td className="p-2 text-green-400">16 million</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="p-2"><strong>IKEA Tradfri (Zigbee)</strong></td>
                  <td className="p-2">£15-25</td>
                  <td className="p-2 text-yellow-400">Yes (£15)</td>
                  <td className="p-2">10m through walls</td>
                  <td className="p-2 text-orange-400">White spectrum</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="p-2"><strong>LIFX (Wi-Fi)</strong></td>
                  <td className="p-2">£35-65</td>
                  <td className="p-2 text-green-400">No</td>
                  <td className="p-2">WiFi coverage</td>
                  <td className="p-2 text-green-400">16 million</td>
                </tr>
                <tr>
                  <td className="p-2"><strong>TP-Link Kasa (Wi-Fi)</strong></td>
                  <td className="p-2">£12-30</td>
                  <td className="p-2 text-green-400">No</td>
                  <td className="p-2">WiFi coverage</td>
                  <td className="p-2 text-orange-400">White/RGB</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="p-4 bg-green-600/10 border-l-4 border-green-500 rounded-lg">
            <h5 className="font-semibold text-green-200 mb-3">✓ When Smart Bulbs Excel</h5>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-green-100 font-medium mb-2">Ideal Scenarios:</p>
                <ul className="text-green-100 space-y-1">
                  <li>• Table/floor lamps requiring colour changes</li>
                  <li>• Rental properties (fully reversible)</li>
                  <li>• Rooms with complex switching (2-way/3-way)</li>
                  <li>• Individual mood lighting zones</li>
                </ul>
              </div>
              <div>
                <p className="text-green-100 font-medium mb-2">Technical Benefits:</p>
                <ul className="text-green-100 space-y-1">
                  <li>• Zero electrical work required</li>
                  <li>• Per-bulb colour/brightness control</li>
                  <li>• Easy expansion and reconfiguration</li>
                  <li>• Works with any switch configuration</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-4 bg-red-600/10 border-l-4 border-red-500 rounded-lg">
            <h5 className="font-semibold text-red-200 mb-3">✗ Critical Limitations</h5>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-red-100 font-medium mb-2">Cost Challenges:</p>
                <ul className="text-red-100 space-y-1">
                  <li>• 10-room house: £1,500-4,500 in bulbs</li>
                  <li>• No cost reduction for bulk installation</li>
                  <li>• Replacement costs when bulbs fail</li>
                  <li>• Hub costs for Zigbee systems</li>
                </ul>
              </div>
              <div>
                <p className="text-red-100 font-medium mb-2">Operational Issues:</p>
                <ul className="text-red-100 space-y-1">
                  <li>• Wall switches must stay ON permanently</li>
                  <li>• Network congestion with 20+ bulbs</li>
                  <li>• Firmware updates can break functionality</li>
                  <li>• Battery drain on mobile control apps</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
          <h5 className="text-blue-200 font-medium mb-3">🔧 Practical Installation Steps</h5>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-blue-100 font-medium mb-2">Pre-Installation:</p>
              <ol className="text-blue-100 space-y-1 list-decimal list-inside">
                <li>Map existing light switch locations</li>
                <li>Test WiFi coverage in all bulb locations</li>
                <li>Install hub (Zigbee systems)</li>
                <li>Download manufacturer app</li>
              </ol>
            </div>
            <div>
              <p className="text-blue-100 font-medium mb-2">Configuration:</p>
              <ol className="text-blue-100 space-y-1 list-decimal list-inside">
                <li>Install bulbs and power on</li>
                <li>Add bulbs to app (pairing process)</li>
                <li>Group bulbs by room/function</li>
                <li>Set up scenes and automation rules</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
          <h5 className="text-yellow-200 font-medium mb-2">📊 Cost-Benefit Analysis</h5>
          <div className="text-sm text-yellow-100">
            <p className="mb-2"><strong>Break-even point:</strong> Smart bulbs become cost-prohibitive beyond 8-10 bulbs per property.</p>
            <p><strong>ROI considerations:</strong> Excellent for targeted applications (bedrooms, living areas) but expensive for whole-house lighting.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};