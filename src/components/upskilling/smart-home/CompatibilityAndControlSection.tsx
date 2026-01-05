import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plug } from 'lucide-react';

export const CompatibilityAndControlSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Plug className="h-5 w-5 text-elec-yellow" />
          Compatibility and Control
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          Successful implementation of dimming and colour control requires careful consideration of compatibility between components and control methods.
        </p>
        
        <div className="space-y-4">
          <div className="p-3 bg-red-600/10 border border-red-600/20 rounded-lg">
            <h5 className="font-semibold text-red-200 mb-2">System Compatibility Issues</h5>
            <ul className="text-sm text-red-100 space-y-1">
              <li>• <strong>Limited RGBW support:</strong> Not all smart systems support full colour control</li>
              <li>• <strong>Protocol restrictions:</strong> Some systems only support basic white tuning</li>
              <li>• <strong>Hub limitations:</strong> Entry-level hubs may lack advanced colour features</li>
              <li>• <strong>App functionality:</strong> Mobile apps vary in colour control sophistication</li>
            </ul>
          </div>

          <div className="p-3 bg-orange-600/10 border border-orange-600/20 rounded-lg">
            <h5 className="font-semibold text-orange-200 mb-2">Dimming Method Compatibility</h5>
            <div className="grid md:grid-cols-2 gap-3 mt-2">
              <div>
                <h6 className="font-medium text-orange-100 mb-1">Leading-Edge Dimmers:</h6>
                <ul className="text-sm text-orange-100 space-y-1">
                  <li>• Traditional TRIAC dimmers</li>
                  <li>• Good for resistive loads (halogen)</li>
                  <li>• Can cause LED compatibility issues</li>
                  <li>• May create buzzing or flickering</li>
                </ul>
              </div>
              <div>
                <h6 className="font-medium text-orange-100 mb-1">Trailing-Edge Dimmers:</h6>
                <ul className="text-sm text-orange-100 space-y-1">
                  <li>• Designed for electronic loads</li>
                  <li>• Better LED compatibility</li>
                  <li>• Smoother dimming performance</li>
                  <li>• Reduced electromagnetic interference</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-3 bg-blue-600/10 border border-blue-600/20 rounded-lg">
            <h5 className="font-semibold text-blue-200 mb-2">LED Strip Lighting Considerations</h5>
            <ul className="text-sm text-blue-100 space-y-1">
              <li>• <strong>LED drivers required:</strong> Convert mains voltage to safe DC levels</li>
              <li>• <strong>RGBW controllers:</strong> Separate controllers needed for full colour control</li>
              <li>• <strong>Current capacity:</strong> Ensure drivers match total LED strip load</li>
              <li>• <strong>Voltage drop:</strong> Consider cable runs and power injection points</li>
            </ul>
          </div>

          <div className="p-3 bg-green-600/10 border border-green-600/20 rounded-lg">
            <h5 className="font-semibold text-green-200 mb-2">Control Method Comparison</h5>
            <div className="grid md:grid-cols-2 gap-3 mt-2">
              <div>
                <h6 className="font-medium text-green-100 mb-1">Wireless Control:</h6>
                <ul className="text-sm text-green-100 space-y-1">
                  <li>• <strong>Pros:</strong> Easy installation, flexible placement</li>
                  <li>• <strong>Cons:</strong> Potential latency, interference issues</li>
                  <li>• <strong>Best for:</strong> Retrofit applications, portable solutions</li>
                </ul>
              </div>
              <div>
                <h6 className="font-medium text-green-100 mb-1">Wired Control:</h6>
                <ul className="text-sm text-green-100 space-y-1">
                  <li>• <strong>Pros:</strong> Instant response, no interference</li>
                  <li>• <strong>Cons:</strong> Installation complexity, fixed locations</li>
                  <li>• <strong>Best for:</strong> New builds, professional installations</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-3 bg-purple-600/10 border border-purple-600/20 rounded-lg">
            <h5 className="font-semibold text-purple-200 mb-2">Pre-Installation Checklist</h5>
            <ul className="text-sm text-purple-100 space-y-1">
              <li>• <strong>Verify bulb compatibility:</strong> Check dimming and colour capabilities</li>
              <li>• <strong>Confirm system support:</strong> Ensure hub/app supports required features</li>
              <li>• <strong>Test dimmer compatibility:</strong> Use manufacturer compatibility lists</li>
              <li>• <strong>Plan control interfaces:</strong> Apps, wall switches, voice control</li>
              <li>• <strong>Consider future expansion:</strong> Leave room for additional features</li>
            </ul>
          </div>

          <div className="p-3 bg-yellow-600/10 border border-yellow-600/20 rounded-lg">
            <h5 className="font-semibold text-yellow-200 mb-2">Common Troubleshooting Issues</h5>
            <div className="grid md:grid-cols-2 gap-3 mt-2">
              <div>
                <h6 className="font-medium text-yellow-100 mb-1">Performance Problems:</h6>
                <ul className="text-sm text-yellow-100 space-y-1">
                  <li>• Flickering: Incompatible dimmer type</li>
                  <li>• Colour inaccuracy: Poor quality RGB mixing</li>
                  <li>• Response lag: Wireless interference</li>
                  <li>• Limited brightness: Undersized drivers</li>
                </ul>
              </div>
              <div>
                <h6 className="font-medium text-yellow-100 mb-1">Solutions:</h6>
                <ul className="text-sm text-yellow-100 space-y-1">
                  <li>• Use manufacturer-approved combinations</li>
                  <li>• Upgrade to RGBW for better whites</li>
                  <li>• Improve wireless signal strength</li>
                  <li>• Match drivers to LED requirements</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};