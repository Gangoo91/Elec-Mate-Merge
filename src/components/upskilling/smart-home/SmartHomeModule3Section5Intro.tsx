import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';

export const SmartHomeModule3Section5Intro = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Info className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p className="leading-relaxed">
          Smart lighting really shines when devices work together. Grouping lights into zones, linking them to other 
          systems (like HVAC or security), and applying motion-based logic allows for convenience, safety, and energy savings.
        </p>
        <p className="leading-relaxed">
          This section explores how installers and users can design effective automation strategies that enhance the 
          smart home experience whilst maintaining reliability and user control.
        </p>
      </CardContent>
    </Card>
  );
};