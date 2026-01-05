import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

export const EmergencyLightingModule5Section3Intro = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <BookOpen className="h-6 w-6 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground text-sm sm:text-base lg:text-lg leading-relaxed">
          Emergency lighting is only effective if it works when needed. Regular testing ensures systems remain reliable, compliant, and safe throughout their life cycle. UK law under the Regulatory Reform (Fire Safety) Order 2005 requires the Responsible Person to maintain life safety systems, while BS 5266-8 (EN 50172) sets the specific testing regime.
        </p>
        <p className="text-foreground text-sm sm:text-base lg:text-lg leading-relaxed">
          For electricians, knowing the difference between monthly functional tests and annual full-duration tests — and how to document them — is critical to compliance.
        </p>
        <div className="bg-red-500/10 border-l-4 border-red-500 p-4 rounded-r-lg">
          <p className="text-foreground text-sm sm:text-base font-semibold">
            ⚠️ Legal Compliance Requirement
          </p>
          <p className="text-foreground text-sm sm:text-base mt-2">
            Testing without proper documentation is legally worthless. All test results must be recorded in the emergency lighting logbook and made available to fire authorities and insurers upon request.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
