import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

export const EmergencyLightingModule5Section2Intro = () => {
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
          Once an emergency lighting system has been visually inspected and verified, it must undergo functional testing to ensure it operates correctly in the event of mains failure. Functional tests simulate a real power outage, proving that all fittings switch to emergency mode and provide the required illumination.
        </p>
        <p className="text-foreground text-sm sm:text-base lg:text-lg leading-relaxed">
          In addition, full 3-hour duration tests confirm that batteries and luminaires can sustain illumination for the legally required time under BS 5266-1. These tests are essential for compliance, life safety, and insurance validity.
        </p>
        <div className="bg-red-500/10 border-l-4 border-red-500 p-4 rounded-r-lg">
          <p className="text-foreground text-sm sm:text-base font-semibold">
            ⚠️ Safety Critical Requirement
          </p>
          <p className="text-foreground text-sm sm:text-base mt-2">
            Without proper functional and duration testing, emergency lighting systems may fail during real emergencies, putting lives at risk and invalidating insurance coverage.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
