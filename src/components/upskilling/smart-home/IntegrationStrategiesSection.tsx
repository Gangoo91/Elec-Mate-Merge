import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Layers } from 'lucide-react';

export const IntegrationStrategiesSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Layers className="h-5 w-5 text-elec-yellow" />
          4. Integration Strategies in Smart Homes
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <p className="leading-relaxed">
          Smart homes use various integration strategies to coordinate HVAC systems effectively. 
          These approaches ensure optimal comfort whilst minimising energy consumption through intelligent automation.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Primary Integration Methods:</h4>
            
            <div className="space-y-3">
              <div className="bg-red-950/30 border border-red-600 rounded-lg p-4">
                <h5 className="font-medium text-red-200 mb-2">Heating + Cooling</h5>
                <p className="text-sm text-red-100">
                  Thermostat prevents both systems operating simultaneously. Priority given to heating in winter modes, cooling in summer modes.
                </p>
              </div>
              
              <div className="bg-blue-950/30 border border-blue-600 rounded-lg p-4">
                <h5 className="font-medium text-blue-200 mb-2">Ventilation + Air Quality</h5>
                <p className="text-sm text-blue-100">
                  CO₂ sensors trigger fans and ventilation systems, not heating or cooling, when air quality drops.
                </p>
              </div>
              
              <div className="bg-green-950/30 border border-green-600 rounded-lg p-4">
                <h5 className="font-medium text-green-200 mb-2">Blinds + HVAC</h5>
                <p className="text-sm text-green-100">
                  Smart blinds close automatically to reduce cooling demand during hot weather or open to utilise solar heating.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Advanced Strategies:</h4>
            
            <div className="space-y-3">
              <div className="bg-purple-950/30 border border-purple-600 rounded-lg p-4">
                <h5 className="font-medium text-purple-200 mb-2">Smart Zoning</h5>
                <p className="text-sm text-purple-100 mb-2">
                  Each room/zone has linked controls for temperature and ventilation.
                </p>
                <ul className="text-xs text-purple-200 space-y-1">
                  <li>• Individual room thermostats</li>
                  <li>• Occupancy-based control</li>
                  <li>• Damper coordination</li>
                </ul>
              </div>
              
              <div className="bg-yellow-950/30 border border-yellow-600 rounded-lg p-4">
                <h5 className="font-medium text-yellow-200 mb-2">Load Management</h5>
                <p className="text-sm text-yellow-100 mb-2">
                  Coordinates HVAC with electrical demand and tariffs.
                </p>
                <ul className="text-xs text-yellow-200 space-y-1">
                  <li>• Peak demand reduction</li>
                  <li>• Time-of-use optimisation</li>
                  <li>• Battery integration</li>
                </ul>
              </div>
              
              <div className="bg-orange-950/30 border border-orange-600 rounded-lg p-4">
                <h5 className="font-medium text-orange-200 mb-2">Predictive Control</h5>
                <p className="text-sm text-orange-100 mb-2">
                  Uses weather forecasts and occupancy patterns.
                </p>
                <ul className="text-xs text-orange-200 space-y-1">
                  <li>• Pre-heating/cooling</li>
                  <li>• Weather compensation</li>
                  <li>• Learning algorithms</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#1a1a1a] border border-gray-600 rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-3">Integration Example in Practice:</h4>
          <p className="text-sm text-gray-300">
            A smart home system detects rising CO₂ levels in the living room. Instead of turning on heating, 
            it activates ventilation fans to bring in fresh air. If temperature drops due to ventilation, 
            it intelligently balances air quality needs with comfort by modulating both systems appropriately.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};