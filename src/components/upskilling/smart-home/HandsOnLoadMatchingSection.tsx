import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, Target, Settings, AlertTriangle } from 'lucide-react';

export const HandsOnLoadMatchingSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Wrench className="h-6 w-6 text-elec-yellow" />
          Hands-On Load Matching Guide
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-foreground">
          Apply practical load matching techniques with this step-by-step guide for 
          common installation scenarios.
        </p>

        <div className="grid gap-4">
          <div className="bg-elec-dark p-5 rounded-lg border border-gray-600">
            <h4 className="text-foreground font-semibold mb-3 flex items-center gap-2">
              <Target className="h-5 w-5 text-green-400" />
              Scenario 1: Mixed Load Retrofit
            </h4>
            <p className="text-gray-300 text-sm mb-3">
              Client has existing incandescent downlights and wants to add smart LED strips.
            </p>
            <div className="space-y-2">
              <div className="bg-green-900/20 border-l-4 border-green-600 p-3">
                <h5 className="text-green-300 font-semibold text-sm">Solution</h5>
                <ul className="text-green-200 text-xs space-y-1 mt-1">
                  <li>• Keep incandescent on existing leading-edge dimmer</li>
                  <li>• Install separate PWM driver for LED strips</li>
                  <li>• Use smart home hub to coordinate both zones</li>
                  <li>• Program scenes to control both simultaneously</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-elec-dark p-5 rounded-lg border border-gray-600">
            <h4 className="text-foreground font-semibold mb-3 flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-400" />
              Scenario 2: Full LED Conversion
            </h4>
            <p className="text-gray-300 text-sm mb-3">
              Converting entire home from incandescent to dimmable LEDs.
            </p>
            <div className="space-y-2">
              <div className="bg-blue-900/20 border-l-4 border-blue-600 p-3">
                <h5 className="text-blue-300 font-semibold text-sm">Solution</h5>
                <ul className="text-blue-200 text-xs space-y-1 mt-1">
                  <li>• Replace all leading-edge with trailing-edge dimmers</li>
                  <li>• Choose LEDs from single manufacturer range</li>
                  <li>• Verify minimum load requirements met</li>
                  <li>• Consider smart dimmers for future flexibility</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-elec-dark p-5 rounded-lg border border-gray-600">
            <h4 className="text-foreground font-semibold mb-3 flex items-center gap-2">
              <Target className="h-5 w-5 text-purple-400" />
              Scenario 3: Commercial Office Lighting
            </h4>
            <p className="text-gray-300 text-sm mb-3">
              Office with fluorescent strip lights needs smart control for energy savings.
            </p>
            <div className="space-y-2">
              <div className="bg-purple-900/20 border-l-4 border-purple-600 p-3">
                <h5 className="text-purple-300 font-semibold text-sm">Solution</h5>
                <ul className="text-purple-200 text-xs space-y-1 mt-1">
                  <li>• Install DALI-compatible dimming ballasts</li>
                  <li>• Use 0-10V control for simpler systems</li>
                  <li>• Implement daylight harvesting sensors</li>
                  <li>• Add occupancy detection for automatic control</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-elec-dark p-5 rounded-lg border border-gray-600">
            <h4 className="text-foreground font-semibold mb-3 flex items-center gap-2">
              <Settings className="h-5 w-5 text-elec-yellow" />
              Load Matching Decision Matrix
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-gray-300">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="text-left p-2">Load Type</th>
                    <th className="text-left p-2">Best Control</th>
                    <th className="text-left p-2">Alternative</th>
                    <th className="text-left p-2">Avoid</th>
                  </tr>
                </thead>
                <tbody className="space-y-1">
                  <tr className="border-b border-gray-700">
                    <td className="p-2">Incandescent</td>
                    <td className="p-2 text-green-300">Any dimmer</td>
                    <td className="p-2 text-blue-300">Smart switch</td>
                    <td className="p-2 text-red-300">-</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="p-2">Dimmable LED</td>
                    <td className="p-2 text-green-300">Trailing-edge</td>
                    <td className="p-2 text-blue-300">Smart dimmer</td>
                    <td className="p-2 text-red-300">Leading-edge</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="p-2">LED Strips</td>
                    <td className="p-2 text-green-300">PWM Driver</td>
                    <td className="p-2 text-blue-300">DMX Controller</td>
                    <td className="p-2 text-red-300">Wall dimmer</td>
                  </tr>
                  <tr>
                    <td className="p-2">Fluorescent</td>
                    <td className="p-2 text-green-300">DALI Ballast</td>
                    <td className="p-2 text-blue-300">0-10V Control</td>
                    <td className="p-2 text-red-300">Standard dimmer</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="bg-red-900/20 border border-red-600/50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <h4 className="text-red-300 font-semibold text-sm">Critical Safety Note</h4>
          </div>
          <p className="text-red-200 text-sm">
            Always isolate circuits before installing or testing controls. Verify compatibility 
            ratings and never exceed manufacturer specifications.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};