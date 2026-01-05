import { Settings, CheckCircle, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const SmartHomeModule2Section3RealWorld = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Settings className="h-5 w-5 text-elec-yellow" />
          Real-World Scenario
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-foreground">
        
        <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
          <h4 className="text-blue-400 font-semibold mb-3">The Situation</h4>
          <p className="text-foreground">
            Sarah is upgrading her smart home with devices from multiple manufacturers:
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Ring video doorbell (Wi-Fi) for high-quality video streaming</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>August smart lock (Bluetooth) for smartphone proximity unlocking</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Nanoleaf light panels (Thread) for efficient mesh lighting</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Eve contact sensors (Thread) for window monitoring</span>
            </li>
          </ul>
        </div>

        <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
          <h4 className="text-red-400 font-semibold mb-3">Initial Problems</h4>
          <ul className="space-y-2 text-sm text-foreground">
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Four different apps required for device control</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Complex automation setup across platforms</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Limited cross-device integration</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Guest access requires multiple app installations</span>
            </li>
          </ul>
        </div>

        <div className="flex items-center justify-center py-4">
          <div className="flex items-center gap-3 text-elec-yellow">
            <span className="text-sm font-medium">Matter Upgrade</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>

        <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
          <h4 className="text-green-400 font-semibold mb-3">After Matter Implementation</h4>
          <p className="text-foreground mb-3">
            Sarah replaces devices with Matter-certified equivalents and adds a Thread border router:
          </p>
          <ul className="space-y-2 text-sm text-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span>Single app (Apple Home, Google Home, or Alexa) controls all devices</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span>Seamless automation: "Doorbell pressed → Lights turn on → Lock status checked"</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span>Guest access through any major smart home platform</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span>Local processing reduces dependence on cloud services</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span>Future device purchases guaranteed to work with existing setup</span>
            </li>
          </ul>
        </div>

        <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
          <h4 className="text-yellow-400 font-semibold mb-3">Key Learning Points</h4>
          <ul className="space-y-2 text-sm text-foreground">
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
              <span><strong>Protocol Selection:</strong> Each protocol served its purpose - Wi-Fi for video, Bluetooth for proximity, Thread for efficiency</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
              <span><strong>Matter's Role:</strong> Unified the experience without replacing the underlying protocols</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
              <span><strong>User Experience:</strong> Technology choice dramatically impacts daily usability</span>
            </li>
          </ul>
        </div>

        <div className="bg-elec-dark border border-gray-600 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-2">Discussion Question:</h4>
          <p className="text-sm text-foreground">
            What improvements does Matter bring to Sarah's situation, and why couldn't these be achieved with traditional protocol bridges or hubs?
          </p>
        </div>

      </CardContent>
    </Card>
  );
};