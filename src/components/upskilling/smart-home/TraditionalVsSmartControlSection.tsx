import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ToggleLeft, Settings, Smartphone, Cpu } from 'lucide-react';

export const TraditionalVsSmartControlSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Settings className="h-6 w-6 text-elec-yellow" />
          Traditional vs Smart Control Types
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-foreground">
          Control methods range from simple switches to sophisticated smart controllers, each with 
          specific applications and compatibility requirements.
        </p>

        <div className="grid gap-4">
          <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
            <div className="flex items-center gap-2 mb-3">
              <ToggleLeft className="h-5 w-5 text-elec-yellow" />
              <h4 className="text-foreground font-semibold">On/Off Switches</h4>
            </div>
            <p className="text-gray-300 text-sm mb-2">Simple switching, works with any load type</p>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Universal compatibility</li>
              <li>• Reliable operation</li>
              <li>• No dimming capability</li>
            </ul>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
              <h4 className="text-foreground font-semibold mb-2">Leading-Edge Dimmers</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Older technology (TRIAC)</li>
                <li>• Designed for resistive/inductive loads</li>
                <li>• Can cause issues with LEDs</li>
                <li>• Cuts power at start of AC waveform</li>
              </ul>
            </div>

            <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
              <h4 className="text-foreground font-semibold mb-2">Trailing-Edge Dimmers</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Newer technology (MOSFET)</li>
                <li>• Better for capacitive loads (LEDs)</li>
                <li>• Smoother dimming performance</li>
                <li>• Cuts power at end of AC waveform</li>
              </ul>
            </div>
          </div>

          <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
            <div className="flex items-center gap-2 mb-3">
              <Smartphone className="h-5 w-5 text-elec-yellow" />
              <h4 className="text-foreground font-semibold">Smart Controllers</h4>
            </div>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Digital output adjustment</li>
              <li>• Often auto-detect load type</li>
              <li>• App and voice control integration</li>
              <li>• Advanced scheduling and automation</li>
            </ul>
          </div>

          <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
            <div className="flex items-center gap-2 mb-3">
              <Cpu className="h-5 w-5 text-elec-yellow" />
              <h4 className="text-foreground font-semibold">PWM (Pulse Width Modulation)</h4>
            </div>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Used in smart LED strip control</li>
              <li>• Digital switching at high frequency</li>
              <li>• Precise brightness control</li>
              <li>• Ideal for colour-changing applications</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};