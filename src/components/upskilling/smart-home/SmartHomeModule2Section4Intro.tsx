import { Radio } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const SmartHomeModule2Section4Intro = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Radio className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-foreground">
        <p className="text-foreground">
          Smart homes rely on wireless communication, but wireless networks are not perfect. Interference, poor channel planning, and bandwidth limitations can cause devices to drop out or perform slowly. Installers must understand how wireless signals work in the real world to design reliable systems.
        </p>
      </CardContent>
    </Card>
  );
};