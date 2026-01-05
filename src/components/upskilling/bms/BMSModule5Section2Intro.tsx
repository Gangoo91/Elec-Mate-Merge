import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, Network } from 'lucide-react';

export const BMSModule5Section2Intro = () => {
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
          BACnet (Building Automation and Control Network) is the most widely used open protocol in building automation. 
          It was developed specifically for BMS applications, allowing devices from different manufacturers to communicate 
          on a common platform.
        </p>
        <p>
          For electricians, understanding BACnet means knowing how devices connect, what network types are used 
          (serial or IP), and how wiring choices affect system reliability. While BMS engineers configure the protocol, 
          electricians must ensure the physical layer — cables, terminations, and power — are correct.
        </p>
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Network className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-foreground font-semibold mb-2">For Electricians</h4>
              <p className="text-sm text-foreground">
                Your role is critical: proper cable selection, termination, and installation practices directly 
                affect BACnet network reliability. Poor wiring can cripple even the most sophisticated BMS.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};