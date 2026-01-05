import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Grid3x3, Home, TreePine, Building } from 'lucide-react';

export const GroupingLightsIntoZonesSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Grid3x3 className="h-6 w-6 text-elec-yellow" />
          Grouping Lights into Zones
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-foreground">
          Grouping allows multiple lights to be controlled as a single unit, creating logical areas that 
          can be managed together for convenience and efficiency.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="bg-elec-gray p-4 rounded-lg border border-gray-600">
            <div className="flex items-center gap-2 mb-3">
              <Home className="h-5 w-5 text-elec-yellow" />
              <h4 className="text-foreground font-semibold">Common Zone Examples</h4>
            </div>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• "Living Room" - all lounge area lights</li>
              <li>• "Kitchen" - ceiling, under-cabinet, island lights</li>
              <li>• "Downstairs" - all ground floor lighting</li>
              <li>• "Bedrooms" - all sleeping areas</li>
            </ul>
          </div>

          <div className="bg-elec-gray p-4 rounded-lg border border-gray-600">
            <div className="flex items-center gap-2 mb-3">
              <TreePine className="h-5 w-5 text-elec-yellow" />
              <h4 className="text-foreground font-semibold">Outdoor Zones</h4>
            </div>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• "Garden" - pathway and feature lighting</li>
              <li>• "Security" - perimeter and entrance lights</li>
              <li>• "Driveway" - approach and parking area</li>
              <li>• "Patio" - entertainment and dining areas</li>
            </ul>
          </div>

          <div className="bg-elec-gray p-4 rounded-lg border border-gray-600">
            <div className="flex items-center gap-2 mb-3">
              <Building className="h-5 w-5 text-elec-yellow" />
              <h4 className="text-foreground font-semibold">Control Methods</h4>
            </div>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Smartphone app group controls</li>
              <li>• Voice commands "Turn off downstairs"</li>
              <li>• Physical wall switches for zones</li>
              <li>• Time-based automation rules</li>
            </ul>
          </div>

          <div className="bg-elec-gray p-4 rounded-lg border border-gray-600">
            <div className="flex items-center gap-2 mb-3">
              <Grid3x3 className="h-5 w-5 text-elec-yellow" />
              <h4 className="text-foreground font-semibold">Grouping Benefits</h4>
            </div>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Single command controls multiple lights</li>
              <li>• Useful for large or open-plan spaces</li>
              <li>• Enables whole-home lighting control</li>
              <li>• Simplifies daily routines</li>
            </ul>
          </div>
        </div>

        <div className="bg-blue-900/20 border border-blue-600/50 p-4 rounded-lg">
          <p className="text-blue-200 text-sm">
            <strong>Best Practice:</strong> Name groups clearly and logically. Use descriptive names that all users 
            will understand, such as "Kitchen" rather than "Zone 3".
          </p>
        </div>
      </CardContent>
    </Card>
  );
};