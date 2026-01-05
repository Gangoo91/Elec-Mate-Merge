import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

export const EmergencyLightingModule5Section1Intro = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground text-sm sm:text-base lg:text-lg leading-relaxed">
          Emergency lighting systems must be thoroughly inspected and verified before being put into service. This initial inspection ensures that the installation complies with approved designs, meets BS 5266-1 and BS 7671 requirements, and is safe to commission and operate.
        </p>
        <p className="text-foreground text-sm sm:text-base lg:text-lg leading-relaxed">
          Initial inspection and verification is a systematic process that confirms all physical installation work, electrical connections, and luminaire placements are correct. This stage identifies any installation defects, wiring errors, or design deviations before the system is energised and tested.
        </p>
        <div className="bg-elec-yellow/10 border border-elec-yellow/20 rounded-lg p-4">
          <p className="text-elec-yellow font-medium mb-2">Why This Matters</p>
          <p className="text-foreground text-sm sm:text-base leading-relaxed">
            Proper initial inspection prevents potentially dangerous faults from remaining hidden in the system. Without thorough verification, wiring errors, incorrect polarity, or non-compliant installations may only be discovered during an actual emergency — when lives depend on the system working correctly.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
