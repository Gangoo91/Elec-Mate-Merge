import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, AlertTriangle, CheckCircle, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const PolarityPurposePractical = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-3">
            <Wrench className="h-6 w-6 text-elec-yellow" />
            Practical Guidance: Understanding Polarity Requirements
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-6">
          
          {/* Critical Safety Points */}
          <div className="space-y-4">
            <h4 className="text-foreground font-semibold flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              Critical Safety Understanding
            </h4>
            <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4 space-y-3">
              <div className="space-y-2">
                <Badge variant="destructive" className="bg-red-700 text-foreground">DANGER</Badge>
                <p className="text-sm font-medium text-red-200">
                  Incorrect polarity can make normally safe parts become live at full mains voltage
                </p>
              </div>
              <ul className="list-disc list-inside space-y-1 text-sm text-red-200">
                <li>Lamp holders with live screw threads instead of centre contacts</li>
                <li>Switches that don't isolate the line conductor</li>
                <li>Equipment chassis becoming live due to incorrect connections</li>
                <li>Protective devices failing to operate correctly</li>
              </ul>
            </div>
          </div>

          {/* Practical Scenarios */}
          <div className="space-y-4">
            <h4 className="text-foreground font-semibold flex items-center gap-2">
              <Target className="h-5 w-5 text-elec-yellow" />
              Real-World Applications
            </h4>
            <div className="grid gap-4">
              
              <div className="bg-elec-dark/50 rounded-lg p-4 space-y-3">
                <h5 className="text-elec-yellow font-medium">Lighting Circuits</h5>
                <p className="text-sm">Most critical for polarity testing due to:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Edison screw lampholders requiring line on centre contact</li>
                  <li>Switches must break the line conductor, not neutral</li>
                  <li>Emergency lighting requiring correct polarity for battery backup</li>
                  <li>Dimmer switches sensitive to line/neutral orientation</li>
                </ul>
              </div>

              <div className="bg-elec-dark/50 rounded-lg p-4 space-y-3">
                <h5 className="text-elec-yellow font-medium">Socket Outlet Circuits</h5>
                <p className="text-sm">Essential considerations:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>13A socket outlets must have line on correct terminal</li>
                  <li>Switched sockets require proper switch polarity</li>
                  <li>USB sockets and smart outlets need correct DC polarity</li>
                  <li>Industrial sockets often have polarity-sensitive equipment</li>
                </ul>
              </div>

              <div className="bg-elec-dark/50 rounded-lg p-4 space-y-3">
                <h5 className="text-elec-yellow font-medium">Fixed Equipment</h5>
                <p className="text-sm">Special attention required for:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Electric ovens and hobs with control switches</li>
                  <li>Water heaters with immersion heater switches</li>
                  <li>Fans with integral switching</li>
                  <li>Any equipment with exposed-conductive-parts</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Best Practices */}
          <div className="space-y-4">
            <h4 className="text-foreground font-semibold flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              Best Practices for Polarity Verification
            </h4>
            <div className="space-y-3">
              
              <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                <h5 className="text-green-200 font-medium mb-2">Installation Phase</h5>
                <ul className="list-disc list-inside space-y-1 text-sm text-green-200">
                  <li>Mark conductors clearly during first fix</li>
                  <li>Use consistent colour coding throughout</li>
                  <li>Double-check connections at each termination point</li>
                  <li>Follow logical cable routing to avoid confusion</li>
                </ul>
              </div>

              <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
                <h5 className="text-blue-200 font-medium mb-2">Testing Phase</h5>
                <ul className="list-disc list-inside space-y-1 text-sm text-blue-200">
                  <li>Test every outlet, switch, and connection point</li>
                  <li>Use systematic approach - work methodically through circuits</li>
                  <li>Document any polarity errors found during testing</li>
                  <li>Retest after correcting any errors</li>
                </ul>
              </div>

              <div className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-4">
                <h5 className="text-purple-200 font-medium mb-2">Documentation</h5>
                <ul className="list-disc list-inside space-y-1 text-sm text-purple-200">
                  <li>Record polarity test results on test certificates</li>
                  <li>Note any modifications made to correct polarity</li>
                  <li>Include polarity checks in commissioning checklists</li>
                  <li>Provide clear handover documentation to end users</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Common Mistakes */}
          <div className="space-y-4">
            <h4 className="text-foreground font-semibold">Common Installation Mistakes Leading to Polarity Errors</h4>
            <div className="bg-orange-900/20 border border-orange-700/30 rounded-lg p-4">
              <ul className="list-disc list-inside space-y-2 text-sm text-orange-200">
                <li><strong>Cable termination errors:</strong> Line and neutral swapped in junction boxes</li>
                <li><strong>Switch wiring:</strong> Neutral taken to switch instead of line conductor</li>
                <li><strong>DB connections:</strong> Outgoing circuits connected to wrong MCB terminals</li>
                <li><strong>Socket wiring:</strong> Line and neutral reversed at back boxes</li>
                <li><strong>Lampholder connections:</strong> Line connected to screw thread instead of centre contact</li>
                <li><strong>Three-plate ceiling roses:</strong> Incorrect conductor identification</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};