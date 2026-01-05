import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';

export const EmergencyLightingIntroSection4_1 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Info className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground leading-relaxed">
          Emergency lighting systems are only as reliable as the power supplies that feed them. Cables are critical because they must continue to function during an emergency, even when exposed to heat, smoke, or mechanical damage. Unlike standard lighting circuits, emergency lighting cabling must meet fire-resistance standards, be installed with care to avoid premature failure, and ensure system integrity throughout the duration of operation.
        </p>
        <p className="text-foreground leading-relaxed">
          Electricians need to select the correct type of cable, follow approved installation methods, and ensure compliance with BS 5266-1, BS 7671, and related standards. The wrong cable choice or poor installation can result in system failure precisely when it's needed most — during a fire emergency.
        </p>
        <div className="bg-elec-yellow/10 border border-elec-yellow/20 rounded-lg p-4">
          <p className="text-elec-yellow font-medium mb-2">Why This Matters</p>
          <p className="text-foreground text-sm leading-relaxed">
            A properly specified and installed cable system ensures that escape routes remain illuminated for the required duration (1-3 hours), even under extreme fire conditions. This can be the difference between life and death during building evacuation.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
