import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckSquare, TestTube2 } from 'lucide-react';
import TestingRequirementsQuickCheck from '@/components/upskilling/smart-home/TestingRequirementsQuickCheck';

const TestingVerificationSection = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <CheckSquare className="h-6 w-6 text-elec-yellow" />
            Testing and Verification
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-300">
            Once paired, each device must be thoroughly tested to ensure proper operation and integration with the overall system.
          </p>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <TestTube2 className="h-4 w-4 text-elec-yellow" />
              Testing Checklist
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-[#1a1a1a] rounded-lg">
                <h5 className="font-medium text-foreground mb-2">Individual Device Tests</h5>
                <ul className="space-y-1 text-gray-300 text-sm">
                  <li>✓ Basic on/off functionality</li>
                  <li>✓ Response to manual commands</li>
                  <li>✓ Correct operation parameters</li>
                  <li>✓ Status reporting accuracy</li>
                </ul>
              </div>

              <div className="p-4 bg-[#1a1a1a] rounded-lg">
                <h5 className="font-medium text-foreground mb-2">System Integration Tests</h5>
                <ul className="space-y-1 text-gray-300 text-sm">
                  <li>✓ Automation routines function</li>
                  <li>✓ Device interactions work</li>
                  <li>✓ Scheduling operates correctly</li>
                  <li>✓ Scene activation successful</li>
                </ul>
              </div>

              <div className="p-4 bg-[#1a1a1a] rounded-lg">
                <h5 className="font-medium text-foreground mb-2">Naming and Organisation</h5>
                <ul className="space-y-1 text-gray-300 text-sm">
                  <li>✓ Descriptive device names</li>
                  <li>✓ Logical room groupings</li>
                  <li>✓ Clear scene descriptions</li>
                  <li>✓ Organised dashboard layout</li>
                </ul>
              </div>

              <div className="p-4 bg-[#1a1a1a] rounded-lg">
                <h5 className="font-medium text-foreground mb-2">Remote Access Tests</h5>
                <ul className="space-y-1 text-gray-300 text-sm">
                  <li>✓ Client's smartphone app works</li>
                  <li>✓ Remote control functions properly</li>
                  <li>✓ Cloud connectivity stable</li>
                  <li>✓ Notifications work correctly</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-red-900/20 border border-red-600/30 rounded-lg p-4">
            <h4 className="font-semibold text-red-200 mb-2">Common Naming Mistakes</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-red-400 font-medium">❌ Poor Names:</span>
                <ul className="text-red-100 mt-1 space-y-1">
                  <li>• "Device 3"</li>
                  <li>• "Light Switch"</li>
                  <li>• "Sensor 1"</li>
                  <li>• "Bulb"</li>
                </ul>
              </div>
              <div>
                <span className="text-green-400 font-medium">✅ Good Names:</span>
                <ul className="text-green-100 mt-1 space-y-1">
                  <li>• "Kitchen Ceiling Light"</li>
                  <li>• "Living Room Dimmer"</li>
                  <li>• "Front Door Sensor"</li>
                  <li>• "Bedroom Table Lamp"</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <TestingRequirementsQuickCheck />
    </div>
  );
};

export default TestingVerificationSection;