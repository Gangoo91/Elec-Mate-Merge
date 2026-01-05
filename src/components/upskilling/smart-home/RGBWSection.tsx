import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Rainbow } from 'lucide-react';

export const RGBWSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Rainbow className="h-5 w-5 text-elec-yellow" />
          RGBW (Red, Green, Blue, White)
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          RGBW technology combines RGB colour mixing with dedicated white LEDs to create both vibrant colours and accurate natural white light.
        </p>
        
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-purple-600/10 border border-purple-600/20 rounded-lg">
              <h5 className="font-semibold text-purple-200 mb-2">RGB Colour Mixing</h5>
              <ul className="text-sm text-purple-100 space-y-1">
                <li>• <strong>Red, Green, Blue channels:</strong> Primary colour LEDs</li>
                <li>• <strong>Millions of colours:</strong> 16.7 million possible combinations</li>
                <li>• <strong>Additive colour mixing:</strong> Combine channels for desired hues</li>
                <li>• <strong>Digital control:</strong> Precise adjustment of each channel</li>
              </ul>
            </div>
            <div className="p-3 bg-blue-600/10 border border-blue-600/20 rounded-lg">
              <h5 className="font-semibold text-blue-200 mb-2">Adding White (RGBW)</h5>
              <ul className="text-sm text-blue-100 space-y-1">
                <li>• <strong>Dedicated white LED:</strong> True white, not mixed RGB</li>
                <li>• <strong>Improved brightness:</strong> Higher lumen output</li>
                <li>• <strong>Better colour accuracy:</strong> Natural whites and pastels</li>
                <li>• <strong>Energy efficiency:</strong> White LED more efficient than RGB mix</li>
              </ul>
            </div>
          </div>

          <div className="p-3 bg-green-600/10 border border-green-600/20 rounded-lg">
            <h5 className="font-semibold text-green-200 mb-2">Practical Applications</h5>
            <div className="grid md:grid-cols-2 gap-3 mt-2">
              <div>
                <h6 className="font-medium text-green-100 mb-1">Entertainment & Events:</h6>
                <ul className="text-sm text-green-100 space-y-1">
                  <li>• Party lighting with vibrant colours</li>
                  <li>• Holiday themed lighting</li>
                  <li>• Gaming ambient lighting</li>
                  <li>• Mood enhancement</li>
                </ul>
              </div>
              <div>
                <h6 className="font-medium text-green-100 mb-1">Wellness & Functionality:</h6>
                <ul className="text-sm text-green-100 space-y-1">
                  <li>• Circadian rhythm support</li>
                  <li>• Relaxation and sleep aid</li>
                  <li>• Focus and productivity enhancement</li>
                  <li>• Seasonal Affective Disorder therapy</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-3 bg-orange-600/10 border border-orange-600/20 rounded-lg">
            <h5 className="font-semibold text-orange-200 mb-2">Example: Philips Hue RGBW Usage</h5>
            <p className="text-sm text-orange-100 mb-2">
              <strong>Scenario:</strong> Living room with Hue RGBW bulbs for both entertainment and daily use
            </p>
            <ul className="text-sm text-orange-100 space-y-1">
              <li>• <strong>Party mode:</strong> Set lounge to vibrant purple and green colours</li>
              <li>• <strong>Daily use:</strong> Revert to warm white (2700K) for comfortable evening lighting</li>
              <li>• <strong>Morning routine:</strong> Cool white (4000K) for energising start to day</li>
              <li>• <strong>Movie night:</strong> Dim red ambient behind TV, white off</li>
            </ul>
          </div>

          <div className="p-3 bg-red-600/10 border border-red-600/20 rounded-lg">
            <h5 className="font-semibold text-red-200 mb-2">RGB-Only Limitations</h5>
            <ul className="text-sm text-red-100 space-y-1">
              <li>• <strong>Poor white reproduction:</strong> Mixed RGB creates weak, tinted whites</li>
              <li>• <strong>Lower brightness:</strong> RGB combinations less efficient than dedicated white</li>
              <li>• <strong>Colour accuracy issues:</strong> Pastels and skin tones appear unnatural</li>
              <li>• <strong>Higher energy consumption:</strong> Three LEDs working to create white light</li>
            </ul>
          </div>

          <div className="p-3 bg-yellow-600/10 border border-yellow-600/20 rounded-lg">
            <h5 className="font-semibold text-yellow-200 mb-2">Selection Guidance</h5>
            <div className="grid md:grid-cols-2 gap-3 mt-2">
              <div>
                <h6 className="font-medium text-yellow-100 mb-1">Choose RGBW when:</h6>
                <ul className="text-sm text-yellow-100 space-y-1">
                  <li>• Quality white light is important</li>
                  <li>• High brightness required</li>
                  <li>• Budget allows for premium features</li>
                  <li>• Colour accuracy matters</li>
                </ul>
              </div>
              <div>
                <h6 className="font-medium text-yellow-100 mb-1">RGB-only acceptable for:</h6>
                <ul className="text-sm text-yellow-100 space-y-1">
                  <li>• Decorative accent lighting only</li>
                  <li>• Budget-conscious installations</li>
                  <li>• Colour effects more important than white quality</li>
                  <li>• Secondary lighting zones</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};