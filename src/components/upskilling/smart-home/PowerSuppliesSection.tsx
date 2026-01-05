import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Battery, AlertCircle } from 'lucide-react';
import PowerSupplyQuickCheck from './PowerSupplyQuickCheck';

const PowerSuppliesSection = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Battery className="h-6 w-6 text-elec-yellow" />
            Power Supplies and Load Considerations
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-4">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Power Rating Verification</h4>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Always verify the power rating of the device and the supply
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Check both steady-state and peak power requirements
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Allow for derating factors (temperature, aging, etc.)
                </li>
              </ul>
            </div>

            <div className="bg-red-900/20 border border-red-600/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h5 className="font-semibold text-red-200 mb-1">Avoid Circuit Overloading</h5>
                  <p className="text-red-100 text-sm">
                    Group loads carefully to prevent nuisance tripping. Calculate total load including 
                    standby consumption of all connected smart devices.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-2">Power Supply Selection</h4>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Use dedicated transformers or power supplies where required
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Select power supplies with appropriate safety certifications
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Consider efficiency ratings and thermal management
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-2">Standby Consumption</h4>
              <p className="text-gray-300 mb-2">
                Smart devices still draw power even when idle or in standby mode. Consider:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Network connectivity power requirements
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Status indicator power consumption
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Cumulative effect of multiple devices on circuits
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <PowerSupplyQuickCheck />
    </div>
  );
};

export default PowerSuppliesSection;