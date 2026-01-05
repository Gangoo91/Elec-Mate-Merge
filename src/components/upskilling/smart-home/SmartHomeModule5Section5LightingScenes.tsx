import { Palette } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const SmartHomeModule5Section5LightingScenes = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Palette className="h-6 w-6 text-blue-500" />
          1. What Are Lighting Scenes?
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="bg-blue-600/10 p-4 rounded-lg border border-blue-600/30">
          <h4 className="text-foreground font-semibold mb-3">Scene Definition and Functionality</h4>
          <p className="text-sm mb-3">
            A scene is a pre-programmed setting that controls multiple lights at once. Instead of 
            manually adjusting each light individually, scenes allow instant activation of specific 
            lighting configurations tailored to different activities, times of day, or situations.
          </p>
          <p className="text-sm">
            Examples: "Night Mode" dims all lights to 20%, "Away Mode" turns on random lights for 
            security simulation, "Reading Mode" brightens task lighting while dimming ambient lights. 
            Scenes can be triggered manually (via app/voice) or automatically by sensors.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-foreground font-semibold text-lg mb-4">Common Scene Types</h4>
            <div className="space-y-3">
              <div className="bg-purple-600/20 p-3 rounded border border-purple-600/40">
                <p className="text-purple-400 font-semibold text-sm mb-1">Daily Living Scenes</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Morning wake-up: Gradual brightness increase</li>
                  <li>• Cooking: Bright task lighting in kitchen</li>
                  <li>• Movie time: Dim ambient with accent lighting</li>
                  <li>• Bedtime: Soft warm light gradually dimming</li>
                </ul>
              </div>
              <div className="bg-orange-600/20 p-3 rounded border border-orange-600/40">
                <p className="text-orange-400 font-semibold text-sm mb-1">Security Scenes</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Away simulation: Random light patterns</li>
                  <li>• Intruder alert: All lights at full brightness</li>
                  <li>• Perimeter security: Outdoor floodlights</li>
                  <li>• Safe return: Pathway lighting activated</li>
                </ul>
              </div>
              <div className="bg-red-600/20 p-3 rounded border border-red-600/40">
                <p className="text-red-400 font-semibold text-sm mb-1">Emergency Scenes</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Fire evacuation: Exit pathway illumination</li>
                  <li>• Medical emergency: Full bright white lighting</li>
                  <li>• Power outage: Battery backup lighting</li>
                  <li>• Panic mode: Flashing exterior lights</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-foreground font-semibold text-lg mb-4">Scene Activation Methods</h4>
            <div className="space-y-3">
              <div className="bg-elec-dark p-3 rounded border border-gray-600">
                <p className="text-blue-400 font-semibold text-sm mb-1">Manual Activation</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Mobile app scene buttons</li>
                  <li>• Voice commands via smart speakers</li>
                  <li>• Physical wall switches with scene control</li>
                  <li>• Remote control devices</li>
                </ul>
              </div>
              <div className="bg-elec-dark p-3 rounded border border-gray-600">
                <p className="text-green-400 font-semibold text-sm mb-1">Automatic Triggers</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Time-based scheduling (sunset, 10 PM, etc.)</li>
                  <li>• Motion sensor activation</li>
                  <li>• Door/window sensor integration</li>
                  <li>• Geofencing location detection</li>
                </ul>
              </div>
              <div className="bg-elec-dark p-3 rounded border border-gray-600">
                <p className="text-purple-400 font-semibold text-sm mb-1">Conditional Activation</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Weather conditions (cloudy day lighting)</li>
                  <li>• Security system arming/disarming</li>
                  <li>• Occupancy detection algorithms</li>
                  <li>• Integration with other smart devices</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-lg">
          <h4 className="text-elec-yellow font-semibold mb-3">Scene Programming Components</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Light Selection:</p>
              <ul className="text-xs space-y-1">
                <li>• Choose specific fixtures</li>
                <li>• Group by rooms or zones</li>
                <li>• Include outdoor lighting</li>
                <li>• Smart switches and dimmers</li>
              </ul>
            </div>
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Settings Configuration:</p>
              <ul className="text-xs space-y-1">
                <li>• Brightness levels (0-100%)</li>
                <li>• Colour temperature settings</li>
                <li>• RGB colour choices</li>
                <li>• Transition speed and effects</li>
              </ul>
            </div>
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Trigger Conditions:</p>
              <ul className="text-xs space-y-1">
                <li>• Time schedules</li>
                <li>• Sensor inputs</li>
                <li>• User presence detection</li>
                <li>• External system integration</li>
              </ul>
            </div>
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Advanced Features:</p>
              <ul className="text-xs space-y-1">
                <li>• Fade in/out timing</li>
                <li>• Randomisation patterns</li>
                <li>• Priority override rules</li>
                <li>• Energy consumption limits</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};