import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Thermometer } from 'lucide-react';

export const ColourTemperatureSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Thermometer className="h-5 w-5 text-elec-yellow" />
          Colour Temperature (Kelvin Scale)
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          Colour temperature, measured in Kelvin (K), describes the warmth or coolness of white light and significantly impacts mood, productivity, and circadian rhythms.
        </p>
        
        <div className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-3 bg-orange-600/10 border border-orange-600/20 rounded-lg">
              <h5 className="font-semibold text-orange-200 mb-2">Warm White (2200-3000K)</h5>
              <ul className="text-sm text-orange-100 space-y-1">
                <li>• <strong>2700K:</strong> Standard warm white</li>
                <li>• <strong>Characteristics:</strong> Cosy, relaxing, yellow-orange tint</li>
                <li>• <strong>Best for:</strong> Living rooms, bedrooms, dining areas</li>
                <li>• <strong>Effects:</strong> Promotes relaxation and sleep preparation</li>
              </ul>
            </div>
            <div className="p-3 bg-blue-600/10 border border-blue-600/20 rounded-lg">
              <h5 className="font-semibold text-blue-200 mb-2">Neutral White (3500-4000K)</h5>
              <ul className="text-sm text-blue-100 space-y-1">
                <li>• <strong>3500K:</strong> Balanced neutral tone</li>
                <li>• <strong>Characteristics:</strong> Natural, neither warm nor cool</li>
                <li>• <strong>Best for:</strong> General lighting, task areas</li>
                <li>• <strong>Effects:</strong> Comfortable for most activities</li>
              </ul>
            </div>
            <div className="p-3 bg-cyan-600/10 border border-cyan-600/20 rounded-lg">
              <h5 className="font-semibold text-cyan-200 mb-2">Cool White (5000-6500K)</h5>
              <ul className="text-sm text-cyan-100 space-y-1">
                <li>• <strong>5000K:</strong> Daylight white</li>
                <li>• <strong>6500K:</strong> Cool daylight</li>
                <li>• <strong>Best for:</strong> Offices, kitchens, workshops</li>
                <li>• <strong>Effects:</strong> Promotes alertness and concentration</li>
              </ul>
            </div>
          </div>

          <div className="p-3 bg-green-600/10 border border-green-600/20 rounded-lg">
            <h5 className="font-semibold text-green-200 mb-2">Circadian Rhythm Lighting</h5>
            <div className="space-y-3">
              <p className="text-sm text-green-100">
                Smart systems can automatically adjust colour temperature throughout the day to support natural sleep-wake cycles:
              </p>
              <div className="grid md:grid-cols-4 gap-3">
                <div className="text-center">
                  <h6 className="font-medium text-green-100 mb-1">Morning (6-9 AM)</h6>
                  <p className="text-xs text-green-100">4000-5000K</p>
                  <p className="text-xs text-green-200">Energising wake-up</p>
                </div>
                <div className="text-center">
                  <h6 className="font-medium text-green-100 mb-1">Midday (9 AM-5 PM)</h6>
                  <p className="text-xs text-green-100">5000-6500K</p>
                  <p className="text-xs text-green-200">Maximum alertness</p>
                </div>
                <div className="text-center">
                  <h6 className="font-medium text-green-100 mb-1">Evening (5-9 PM)</h6>
                  <p className="text-xs text-green-100">3000-4000K</p>
                  <p className="text-xs text-green-200">Gradual transition</p>
                </div>
                <div className="text-center">
                  <h6 className="font-medium text-green-100 mb-1">Night (9 PM+)</h6>
                  <p className="text-xs text-green-100">2200-2700K</p>
                  <p className="text-xs text-green-200">Sleep preparation</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-purple-600/10 border border-purple-600/20 rounded-lg">
            <h5 className="font-semibold text-purple-200 mb-2">Smart System Capabilities</h5>
            <ul className="text-sm text-purple-100 space-y-1">
              <li>• <strong>Automatic adjustment:</strong> Follow sunrise/sunset patterns</li>
              <li>• <strong>Gradual transitions:</strong> Smooth changes over time</li>
              <li>• <strong>Scene integration:</strong> Colour temperature part of lighting scenes</li>
              <li>• <strong>Manual override:</strong> User control when needed</li>
              <li>• <strong>Seasonal adaptation:</strong> Adjust for changing daylight hours</li>
            </ul>
          </div>

          <div className="p-3 bg-yellow-600/10 border border-yellow-600/20 rounded-lg">
            <h5 className="font-semibold text-yellow-200 mb-2">Application Guidelines</h5>
            <div className="grid md:grid-cols-2 gap-3 mt-2">
              <div>
                <h6 className="font-medium text-yellow-100 mb-1">Room-Specific Recommendations:</h6>
                <ul className="text-sm text-yellow-100 space-y-1">
                  <li>• <strong>Kitchen:</strong> 4000-5000K for food prep</li>
                  <li>• <strong>Home Office:</strong> 5000K for concentration</li>
                  <li>• <strong>Living Room:</strong> 2700-3000K for relaxation</li>
                  <li>• <strong>Bedroom:</strong> 2200-2700K for sleep quality</li>
                </ul>
              </div>
              <div>
                <h6 className="font-medium text-yellow-100 mb-1">Activity-Based Settings:</h6>
                <ul className="text-sm text-yellow-100 space-y-1">
                  <li>• <strong>Reading/Study:</strong> 4000-5000K</li>
                  <li>• <strong>Entertaining:</strong> 2700-3000K</li>
                  <li>• <strong>Detailed Work:</strong> 5000-6000K</li>
                  <li>• <strong>Relaxation:</strong> 2200-2700K</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};