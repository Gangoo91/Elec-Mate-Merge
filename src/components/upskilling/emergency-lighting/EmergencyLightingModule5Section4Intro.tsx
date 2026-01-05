import { BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const EmergencyLightingModule5Section4Intro = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Introduction to System Labelling and Maintenance Records
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground text-sm sm:text-base lg:text-lg leading-relaxed">
          An emergency lighting system is only as reliable as the way it is identified, documented, and maintained. Correct labelling ensures electricians, fire inspectors, and maintenance staff can easily locate circuits, fittings, and test points. At the same time, maintenance records provide the legal evidence that the system has been tested, serviced, and kept in compliance with BS 5266-1, BS 5266-8 (EN 50172), and the Fire Safety Order 2005.
        </p>
        <p className="text-foreground text-sm sm:text-base lg:text-lg leading-relaxed">
          Without proper labelling and documentation, even a technically sound system can fail a compliance audit. Clear identification accelerates fault-finding, reduces maintenance time, and ensures emergency systems remain operational when needed most.
        </p>
        <div className="bg-red-500/10 border-l-4 border-red-500 p-4 rounded-r-lg">
          <p className="text-foreground text-sm sm:text-base font-semibold">
            ⚠️ Legal Compliance Requirement
          </p>
          <p className="text-foreground text-sm sm:text-base mt-2">
            Missing or incomplete records can result in enforcement notices, invalid insurance, or prosecution — even if the physical installation is perfect. Documentation is not optional; it is a legal requirement under the Regulatory Reform (Fire Safety) Order 2005.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
