import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';

export const EmergencyLightingIntroSection2_1 = () => {
  return (
    <Card className="bg-elec-gray border-elec-gray">
      <CardHeader className="pb-4">
        <CardTitle className="text-foreground flex items-center gap-2">
          <Info className="h-5 w-5 text-elec-yellow" />
          Introduction to Emergency Escape Lighting
        </CardTitle>
      </CardHeader>
      <CardContent className="text-elec-light space-y-4">
        <p>
          Emergency escape lighting is the most critical component of any emergency lighting system, 
          designed specifically to illuminate escape routes and exits to ensure safe evacuation during 
          power failures or emergency situations.
        </p>
        <p>
          This lighting category provides essential visibility for people to navigate from their 
          current location to a place of safety, typically the final exit or a protected area. 
          Understanding the proper application of escape lighting is fundamental to BS 5266 compliance 
          and occupant safety.
        </p>
        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4 mt-4">
          <p className="text-elec-yellow font-medium">
            <strong>Key Focus:</strong> This section covers the technical requirements, placement criteria, 
            and design considerations for emergency escape lighting systems in various building types.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};