import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

export const BenefitsOfDimmingColourControlSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-elec-yellow" />
          Benefits of Dimming & Colour Control
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          Advanced lighting control delivers measurable benefits across energy efficiency, user comfort, accessibility, and aesthetic impact.
        </p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-3 bg-green-600/10 border border-green-600/20 rounded-lg">
            <h5 className="font-semibold text-green-200 mb-2">Energy Efficiency</h5>
            <ul className="text-sm text-green-100 space-y-1">
              <li>• <strong>Reduced brightness = lower consumption:</strong> 50% dim ≈ 25% energy use</li>
              <li>• <strong>Automatic adjustments:</strong> Daylight harvesting and occupancy-based dimming</li>
              <li>• <strong>Extended lamp life:</strong> Dimmed LEDs last longer and run cooler</li>
              <li>• <strong>Optimised output:</strong> Right amount of light for each task</li>
            </ul>
          </div>
          
          <div className="p-3 bg-blue-600/10 border border-blue-600/20 rounded-lg">
            <h5 className="font-semibold text-blue-200 mb-2">Enhanced Comfort & Mood</h5>
            <ul className="text-sm text-blue-100 space-y-1">
              <li>• <strong>Cosy evenings:</strong> Warm, dimmed lighting for relaxation</li>
              <li>• <strong>Productive mornings:</strong> Cool, bright light for alertness</li>
              <li>• <strong>Mood enhancement:</strong> Colour therapy and ambience control</li>
              <li>• <strong>Circadian support:</strong> Natural light cycles for better sleep</li>
            </ul>
          </div>
        </div>

        <div className="p-3 bg-purple-600/10 border border-purple-600/20 rounded-lg">
          <h5 className="font-semibold text-purple-200 mb-2">Accessibility Benefits</h5>
          <div className="grid md:grid-cols-2 gap-3 mt-2">
            <div>
              <h6 className="font-medium text-purple-100 mb-1">Elderly Users:</h6>
              <ul className="text-sm text-purple-100 space-y-1">
                <li>• Custom brightness levels for ageing eyes</li>
                <li>• Voice control for limited mobility</li>
                <li>• Automated night lighting for safety</li>
                <li>• High contrast settings for visibility</li>
              </ul>
            </div>
            <div>
              <h6 className="font-medium text-purple-100 mb-1">Disabled Users:</h6>
              <ul className="text-sm text-purple-100 space-y-1">
                <li>• App control for those unable to reach switches</li>
                <li>• Colour coding for cognitive assistance</li>
                <li>• Motion activation for hands-free operation</li>
                <li>• Large button interfaces and voice commands</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="p-3 bg-orange-600/10 border border-orange-600/20 rounded-lg">
          <h5 className="font-semibold text-orange-200 mb-2">Aesthetic Impact</h5>
          <div className="grid md:grid-cols-3 gap-3 mt-2">
            <div>
              <h6 className="font-medium text-orange-100 mb-1">Architectural Features:</h6>
              <ul className="text-sm text-orange-100 space-y-1">
                <li>• Highlight artwork</li>
                <li>• Accent walls and textures</li>
                <li>• Architectural details</li>
                <li>• Garden and landscape</li>
              </ul>
            </div>
            <div>
              <h6 className="font-medium text-orange-100 mb-1">Ambience Creation:</h6>
              <ul className="text-sm text-orange-100 space-y-1">
                <li>• Romantic dinners</li>
                <li>• Party atmospheres</li>
                <li>• Seasonal themes</li>
                <li>• Cultural celebrations</li>
              </ul>
            </div>
            <div>
              <h6 className="font-medium text-orange-100 mb-1">Commercial Applications:</h6>
              <ul className="text-sm text-orange-100 space-y-1">
                <li>• Retail merchandise display</li>
                <li>• Restaurant dining mood</li>
                <li>• Hotel guest experience</li>
                <li>• Brand colour matching</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="p-3 bg-yellow-600/10 border border-yellow-600/20 rounded-lg">
          <h5 className="font-semibold text-yellow-200 mb-2">Real-World Impact Examples</h5>
          <div className="space-y-2">
            <div>
              <h6 className="font-medium text-yellow-100">Home Office Productivity:</h6>
              <p className="text-sm text-yellow-100">
                5000K cool white during work hours improves focus and reduces eye strain. Automatic dimming to 2700K in evening helps transition to relaxation mode.
              </p>
            </div>
            <div>
              <h6 className="font-medium text-yellow-100">Children's Sleep Quality:</h6>
              <p className="text-sm text-yellow-100">
                Gradual dimming and colour temperature reduction over 30 minutes before bedtime helps establish healthy sleep routines and improves sleep onset.
              </p>
            </div>
            <div>
              <h6 className="font-medium text-yellow-100">Elderly Care Facilities:</h6>
              <p className="text-sm text-yellow-100">
                Bright white light during day maintains circadian rhythms, whilst motion-activated warm lighting provides safe night navigation without sleep disruption.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};