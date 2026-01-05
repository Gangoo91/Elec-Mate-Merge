import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gauge } from 'lucide-react';

export const SmartRadiatorValvesSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Gauge className="h-5 w-5 text-elec-yellow" />
          Smart Radiator Valves (TRVs)
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <p>
          Smart TRVs replace traditional manual thermostatic radiator valves with motorised actuators that can be controlled remotely, providing precise room-level heating control.
        </p>
        
        <div className="bg-elec-gray border border-gray-600 rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-3">How They Work</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-1.5 flex-shrink-0"></div>
              Motorised actuator adjusts flow based on thermostat input
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-1.5 flex-shrink-0"></div>
              Controlled individually via app or hub to create room-level zoning
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-1.5 flex-shrink-0"></div>
              Battery powered with wireless communication (Zigbee/Z-Wave/Wi-Fi)
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-1.5 flex-shrink-0"></div>
              Built-in temperature sensors for accurate room monitoring
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-elec-gray border border-blue-600 rounded-lg p-4">
            <h4 className="font-semibold text-blue-200 mb-3">Popular Examples</h4>
            <ul className="space-y-2 text-sm text-blue-100">
              <li>• Tado Smart TRVs</li>
              <li>• Honeywell HR92</li>
              <li>• Hive Radiator Valves</li>
              <li>• Drayton Wiser TRVs</li>
            </ul>
          </div>
          
          <div className="bg-elec-gray border border-green-600 rounded-lg p-4">
            <h4 className="font-semibold text-green-200 mb-3">Key Benefits</h4>
            <ul className="space-y-2 text-sm text-green-100">
              <li>• Reduce wasted heating in unused rooms</li>
              <li>• Increase comfort with precise control</li>
              <li>• Easy retrofit installation</li>
              <li>• Individual room scheduling</li>
            </ul>
          </div>
        </div>

        <div className="bg-elec-gray border border-gray-600 rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-3">Installation Considerations</h4>
          <p className="text-sm mb-2">
            Smart TRVs typically fit standard radiator valve connections but require battery power and wireless signal coverage. Consider valve orientation and accessibility for battery replacement.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};