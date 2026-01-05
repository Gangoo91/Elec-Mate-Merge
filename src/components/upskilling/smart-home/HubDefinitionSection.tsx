import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CircleDot } from 'lucide-react';

export const HubDefinitionSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <CircleDot className="h-5 w-5 text-elec-yellow" />
          What is a Hub?
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-900/10 border border-blue-600/20 rounded-lg">
            <h4 className="font-semibold text-blue-200 mb-3">Central Coordination</h4>
            <ul className="text-blue-100 text-sm space-y-2">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></span>
                Coordinates communication between sensors, actuators, and controllers
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></span>
                Manages local automation rules and schedules
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></span>
                Provides single point of control for the entire system
              </li>
            </ul>
          </div>
          
          <div className="p-4 bg-green-900/10 border border-green-600/20 rounded-lg">
            <h4 className="font-semibold text-green-200 mb-3">Protocol Bridging</h4>
            <ul className="text-green-100 text-sm space-y-2">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></span>
                Acts as a bridge between different protocols (Zigbee, Z-Wave, Thread, Wi-Fi)
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></span>
                Enables devices from different manufacturers to work together
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></span>
                Translates between protocol languages and commands
              </li>
            </ul>
          </div>
        </div>

        <div className="p-4 bg-elec-dark border border-gray-600 rounded-lg">
          <h4 className="font-medium text-elec-yellow mb-2">Common Hub Examples:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-gray-300 text-sm">
            <div className="text-center">
              <span className="font-medium">Samsung SmartThings</span>
            </div>
            <div className="text-center">
              <span className="font-medium">Hubitat Elevation</span>
            </div>
            <div className="text-center">
              <span className="font-medium">Home Assistant</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};