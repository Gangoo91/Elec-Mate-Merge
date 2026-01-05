import { TestTube, AlertTriangle, CheckCircle, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const Amendment3TestingContent = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <TestTube className="h-5 w-5 text-elec-yellow" />
          Amendment 3 Testing & Commissioning Procedures
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-gray-300">
          Amendment 3 introduces specific testing requirements for bidirectional protection systems in renewable energy installations.
        </p>

        {/* Bidirectional Protection Testing */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-elec-yellow" />
            Bidirectional Protection Device Testing
          </h3>
          <div className="bg-elec-dark p-4 rounded-lg">
            <h4 className="font-medium text-elec-yellow mb-2">Required Tests:</h4>
            <ul className="space-y-2 text-gray-300">
              <li>• <strong>Continuity Testing:</strong> Verify protection in both forward and reverse current directions</li>
              <li>• <strong>Operation Time Testing:</strong> Confirm disconnection times meet requirements under reverse current</li>
              <li>• <strong>Sensitivity Testing:</strong> Test RCD operation at rated current in both directions</li>
              <li>• <strong>Load Testing:</strong> Verify protection operates correctly under various load conditions</li>
            </ul>
          </div>
        </div>

        {/* Grid Interaction Testing */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Settings className="h-5 w-5 text-elec-yellow" />
            Grid Interaction Safety Testing
          </h3>
          <div className="bg-elec-dark p-4 rounded-lg">
            <h4 className="font-medium text-elec-yellow mb-2">Anti-Islanding Function Tests:</h4>
            <ul className="space-y-2 text-gray-300">
              <li>• <strong>Loss of Mains (LOM) Testing:</strong> Verify automatic disconnection when grid supply fails</li>
              <li>• <strong>Frequency Protection Testing:</strong> Test response to grid frequency variations</li>
              <li>• <strong>Voltage Protection Testing:</strong> Verify operation at voltage limit thresholds</li>
              <li>• <strong>Reconnection Delay Testing:</strong> Confirm proper restart sequence after grid restoration</li>
            </ul>
          </div>
        </div>

        {/* Consumer Unit Testing */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-elec-yellow" />
            Enhanced Consumer Unit Testing
          </h3>
          <div className="bg-elec-dark p-4 rounded-lg">
            <h4 className="font-medium text-elec-yellow mb-2">Specific Requirements:</h4>
            <ul className="space-y-2 text-gray-300">
              <li>• <strong>RCD Effectiveness:</strong> Test all RCDs under reverse current conditions</li>
              <li>• <strong>Main Switch Rating:</strong> Verify adequate breaking capacity for bidirectional operation</li>
              <li>• <strong>Overcurrent Protection:</strong> Test MCBs and fuses under reverse current scenarios</li>
              <li>• <strong>Earth Fault Loop:</strong> Measure impedance with renewable energy sources active</li>
            </ul>
          </div>
        </div>

        {/* Documentation Requirements */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Documentation & Compliance</h3>
          <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg">
            <p className="text-blue-300 mb-2">
              <strong>Amendment 3 requires specific documentation:</strong>
            </p>
            <ul className="space-y-1 text-blue-200">
              <li>• Test results for bidirectional protection devices</li>
              <li>• Grid interaction safety verification certificates</li>
              <li>• Anti-islanding function test records</li>
              <li>• Enhanced consumer unit compliance certificates</li>
              <li>• Commissioning reports for renewable energy systems</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};