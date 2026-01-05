
import { Users, AlertTriangle, CheckCircle, Wrench } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const RingFinalScenario = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Users className="h-5 w-5 text-elec-yellow" />
          On-the-Job Scenario
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-[#323232] rounded-lg p-4">
          <h3 className="text-foreground font-semibold mb-3">Real-World Challenge</h3>
          <div className="bg-orange-600/10 border border-orange-600/20 rounded p-4 mb-4">
            <p className="text-foreground leading-relaxed">
              You perform cross-connection tests on a ring final circuit and get a <strong>much lower resistance</strong> at 
              one socket compared to all others. The reading is 0.15Ω when all other sockets show 0.65-0.75Ω. 
              What should you do next?
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="bg-red-600/10 border border-red-600/20 rounded p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-red-200 font-medium mb-2">Assessment</h4>
                <p className="text-foreground text-sm leading-relaxed">
                    This significantly low reading suggests a possible interconnection with another circuit 
                    or a wiring fault. This creates a dangerous parallel path that could overload conductors.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-600/10 border border-green-600/20 rounded p-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-green-200 font-medium mb-2">Correct Action</h4>
                  <p className="text-foreground text-sm leading-relaxed mb-3">
                    Investigate immediately for:
                  </p>
                  <ul className="space-y-1 text-foreground text-sm">
                    <li>• Interconnection with another ring circuit</li>
                    <li>• Cross-connection between circuits at accessories</li>
                    <li>• Parallel paths through metal containment</li>
                    <li>• Incorrect connections at distribution board</li>
                  </ul>
                  <p className="text-foreground text-sm mt-3 font-medium">
                    <strong>Critical:</strong> Do not proceed with further tests until this issue is resolved and the circuit shows consistent readings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
          <h4 className="text-blue-200 font-medium mb-2 flex items-center gap-2">
            <Wrench className="h-4 w-4" />
            Investigation Process
          </h4>
          <div className="space-y-2 text-foreground text-sm">
            <div className="flex items-start gap-2">
              <span className="w-4 h-4 bg-blue-400 text-foreground rounded-full flex items-center justify-center text-xs mt-0.5">1</span>
              <span>Check all connections at the suspect socket</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-4 h-4 bg-blue-400 text-foreground rounded-full flex items-center justify-center text-xs mt-0.5">2</span>
              <span>Verify no connections to other circuits</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-4 h-4 bg-blue-400 text-foreground rounded-full flex items-center justify-center text-xs mt-0.5">3</span>
              <span>Check distribution board connections</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-4 h-4 bg-blue-400 text-foreground rounded-full flex items-center justify-center text-xs mt-0.5">4</span>
              <span>Re-test after corrections are made</span>
            </div>
          </div>
        </div>

        <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
          <h4 className="text-yellow-200 font-medium mb-2">Learning Point</h4>
          <p className="text-foreground text-sm leading-relaxed">
            Inconsistent readings in ring circuit testing often indicate serious wiring faults that can 
            compromise both safety and circuit protection. Always investigate anomalies thoroughly 
            before proceeding with the installation.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
