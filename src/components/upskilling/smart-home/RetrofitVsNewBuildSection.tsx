import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Wrench, Network } from 'lucide-react';

export const RetrofitVsNewBuildSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          Retrofit vs New Build Considerations
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          The choice of lighting system depends heavily on whether you're retrofitting an existing property or designing for new construction.
        </p>
        
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-600/10 border border-blue-600/20 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Home className="h-5 w-5 text-blue-400" />
                <h5 className="font-semibold text-blue-200">Retrofit Projects</h5>
              </div>
              <div className="space-y-3">
                <div>
                  <h6 className="font-medium text-blue-100 mb-1">Recommended Systems:</h6>
                  <ul className="text-sm text-blue-100 space-y-1">
                    <li>• Wi-Fi/Zigbee smart bulbs (minimal disruption)</li>
                    <li>• Smart switches (some electrical work)</li>
                    <li>• Wireless sensors and controls</li>
                  </ul>
                </div>
                <div>
                  <h6 className="font-medium text-blue-100 mb-1">Key Considerations:</h6>
                  <ul className="text-sm text-blue-100 space-y-1">
                    <li>• Existing wiring capabilities</li>
                    <li>• Neutral wire availability</li>
                    <li>• Minimising structural changes</li>
                    <li>• Working around furniture/décor</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 bg-green-600/10 border border-green-600/20 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Network className="h-5 w-5 text-green-400" />
                <h5 className="font-semibold text-green-200">New Build Projects</h5>
              </div>
              <div className="space-y-3">
                <div>
                  <h6 className="font-medium text-green-100 mb-1">Recommended Systems:</h6>
                  <ul className="text-sm text-green-100 space-y-1">
                    <li>• Centralised wired systems (KNX, Lutron)</li>
                    <li>• Hybrid systems with structured cabling</li>
                    <li>• Integrated with HVAC and security</li>
                  </ul>
                </div>
                <div>
                  <h6 className="font-medium text-green-100 mb-1">Planning Requirements:</h6>
                  <ul className="text-sm text-green-100 space-y-1">
                    <li>• Early system design integration</li>
                    <li>• Structured cabling installation</li>
                    <li>• Central equipment locations</li>
                    <li>• Future expansion provisions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-yellow-600/10 border border-yellow-600/20 rounded-lg">
            <h5 className="font-semibold text-yellow-200 mb-2">Installer Decision Framework</h5>
            <p className="text-sm text-yellow-100 mb-2">Important to balance client requirements:</p>
            <ul className="text-sm text-yellow-100 space-y-1">
              <li>• <strong>Budget:</strong> Smart bulbs (£100s) vs Centralised (£1000s)</li>
              <li>• <strong>Aesthetics:</strong> Visible vs integrated solutions</li>
              <li>• <strong>Expansion:</strong> Current needs vs future growth</li>
              <li>• <strong>Reliability:</strong> Convenience vs mission-critical</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};