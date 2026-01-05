import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera } from 'lucide-react';

export const SmartHomeModule5Section2Intro = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Camera className="h-6 w-6 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <p>
          Closed-Circuit Television (CCTV) is a core component of smart security systems. With advances in IP cameras, 
          cloud storage, and AI features, modern CCTV offers far more than traditional analogue setups.
        </p>
        <p>
          This section explores different camera types, resolution standards, and storage methods so learners can 
          design and install the right system for each property.
        </p>
      </CardContent>
    </Card>
  );
};