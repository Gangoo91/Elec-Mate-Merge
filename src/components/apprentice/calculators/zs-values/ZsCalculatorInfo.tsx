
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, BookOpen, Calculator, CheckCircle, Info, Thermometer, Zap } from "lucide-react";

const ZsCalculatorInfo = () => {
  return (
    <div className="space-y-6">
      {/* What is Zs? */}
      <Card className="border-blue-500/30 bg-blue-500/5">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <Info className="h-5 w-5" />
            What is Earth Fault Loop Impedance (Zs)?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-blue-200 text-sm">
            Earth fault loop impedance (Zs) is the total impedance of the earth fault current path, 
            measured from the point of fault back to the source of supply.
          </p>
          
          <div className="bg-blue-600/20 p-4 rounded border border-blue-500/30">
            <h4 className="font-medium text-blue-200 mb-2">Formula: Zs = Ze + (R1 + R2)</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div>
                <Badge variant="outline" className="text-blue-300 border-blue-400/50 mb-1">Ze</Badge>
                <p className="text-blue-200">External earth loop impedance (supply system)</p>
              </div>
              <div>
                <Badge variant="outline" className="text-blue-300 border-blue-400/50 mb-1">R1</Badge>
                <p className="text-blue-200">Resistance of line conductor to point of fault</p>
              </div>
              <div>
                <Badge variant="outline" className="text-blue-300 border-blue-400/50 mb-1">R2</Badge>
                <p className="text-blue-200">Resistance of earth conductor to point of fault</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Why is Zs Important? */}
      <Card className="border-green-500/30 bg-green-500/5">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Why is Zs Testing Important?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-green-200">
            <div className="flex items-start gap-3">
              <Zap className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-green-300">Safety Assurance</h4>
                <p className="text-green-200/80">Ensures protective devices will operate within required disconnection times during earth faults</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-green-300">Code Compliance</h4>
                <p className="text-green-200/80">Required by BS 7671 for initial verification and periodic inspection</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calculator className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-green-300">Fault Current Calculation</h4>
                <p className="text-green-200/80">Determines the magnitude of earth fault current: If = 0.8 × Uo / Zs</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Temperature Effects */}
      <Card className="border-amber-500/30 bg-amber-500/5">
        <CardHeader>
          <CardTitle className="text-amber-300 flex items-center gap-2">
            <Thermometer className="h-5 w-5" />
            Temperature Effects on Zs Values
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-amber-200 text-sm">
            Conductor resistance varies with temperature, affecting Zs measurements and compliance.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-amber-600/20 p-3 rounded border border-amber-500/30">
              <h4 className="font-medium text-amber-300 mb-2">During Testing (Cold)</h4>
              <ul className="text-xs text-amber-200 space-y-1">
                <li>• Conductors at ambient temperature (~20°C)</li>
                <li>• Lower resistance than operational conditions</li>
                <li>• Measured Zs will be lower than actual</li>
              </ul>
            </div>
            <div className="bg-amber-600/20 p-3 rounded border border-amber-500/30">
              <h4 className="font-medium text-amber-300 mb-2">During Operation (Hot)</h4>
              <ul className="text-xs text-amber-200 space-y-1">
                <li>• Conductors at operating temperature (~70°C for PVC)</li>
                <li>• Higher resistance due to temperature</li>
                <li>• Actual Zs will be higher than measured</li>
              </ul>
            </div>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/20 rounded p-3">
            <h4 className="font-medium text-amber-300 mb-2">Practical Solution: 80% Rule</h4>
            <p className="text-xs text-amber-200">
              Test against 80% of the tabulated value to ensure compliance at operating temperature. 
              This accounts for the 25% increase in resistance from 20°C to 70°C for copper conductors.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Testing Best Practices */}
      <Card className="border-purple-500/30 bg-purple-500/5">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Testing Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-purple-300 mb-2">Before Testing</h4>
                <ul className="text-xs text-purple-200 space-y-1">
                  <li>• Isolate circuit under test</li>
                  <li>• Remove or bypass RCDs if necessary</li>
                  <li>• Check test leads and calibration</li>
                  <li>• Note ambient temperature</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-purple-300 mb-2">During Testing</h4>
                <ul className="text-xs text-purple-200 space-y-1">
                  <li>• Use appropriate test current (typically 15-25A)</li>
                  <li>• Test at furthest point of each circuit</li>
                  <li>• Record all readings accurately</li>
                  <li>• Check for high resistance connections</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-purple-600/20 p-3 rounded border border-purple-500/30">
              <h4 className="font-medium text-purple-300 mb-2">Common Issues</h4>
              <ul className="text-xs text-purple-200 space-y-1">
                <li>• RCD tripping during high current tests</li>
                <li>• Poor connections affecting readings</li>
                <li>• Parallel earth paths reducing measured Zs</li>
                <li>• Electronic equipment interference</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compliance and Standards */}
      <Card className="border-red-500/30 bg-red-500/5">
        <CardHeader>
          <CardTitle className="text-red-300 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Compliance Requirements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="bg-red-600/20 p-3 rounded border border-red-500/30">
              <h4 className="font-medium text-red-300 mb-2">BS 7671 Requirements</h4>
              <ul className="text-xs text-red-200 space-y-1">
                <li>• Regulation 411.4.5: Zs shall not exceed tabulated values</li>
                <li>• Table 41.3: Maximum Zs for circuits ≤32A</li>
                <li>• Disconnection time: 0.4s for final circuits ≤32A</li>
                <li>• Must be verified during initial verification</li>
              </ul>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-red-600/20 p-3 rounded border border-red-500/30">
                <h4 className="font-medium text-red-300 mb-1">Pass Criteria</h4>
                <p className="text-xs text-red-200">Measured Zs ≤ 80% of tabulated value</p>
              </div>
              <div className="bg-red-600/20 p-3 rounded border border-red-500/30">
                <h4 className="font-medium text-red-300 mb-1">Fail Criteria</h4>
                <p className="text-xs text-red-200">Measured Zs > tabulated value</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ZsCalculatorInfo;
