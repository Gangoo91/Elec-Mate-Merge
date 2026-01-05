import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, ArrowRight } from 'lucide-react';

export const SmartHomeModule2Section1Summary = () => {
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
              <h4 className="font-semibold text-foreground mb-3">Key Takeaways</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                  <span>Wireless protocols define how smart devices communicate and determine system performance</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                  <span>Each protocol has strengths: Wi-Fi for bandwidth, Zigbee/Z-Wave for battery life, Bluetooth for mobile integration</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                  <span>Mesh protocols (Zigbee, Z-Wave, Thread) create self-healing networks that extend range</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                  <span>Protocol choice affects compatibility, power use, reliability, and security</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-foreground mb-3">Practical Applications</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                  <span>Use Zigbee/Z-Wave for battery-powered sensors and lighting controls</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                  <span>Choose Wi-Fi for cameras, voice assistants, and high-data devices</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                  <span>Consider Thread/Matter for future-proof, interoperable installations</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                  <span>Mixed protocol systems can work together with proper hub selection</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-600 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <ArrowRight className="h-5 w-5 text-elec-yellow" />
            <h4 className="font-semibold text-foreground">Next: Zigbee vs Z-Wave Deep Dive</h4>
          </div>
          <p className="text-sm text-gray-300">
            In the next section, we'll explore the detailed differences between Zigbee and Z-Wave protocols, 
            comparing their mesh networking capabilities, range characteristics, and power consumption in real-world scenarios.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};