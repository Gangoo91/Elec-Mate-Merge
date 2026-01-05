import { Wrench, Calculator, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const TestProceduresPractical = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          Practical Testing Guidelines & Expected Values
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Guidance 1 */}
        <div className="bg-[#323232] rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="bg-elec-yellow text-black">Reference Tables</Badge>
            <h3 className="text-foreground font-semibold">Expected Resistance Values</h3>
          </div>
          <div className="space-y-4">
            <p className="text-foreground">
              Use these reference values to assess continuity test results:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="text-elec-yellow font-medium">Common Cable Resistance (mΩ/m at 20°C):</h4>
                <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-3">
                  <div className="text-foreground text-sm space-y-1">
                    <p><strong>1.0mm² copper:</strong> 18.1 mΩ/m</p>
                    <p><strong>1.5mm² copper:</strong> 12.1 mΩ/m</p>
                    <p><strong>2.5mm² copper:</strong> 7.3 mΩ/m</p>
                    <p><strong>4.0mm² copper:</strong> 4.6 mΩ/m</p>
                    <p><strong>6.0mm² copper:</strong> 3.1 mΩ/m</p>
                    <p><strong>10mm² copper:</strong> 1.8 mΩ/m</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="text-elec-yellow font-medium">Practical Examples:</h4>
                <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-3">
                  <div className="text-foreground text-sm space-y-1">
                    <p><strong>2.5mm² CPC, 20m:</strong> ~0.15Ω</p>
                    <p><strong>1.5mm² CPC, 30m:</strong> ~0.36Ω</p>
                    <p><strong>4.0mm² CPC, 40m:</strong> ~0.18Ω</p>
                    <p><strong>Bonding 6mm², 5m:</strong> ~0.015Ω</p>
                    <p><strong>Main bonding 16mm², 10m:</strong> ~0.011Ω</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Guidance 2 */}
        <div className="bg-[#323232] rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="bg-elec-yellow text-black">Calculation Method</Badge>
            <h3 className="text-foreground font-semibold">Determining Expected Values</h3>
          </div>
          <div className="space-y-4">
            <p className="text-foreground">
              Calculate expected resistance values for comparison with test results:
            </p>
            <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Calculator className="h-5 w-5 text-purple-500 mt-0.5" />
                <div>
                  <h4 className="text-purple-400 font-medium mb-2">Calculation Steps:</h4>
                  <ol className="text-foreground text-sm space-y-2 list-decimal list-inside">
                    <li><strong>Identify cable specifications:</strong> Cross-sectional area, material (copper/aluminium), cable type</li>
                    <li><strong>Measure circuit length:</strong> Use building plans or physical measurement for accuracy</li>
                    <li><strong>Find conductor resistance:</strong> From BS 7671 Appendix 4 tables or manufacturer data</li>
                    <li><strong>Calculate basic resistance:</strong> Resistance per metre × circuit length</li>
                    <li><strong>Add connection allowances:</strong> Typically 5-10% for terminations and joints</li>
                    <li><strong>Consider temperature effects:</strong> Adjust for testing temperature if significantly different from 20°C</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Guidance 3 */}
        <div className="bg-[#323232] rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="bg-elec-yellow text-black">Acceptance Criteria</Badge>
            <h3 className="text-foreground font-semibold">Interpreting Test Results</h3>
          </div>
          <div className="space-y-4">
            <p className="text-foreground">
              Guidelines for accepting or rejecting continuity test results:
            </p>
            <div className="space-y-3">
              <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                <h4 className="text-green-400 font-medium mb-2">Acceptable Results:</h4>
                 <ul className="text-foreground text-sm space-y-1">
                  <li>• Readings within ±20% of calculated values for new installations</li>
                  <li>• Consistent readings across similar circuits</li>
                  <li>• Values comparable to previous test results (for existing installations)</li>
                  <li>• All readings finite (no open circuits)</li>
                  <li>• Bonding conductors ≤0.05Ω for main bonding</li>
                </ul>
              </div>
              <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
                <h4 className="text-red-400 font-medium mb-2">Unacceptable Results:</h4>
                 <ul className="text-foreground text-sm space-y-1">
                  <li>• Infinite resistance (open circuit) - investigate immediately</li>
                  <li>• Readings significantly higher than expected - check connections</li>
                  <li>• Inconsistent readings on repeated tests - poor connections</li>
                  <li>• Values dramatically different from previous tests</li>
                  <li>• Bonding conductors &gt;0.05Ω - investigate and rectify</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Guidance 4 */}
        <div className="bg-[#323232] rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="bg-elec-yellow text-black">Test Equipment</Badge>
            <h3 className="text-foreground font-semibold">Equipment Calibration & Verification</h3>
          </div>
          <div className="space-y-4">
            <p className="text-foreground">
              Ensure test equipment accuracy for reliable results:
            </p>
            <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div>
                  <h4 className="text-yellow-400 font-medium mb-2">Equipment Requirements:</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="text-foreground font-medium mb-1">Calibration:</h5>
                       <ul className="text-foreground space-y-1">
                        <li>• Current calibration certificate</li>
                        <li>• Annual recalibration recommended</li>
                        <li>• Calibration traceable to national standards</li>
                        <li>• Battery level adequate for accurate readings</li>
                        <li>• Test leads in good condition</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-foreground font-medium mb-1">Verification:</h5>
                      <ul className="text-foreground space-y-1">
                        <li>• Zero leads before testing</li>
                        <li>• Test with known resistances</li>
                        <li>• Check test current compliance (200mA-1A)</li>
                        <li>• Verify against reference standards</li>
                        <li>• Document equipment used in test records</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
            <div>
              <h4 className="text-green-400 font-medium mb-2">Professional Standards</h4>
              <ul className="text-foreground text-sm space-y-1">
                <li>• Accurate test procedures ensure installation safety and compliance</li>
                <li>• Expected value calculations provide objective assessment criteria</li>
                <li>• Proper equipment calibration maintains measurement accuracy</li>
                <li>• Systematic documentation supports professional accountability</li>
                <li>• Continuous professional development keeps practices current</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};