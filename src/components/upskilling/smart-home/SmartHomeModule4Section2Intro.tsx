import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';

export const SmartHomeModule4Section2Intro = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Info className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <p>
          Smart home heating systems don't just control thermostats — they integrate directly with heat sources and emitters, such as radiators, boilers, and heat pumps. This section explores how smart valves regulate room heating, how boilers interface with smart controllers, and how heat pumps can be managed for maximum efficiency.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="p-4 bg-elec-gray border border-blue-600 rounded-lg">
            <h4 className="font-semibold text-blue-200 mb-2">Smart TRVs</h4>
            <p className="text-blue-100 text-sm">Motorised radiator valves providing room-level heating control with wireless connectivity and app integration.</p>
          </div>
          
          <div className="p-4 bg-elec-gray border border-green-600 rounded-lg">
            <h4 className="font-semibold text-green-200 mb-2">Boiler Integration</h4>
            <p className="text-green-100 text-sm">Smart controls interface with boilers via relay or digital protocols for efficient modulating control.</p>
          </div>
          
          <div className="p-4 bg-elec-gray border border-purple-600 rounded-lg">
            <h4 className="font-semibold text-purple-200 mb-2">Heat Pumps</h4>
            <p className="text-purple-100 text-sm">Advanced controls optimise heat pump operation with weather compensation and predictive algorithms.</p>
          </div>
        </div>

        <p>
          Understanding how these components work together is essential for creating efficient, responsive heating systems that maximise comfort whilst minimising energy consumption.
        </p>
      </CardContent>
    </Card>
  );
};