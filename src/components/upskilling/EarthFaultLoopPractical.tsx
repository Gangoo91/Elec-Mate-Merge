import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wrench, CheckCircle, AlertTriangle, Calculator } from 'lucide-react';

export const EarthFaultLoopPractical = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Wrench className="h-6 w-6 text-elec-yellow" />
          <CardTitle className="text-foreground">Practical Guidance</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="text-foreground space-y-4 sm:space-y-6">
        {/* Testing Procedure */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="h-5 w-5 text-green-400" />
            <h3 className="text-foreground font-semibold">Step-by-Step Testing Procedure</h3>
          </div>
          
          <div className="grid gap-4">
            <div className="bg-elec-dark p-4 rounded-lg border-l-4 border-blue-500">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="bg-blue-600 text-foreground">Step 1</Badge>
                <h4 className="text-foreground font-medium">Preparation</h4>
              </div>
              <ul className="text-xs sm:text-sm space-y-1">
                <li>• Ensure installation is energised and operating normally</li>
                <li>• Check test instrument calibration is current</li>
                <li>• Verify correct test leads are connected</li>
                <li>• Identify test points and access requirements</li>
              </ul>
            </div>

            <div className="bg-elec-dark p-4 rounded-lg border-l-4 border-green-500">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="bg-green-600 text-foreground">Step 2</Badge>
                <h4 className="text-foreground font-medium">Ze Measurement</h4>
              </div>
              <ul className="text-sm space-y-1">
                <li>• Disconnect main earthing conductor at MET</li>
                <li>• Connect test leads between line and earth terminals</li>
                <li>• Select appropriate test current (typically 25A)</li>
                <li>• Record Ze reading and reconnect earthing conductor</li>
              </ul>
            </div>

            <div className="bg-elec-dark p-4 rounded-lg border-l-4 border-orange-500">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="bg-orange-600 text-foreground">Step 3</Badge>
                <h4 className="text-foreground font-medium">Zs Measurement</h4>
              </div>
              <ul className="text-sm space-y-1">
                <li>• Connect test leads at point of utilisation</li>
                <li>• Line probe to line terminal, earth probe to earth</li>
                <li>• Ensure no parallel earth paths affecting reading</li>
                <li>• Record reading and note temperature conditions</li>
              </ul>
            </div>

            <div className="bg-elec-dark p-4 rounded-lg border-l-4 border-purple-500">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="bg-purple-600 text-foreground">Step 4</Badge>
                <h4 className="text-foreground font-medium">Result Analysis</h4>
              </div>
              <ul className="text-sm space-y-1">
                <li>• Apply temperature correction if required</li>
                <li>• Compare with maximum values in BS 7671</li>
                <li>• Check for consistency across circuit</li>
                <li>• Document findings and any remedial actions</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Safety Considerations */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            <h3 className="text-foreground font-semibold">Critical Safety Points</h3>
          </div>
          
          <div className="bg-red-900/20 border border-red-600 p-3 sm:p-4 rounded-lg">
            <h4 className="text-red-400 font-semibold mb-2 text-sm sm:text-base">Essential Safety Measures</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Never disconnect earthing with installation energised unless using safe isolation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Ensure main switch can be operated quickly if required</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Use appropriate PPE including insulated gloves</span>
                </li>
              </ul>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Check test equipment function before and after use</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Be aware of parallel earth paths through other services</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Warn other persons of testing activities</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Practical Tips */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <Calculator className="h-5 w-5 text-blue-400" />
            <h3 className="text-foreground font-semibold">Practical Tips and Best Practices</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-elec-dark p-4 rounded-lg">
              <h4 className="text-foreground font-semibold mb-2">Testing Efficiency</h4>
              <ul className="text-sm space-y-1">
                <li>• Plan test sequence to minimise disruption</li>
                <li>• Use long test leads to reduce setup time</li>
                <li>• Group similar circuits for sequential testing</li>
                <li>• Prepare standard forms for recording results</li>
                <li>• Consider using wireless test equipment</li>
              </ul>
            </div>
            
            <div className="bg-elec-dark p-4 rounded-lg">
              <h4 className="text-foreground font-semibold mb-2">Common Challenges</h4>
              <ul className="text-sm space-y-1">
                <li>• Inaccessible test points - use calculation method</li>
                <li>• Electronic equipment interference - temporary isolation</li>
                <li>• Parallel paths - identify and consider impact</li>
                <li>• High readings - investigate connections</li>
                <li>• Customer concerns - explain safety importance</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Temperature Correction Guide */}
        <div className="bg-yellow-900/20 border border-yellow-600 p-4 rounded-lg">
          <h4 className="text-yellow-400 font-semibold mb-3">Temperature Correction Quick Guide</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium mb-2">When to Apply Correction:</p>
              <ul className="space-y-1">
                <li>• Calculated Zs values</li>
                <li>• (R1 + R2) measurements for Zs calculation</li>
                <li>• Design verification calculations</li>
                <li>• When comparing with tabulated maximum values</li>
              </ul>
            </div>
            <div>
              <p className="font-medium mb-2">Correction Factors:</p>
              <ul className="space-y-1">
                <li>• Copper conductors: multiply by 1.25</li>
                <li>• Aluminium conductors: multiply by 1.28</li>
                <li>• Apply to (R1 + R2) component only</li>
                <li>• Do not correct Ze values</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Troubleshooting */}
        <div className="bg-elec-dark p-3 sm:p-4 rounded-lg border border-gray-600">
          <h4 className="text-foreground font-semibold mb-3 text-sm sm:text-base">Troubleshooting High Zs Readings</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm">
            <div>
              <p className="font-medium text-foreground mb-2">Check Connections:</p>
              <ul className="space-y-1">
                <li>• Terminal tightness</li>
                <li>• Corrosion or oxidation</li>
                <li>• Correct conductor size</li>
                <li>• Proper termination methods</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-foreground mb-2">Verify Installation:</p>
              <ul className="space-y-1">
                <li>• Earth continuity</li>
                <li>• Bonding connections</li>
                <li>• Cable condition</li>
                <li>• Protective conductor size</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-foreground mb-2">External Factors:</p>
              <ul className="space-y-1">
                <li>• Supply authority Ze</li>
                <li>• Parallel earth paths</li>
                <li>• Measurement conditions</li>
                <li>• Test equipment accuracy</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};