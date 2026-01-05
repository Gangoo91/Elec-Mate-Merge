import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Network, Users, Zap, Shield, Globe } from 'lucide-react';

export const BMSModule5Section4ContentPart1 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Network className="h-5 w-5 text-elec-yellow" />
          What is KNX?
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          KNX is a distributed bus system where each device (sensor, switch, actuator) can communicate directly 
          with others on the same bus. This peer-to-peer communication eliminates the need for a central controller 
          for basic building automation functions.
        </p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-3">
              <h4 className="text-foreground font-semibold flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-elec-yellow" />
                Vendor Neutrality
              </h4>
              <p className="text-foreground text-sm">
                Hundreds of manufacturers produce KNX-compatible devices, ensuring competition, 
                choice, and long-term availability of components.
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-3">
              <h4 className="text-foreground font-semibold flex items-center gap-2 mb-2">
                <Globe className="h-4 w-4 text-elec-yellow" />
                Multiple Media Support
              </h4>
              <p className="text-foreground text-sm">
                Supports twisted-pair bus (most common), Ethernet/IP (KNXnet/IP), 
                and wireless communication (KNX RF).
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg p-4">
            <h4 className="text-foreground font-semibold flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-elec-yellow" />
              Distributed Intelligence
            </h4>
            <div className="space-y-2 text-sm">
              <p className="text-foreground">• Devices communicate peer-to-peer</p>
              <p className="text-foreground">• No single point of failure</p>
              <p className="text-foreground">• Basic functions work independently</p>
              <p className="text-foreground">• Scalable from simple to complex systems</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-2">Practical Example</h4>
          <p className="text-foreground text-sm">
            A KNX wall switch can directly control a lighting actuator and a blind motor without requiring 
            a central controller. The switch sends a telegram on the bus, and any device programmed to 
            respond to that address will act accordingly.
          </p>
        </div>

        <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-2">KNX vs Other Protocols</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-foreground font-medium text-green-400">KNX Advantages:</p>
              <p className="text-foreground">• True interoperability between manufacturers</p>
              <p className="text-foreground">• Distributed intelligence</p>
              <p className="text-foreground">• Purpose-built for buildings</p>
            </div>
            <div>
              <p className="text-foreground font-medium text-blue-400">Considerations:</p>
              <p className="text-foreground">• Requires specialist programming (ETS)</p>
              <p className="text-foreground">• Higher initial device costs</p>
              <p className="text-foreground">• More complex installation requirements</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};