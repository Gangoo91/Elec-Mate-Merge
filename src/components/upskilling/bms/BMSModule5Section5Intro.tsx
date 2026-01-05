import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Network } from 'lucide-react';

export const BMSModule5Section5Intro = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Network className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground">
          Modern buildings rarely use a single protocol. A project may have BACnet for HVAC, Modbus for meters, 
          and KNX for lighting and blinds. To make these systems work together, a gateway or protocol converter 
          is required. Gateways act as translators, converting data between different protocols so all devices 
          can communicate through the BMS.
        </p>
        
        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
          <h4 className="font-semibold text-elec-yellow mb-2">Key Takeaway for Electricians</h4>
          <p className="text-foreground text-sm">
            For electricians, gateways often look like small control modules or DIN-rail devices inside panels. 
            Correct installation and wiring ensures data passes reliably between subsystems.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};