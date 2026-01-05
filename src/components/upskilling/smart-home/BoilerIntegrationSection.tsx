import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cpu } from 'lucide-react';

export const BoilerIntegrationSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Cpu className="h-5 w-5 text-elec-yellow" />
          Boiler Integration
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <p>
          Smart thermostats and controllers can interface with different types of boilers using various connection methods, from simple relay switching to advanced digital protocols.
        </p>
        
        <div className="bg-elec-gray border border-gray-600 rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-3">Types of Boilers</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="text-center p-3 bg-[#1a1a1a] rounded">
              <h5 className="font-medium text-blue-200 text-sm mb-1">Combi Boilers</h5>
              <p className="text-xs text-blue-100">Heat on demand</p>
            </div>
            <div className="text-center p-3 bg-[#1a1a1a] rounded">
              <h5 className="font-medium text-green-200 text-sm mb-1">System Boilers</h5>
              <p className="text-xs text-green-100">With hot water cylinder</p>
            </div>
            <div className="text-center p-3 bg-[#1a1a1a] rounded">
              <h5 className="font-medium text-purple-200 text-sm mb-1">Conventional</h5>
              <p className="text-xs text-purple-100">Separate tanks/cylinders</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-elec-gray border border-orange-600 rounded-lg p-4">
            <h4 className="font-semibold text-orange-200 mb-3">Connection Methods</h4>
            <ul className="space-y-2 text-sm text-orange-100">
              <li>• Relay switching (basic on/off)</li>
              <li>• Digital protocols (e.g., OpenTherm)</li>
              <li>• Volt-free contacts</li>
              <li>• Proprietary interfaces (eBUS)</li>
            </ul>
          </div>
          
          <div className="bg-elec-gray border border-red-600 rounded-lg p-4">
            <h4 className="font-semibold text-red-200 mb-3">Control Features</h4>
            <ul className="space-y-2 text-sm text-red-100">
              <li>• Basic on/off control</li>
              <li>• Modulating control (flame adjustment)</li>
              <li>• Weather compensation</li>
              <li>• Flow temperature optimisation</li>
            </ul>
          </div>
        </div>

        <div className="bg-elec-gray border border-gray-600 rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-3">Integration Examples</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-green-200 mb-2">Advanced Integration (OpenTherm)</p>
              <p className="text-gray-300">Nest supports OpenTherm for modulating control, allowing the thermostat to adjust boiler output based on heat demand.</p>
            </div>
            <div>
              <p className="font-medium text-blue-200 mb-2">Basic Integration (Relay)</p>
              <p className="text-gray-300">Hive typically uses simple on/off relay switching, which works with most boilers but doesn't provide modulation.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};