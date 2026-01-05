import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, Cable, Users, AlertTriangle } from 'lucide-react';

export const BMSModule5Section1Practical = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Wrench className="h-5 w-5 text-elec-yellow" />
            Practical Guidance
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-6">
          
          {/* Wiring Protocol Buses */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Cable className="h-5 w-5 text-elec-yellow" />
              <h4 className="text-foreground font-semibold">Wiring Protocol Buses</h4>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-lg p-4">
                <h5 className="text-foreground font-medium mb-2">Follow Standards</h5>
                <p className="text-sm text-gray-300">
                  Use the recommended cable type for each protocol (e.g., shielded twisted pair for RS-485 Modbus/BACnet).
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-lg p-4">
                <h5 className="text-foreground font-medium mb-2">Check Polarity</h5>
                <p className="text-sm text-gray-300">
                  Many serial protocols (RS-485) are polarity-sensitive; reversing wires stops communication.
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-lg p-4">
                <h5 className="text-foreground font-medium mb-2">Terminations</h5>
                <p className="text-sm text-gray-300">
                  Fit terminating resistors at both ends of RS-485 networks to prevent signal reflections.
                </p>
              </div>
              <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/20 rounded-lg p-4">
                <h5 className="text-foreground font-medium mb-2">Segregate Cabling</h5>
                <p className="text-sm text-gray-300">
                  Keep communication cabling away from mains power to avoid electromagnetic interference.
                </p>
              </div>
            </div>
          </div>

          {/* Supporting Commissioning Engineers */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Users className="h-5 w-5 text-elec-yellow" />
              <h4 className="text-foreground font-semibold">Supporting Commissioning Engineers</h4>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2"></div>
                <div>
                  <span className="text-foreground font-medium">Label all comms cables clearly</span>
                  <p className="text-sm text-gray-400">Include protocol type and device address if known</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2"></div>
                <div>
                  <span className="text-foreground font-medium">Leave spare loops in panels</span>
                  <p className="text-sm text-gray-400">For testing and adding devices</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2"></div>
                <div>
                  <span className="text-foreground font-medium">Provide as-built drawings</span>
                  <p className="text-sm text-gray-400">Show comms cable routes and connections</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2"></div>
                <div>
                  <span className="text-foreground font-medium">Check continuity and shielding</span>
                  <p className="text-sm text-gray-400">Use a multimeter before handover</p>
                </div>
              </div>
            </div>
          </div>

          {/* Avoiding Common Pitfalls */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <h4 className="text-foreground font-semibold">Avoiding Common Pitfalls</h4>
            </div>
            <div className="space-y-3">
              <div className="bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/20 rounded-lg p-3">
                <h5 className="text-red-400 font-medium mb-1">Mixing Incompatible Protocols</h5>
                <p className="text-sm text-gray-300">
                  Don't try to connect KNX directly to Modbus without proper gateways
                </p>
              </div>
              <div className="bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/20 rounded-lg p-3">
                <h5 className="text-red-400 font-medium mb-1">Device Count Limits</h5>
                <p className="text-sm text-gray-300">
                  Avoid daisy-chaining too many devices on one RS-485 segment
                </p>
              </div>
              <div className="bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/20 rounded-lg p-3">
                <h5 className="text-red-400 font-medium mb-1">Grounding Issues</h5>
                <p className="text-sm text-gray-300">
                  Don't forget grounding for shielded cables, which leads to noise issues
                </p>
              </div>
              <div className="bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/20 rounded-lg p-3">
                <h5 className="text-red-400 font-medium mb-1">Interference Sources</h5>
                <p className="text-sm text-gray-300">
                  Never run comms cable alongside VSD supply cables - causes severe interference
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};