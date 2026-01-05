import { Wifi } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const SmartHomeModule2Section3Intro = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Wifi className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          While Zigbee and Z-Wave dominate low-power mesh networking, the smart home ecosystem relies on several other critical protocols. Wi-Fi powers high-bandwidth devices, Bluetooth enables personal area networks, and emerging standards like Thread and Matter are reshaping how devices communicate.
        </p>
        <p>
          Understanding these protocols is essential for modern smart home installations. Each serves specific purposes and has unique characteristics that make them suitable for different applications. From streaming security cameras to unlocking doors with your phone, these protocols enable the diverse functionality we expect from connected homes.
        </p>
        <p>
          This section explores how these mainstream and emerging protocols complement mesh networks, their practical applications, and why the industry is moving towards greater interoperability through standards like Matter.
        </p>
      </CardContent>
    </Card>
  );
};