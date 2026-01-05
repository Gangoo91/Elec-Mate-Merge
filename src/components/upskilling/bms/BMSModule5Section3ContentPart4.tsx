import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Zap, Thermometer, Activity } from 'lucide-react';

export const BMSModule5Section3ContentPart4 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Building className="h-5 w-5 text-elec-yellow" />
          Typical BMS Use Cases
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          Modbus is found throughout modern buildings in various applications. Understanding where and why 
          it's used helps electricians plan installations and troubleshoot issues effectively.
        </p>
        
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg p-4">
            <h4 className="text-foreground font-semibold flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-elec-yellow" />
              Energy Meters
            </h4>
            <div className="space-y-2 text-sm">
              <p className="text-foreground"><strong>Application:</strong> Most electrical submeters use Modbus RTU or TCP/IP</p>
              <p className="text-foreground"><strong>Data:</strong> kWh consumption, power demand, voltage, current, power factor</p>
              <p className="text-foreground"><strong>Installation:</strong> Often daisy-chained in distribution boards</p>
              <p className="text-foreground"><strong>Benefits:</strong> Automated meter reading, energy monitoring, cost allocation</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-4">
            <h4 className="text-foreground font-semibold flex items-center gap-2 mb-2">
              <Thermometer className="h-4 w-4 text-elec-yellow" />
              Plant Equipment
            </h4>
            <div className="space-y-2 text-sm">
              <p className="text-foreground"><strong>Boilers:</strong> Temperature control, modulation, fault monitoring</p>
              <p className="text-foreground"><strong>Chillers:</strong> Capacity control, efficiency monitoring, diagnostics</p>
              <p className="text-foreground"><strong>VSDs:</strong> Speed control, motor monitoring, energy optimisation</p>
              <p className="text-foreground"><strong>Heat pumps:</strong> Operating modes, performance data, alarm status</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-4">
            <h4 className="text-foreground font-semibold flex items-center gap-2 mb-2">
              <Activity className="h-4 w-4 text-elec-yellow" />
              Integration Gateways
            </h4>
            <div className="space-y-2 text-sm">
              <p className="text-foreground"><strong>Protocol conversion:</strong> Modbus devices linked into BACnet systems</p>
              <p className="text-foreground"><strong>Legacy integration:</strong> Connecting older Modbus equipment to modern BMS</p>
              <p className="text-foreground"><strong>Multi-protocol sites:</strong> Bridging different communication standards</p>
              <p className="text-foreground"><strong>Cloud connectivity:</strong> IoT gateways for remote monitoring</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-4">
            <h4 className="text-foreground font-semibold mb-2">Common RTU Applications</h4>
            <div className="space-y-1 text-sm">
              <p className="text-foreground">• Electricity submetering</p>
              <p className="text-foreground">• Gas and water meters</p>
              <p className="text-foreground">• Simple plant control</p>
              <p className="text-foreground">• Temperature sensors</p>
              <p className="text-foreground">• Basic I/O modules</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg p-4">
            <h4 className="text-foreground font-semibold mb-2">Common TCP/IP Applications</h4>
            <div className="space-y-1 text-sm">
              <p className="text-foreground">• Modern chillers and boilers</p>
              <p className="text-foreground">• Advanced VSDs</p>
              <p className="text-foreground">• Building analytics systems</p>
              <p className="text-foreground">• Energy management platforms</p>
              <p className="text-foreground">• Remote monitoring systems</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-2">Installation Considerations</h4>
          <p className="text-foreground text-sm">
            When planning Modbus installations, consider the number of devices, update frequency requirements, 
            and existing network infrastructure. RTU is often sufficient for energy meters, while TCP/IP 
            may be necessary for real-time plant control and integration with IT systems.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};