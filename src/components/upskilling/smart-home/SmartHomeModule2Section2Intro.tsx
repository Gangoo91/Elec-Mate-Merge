import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';

export const SmartHomeModule2Section2Intro = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Info className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <p>
          <strong className="text-foreground">Zigbee and Z-Wave</strong> are two of the most widely used wireless protocols in smart homes. Both use mesh networking to extend range and reliability, and both are optimised for low-power devices like sensors, switches, and locks.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div className="p-4 bg-[#1a1a1a] border border-blue-600 rounded-lg">
            <h4 className="font-semibold text-blue-200 mb-2">Zigbee Protocol</h4>
            <p className="text-blue-100 text-sm">2.4GHz mesh networking with wide device support and extensive manufacturer adoption.</p>
          </div>
          
          <div className="p-4 bg-[#1a1a1a] border border-green-600 rounded-lg">
            <h4 className="font-semibold text-green-200 mb-2">Z-Wave Protocol</h4>
            <p className="text-green-100 text-sm">Sub-1GHz mesh networking with excellent range and wall penetration capabilities.</p>
          </div>
        </div>

        <p>
          However, they differ in frequency, range, and compatibility — which makes it important to understand when to choose one over the other for optimal smart home performance.
        </p>
      </CardContent>
    </Card>
  );
};