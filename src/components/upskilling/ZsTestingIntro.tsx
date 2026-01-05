import { Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ZsTestingIntro = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Settings className="h-5 w-5 text-elec-yellow" />
          Introduction to Testing Zs at Various Points
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 sm:space-y-4 text-foreground text-sm sm:text-base leading-relaxed">
          <p>
            Here we focus on how and where to test Zs values throughout an installation to confirm compliance and safety. Proper testing technique and location selection are critical for accurate results and ensuring protection effectiveness.
          </p>
          <p>
            Testing Zs at various points helps verify that all parts of the installation will be adequately protected, not just the circuits closest to the distribution board. This comprehensive approach ensures no weak points exist in the protection system.
          </p>
          <div className="bg-elec-dark p-4 rounded-md border-l-4 border-elec-yellow">
            <p className="text-elec-yellow font-semibold">Critical Point:</p>
            <p>Always test at the furthest point from the supply—this represents the worst-case scenario and ensures protection throughout the entire circuit length.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};