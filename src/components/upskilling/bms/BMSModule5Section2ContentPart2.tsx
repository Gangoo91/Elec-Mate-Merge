import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Network, Cable, Wifi } from 'lucide-react';

export const BMSModule5Section2ContentPart2 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Network className="h-5 w-5 text-elec-yellow" />
          BACnet Network Types
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          BACnet supports several types of communication media. The two most common for electricians are 
          MSTP (RS-485) and BACnet/IP (Ethernet). Each has distinct installation requirements.
        </p>
        
        <div className="grid md:grid-cols-1 gap-4">
          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-4">
            <h4 className="text-foreground font-semibold flex items-center gap-2 mb-3">
              <Cable className="h-4 w-4 text-elec-yellow" />
              BACnet MSTP (Master–Slave/Token Passing)
            </h4>
            <div className="space-y-2 text-sm">
              <p className="text-foreground">• Runs on RS-485 twisted-pair cabling</p>
              <p className="text-foreground">• Supports up to 127 devices per segment</p>
              <p className="text-foreground">• Requires correct termination resistors at both ends</p>
              <p className="text-foreground">• Common in HVAC field controllers</p>
              <p className="text-foreground">• Lower cost but slower communication speeds</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-4">
            <h4 className="text-foreground font-semibold flex items-center gap-2 mb-3">
              <Wifi className="h-4 w-4 text-elec-yellow" />
              BACnet/IP
            </h4>
            <div className="space-y-2 text-sm">
              <p className="text-foreground">• Uses standard Ethernet cabling and IP networks</p>
              <p className="text-foreground">• Scalable for large buildings and campuses</p>
              <p className="text-foreground">• Requires coordination with IT departments for addressing</p>
              <p className="text-foreground">• High speed and flexible</p>
              <p className="text-foreground">• Ideal for supervisory control and large installations</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-2">Key Differences</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-foreground font-medium">MSTP (RS-485):</p>
              <p className="text-foreground">• Cheaper cabling, simpler setup</p>
              <p className="text-foreground">• Ideal for device-level control</p>
            </div>
            <div>
              <p className="text-foreground font-medium">BACnet/IP:</p>
              <p className="text-foreground">• Requires more advanced IT infrastructure</p>
              <p className="text-foreground">• Best for integration across multiple systems</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};