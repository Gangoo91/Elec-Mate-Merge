import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cable, Hash, Clock, AlertTriangle } from 'lucide-react';

export const BMSModule5Section3ContentPart2 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Cable className="h-5 w-5 text-elec-yellow" />
          Modbus RTU (Serial)
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          Modbus RTU (Remote Terminal Unit) uses RS-485 serial communication. It's the most common form of Modbus 
          in building automation, particularly for devices like energy meters and plant equipment.
        </p>
        
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg p-4">
            <h4 className="text-foreground font-semibold mb-2">Technical Specifications</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <p className="text-foreground">• Uses RS-485 twisted-pair cabling</p>
                <p className="text-foreground">• Devices daisy-chained with unique addresses</p>
                <p className="text-foreground">• Supports up to 32 devices per segment</p>
              </div>
              <div className="space-y-1">
                <p className="text-foreground">• Typical baud rates: 9600–115200 bps</p>
                <p className="text-foreground">• Requires termination resistors at both ends</p>
                <p className="text-foreground">• Maximum cable length: 1200m per segment</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-4">
            <h4 className="text-foreground font-semibold flex items-center gap-2 mb-2">
              <Hash className="h-4 w-4 text-elec-yellow" />
              Device Addressing
            </h4>
            <div className="space-y-2 text-sm">
              <p className="text-foreground">• Each device has a unique address (1-247)</p>
              <p className="text-foreground">• Address 0 reserved for broadcast messages</p>
              <p className="text-foreground">• Duplicate addresses cause communication failures</p>
              <p className="text-foreground">• Address configuration usually via DIP switches or software</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-4">
            <h4 className="text-foreground font-semibold flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-elec-yellow" />
              Communication Speed
            </h4>
            <div className="space-y-2 text-sm">
              <p className="text-foreground">• Slower than Ethernet-based protocols</p>
              <p className="text-foreground">• Master must poll each device sequentially</p>
              <p className="text-foreground">• Higher baud rates = faster updates but less reliable over distance</p>
              <p className="text-foreground">• Suitable for applications with moderate update requirements</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-2">Typical Example</h4>
          <p className="text-foreground text-sm">
            A row of electricity submeters in a distribution board, all connected to a Modbus RTU bus, 
            reporting kWh readings back to the BMS every 30 seconds. Each meter has a unique address, 
            and the BMS polls them sequentially for energy data.
          </p>
        </div>

        <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-lg p-4">
          <h4 className="text-foreground font-semibold flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4" />
            Installation Requirements & Signal Quality
          </h4>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-foreground font-medium">Cabling Requirements:</p>
              <p className="text-foreground">• Must use proper RS-485 cable (shielded twisted pair, 120Ω)</p>
              <p className="text-foreground">• Daisy-chain topology only — no star wiring</p>
              <p className="text-foreground">• Termination resistors essential for signal integrity</p>
              <p className="text-foreground">• Proper grounding to prevent interference</p>
            </div>
            <div>
              <p className="text-foreground font-medium">Signal Quality Factors:</p>
              <p className="text-foreground">• Cable length affects maximum baud rate</p>
              <p className="text-foreground">• At 1200m: maximum 9600 bps for reliable communication</p>
              <p className="text-foreground">• At 100m: up to 115200 bps possible</p>
              <p className="text-foreground">• Electromagnetic interference can cause data corruption</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/20 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-2">Common Wiring Issues & Solutions</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-foreground font-medium text-red-400">Common Problems:</p>
              <p className="text-foreground">• Reversed A/B polarity</p>
              <p className="text-foreground">• Missing termination resistors</p>
              <p className="text-foreground">• Star wiring instead of daisy-chain</p>
              <p className="text-foreground">• Duplicate device addresses</p>
            </div>
            <div>
              <p className="text-foreground font-medium text-green-400">Solutions:</p>
              <p className="text-foreground">• Check continuity and polarity</p>
              <p className="text-foreground">• Install 120Ω resistors at both ends</p>
              <p className="text-foreground">• Rewire as proper bus topology</p>
              <p className="text-foreground">• Document and verify all addresses</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};