import { Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const EarthFaultLoopIntro = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Shield className="h-5 w-5 text-elec-yellow" />
          Introduction to Earth Fault Loop Impedance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 sm:space-y-4 text-foreground text-sm sm:text-base leading-relaxed">
          <p>
            This section explains the concept of earth fault loop impedance—why we measure it, and how it relates to disconnection times and overall safety. Understanding the difference between Ze and Zs is crucial for ensuring electrical installations provide adequate protection against earth faults.
          </p>
          <p>
            Earth fault loop impedance testing verifies that protective devices will operate quickly enough to prevent danger in the event of an earth fault. This is a fundamental safety requirement under BS7671.
          </p>
          <div className="bg-elec-dark p-4 rounded-md border-l-4 border-elec-yellow">
            <p className="text-elec-yellow font-semibold">Key Point:</p>
            <p>The earth fault loop impedance must be low enough to ensure automatic disconnection within the required time limits—typically 0.4s for socket circuits and 5s for fixed equipment.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};