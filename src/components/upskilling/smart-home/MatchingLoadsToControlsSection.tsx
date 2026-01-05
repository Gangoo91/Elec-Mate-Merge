import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, ArrowRight } from 'lucide-react';

export const MatchingLoadsToControlsSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Target className="h-6 w-6 text-elec-yellow" />
          Matching Loads to Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-foreground">
          Proper matching of load types to control methods is essential for safety, performance, 
          and reliability. Follow these proven combinations:
        </p>

        <div className="grid gap-4">
          <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
              <h4 className="text-foreground font-semibold">Incandescent/Halogen</h4>
              <ArrowRight className="h-4 w-4 text-gray-400" />
              <span className="text-gray-300 text-sm">Leading or trailing-edge dimmers</span>
            </div>
            <ul className="text-gray-300 text-sm space-y-1 ml-6">
              <li>• Universal compatibility with most dimmers</li>
              <li>• Smooth dimming from 1-100%</li>
              <li>• No minimum load issues</li>
              <li>• Traditional or smart controls work well</li>
            </ul>
          </div>

          <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              <h4 className="text-foreground font-semibold">LEDs</h4>
              <ArrowRight className="h-4 w-4 text-gray-400" />
              <span className="text-gray-300 text-sm">Trailing-edge or smart dimmers only</span>
            </div>
            <ul className="text-gray-300 text-sm space-y-1 ml-6">
              <li>• Must be dimmable LEDs</li>
              <li>• Check manufacturer compatibility lists</li>
              <li>• Consider smart bulbs for best results</li>
              <li>• Watch for minimum load requirements</li>
            </ul>
          </div>

          <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <h4 className="text-foreground font-semibold">Fluorescents</h4>
              <ArrowRight className="h-4 w-4 text-gray-400" />
              <span className="text-gray-300 text-sm">Specialist dimming ballasts</span>
            </div>
            <ul className="text-gray-300 text-sm space-y-1 ml-6">
              <li>• 0-10V control systems</li>
              <li>• DALI (Digital Addressable Lighting Interface)</li>
              <li>• Requires compatible ballasts</li>
              <li>• Professional installation recommended</li>
            </ul>
          </div>

          <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
              <h4 className="text-foreground font-semibold">LED Strips</h4>
              <ArrowRight className="h-4 w-4 text-gray-400" />
              <span className="text-gray-300 text-sm">PWM drivers or DMX controllers</span>
            </div>
            <ul className="text-gray-300 text-sm space-y-1 ml-6">
              <li>• Dedicated LED drivers required</li>
              <li>• PWM for dimming and colour control</li>
              <li>• DMX for complex installations</li>
              <li>• 12V or 24V low-voltage operation</li>
            </ul>
          </div>
        </div>

        <div className="bg-red-900/20 border border-red-600/50 p-4 rounded-lg">
          <p className="text-red-200 text-sm">
            <strong>Safety Rule:</strong> Always match control technology to load type for safety 
            and performance. When in doubt, consult manufacturer compatibility guides.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};