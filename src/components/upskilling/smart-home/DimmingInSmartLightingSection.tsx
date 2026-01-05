import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SlidersHorizontal } from 'lucide-react';

export const DimmingInSmartLightingSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5 text-elec-yellow" />
          Dimming in Smart Lighting
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          Smart dimming systems provide precise digital control over light levels, offering significant advantages over traditional resistive dimmers.
        </p>
        
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-red-600/10 border border-red-600/20 rounded-lg">
              <h5 className="font-semibold text-red-200 mb-2">Traditional Dimming Problems</h5>
              <ul className="text-sm text-red-100 space-y-1">
                <li>• <strong>Resistive dimmers:</strong> Reduce voltage, not ideal for LEDs</li>
                <li>• <strong>Incompatibility:</strong> Causes flickering and early LED failure</li>
                <li>• <strong>Heat generation:</strong> Wastes energy and reduces efficiency</li>
                <li>• <strong>Limited control:</strong> Basic on/off/dim with no smart features</li>
              </ul>
            </div>
            <div className="p-3 bg-green-600/10 border border-green-600/20 rounded-lg">
              <h5 className="font-semibold text-green-200 mb-2">Smart Dimming Advantages</h5>
              <ul className="text-sm text-green-100 space-y-1">
                <li>• <strong>Digital control:</strong> Apps, hubs, and smart switches</li>
                <li>• <strong>Smooth operation:</strong> No flicker or buzzing</li>
                <li>• <strong>Remote control:</strong> Adjust from anywhere</li>
                <li>• <strong>Scene integration:</strong> Part of automated lighting scenes</li>
              </ul>
            </div>
          </div>

          <div className="p-3 bg-blue-600/10 border border-blue-600/20 rounded-lg">
            <h5 className="font-semibold text-blue-200 mb-2">Key Benefits of Smart Dimming</h5>
            <div className="grid md:grid-cols-3 gap-3 mt-2">
              <div>
                <h6 className="font-medium text-blue-100 mb-1">Energy Savings:</h6>
                <ul className="text-sm text-blue-100 space-y-1">
                  <li>• 50% brightness = ~25% energy use</li>
                  <li>• Dimming extends LED lifespan</li>
                  <li>• Reduced heat generation</li>
                </ul>
              </div>
              <div>
                <h6 className="font-medium text-blue-100 mb-1">Ambience Control:</h6>
                <ul className="text-sm text-blue-100 space-y-1">
                  <li>• Create mood lighting</li>
                  <li>• Task-appropriate brightness</li>
                  <li>• Gradual transitions</li>
                </ul>
              </div>
              <div>
                <h6 className="font-medium text-blue-100 mb-1">User Comfort:</h6>
                <ul className="text-sm text-blue-100 space-y-1">
                  <li>• Reduce eye strain</li>
                  <li>• Support circadian rhythms</li>
                  <li>• Customisable preferences</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-3 bg-orange-600/10 border border-orange-600/20 rounded-lg">
            <h5 className="font-semibold text-orange-200 mb-2">Compatibility Challenges</h5>
            <ul className="text-sm text-orange-100 space-y-1">
              <li>• <strong>Not all bulbs are dimmable:</strong> Check packaging for "dimmable" marking</li>
              <li>• <strong>Mismatched dimmers cause flicker:</strong> Use manufacturer-approved combinations</li>
              <li>• <strong>Minimum load requirements:</strong> Some dimmers need minimum wattage to function</li>
              <li>• <strong>Leading vs trailing edge:</strong> Different dimming technologies for different LED types</li>
            </ul>
          </div>

          <div className="p-3 bg-yellow-600/10 border border-yellow-600/20 rounded-lg">
            <h5 className="font-semibold text-yellow-200 mb-2">Best Practice Installation</h5>
            <ul className="text-sm text-yellow-100 space-y-1">
              <li>• <strong>Use manufacturer-approved dimmers:</strong> Check compatibility lists</li>
              <li>• <strong>Test before final installation:</strong> Verify smooth dimming operation</li>
              <li>• <strong>Consider load requirements:</strong> Match dimmer capacity to total LED load</li>
              <li>• <strong>Plan for future expansion:</strong> Leave headroom for additional lights</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};