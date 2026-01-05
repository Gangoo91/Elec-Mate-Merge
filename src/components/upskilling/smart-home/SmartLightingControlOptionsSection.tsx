import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Smartphone, Settings, Cpu, Mic } from 'lucide-react';

export const SmartLightingControlOptionsSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Smartphone className="h-6 w-6 text-elec-yellow" />
          Smart Lighting Control Options
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-foreground">
          Modern smart lighting offers multiple control methods, each with specific installation 
          requirements and compatibility considerations.
        </p>

        <div className="grid gap-4">
          <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
            <div className="flex items-center gap-2 mb-3">
              <Settings className="h-5 w-5 text-elec-yellow" />
              <h4 className="text-foreground font-semibold">Smart Dimmers</h4>
            </div>
            <p className="text-gray-300 text-sm mb-2">Replace wall dimmers, integrate with smart home hubs</p>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Direct replacement for existing dimmers</li>
              <li>• WiFi or hub-based connectivity</li>
              <li>• App and voice control integration</li>
              <li>• Advanced scheduling capabilities</li>
            </ul>
          </div>

          <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
            <div className="flex items-center gap-2 mb-3">
              <Cpu className="h-5 w-5 text-elec-yellow" />
              <h4 className="text-foreground font-semibold">In-Line Controllers</h4>
            </div>
            <p className="text-gray-300 text-sm mb-2">Sit behind existing switches to add smart functionality</p>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Retrofit solution for existing installations</li>
              <li>• Keep original switch appearance</li>
              <li>• Micro-modules fit in standard back boxes</li>
              <li>• Ideal for heritage or rental properties</li>
            </ul>
          </div>

          <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
            <div className="flex items-center gap-2 mb-3">
              <Settings className="h-5 w-5 text-elec-yellow" />
              <h4 className="text-foreground font-semibold">Dedicated Drivers</h4>
            </div>
            <p className="text-gray-300 text-sm mb-2">For LED strips and low-voltage systems</p>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• PWM control for precise dimming</li>
              <li>• RGBW strip compatibility</li>
              <li>• Remote control and automation</li>
              <li>• Professional installation required</li>
            </ul>
          </div>

          <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
            <div className="flex items-center gap-2 mb-3">
              <Mic className="h-5 w-5 text-elec-yellow" />
              <h4 className="text-foreground font-semibold">App/Voice Control</h4>
            </div>
            <p className="text-gray-300 text-sm mb-2">Digital interface overlaying physical controls</p>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Smartphone app interfaces</li>
              <li>• Voice assistant integration</li>
              <li>• Remote access and monitoring</li>
              <li>• Scene and schedule programming</li>
            </ul>
          </div>
        </div>

        <div className="bg-blue-900/20 border border-blue-600/50 p-4 rounded-lg">
          <p className="text-blue-200 text-sm">
            <strong>Installation Tip:</strong> Always ensure adequate neutral wire provision for 
            smart controls, as many require a permanent live and neutral connection.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};