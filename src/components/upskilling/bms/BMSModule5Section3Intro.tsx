import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, Network } from 'lucide-react';

export const BMSModule5Section3Intro = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Info className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          Modbus is one of the oldest and simplest building automation protocols. Despite being created in the 1970s, 
          it remains widely used because it is easy to implement, reliable, and supported by almost every device manufacturer. 
          You'll often find Modbus used in energy meters, boilers, chillers, VSDs (Variable Speed Drives), and BMS field devices.
        </p>
        <p>
          For electricians, Modbus means understanding how to wire serial networks correctly, how TCP/IP versions differ, 
          and how to avoid the common pitfalls (like exceeding cable lengths or device counts).
        </p>
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Network className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-foreground font-semibold mb-2">For Electricians</h4>
              <p className="text-sm text-foreground">
                Modbus success depends on proper electrical installation: correct cabling, device addressing, 
                and network topology. These fundamentals directly impact system reliability.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};