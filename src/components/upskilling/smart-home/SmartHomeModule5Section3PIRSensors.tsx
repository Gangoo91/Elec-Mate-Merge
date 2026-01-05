import { Radar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const SmartHomeModule5Section3PIRSensors = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Radar className="h-6 w-6 text-green-500" />
          PIR Motion Sensors
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="bg-green-600/10 p-4 rounded-lg border border-green-600/30">
          <h4 className="text-foreground font-semibold mb-3">PIR Technology & Operation</h4>
          <p className="text-sm mb-3">
            Passive Infrared (PIR) sensors detect changes in infrared radiation caused by moving 
            warm objects, such as people or animals. They use fresnel lenses to focus infrared 
            energy onto pyroelectric sensors that generate electrical signals when heat patterns change.
          </p>
          <p className="text-sm">
            PIR sensors provide interior motion detection, creating a secondary layer of security 
            that activates when intruders move through protected spaces after bypassing perimeter defences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-foreground font-semibold text-lg mb-4">Strategic Placement Principles</h4>
            <div className="space-y-3">
              <div className="bg-blue-600/20 p-3 rounded border border-blue-600/40">
                <p className="text-blue-400 font-semibold text-sm mb-1">High-Traffic Areas</p>
                <p className="text-xs text-foreground">Hallways, staircases, main corridors, living rooms</p>
              </div>
              <div className="bg-purple-600/20 p-3 rounded border border-purple-600/40">
                <p className="text-purple-400 font-semibold text-sm mb-1">Corner Mounting</p>
                <p className="text-xs text-foreground">Room corners for maximum coverage and discrete positioning</p>
              </div>
              <div className="bg-green-600/20 p-3 rounded border border-green-600/40">
                <p className="text-green-400 font-semibold text-sm mb-1">Entry Monitoring</p>
                <p className="text-xs text-foreground">Monitor movement from doorways and access points</p>
              </div>
              <div className="bg-orange-600/20 p-3 rounded border border-orange-600/40">
                <p className="text-orange-400 font-semibold text-sm mb-1">Height Considerations</p>
                <p className="text-xs text-foreground">2.4-3m mounting height for optimal detection coverage</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-foreground font-semibold text-lg mb-4">Performance Factors</h4>
            <div className="space-y-3">
              <div className="bg-elec-dark p-3 rounded border border-gray-600">
                <p className="text-green-400 font-semibold text-sm mb-1">✓ Optimal Conditions</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Stable ambient temperature</li>
                  <li>• Clear line of sight</li>
                  <li>• Minimal air movement</li>
                  <li>• Away from heat sources</li>
                  <li>• Protected from direct sunlight</li>
                </ul>
              </div>
              <div className="bg-elec-dark p-3 rounded border border-gray-600">
                <p className="text-red-400 font-semibold text-sm mb-1">⚠ Interference Sources</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Radiators and heating vents</li>
                  <li>• Direct sunlight exposure</li>
                  <li>• Moving curtains or plants</li>
                  <li>• Pets in detection zones</li>
                  <li>• Rapid temperature changes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-lg">
          <h4 className="text-elec-yellow font-semibold mb-3">Advanced PIR Features</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Detection Patterns:</p>
              <ul className="text-xs space-y-1">
                <li>• Wide-angle coverage (90-120°)</li>
                <li>• Long-range detection (8-12m)</li>
                <li>• Pet-immune sensitivity</li>
                <li>• Adjustable detection zones</li>
              </ul>
            </div>
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Smart Capabilities:</p>
              <ul className="text-xs space-y-1">
                <li>• Temperature compensation</li>
                <li>• False alarm reduction</li>
                <li>• Occupancy-based automation</li>
                <li>• Energy-saving integration</li>
              </ul>
            </div>
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Integration Benefits:</p>
              <ul className="text-xs space-y-1">
                <li>• Automatic lighting control</li>
                <li>• HVAC presence detection</li>
                <li>• Security system activation</li>
                <li>• Wellness monitoring</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};