import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

export const BMSModule5Section6Intro = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          A Building Management System (BMS) is only as strong as the network that supports it. Even if BACnet, Modbus, or KNX devices are installed correctly, poor network planning can cause bottlenecks, communication failures, or excessive delays (latency).
        </p>
        
        <p>
          For electricians, this means more than just pulling cable. It requires understanding how network segmentation, device counts, and cable layouts affect performance. While IT engineers design the higher-level networks, electricians are responsible for the physical layer — cabling, terminations, shielding, and correct panel wiring.
        </p>
        
        <div className="bg-red-600/20 border border-red-600/40 rounded-lg p-4">
          <p className="text-red-100 font-medium">
            <strong>Critical Point:</strong> Poor network planning can result in data clashes, long delays, or complete loss of control — making even the best BMS installations unreliable.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};