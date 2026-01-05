import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, CheckSquare, AlertTriangle } from 'lucide-react';

export const BMSModule5Section5Practical = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          Practical Guidance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-elec-yellow font-semibold mb-4 flex items-center gap-2">
            <Wrench className="h-4 w-4" />
            Installing Gateways
          </h3>
          <div className="grid gap-4">
            <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
              <h4 className="font-semibold text-foreground mb-2">Location</h4>
              <p className="text-foreground text-sm">
                Mount gateways in control panels or equipment rooms, close to the systems they link.
              </p>
            </div>
            
            <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
              <h4 className="font-semibold text-foreground mb-2">Cabling</h4>
              <p className="text-foreground text-sm">
                Wire each protocol to its own terminal — e.g., RS-485 for Modbus, twisted pair for KNX, Ethernet for BACnet/IP.
              </p>
            </div>
            
            <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
              <h4 className="font-semibold text-foreground mb-2">Power</h4>
              <p className="text-foreground text-sm">
                Provide correct voltage supply (often 24V DC) with protection.
              </p>
            </div>
            
            <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
              <h4 className="font-semibold text-foreground mb-2">Addressing</h4>
              <p className="text-foreground text-sm">
                Assign the correct device address/IP address for each protocol side.
              </p>
            </div>
            
            <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
              <h4 className="font-semibold text-foreground mb-2">Labelling</h4>
              <p className="text-foreground text-sm">
                Clearly label gateway terminals and indicate which protocols are being converted.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-elec-yellow font-semibold mb-4 flex items-center gap-2">
            <CheckSquare className="h-4 w-4" />
            Supporting Commissioning
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-medium text-foreground">Document everything</h4>
                <p className="text-foreground text-sm">
                  Provide clear drawings showing what protocols are linked and through which gateways.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-medium text-foreground">Check status LEDs</h4>
                <p className="text-foreground text-sm">
                  Most gateways have diagnostic lights for communication. Check before handover.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-medium text-foreground">Test both sides</h4>
                <p className="text-foreground text-sm">
                  Verify data is visible on both the "source" (e.g., Modbus meter) and the "target" (e.g., BACnet workstation).
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-medium text-foreground">Leave space</h4>
                <p className="text-foreground text-sm">
                  Plan panels with space for additional gateways in future upgrades.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-red-400 font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Avoiding Common Pitfalls
          </h3>
          <div className="space-y-3">
            <div className="bg-red-900/20 border border-red-600/30 rounded-lg p-3">
              <p className="text-foreground text-sm">
                Forgetting to wire the shield correctly on RS-485 connections, causing noise.
              </p>
            </div>
            
            <div className="bg-red-900/20 border border-red-600/30 rounded-lg p-3">
              <p className="text-foreground text-sm">
                Overloading gateways by trying to convert too many devices at once.
              </p>
            </div>
            
            <div className="bg-red-900/20 border border-red-600/30 rounded-lg p-3">
              <p className="text-foreground text-sm">
                Poor labelling, making it unclear which devices are linked through which gateway.
              </p>
            </div>
            
            <div className="bg-red-900/20 border border-red-600/30 rounded-lg p-3">
              <p className="text-foreground text-sm">
                Not coordinating with IT teams when gateways are connected to BACnet/IP networks.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};