import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, CheckCircle, XCircle, Brain } from 'lucide-react';

export const PIRSensorsSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Eye className="h-5 w-5 text-elec-yellow" />
          PIR Sensors (Passive Infrared)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-[#1a1a1a] border border-gray-600 rounded-lg">
            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Eye className="h-4 w-4 text-blue-400" />
              How They Work
            </h4>
            <p className="text-gray-300 text-sm">
              PIR sensors detect <strong className="text-foreground">infrared radiation from body heat</strong>. When a warm body moves through the detection zone, it creates changes in IR levels that trigger the sensor.
            </p>
          </div>

          <div className="p-4 bg-[#1a1a1a] border border-gray-600 rounded-lg">
            <h4 className="font-semibold text-foreground mb-3">Typical Placement</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Hallways and corridors</li>
              <li>• Living rooms and main areas</li>
              <li>• Staircases and landings</li>
              <li>• Large open spaces</li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-[#1a1a1a] border border-green-600 rounded-lg">
            <h4 className="font-semibold text-green-200 mb-3 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              Advantages
            </h4>
            <ul className="text-green-100 text-sm space-y-1">
              <li>• Covers wide areas effectively</li>
              <li>• Reliable motion detection</li>
              <li>• Works in all light conditions</li>
              <li>• Low power consumption</li>
            </ul>
          </div>

          <div className="p-4 bg-[#1a1a1a] border border-red-600 rounded-lg">
            <h4 className="font-semibold text-red-200 mb-3 flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-400" />
              Limitations
            </h4>
            <ul className="text-red-100 text-sm space-y-1">
              <li>• False triggers from pets</li>
              <li>• Affected by sunlight and heat sources</li>
              <li>• May miss very slow movement</li>
              <li>• Heating vents can cause false alarms</li>
            </ul>
          </div>
        </div>

        <div className="p-4 bg-[#1a1a1a] border border-purple-600 rounded-lg">
          <h4 className="font-semibold text-purple-200 mb-3 flex items-center gap-2">
            <Brain className="h-4 w-4 text-purple-400" />
            Smart Features
          </h4>
          <ul className="text-purple-100 text-sm space-y-1">
            <li>• Conditional logic (e.g., only trigger lights after dark)</li>
            <li>• Pet-immune models with adjustable sensitivity</li>
            <li>• Integration with lighting and HVAC systems</li>
            <li>• Scheduled activation/deactivation</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};