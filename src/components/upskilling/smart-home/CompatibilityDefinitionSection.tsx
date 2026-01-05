import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Workflow, Wifi, Home, AlertCircle } from 'lucide-react';

export const CompatibilityDefinitionSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Shield className="h-5 w-5 text-elec-yellow" />
          What is Compatibility?
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-6">
        <div className="bg-blue-900/10 border border-blue-600/20 rounded-lg p-4">
          <h4 className="text-blue-200 font-semibold mb-2">Definition</h4>
          <p className="text-blue-100">
            <strong>Compatibility</strong> is the ability of devices to work together within an ecosystem, sharing data and responding to commands from the same control interface.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-foreground font-semibold">Compatibility is Controlled by:</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Workflow className="h-4 w-4 text-yellow-400" />
                <h5 className="text-yellow-400 font-medium">Protocols</h5>
              </div>
              <ul className="text-sm space-y-1 text-gray-400">
                <li>• Zigbee 3.0</li>
                <li>• Z-Wave</li>
                <li>• Wi-Fi</li>
                <li>• Thread/Matter</li>
                <li>• Bluetooth</li>
              </ul>
            </div>
            
            <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Home className="h-4 w-4 text-green-400" />
                <h5 className="text-green-400 font-medium">Platforms</h5>
              </div>
              <ul className="text-sm space-y-1 text-gray-400">
                <li>• Amazon Alexa</li>
                <li>• Google Home</li>
                <li>• Apple HomeKit</li>
                <li>• Samsung SmartThings</li>
                <li>• Home Assistant</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-amber-900/10 border border-amber-600/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-amber-200 font-semibold mb-2">Example Compatibility Issue</h4>
              <p className="text-amber-100 text-sm">
                A Zigbee motion sensor may not work directly with Amazon Alexa because Alexa doesn't have a built-in Zigbee radio. A compatible hub or bridge is needed to translate between the protocols.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-green-900/10 border border-green-600/20 rounded-lg p-4">
          <h4 className="text-green-200 font-semibold mb-2">Key Compatibility Factors</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Wifi className="h-4 w-4 text-green-400" />
              <span className="text-green-100">Protocol Support</span>
            </div>
            <div className="flex items-center gap-2">
              <Home className="h-4 w-4 text-green-400" />
              <span className="text-green-100">Platform Integration</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-400" />
              <span className="text-green-100">Security Standards</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};