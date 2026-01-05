import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wifi, Server, Shield, Users } from 'lucide-react';

export const BMSModule5Section2ContentPart4 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Wifi className="h-5 w-5 text-elec-yellow" />
          BACnet/IP Implementation
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          BACnet/IP uses standard Ethernet infrastructure, making it scalable and fast. However, it requires 
          coordination with IT departments and careful network planning to avoid conflicts with corporate systems.
        </p>
        
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-4">
            <h4 className="text-foreground font-semibold flex items-center gap-2 mb-2">
              <Server className="h-4 w-4 text-elec-yellow" />
              Cabling & Infrastructure
            </h4>
            <div className="space-y-1 text-sm">
              <p className="text-foreground">• Use Cat5e or higher Ethernet cable</p>
              <p className="text-foreground">• Follow standard Ethernet installation practices</p>
              <p className="text-foreground">• Ensure adequate switch ports and PoE if required</p>
              <p className="text-foreground">• Plan cable routes to avoid electromagnetic interference</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-4">
            <h4 className="text-foreground font-semibold flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-elec-yellow" />
              Network Segregation
            </h4>
            <div className="space-y-1 text-sm">
              <p className="text-foreground">• Keep BMS traffic separate from corporate IT traffic</p>
              <p className="text-foreground">• Use VLANs to isolate BMS network segments</p>
              <p className="text-foreground">• Implement appropriate firewall rules</p>
              <p className="text-foreground">• Consider dedicated BMS network infrastructure</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg p-4">
            <h4 className="text-foreground font-semibold flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-elec-yellow" />
              IT Department Coordination
            </h4>
            <div className="space-y-1 text-sm">
              <p className="text-foreground">• Coordinate IP address ranges and subnets</p>
              <p className="text-foreground">• Agree on network security policies</p>
              <p className="text-foreground">• Plan for network monitoring and maintenance</p>
              <p className="text-foreground">• Establish clear labelling for BMS network ports</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-2">Installation Tips</h4>
          <div className="space-y-1 text-sm">
            <p className="text-foreground">• Label Ethernet drops clearly as "BMS" to avoid confusion</p>
            <p className="text-foreground">• Verify IP addresses, ping devices during commissioning</p>
            <p className="text-foreground">• Document network topology and addressing scheme</p>
            <p className="text-foreground">• Test bandwidth and latency for critical control loops</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};