import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, CheckCircle, AlertTriangle } from 'lucide-react';

export const BMSModule5Section2Summary = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
            <p className="text-foreground text-sm">
              BACnet is the most widely used open protocol in building automation, designed specifically for BMS applications.
            </p>
          </div>
          
          <div className="flex items-start gap-3">
            <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
            <p className="text-foreground text-sm">
              Key device types include controllers, sensors/actuators, operator workstations, and routers/gateways.
            </p>
          </div>
          
          <div className="flex items-start gap-3">
            <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
            <p className="text-foreground text-sm">
              Two main network types: MSTP (RS-485) for field devices and BACnet/IP for large-scale integration.
            </p>
          </div>
          
          <div className="flex items-start gap-3">
            <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
            <p className="text-foreground text-sm">
              MSTP requires proper cable selection, daisy-chain topology, and correct termination for reliability.
            </p>
          </div>
          
          <div className="flex items-start gap-3">
            <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
            <p className="text-foreground text-sm">
              BACnet/IP needs coordination with IT departments for addressing, VLANs, and network segregation.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-lg p-4">
          <h4 className="text-foreground font-semibold flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4" />
            Remember
          </h4>
          <p className="text-foreground text-sm">
            Poor wiring practices can cripple BACnet networks, even if the protocol itself is sound. 
            Your electrical installation work directly impacts system reliability and performance.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};