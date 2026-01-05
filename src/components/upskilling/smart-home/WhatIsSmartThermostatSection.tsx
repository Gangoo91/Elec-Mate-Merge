import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Thermometer } from 'lucide-react';

export const WhatIsSmartThermostatSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Thermometer className="h-5 w-5 text-elec-yellow" />
          What is a Smart Thermostat?
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <p>
          A smart thermostat is an electronic device that allows app/voice/web-based temperature control, replacing traditional wall thermostats with enhanced functions and connectivity.
        </p>
        
        <div className="bg-elec-gray border border-gray-600 rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-3">Popular Examples</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
            <div className="text-center p-2 bg-[#1a1a1a] rounded">
              <span className="text-elec-yellow font-medium">Nest</span>
            </div>
            <div className="text-center p-2 bg-[#1a1a1a] rounded">
              <span className="text-elec-yellow font-medium">Hive</span>
            </div>
            <div className="text-center p-2 bg-[#1a1a1a] rounded">
              <span className="text-elec-yellow font-medium">Tado</span>
            </div>
            <div className="text-center p-2 bg-[#1a1a1a] rounded">
              <span className="text-elec-yellow font-medium">Honeywell Evohome</span>
            </div>
          </div>
        </div>

        <div className="bg-elec-gray border border-gray-600 rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-3">Key Features</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-1.5 flex-shrink-0"></div>
              Remote access via smartphone apps
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-1.5 flex-shrink-0"></div>
              Advanced scheduling and programming
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-1.5 flex-shrink-0"></div>
              Geofencing for automatic control
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-1.5 flex-shrink-0"></div>
              Energy monitoring and reporting
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};