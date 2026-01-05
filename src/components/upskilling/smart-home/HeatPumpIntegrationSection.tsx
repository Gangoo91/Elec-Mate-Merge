import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wind } from 'lucide-react';

export const HeatPumpIntegrationSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Wind className="h-5 w-5 text-elec-yellow" />
          Heat Pump Integration
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <p>
          Heat pumps operate differently from traditional boilers, requiring specific smart control strategies to maximise their efficiency and performance in heating systems.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-elec-gray border border-blue-600 rounded-lg p-4">
            <h4 className="font-semibold text-blue-200 mb-3">Types of Heat Pumps</h4>
            <ul className="space-y-2 text-sm text-blue-100">
              <li>• Air-source heat pumps (ASHP)</li>
              <li>• Ground-source heat pumps (GSHP)</li>
              <li>• Hybrid heat pump systems</li>
              <li>• Water-source heat pumps</li>
            </ul>
          </div>
          
          <div className="bg-elec-gray border border-green-600 rounded-lg p-4">
            <h4 className="font-semibold text-green-200 mb-3">Operating Characteristics</h4>
            <ul className="space-y-2 text-sm text-green-100">
              <li>• Low-temperature heating systems</li>
              <li>• Require longer, steadier run times</li>
              <li>• Efficiency varies with outdoor temperature</li>
              <li>• Work best with continuous operation</li>
            </ul>
          </div>
        </div>

        <div className="bg-elec-gray border border-gray-600 rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-3">Smart Control Features</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium text-purple-200 mb-2">Optimisation Features</h5>
              <ul className="space-y-1 text-gray-300">
                <li>• Flow temperature optimisation</li>
                <li>• Weather compensation algorithms</li>
                <li>• Predictive heating controls</li>
                <li>• Defrost cycle management</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-orange-200 mb-2">Integration Benefits</h5>
              <ul className="space-y-1 text-gray-300">
                <li>• Maximised seasonal efficiency</li>
                <li>• Reduced electricity consumption</li>
                <li>• Enhanced comfort control</li>
                <li>• Remote monitoring capabilities</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-gray border border-gray-600 rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-3">System Requirements</h4>
          <p className="text-sm mb-3">
            Heat pumps work most efficiently with low-temperature heating distribution systems and require careful zoning to avoid energy waste.
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-1.5 flex-shrink-0"></div>
              Often paired with underfloor heating or fan coil units
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-1.5 flex-shrink-0"></div>
              Zoning critical to avoid wasting energy with heat pumps
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-1.5 flex-shrink-0"></div>
              Buffer tanks may be required for system stability
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};