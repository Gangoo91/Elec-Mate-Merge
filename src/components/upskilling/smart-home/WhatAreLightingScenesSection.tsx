import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Palette } from 'lucide-react';

export const WhatAreLightingScenesSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Palette className="h-5 w-5 text-elec-yellow" />
          What Are Lighting Scenes?
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="bg-elec-dark p-4 rounded-lg">
          <p className="text-lg leading-relaxed mb-4">
            A lighting scene is a pre-configured state where multiple lights are set to specific brightness, colour, and on/off states simultaneously. Instead of manually adjusting each light, scenes activate entire lighting configurations with a single command.
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-elec-yellow font-bold text-lg">Instant</div>
              <p className="text-xs">One-touch activation</p>
            </div>
            <div className="text-center">
              <div className="text-elec-yellow font-bold text-lg">Consistent</div>
              <p className="text-xs">Identical results every time</p>
            </div>
            <div className="text-center">
              <div className="text-elec-yellow font-bold text-lg">Adaptive</div>
              <p className="text-xs">Different moods, same space</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-elec-yellow">Scene Categories & Examples</h4>
          <div className="grid gap-4">
            <div className="p-4 bg-blue-600/10 border-l-4 border-blue-500 rounded-lg">
              <h5 className="font-semibold text-blue-200">Activity-Based Scenes</h5>
              <div className="grid md:grid-cols-2 gap-3 text-sm mt-2">
                <div>
                  <p className="text-blue-100 font-medium mb-1">Examples:</p>
                  <ul className="text-blue-100 text-xs space-y-1">
                    <li>• Reading: 90% warm white, task lighting on</li>
                    <li>• Cooking: 100% cool white, under-cabinet on</li>
                    <li>• TV Watching: 20% warm, bias lighting only</li>
                    <li>• Working: 80% cool white, desk spotlight on</li>
                  </ul>
                </div>
                <div>
                  <p className="text-blue-100 font-medium mb-1">Design Principles:</p>
                  <ul className="text-blue-100 text-xs space-y-1">
                    <li>• Task-specific light levels (300-500 lux for reading)</li>
                    <li>• Appropriate colour temperatures (2700K-6500K)</li>
                    <li>• Reduced glare and shadows</li>
                    <li>• Energy-efficient settings</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-purple-600/10 border-l-4 border-purple-500 rounded-lg">
              <h5 className="font-semibold text-purple-200">Time-Based Circadian Scenes</h5>
              <div className="text-sm mt-2">
                <p className="text-purple-100 mb-2">Daily light progression supporting natural rhythms:</p>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  <div className="bg-purple-800/20 p-2 rounded">
                    <div className="font-medium">Morning (6-10 AM)</div>
                    <div>Cool white 6500K, 80%</div>
                  </div>
                  <div className="bg-purple-800/20 p-2 rounded">
                    <div className="font-medium">Afternoon (10-18 PM)</div>
                    <div>Natural white 4000K, 60%</div>
                  </div>
                  <div className="bg-purple-800/20 p-2 rounded">
                    <div className="font-medium">Evening (18-22 PM)</div>
                    <div>Warm white 2700K, 40%</div>
                  </div>
                  <div className="bg-purple-800/20 p-2 rounded">
                    <div className="font-medium">Night (22+ PM)</div>
                    <div>Deep warm 2200K, 10%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};