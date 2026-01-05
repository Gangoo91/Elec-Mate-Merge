import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Network, Server, Layers } from 'lucide-react';

export const BMSModule5Section1ContentPart1 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-elec-yellow" />
          What Are Communication Protocols?
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          A communication protocol is a set of rules and standards that defines how devices exchange 
          information over a network. In Building Management Systems (BMS), protocols are the digital 
          "languages" that enable different building systems to communicate effectively.
        </p>
        
        <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-2">Think of it Like This</h4>
          <p className="text-foreground">
            Imagine a hospital where departments speak different languages. The BMS acts as a universal 
            translator, ensuring all departments can coordinate effectively.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="text-foreground font-semibold flex items-center gap-2">
              <Network className="h-4 w-4 text-elec-yellow" />
              Key Components
            </h4>
            <ul className="space-y-1 text-foreground text-sm">
              <li>• Message Structure: How data is packaged</li>
              <li>• Addressing: How devices find each other</li>
              <li>• Error Handling: Detecting transmission errors</li>
              <li>• Flow Control: Managing transmission timing</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="text-foreground font-semibold flex items-center gap-2">
              <Layers className="h-4 w-4 text-elec-yellow" />
              Network Layers
            </h4>
            <div className="space-y-1 text-sm">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded p-2">
                <div className="text-foreground font-medium">Application: BACnet, Modbus</div>
              </div>
              <div className="bg-green-500/10 border border-green-500/20 rounded p-2">
                <div className="text-foreground font-medium">Physical: RS-485, Ethernet</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};