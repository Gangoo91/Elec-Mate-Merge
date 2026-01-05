import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Users, Database, Zap } from 'lucide-react';

export const BMSModule5Section3ContentPart1 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-elec-yellow" />
          What is Modbus?
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          Modbus is a master–slave protocol where a central controller (master) polls devices (slaves) for information. 
          Created in the 1970s for industrial automation, it has proven its reliability and simplicity over decades of use.
        </p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-3">
              <h4 className="text-foreground font-semibold flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-elec-yellow" />
                Simplicity
              </h4>
              <p className="text-foreground text-sm">
                Each device has an address, and the master requests data registers. 
                No complex configuration or protocol stacks required.
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-3">
              <h4 className="text-foreground font-semibold flex items-center gap-2 mb-2">
                <Database className="h-4 w-4 text-elec-yellow" />
                Flexibility
              </h4>
              <p className="text-foreground text-sm">
                Works across many device types: meters, sensors, boilers, VSDs. 
                Almost universal support from manufacturers.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg p-4">
            <h4 className="text-foreground font-semibold flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-elec-yellow" />
              Master-Slave Architecture
            </h4>
            <div className="space-y-2 text-sm">
              <p className="text-foreground">• Master initiates all communication</p>
              <p className="text-foreground">• Slaves respond only when polled</p>
              <p className="text-foreground">• Simple request/response cycle</p>
              <p className="text-foreground">• Predictable network traffic patterns</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-2">Trade-offs</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-foreground font-medium text-green-400">Advantages:</p>
              <p className="text-foreground">• Simple to implement and troubleshoot</p>
              <p className="text-foreground">• Reliable and proven technology</p>
              <p className="text-foreground">• Low cost and wide device support</p>
              <p className="text-foreground">• Minimal network overhead</p>
            </div>
            <div>
              <p className="text-foreground font-medium text-orange-400">Limitations:</p>
              <p className="text-foreground">• Limited data structure vs BACnet</p>
              <p className="text-foreground">• Master must poll each device individually</p>
              <p className="text-foreground">• No automatic device discovery</p>
              <p className="text-foreground">• Limited error reporting capabilities</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-2">Modbus Function Codes (Key Learning)</h4>
          <div className="space-y-2 text-sm">
            <p className="text-foreground font-medium">Essential function codes electricians should know:</p>
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <p className="text-foreground">• <span className="text-elec-yellow">01</span> - Read Coils (digital outputs)</p>
                <p className="text-foreground">• <span className="text-elec-yellow">02</span> - Read Discrete Inputs</p>
                <p className="text-foreground">• <span className="text-elec-yellow">03</span> - Read Holding Registers</p>
              </div>
              <div>
                <p className="text-foreground">• <span className="text-elec-yellow">04</span> - Read Input Registers</p>
                <p className="text-foreground">• <span className="text-elec-yellow">05</span> - Write Single Coil</p>
                <p className="text-foreground">• <span className="text-elec-yellow">06</span> - Write Single Register</p>
              </div>
            </div>
            <p className="text-foreground text-xs italic">Function codes 03 and 04 are most commonly used for reading meter data and sensor values.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};