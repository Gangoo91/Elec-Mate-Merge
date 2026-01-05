import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, Zap, TestTube, Settings, CheckCircle2, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const PolarityMethodsPractical = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-3">
            <Wrench className="h-6 w-6 text-elec-yellow" />
            Practical Testing Procedures
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-6">
          
          {/* Equipment Setup */}
          <div className="space-y-4">
            <h4 className="text-foreground font-semibold flex items-center gap-2">
              <Settings className="h-5 w-5 text-elec-yellow" />
              Test Equipment Setup
            </h4>
            <div className="bg-elec-dark/50 rounded-lg p-4 space-y-3">
              <h5 className="text-elec-yellow font-medium">Required Equipment</h5>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Multifunction tester (MFT) with continuity function</li>
                <li>Alternative: Dedicated continuity tester or digital multimeter</li>
                <li>Test leads in good condition (check for damage before use)</li>
                <li>Crocodile clips for hands-free testing</li>
                <li>Probe adaptors for accessing tight spaces</li>
              </ul>
              
              <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-3 mt-3">
                <p className="text-blue-200 text-sm">
                  <strong>Setup:</strong> Set MFT to continuity/low resistance mode. Typical test current: 4-200mA. 
                  Verify test leads have low resistance (&lt;0.1Ω) by touching probes together.
                </p>
              </div>
            </div>
          </div>

          {/* Step-by-Step Procedures */}
          <div className="space-y-4">
            <h4 className="text-foreground font-semibold flex items-center gap-2">
              <TestTube className="h-5 w-5 text-elec-yellow" />
              Step-by-Step Testing Procedures
            </h4>
            
            {/* Socket Outlets */}
            <div className="bg-elec-dark/50 rounded-lg p-4 space-y-3">
              <h5 className="text-elec-yellow font-medium">Socket Outlet Testing</h5>
              <div className="space-y-2">
                <Badge variant="outline" className="border-blue-600 text-blue-300">Procedure 1</Badge>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li>Ensure circuit is isolated and proven dead</li>
                  <li>Connect one test probe to line terminal at distribution board</li>
                  <li>Connect second probe to line terminal of socket outlet</li>
                  <li>Reading should show low resistance (&lt;0.5Ω typically)</li>
                  <li>Repeat for neutral: DB neutral bar to socket neutral terminal</li>
                  <li>Record results and move to next outlet</li>
                </ol>
              </div>
              <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-2">
                <p className="text-green-200 text-xs">
                  <strong>Expected Result:</strong> Low resistance reading confirms correct polarity. 
                  High resistance or open circuit indicates wiring error.
                </p>
              </div>
            </div>

            {/* Lighting Circuits */}
            <div className="bg-elec-dark/50 rounded-lg p-4 space-y-3">
              <h5 className="text-elec-yellow font-medium">Lighting Circuit Testing</h5>
              <div className="space-y-2">
                <Badge variant="outline" className="border-purple-600 text-purple-300">Procedure 2</Badge>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li>Test each switch position: DB line terminal to switch line terminal</li>
                  <li>For lampholders: DB line terminal to lampholder centre contact</li>
                  <li>Test with switches in different positions (for 2-way/intermediate)</li>
                  <li>Verify neutral connections: DB neutral to lampholder neutral</li>
                  <li>Check Edison screw lampholders particularly carefully</li>
                  <li>Document any switch combinations that don't provide continuity</li>
                </ol>
              </div>
              <div className="bg-orange-900/20 border border-orange-700/30 rounded-lg p-2">
                <p className="text-orange-200 text-xs">
                  <strong>Critical:</strong> Centre contact of Edison screw lampholders MUST be connected 
                  to line conductor. Screw thread must be neutral.
                </p>
              </div>
            </div>

            {/* Fixed Equipment */}
            <div className="bg-elec-dark/50 rounded-lg p-4 space-y-3">
              <h5 className="text-elec-yellow font-medium">Fixed Equipment Testing</h5>
              <div className="space-y-2">
                <Badge variant="outline" className="border-red-600 text-red-300">Procedure 3</Badge>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li>Locate equipment isolation switch/FCU</li>
                  <li>Test DB line terminal to equipment line terminal via switch</li>
                  <li>Test with switch in both positions (where applicable)</li>
                  <li>For equipment with multiple switches, test each separately</li>
                  <li>Verify equipment neutral connections</li>
                  <li>Check any control circuits have correct polarity</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Interpreting Results */}
          <div className="space-y-4">
            <h4 className="text-foreground font-semibold flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400" />
              Interpreting Test Results
            </h4>
            <div className="grid gap-4">
              
              <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                <h5 className="text-green-200 font-medium mb-2">Correct Polarity Results</h5>
                <ul className="list-disc list-inside space-y-1 text-sm text-green-200">
                  <li>Low resistance reading (&lt;0.5Ω) from DB line to outlet line</li>
                  <li>Low resistance from DB neutral to outlet neutral</li>
                  <li>Open circuit when switch is in 'off' position</li>
                  <li>Continuity through correct conductor paths only</li>
                </ul>
              </div>

              <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4">
                <h5 className="text-red-200 font-medium mb-2">Incorrect Polarity Indicators</h5>
                <ul className="list-disc list-inside space-y-1 text-sm text-red-200">
                  <li>Continuity from DB line to outlet neutral terminal</li>
                  <li>Continuity from DB neutral to outlet line terminal</li>
                  <li>Switch controls neutral instead of line conductor</li>
                  <li>Lampholder screw thread connected to line</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Troubleshooting */}
          <div className="space-y-4">
            <h4 className="text-foreground font-semibold flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-400" />
              Troubleshooting Common Issues
            </h4>
            <div className="space-y-3">
              
              <div className="bg-elec-dark/50 rounded-lg p-4">
                <h5 className="text-orange-300 font-medium">High Resistance Readings</h5>
                <p className="text-sm mb-2">Possible causes:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Poor connections at terminals</li>
                  <li>Damaged conductors</li>
                  <li>Loose connections in junction boxes</li>
                  <li>Corroded terminals</li>
                </ul>
              </div>

              <div className="bg-elec-dark/50 rounded-lg p-4">
                <h5 className="text-orange-300 font-medium">No Continuity</h5>
                <p className="text-sm mb-2">Check for:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Open circuit in conductor</li>
                  <li>Switch in wrong position</li>
                  <li>Disconnected wire at terminal</li>
                  <li>Wrong test points selected</li>
                </ul>
              </div>

              <div className="bg-elec-dark/50 rounded-lg p-4">
                <h5 className="text-orange-300 font-medium">Unexpected Continuity</h5>
                <p className="text-sm mb-2">Indicates:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Cross-connected conductors</li>
                  <li>Line and neutral swapped</li>
                  <li>Incorrect switch wiring</li>
                  <li>Wrong terminal connections</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Documentation */}
          <div className="space-y-4">
            <h4 className="text-foreground font-semibold">Recording Results</h4>
            <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
              <ul className="list-disc list-inside space-y-1 text-sm text-blue-200">
                <li>Record polarity test results on Electrical Installation Certificate</li>
                <li>Note any polarity corrections made during testing</li>
                <li>Include details of test method and equipment used</li>
                <li>Document any deviations from standard test procedures</li>
                <li>Ensure all circuit references match distribution board labelling</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};