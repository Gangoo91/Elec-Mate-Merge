import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GitBranch, ArrowRightLeft, Cpu, Cloud, Home } from 'lucide-react';

export const BridgeDefinitionSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <GitBranch className="h-5 w-5 text-elec-yellow" />
          What is a Bridge?
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-6">
        <div className="bg-blue-900/10 border border-blue-600/20 rounded-lg p-4">
          <h4 className="text-blue-200 font-semibold mb-2">Definition</h4>
          <p className="text-blue-100">
            A <strong>bridge</strong> is a device or software that translates between different protocols or ecosystems, acting like a "universal translator" in smart homes.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-foreground font-semibold flex items-center gap-2">
            <ArrowRightLeft className="h-4 w-4 text-yellow-400" />
            How Bridges Work
          </h4>
          
          <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-4">
            <div className="flex items-center justify-between text-sm mb-3">
              <span className="text-purple-400 font-medium">Zigbee Device</span>
              <ArrowRightLeft className="h-4 w-4 text-yellow-400" />
              <span className="text-blue-400 font-medium">Bridge</span>
              <ArrowRightLeft className="h-4 w-4 text-yellow-400" />
              <span className="text-green-400 font-medium">Wi-Fi/Cloud</span>
              <ArrowRightLeft className="h-4 w-4 text-yellow-400" />
              <span className="text-orange-400 font-medium">Alexa/Google</span>
            </div>
            <p className="text-gray-400 text-xs">
              Example: Philips Hue Bridge translates Zigbee commands to Wi-Fi, enabling voice control
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-900/10 border border-green-600/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Cpu className="h-4 w-4 text-green-400" />
              <h5 className="text-green-400 font-medium">Hardware Bridges</h5>
            </div>
            <ul className="text-sm space-y-1 text-green-200">
              <li>• Dedicated hub devices</li>
              <li>• Built-in protocol radios</li>
              <li>• Plug-and-play setup</li>
              <li>• Manufacturer optimised</li>
            </ul>
          </div>
          
          <div className="bg-purple-900/10 border border-purple-600/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Cloud className="h-4 w-4 text-purple-400" />
              <h5 className="text-purple-400 font-medium">Software Bridges</h5>
            </div>
            <ul className="text-sm space-y-1 text-purple-200">
              <li>• Home Assistant</li>
              <li>• Raspberry Pi solutions</li>
              <li>• OpenHAB</li>
              <li>• Custom integrations</li>
            </ul>
          </div>
        </div>

        <div className="bg-amber-900/10 border border-amber-600/20 rounded-lg p-4">
          <h4 className="text-amber-200 font-semibold mb-2">Real-World Bridge Example</h4>
          <div className="text-amber-100 text-sm space-y-2">
            <p>
              <strong>Scenario:</strong> Client has Philips Hue Zigbee bulbs and wants Alexa voice control.
            </p>
            <p>
              <strong>Problem:</strong> Alexa Echo devices don't have built-in Zigbee radios.
            </p>
            <p>
              <strong>Solution:</strong> Philips Hue Bridge acts as translator: Zigbee ↔ Wi-Fi ↔ Alexa Cloud
            </p>
          </div>
        </div>

        <div className="bg-blue-900/10 border border-blue-600/20 rounded-lg p-4">
          <h4 className="text-blue-200 font-semibold mb-3">Bridge Functions</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <ArrowRightLeft className="h-4 w-4 text-blue-400" />
              <span className="text-blue-100">Protocol Translation</span>
            </div>
            <div className="flex items-center gap-2">
              <Cloud className="h-4 w-4 text-blue-400" />
              <span className="text-blue-100">Cloud Connectivity</span>
            </div>
            <div className="flex items-center gap-2">
              <Home className="h-4 w-4 text-blue-400" />
              <span className="text-blue-100">Local Processing</span>
            </div>
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-blue-400" />
              <span className="text-blue-100">Device Management</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};