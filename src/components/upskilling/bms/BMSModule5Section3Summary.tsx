import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, CheckCircle, AlertTriangle } from 'lucide-react';

export const BMSModule5Section3Summary = () => {
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
              Modbus is a simple master–slave protocol widely used in BMS applications since the 1970s.
            </p>
          </div>
          
          <div className="flex items-start gap-3">
            <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
            <p className="text-foreground text-sm">
              Modbus RTU runs on RS-485 serial networks, while Modbus TCP/IP uses Ethernet infrastructure.
            </p>
          </div>
          
          <div className="flex items-start gap-3">
            <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
            <p className="text-foreground text-sm">
              Common applications include energy meters, boilers, chillers, VSDs, and BMS integration gateways.
            </p>
          </div>
          
          <div className="flex items-start gap-3">
            <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
            <p className="text-foreground text-sm">
              RTU requires proper RS-485 cabling, daisy-chain topology, termination, and unique device addressing.
            </p>
          </div>
          
          <div className="flex items-start gap-3">
            <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
            <p className="text-foreground text-sm">
              TCP/IP offers higher speed and scalability but requires IT coordination for network integration.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-lg p-4">
          <h4 className="text-foreground font-semibold flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4" />
            Critical Point
          </h4>
          <p className="text-foreground text-sm">
            Miswiring (especially star topology) and duplicate device addresses are the most common causes of Modbus failures. 
            Proper electrical installation practices are essential for reliable communication.
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-2">Professional Impact</h4>
          <p className="text-foreground text-sm">
            Understanding Modbus installation requirements enables electricians to deliver reliable BMS networks 
            that provide accurate data for energy management and building optimisation.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};