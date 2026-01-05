import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';

export const SmartHomeModule3Section3Intro = () => {
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
          Smart lighting isn't limited to switching on and off. With modern systems, users can dim lights, adjust colour temperature, and even choose from millions of colours (RGBW). These features improve energy efficiency, comfort, and mood. For installers, understanding how these systems work and their limitations is essential for delivering the right solution.
        </p>
      </CardContent>
    </Card>
  );
};