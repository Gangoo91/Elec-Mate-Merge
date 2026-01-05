import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, ArrowRight } from 'lucide-react';

export const SmartHomeModule2Section2Summary = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Section Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-foreground mb-3">Key Differences</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                  <span>Z-Wave has superior range and wall penetration due to sub-1GHz frequency</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                  <span>Zigbee supports unlimited devices vs Z-Wave's 232 device limit</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                  <span>Both offer ultra-low power consumption for battery devices</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-foreground mb-3">Selection Guidance</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                  <span>Choose Zigbee for dense device networks and budget installations</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                  <span>Choose Z-Wave for large homes and professional security systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                  <span>Both require compatible hubs for integration</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-600 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <ArrowRight className="h-5 w-5 text-elec-yellow" />
            <h4 className="font-semibold text-foreground">Next: Wi-Fi, Bluetooth, Thread, and Matter</h4>
          </div>
          <p className="text-sm text-gray-300">
            In the next section, we'll explore additional protocols including Wi-Fi for high-bandwidth devices, 
            Bluetooth for personal integration, and the emerging Thread and Matter standards.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};