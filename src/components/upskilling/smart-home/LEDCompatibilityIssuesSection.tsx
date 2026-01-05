import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Lightbulb, Settings, Gauge } from 'lucide-react';

export const LEDCompatibilityIssuesSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-elec-yellow" />
          LED Compatibility Issues
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-foreground">
          LEDs present unique challenges when it comes to dimming and control, requiring careful 
          attention to compatibility to avoid common problems.
        </p>

        <div className="grid gap-4">
          <div className="bg-red-900/20 border border-red-600/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="h-5 w-5 text-red-400" />
              <h4 className="text-red-300 font-semibold">Not All LEDs Are Dimmable</h4>
            </div>
            <ul className="text-red-200 text-sm space-y-1">
              <li>• Non-dimmable LEDs can be damaged by dimmers</li>
              <li>• Always check product labelling</li>
              <li>• Some LEDs work only with specific dimmer types</li>
              <li>• Driver compatibility is crucial</li>
            </ul>
          </div>

          <div className="bg-amber-900/20 border border-amber-600/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Settings className="h-5 w-5 text-amber-400" />
              <h4 className="text-amber-300 font-semibold">Wrong Dimmer Type Effects</h4>
            </div>
            <ul className="text-amber-200 text-sm space-y-1">
              <li>• Flickering or strobing</li>
              <li>• Audible buzzing or humming</li>
              <li>• Premature lamp failure</li>
              <li>• Poor dimming range (won't dim low)</li>
            </ul>
          </div>

          <div className="bg-blue-900/20 border border-blue-600/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Gauge className="h-5 w-5 text-blue-400" />
              <h4 className="text-blue-300 font-semibold">Minimum Load Requirements</h4>
            </div>
            <p className="text-blue-200 text-sm mb-2">
              Some dimmers need minimum wattage to function properly:
            </p>
            <ul className="text-blue-200 text-sm space-y-1">
              <li>• Traditional dimmers: often 40-60W minimum</li>
              <li>• Smart dimmers: usually lower requirements</li>
              <li>• Use dummy loads if total wattage too low</li>
              <li>• Check manufacturer specifications</li>
            </ul>
          </div>

          <div className="bg-green-900/20 border border-green-600/50 p-4 rounded-lg">
            <h4 className="text-green-300 font-semibold mb-2">Solution: Compatibility Verification</h4>
            <ul className="text-green-200 text-sm space-y-1">
              <li>• Always check manufacturer compatibility charts</li>
              <li>• Test combinations before full installation</li>
              <li>• Use approved LED/dimmer pairings</li>
              <li>• Consider smart bulbs with built-in dimming</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};