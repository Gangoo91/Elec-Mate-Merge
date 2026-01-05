import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, Shield, Thermometer, Tv, Bell } from 'lucide-react';

export const LinkingLightingToOtherSystemsSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Link className="h-6 w-6 text-elec-yellow" />
          Linking Lighting to Other Systems
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-foreground">
          Integrating lighting with other smart home systems creates powerful automation scenarios that 
          enhance security, comfort, energy efficiency, and accessibility.
        </p>

        <div className="grid gap-4">
          <div className="bg-elec-gray p-4 rounded-lg border border-gray-600">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="h-5 w-5 text-elec-yellow" />
              <h4 className="text-foreground font-semibold">Security Integration</h4>
            </div>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Lights triggered by burglar alarm activation</li>
              <li>• CCTV motion detection activates flood lighting</li>
              <li>• Door/window sensors trigger entry lighting</li>
              <li>• Random lighting patterns when away (simulation)</li>
            </ul>
          </div>

          <div className="bg-elec-gray p-4 rounded-lg border border-gray-600">
            <div className="flex items-center gap-2 mb-3">
              <Thermometer className="h-5 w-5 text-elec-yellow" />
              <h4 className="text-foreground font-semibold">HVAC Integration</h4>
            </div>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Lights dim when blinds close for cooling</li>
              <li>• Colour temperature adjusts with heating cycles</li>
              <li>• Room occupancy detected for climate control</li>
              <li>• Energy-saving coordination between systems</li>
            </ul>
          </div>

          <div className="bg-elec-gray p-4 rounded-lg border border-gray-600">
            <div className="flex items-center gap-2 mb-3">
              <Tv className="h-5 w-5 text-elec-yellow" />
              <h4 className="text-foreground font-semibold">Entertainment Integration</h4>
            </div>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Lights dim automatically when TV starts</li>
              <li>• Colour sync with music or video content</li>
              <li>• Gaming mode with reactive lighting effects</li>
              <li>• Cinema scenes for movie watching</li>
            </ul>
          </div>

          <div className="bg-elec-gray p-4 rounded-lg border border-gray-600">
            <div className="flex items-center gap-2 mb-3">
              <Bell className="h-5 w-5 text-elec-yellow" />
              <h4 className="text-foreground font-semibold">Accessibility Integration</h4>
            </div>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Visual alerts for doorbell or phone calls</li>
              <li>• Flashing lights for smoke alarm warnings</li>
              <li>• Gentle wake-up lighting integration</li>
              <li>• Emergency lighting pathways activation</li>
            </ul>
          </div>
        </div>

        <div className="bg-green-900/20 border border-green-600/50 p-4 rounded-lg">
          <p className="text-green-200 text-sm">
            <strong>Integration Advantage:</strong> Linked systems work together intelligently, providing 
            functionality that exceeds the sum of individual components.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};