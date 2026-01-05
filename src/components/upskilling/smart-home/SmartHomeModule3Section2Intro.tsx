import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';

export const SmartHomeModule3Section2Intro = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Info className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          One of the most powerful features of smart lighting is the ability to create scenes (preset lighting states for activities) and schedules (automated control based on time or conditions). Instead of manually switching lights on and off, smart homes let users set up personalised routines that balance comfort, energy savings, and convenience.
        </p>
      </CardContent>
    </Card>
  );
};