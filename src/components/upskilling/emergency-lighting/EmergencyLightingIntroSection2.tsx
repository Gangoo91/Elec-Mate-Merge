import { Lightbulb, MapPin, Building } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const EmergencyLightingIntroSection2 = () => {
  return (
    <Card className="bg-gradient-to-br from-elec-gray to-[#1a1a1a] border border-gray-600 shadow-lg">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-elec-yellow drop-shadow-md" />
          Locations Where Emergency Lights are Required
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <p>
          BS5266 and Building Regulations specify mandatory locations where emergency lighting must be installed. Understanding these requirements ensures compliance and effective evacuation procedures.
        </p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-gradient-to-br from-blue-600/20 to-blue-800/10 border border-blue-500/40 rounded-lg shadow-md">
            <h4 className="text-blue-300 font-semibold mb-2 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-400" />
              Escape Routes
            </h4>
            <p className="text-gray-300 text-sm">
              All escape routes, corridors, stairways, and final exits require adequate emergency lighting coverage.
            </p>
          </div>
          
          <div className="p-4 bg-gradient-to-br from-amber-600/20 to-orange-800/10 border border-amber-500/40 rounded-lg shadow-md">
            <h4 className="text-amber-300 font-semibold mb-2 flex items-center gap-2">
              <Building className="h-4 w-4 text-amber-400" />
              Specific Areas
            </h4>
            <p className="text-gray-300 text-sm">
              High-risk areas, plant rooms, toilets, and places of special fire risk need additional provisions.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};