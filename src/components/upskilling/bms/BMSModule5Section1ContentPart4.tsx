import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, AlertTriangle, CheckCircle, Wrench, Cable, Zap } from 'lucide-react';

export const BMSModule5Section1ContentPart4 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Settings className="h-5 w-5 text-elec-yellow" />
          Why Protocols Matter for Electricians
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <div className="bg-gradient-to-r from-elec-yellow/10 to-orange-500/10 border border-elec-yellow/20 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-2">Critical Understanding</h4>
          <p className="text-foreground">
            While BMS engineers handle protocol configuration, electricians are responsible for the physical 
            infrastructure that makes communication possible. Poor electrical installation can render even 
            the most sophisticated protocols completely ineffective.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
            <h4 className="text-foreground font-medium mb-2 flex items-center gap-2">
              <Cable className="h-4 w-4 text-blue-400" />
              Cable & Topology
            </h4>
            <ul className="text-foreground text-sm space-y-1">
              <li>• Choose correct cable types</li>
              <li>• Implement proper topology (star/bus/daisy-chain)</li>
              <li>• Maintain cable separation from power lines</li>
              <li>• Use shielded cables where needed</li>
            </ul>
          </div>

          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
            <h4 className="text-foreground font-medium mb-2 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              Signal Integrity
            </h4>
            <ul className="text-foreground text-sm space-y-1">
              <li>• Install proper termination resistors</li>
              <li>• Maintain correct polarity</li>
              <li>• Ensure proper grounding</li>
              <li>• Test cable continuity</li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-2 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            Common Installation Mistakes
          </h4>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <div>
              <h5 className="text-red-400 font-medium mb-1">Wiring Errors:</h5>
              <ul className="text-foreground space-y-1">
                <li>• Wrong topology for protocol</li>
                <li>• Incorrect RS-485 polarity</li>
                <li>• Missing termination resistors</li>
              </ul>
            </div>
            <div>
              <h5 className="text-red-400 font-medium mb-1">Environmental:</h5>
              <ul className="text-foreground space-y-1">
                <li>• Cables too close to power lines</li>
                <li>• Poor shield grounding</li>
                <li>• Inadequate surge protection</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-3">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded p-3">
            <h5 className="text-blue-400 font-medium text-sm mb-1">BACnet MSTP</h5>
            <p className="text-foreground text-xs">RS-485 twisted pair, 120Ω termination, daisy-chain only</p>
          </div>
          <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
            <h5 className="text-green-400 font-medium text-sm mb-1">Modbus RTU</h5>
            <p className="text-foreground text-xs">Max 32 devices, daisy-chain wiring, 120Ω terminators</p>
          </div>
          <div className="bg-purple-500/10 border border-purple-500/20 rounded p-3">
            <h5 className="text-purple-400 font-medium text-sm mb-1">KNX TP</h5>
            <p className="text-foreground text-xs">Certified bus cable, tree topology, no terminators needed</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};