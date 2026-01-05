import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, CheckCircle, AlertTriangle, Navigation } from 'lucide-react';

export const EmergencyLightingPracticalSection2_5 = () => {
  return (
    <Card className="bg-slate-200/20 border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Wrench className="h-6 w-6 text-elec-yellow" />
          Practical Guidance
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <p className="text-foreground leading-relaxed">
          Essential practical considerations for successful exit signage installation:
        </p>

        <div className="grid gap-6">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <h3 className="font-semibold text-blue-400 mb-3 flex items-center gap-2">
              <Navigation className="h-4 w-4" />
              Direction and Placement
            </h3>
            <ul className="space-y-2 text-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                Always ensure exit signage points toward the true direction of travel — incorrect arrows are a common installation fault
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                Where routes are complex, use supplementary signs to reinforce direction
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                In multi-storey buildings, place signage at both the head and base of stairs
              </li>
            </ul>
          </div>

          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <h3 className="font-semibold text-green-400 mb-3">Visibility and Testing</h3>
            <ul className="space-y-2 text-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                Check that exit signs remain visible when normal lighting is dimmed or switched off
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                Test visibility from multiple angles and distances along escape routes
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                Ensure signs are not obstructed by doors when opened, furniture, or equipment
              </li>
            </ul>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-400 mb-3">Consistency Requirements</h3>
            <ul className="space-y-2 text-foreground">
              <li className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-400" />
                Avoid mixing old "EXIT" text-only signs with new ISO 7010 pictograms — consistency is key
              </li>
              <li className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-400" />
                Ensure all signs in a building follow the same design standard and colour scheme
              </li>
              <li className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-400" />
                Replace non-compliant signage during renovations or upgrades
              </li>
            </ul>
          </div>

          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
            <h3 className="font-semibold text-purple-400 mb-3">Installation Best Practices</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Mounting Considerations</h4>
                <ul className="space-y-1 text-foreground text-sm">
                  <li>• Use appropriate fixings for wall/ceiling type</li>
                  <li>• Ensure signs are level and properly aligned</li>
                  <li>• Allow adequate clearance for maintenance access</li>
                  <li>• Consider structural loading for larger signs</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Electrical Connections</h4>
                <ul className="space-y-1 text-foreground text-sm">
                  <li>• Connect to appropriate emergency lighting circuit</li>
                  <li>• Ensure correct polarity for LED signs</li>
                  <li>• Use appropriate cable types and protection</li>
                  <li>• Test connections before final commissioning</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-red-400 mb-2">Critical Installation Points</h4>
              <p className="text-foreground">
                Poor exit signage installation can have serious consequences during emergencies. Always double-check arrow directions, verify visibility from all approach angles, and ensure signs meet the required illumination levels. Take time to walk through escape routes from an occupant's perspective.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};