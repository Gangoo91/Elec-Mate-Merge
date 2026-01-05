import { Calculator, AlertTriangle, Target, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const R1R2MethodExplained = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Calculator className="h-5 w-5 text-elec-yellow" />
          The R1 + R2 Method Explained
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Introduction */}
        <div className="bg-[#323232] rounded-lg p-6">
          <h3 className="text-foreground font-semibold mb-4">What is the R1 + R2 Method?</h3>
          <p className="text-foreground">
            The R1 + R2 method provides the combined resistance of the line and CPC conductors, which is essential for 
            calculating earth fault loop impedance (Zs). This measurement forms a critical part of electrical safety verification.
          </p>
          
          <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="bg-elec-yellow text-black">Key Concept</Badge>
            </div>
            <p className="text-foreground text-sm">
              <strong>R1 =</strong> Resistance of the line conductor from origin to the point of measurement<br/>
              <strong>R2 =</strong> Resistance of the CPC from origin to the same point<br/>
              <strong>R1 + R2 =</strong> Combined resistance used in Zs calculations
            </p>
          </div>
        </div>

        {/* Why It Matters */}
        <div className="bg-[#323232] rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Target className="h-5 w-5 text-elec-yellow" />
            <h3 className="text-foreground font-semibold">Why It Matters</h3>
          </div>
          <div className="space-y-4">
            <p className="text-foreground">
              This value helps determine if protective devices will operate within required time limits during an earth fault condition, ensuring safety.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
                <h4 className="text-blue-400 font-medium mb-2">Safety Verification:</h4>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Confirms protective device operation</li>
                  <li>• Verifies disconnection times meet BS 7671</li>
                  <li>• Ensures adequate fault current flow</li>
                  <li>• Validates installation design calculations</li>
                </ul>
              </div>
              <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                <h4 className="text-green-400 font-medium mb-2">Compliance Requirements:</h4>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Mandatory for all new installations</li>
                  <li>• Required during periodic inspection</li>
                  <li>• Essential for EICR assessment</li>
                  <li>• Critical for safety case validation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Testing Procedure */}
        <div className="bg-[#323232] rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calculator className="h-5 w-5 text-elec-yellow" />
            <h3 className="text-foreground font-semibold">R1 + R2 Testing Procedure</h3>
          </div>
          <div className="space-y-4">
            <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
              <h4 className="text-purple-400 font-medium mb-3">Step-by-Step Method:</h4>
              <ol className="text-foreground text-sm space-y-2 list-decimal list-inside">
                <li><strong>Isolate the circuit completely</strong> and ensure all loads are disconnected</li>
                <li><strong>At the distribution board:</strong> Connect line conductor to CPC of the same circuit</li>
                <li><strong>At each outlet:</strong> Measure resistance between line and CPC terminals</li>
                <li><strong>Record all readings</strong> systematically for each point on the circuit</li>
                <li><strong>Analyse results</strong> for consistency and compliance with expected values</li>
                <li><strong>Compare with design calculations</strong> and previous test results if available</li>
              </ol>
            </div>
            
            <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                <div>
                  <h4 className="text-red-400 font-medium mb-2">Critical Safety Points:</h4>
                  <ul className="text-foreground text-sm space-y-1">
                    <li>• Never perform this test on live circuits</li>
                    <li>• Ensure complete isolation before starting</li>
                    <li>• Verify test equipment is properly calibrated</li>
                    <li>• Double-check connections before energising</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What to Look For */}
        <div className="bg-[#323232] rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="h-5 w-5 text-elec-yellow" />
            <h3 className="text-foreground font-semibold">What to Look For</h3>
          </div>
          <div className="space-y-4">
            <p className="text-foreground">
              Readings should be consistent across all outlets. Significant variations indicate wiring faults that must be investigated and corrected.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                <h4 className="text-green-400 font-medium mb-2">Good Results:</h4>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Consistent readings across outlets</li>
                  <li>• Values within expected range for cable type</li>
                  <li>• Gradual increase with distance from DB</li>
                  <li>• No anomalous high or low readings</li>
                  <li>• Comparable to design calculations</li>
                </ul>
              </div>
              <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
                <h4 className="text-red-400 font-medium mb-2">Problem Indicators:</h4>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Widely varying readings between outlets</li>
                  <li>• Unexpectedly low readings (interconnections)</li>
                  <li>• Excessively high readings (poor connections)</li>
                  <li>• Open circuit readings</li>
                  <li>• Values much higher than calculations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Calculation Examples */}
        <div className="bg-[#323232] rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calculator className="h-5 w-5 text-elec-yellow" />
            <h3 className="text-foreground font-semibold">Practical Calculation Examples</h3>
          </div>
          <div className="space-y-4">
            <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
              <h4 className="text-blue-400 font-medium mb-3">Example 1: Ring Final Circuit</h4>
              <div className="text-foreground text-sm space-y-2">
                <p><strong>Circuit:</strong> 32A ring final, 2.5mm² + 1.5mm² CPC, 40m total ring length</p>
                <p><strong>Expected R1:</strong> 40m × 7.3mΩ/m = 0.29Ω (for complete ring)</p>
                <p><strong>Expected R2:</strong> 40m × 12.1mΩ/m = 0.48Ω (for complete ring)</p>
                <p><strong>R1 + R2 at furthest point:</strong> Approximately 0.19Ω (quarter of ring resistance)</p>
              </div>
            </div>
            
            <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
              <h4 className="text-green-400 font-medium mb-3">Example 2: Radial Circuit</h4>
              <div className="text-foreground text-sm space-y-2">
                <p><strong>Circuit:</strong> 20A radial, 2.5mm² + 1.5mm² CPC, 25m length</p>
                <p><strong>R1:</strong> 25m × 7.3mΩ/m = 0.18Ω</p>
                <p><strong>R2:</strong> 25m × 12.1mΩ/m = 0.30Ω</p>
                <p><strong>R1 + R2:</strong> 0.18Ω + 0.30Ω = 0.48Ω</p>
              </div>
            </div>
          </div>
        </div>

        {/* Using Results */}
        <div className="bg-[#323232] rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Target className="h-5 w-5 text-elec-yellow" />
            <h3 className="text-foreground font-semibold">Using R1 + R2 Results</h3>
          </div>
          <div className="space-y-4">
            <p className="text-foreground">
              The R1 + R2 values are used in the earth fault loop impedance calculation: <strong>Zs = Ze + R1 + R2</strong>
            </p>
            
            <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
              <h4 className="text-yellow-400 font-medium mb-2">Key Applications:</h4>
              <ul className="text-foreground text-sm space-y-1">
                <li>• Calculate maximum Zs for the circuit</li>
                <li>• Verify protective device disconnection times</li>
                <li>• Assess compliance with BS 7671 requirements</li>
                <li>• Compare with tabulated maximum values</li>
                <li>• Validate installation design assumptions</li>
              </ul>
            </div>
            
            <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
                <div>
                  <h4 className="text-orange-400 font-medium mb-2">Important Notes:</h4>
                  <ul className="text-foreground text-sm space-y-1">
                    <li>• R1 + R2 values increase with temperature</li>
                    <li>• Results may need temperature correction for Zs calculations</li>
                    <li>• Consider the 1.67 multiplier for 70°C conductor temperature</li>
                    <li>• Document test conditions and ambient temperature</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};