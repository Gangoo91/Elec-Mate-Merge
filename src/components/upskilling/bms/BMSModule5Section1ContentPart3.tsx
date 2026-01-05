import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Network, Zap, Globe, Settings, Wifi, Cable } from 'lucide-react';

export const BMSModule5Section1ContentPart3 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Network className="h-5 w-5 text-elec-yellow" />
          Common BMS Protocols
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-2 flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-400" />
            BACnet (Building Automation and Control Network)
          </h4>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-foreground mb-2">• ASHRAE Standard 135</p>
              <p className="text-foreground mb-2">• Large commercial buildings</p>
              <p className="text-foreground mb-2">• HVAC and lighting control</p>
            </div>
            <div className="bg-blue-500/10 rounded p-2">
              <p className="text-foreground text-xs">
                <span className="font-medium">For Electricians:</span> MSTP requires RS-485 twisted pair 
                with proper termination and daisy-chain topology.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-2 flex items-center gap-2">
            <Zap className="h-5 w-5 text-green-400" />
            Modbus (Industrial Communication Standard)
          </h4>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-foreground mb-2">• Simple master-slave architecture</p>
              <p className="text-foreground mb-2">• Energy meters and VFDs</p>
              <p className="text-foreground mb-2">• Boilers and chillers</p>
            </div>
            <div className="bg-green-500/10 rounded p-2">
              <p className="text-foreground text-xs">
                <span className="font-medium">Key Point:</span> Must use daisy-chain wiring. 
                Star topology causes communication failures.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-2 flex items-center gap-2">
            <Settings className="h-5 w-5 text-purple-400" />
            KNX (European Installation Bus)
          </h4>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-foreground mb-2">• Lighting and blind control</p>
              <p className="text-foreground mb-2">• Room temperature control</p>
              <p className="text-foreground mb-2">• Growing UK adoption</p>
            </div>
            <div className="bg-purple-500/10 rounded p-2">
              <p className="text-foreground text-xs">
                <span className="font-medium">Options:</span> Twisted pair (most common), 
                wireless RF, or power line communication.
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-600 rounded">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="text-left text-foreground p-2">Protocol</th>
                <th className="text-left text-foreground p-2">Complexity</th>
                <th className="text-left text-foreground p-2">Main Use</th>
                <th className="text-left text-foreground p-2">UK Share</th>
              </tr>
            </thead>
            <tbody className="text-foreground">
              <tr className="border-b border-gray-700">
                <td className="p-2 text-blue-400">BACnet</td>
                <td className="p-2">High</td>
                <td className="p-2">Large buildings</td>
                <td className="p-2">60%</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="p-2 text-green-400">Modbus</td>
                <td className="p-2">Low</td>
                <td className="p-2">Industrial</td>
                <td className="p-2">25%</td>
              </tr>
              <tr>
                <td className="p-2 text-purple-400">KNX</td>
                <td className="p-2">Medium</td>
                <td className="p-2">Lighting/HVAC</td>
                <td className="p-2">8%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};