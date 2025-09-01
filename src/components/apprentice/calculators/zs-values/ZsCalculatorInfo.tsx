
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Lightbulb, AlertTriangle, BookOpen, Zap, Users, Calculator, Shield, AlertCircle } from "lucide-react";

const ZsCalculatorInfo = () => {
  return (
    <div className="space-y-6">
      <Card className="border-blue-500/30 bg-blue-500/5">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <Info className="h-5 w-5" />
            What is Zs (Earth Fault Loop Impedance)?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-blue-200">
          <p>
            Earth fault loop impedance (Zs) is the impedance of the path taken by fault current during an earth fault. 
            It includes the impedance of the supply transformer, the line conductor, and the earth return path.
          </p>
          
          <div className="bg-blue-500/10 border border-blue-500/20 rounded p-4">
            <h4 className="font-medium mb-2">Formula: Zs = Ze + R1 + R2</h4>
            <ul className="space-y-1 text-sm">
              <li><strong>Ze</strong> = External earth fault loop impedance (supply to origin of installation)</li>
              <li><strong>R1</strong> = Resistance of the line conductor from origin to point of test</li>
              <li><strong>R2</strong> = Resistance of the protective conductor from origin to point of test</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500/30 bg-green-500/5">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <Shield className="h-5 w-5" />
            When to Use 80% vs 100% Values
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-green-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-500/10 border border-green-500/20 rounded p-4">
              <h4 className="font-medium mb-2 text-yellow-300">📊 80% Values - For Testing</h4>
              <ul className="space-y-1 text-sm">
                <li>• Use during initial verification testing</li>
                <li>• Testing at ambient temperature (~20°C)</li>
                <li>• Accounts for temperature rise in service</li>
                <li>• More stringent requirement</li>
                <li>• Example: If tabulated = 1.0Ω, test limit = 0.8Ω</li>
              </ul>
            </div>
            
            <div className="bg-green-500/10 border border-green-500/20 rounded p-4">
              <h4 className="font-medium mb-2 text-blue-300">📋 100% Values - For Design</h4>
              <ul className="space-y-1 text-sm">
                <li>• Use for design calculations</li>
                <li>• At normal operating temperature (70°C)</li>
                <li>• Maximum permitted under load</li>
                <li>• BS 7671 tabulated values</li>
                <li>• Example: Tabulated = 1.0Ω maximum</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-purple-500/30 bg-purple-500/5">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center gap-2">
            <Zap className="h-5 w-5" />
            MCB & RCBO Curve Types Explained
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-purple-200">
          <p className="text-sm">
            Different curve types have different magnetic trip characteristics, affecting the maximum permissible Zs:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-purple-500/10 border border-purple-500/20 rounded p-3">
              <h4 className="font-medium mb-2 text-blue-300">B-Curve</h4>
              <ul className="space-y-1 text-xs">
                <li>• Magnetic trip: 3-5 × In</li>
                <li>• Most sensitive</li>
                <li>• Highest Zs values allowed</li>
                <li>• Used for resistive loads</li>
                <li>• Lighting, heating circuits</li>
              </ul>
            </div>
            
            <div className="bg-purple-500/10 border border-purple-500/20 rounded p-3">
              <h4 className="font-medium mb-2 text-yellow-300">C-Curve</h4>
              <ul className="space-y-1 text-xs">
                <li>• Magnetic trip: 5-10 × In</li>
                <li>• Medium sensitivity</li>
                <li>• Medium Zs values</li>
                <li>• Most common type</li>
                <li>• General socket circuits</li>
              </ul>
            </div>
            
            <div className="bg-purple-500/10 border border-purple-500/20 rounded p-3">
              <h4 className="font-medium mb-2 text-red-300">D-Curve</h4>
              <ul className="space-y-1 text-xs">
                <li>• Magnetic trip: 10-20 × In</li>
                <li>• Least sensitive</li>
                <li>• Lowest Zs values allowed</li>
                <li>• High inrush currents</li>
                <li>• Motor circuits, transformers</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-yellow-500/30 bg-yellow-500/5">
        <CardHeader>
          <CardTitle className="text-yellow-300 flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Worked Example
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-yellow-200">
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded p-4">
            <h4 className="font-medium mb-3">Example: 32A B-curve MCB circuit</h4>
            
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p><strong>Given:</strong></p>
                  <ul className="space-y-1 text-xs">
                    <li>• Ze = 0.35Ω</li>
                    <li>• Cable: 6mm² twin & earth</li>
                    <li>• Length: 25m</li>
                    <li>• R1+R2 = 12.1 × 25 ÷ 1000 = 0.30Ω</li>
                  </ul>
                </div>
                
                <div>
                  <p><strong>Calculation:</strong></p>
                  <ul className="space-y-1 text-xs">
                    <li>• Zs = Ze + (R1+R2)</li>
                    <li>• Zs = 0.35 + 0.30 = 0.65Ω</li>
                    <li>• Max Zs for 32A B-curve = 1.44Ω</li>
                    <li>• 80% test value = 1.15Ω</li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-yellow-500/20 pt-2 mt-3">
                <p className="text-green-300 font-medium">✓ Result: Circuit complies (0.65Ω {"<"} 1.15Ω test limit)</p>
                <p className="text-xs text-yellow-200/80 mt-1">Headroom: 43% below test limit</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-orange-500/30 bg-orange-500/5">
        <CardHeader>
          <CardTitle className="text-orange-300 flex items-center gap-2">
            <Users className="h-5 w-5" />
            TT vs TN Systems
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-orange-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-orange-500/10 border border-orange-500/20 rounded p-3">
              <h4 className="font-medium mb-2 text-blue-300">TN Systems (PME/TNS)</h4>
              <ul className="space-y-1 text-sm">
                <li>• Most UK installations</li>
                <li>• Earth provided by supplier</li>
                <li>• Lower Ze values (typically 0.35Ω)</li>
                <li>• Use standard Zs tables</li>
                <li>• Fast fault clearance possible</li>
              </ul>
            </div>
            
            <div className="bg-orange-500/10 border border-orange-500/20 rounded p-3">
              <h4 className="font-medium mb-2 text-yellow-300">TT Systems (Local Earth)</h4>
              <ul className="space-y-1 text-sm">
                <li>• Remote locations</li>
                <li>• Local earth electrode</li>
                <li>• Higher Ze values ({">"}1Ω typical)</li>
                <li>• RCD protection essential</li>
                <li>• Different calculation methods</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-red-500/10 border border-red-500/20 rounded p-3">
            <h4 className="font-medium mb-2 text-red-300">⚠ Important for TT Systems</h4>
            <p className="text-sm">
              This calculator is primarily for TN systems. TT systems typically require RCD protection 
              with touch voltage calculations (RA × IΔn ≤ 50V) rather than overcurrent device Zs limits.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-500/30 bg-red-500/5">
        <CardHeader>
          <CardTitle className="text-red-300 flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Common Pitfalls & Mistakes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-red-200">
          <div className="space-y-4">
            <div className="bg-red-500/10 border border-red-500/20 rounded p-3">
              <h4 className="font-medium mb-2">❌ Testing Mistakes</h4>
              <ul className="space-y-1 text-sm">
                <li>• Forgetting to disconnect RCDs during testing</li>
                <li>• Testing at wrong point (should be furthest from origin)</li>
                <li>• Using 100% values instead of 80% for testing</li>
                <li>• Not accounting for all circuit components</li>
                <li>• Poor test lead connections giving false readings</li>
              </ul>
            </div>
            
            <div className="bg-red-500/10 border border-red-500/20 rounded p-3">
              <h4 className="font-medium mb-2">❌ Calculation Errors</h4>
              <ul className="space-y-1 text-sm">
                <li>• Using wrong curve type for MCB/RCBO</li>
                <li>• Confusing In (nominal current) with fault current</li>
                <li>• Not including protective conductor resistance (R2)</li>
                <li>• Using incorrect mΩ/m values for cable</li>
                <li>• Forgetting temperature correction factors</li>
              </ul>
            </div>
            
            <div className="bg-red-500/10 border border-red-500/20 rounded p-3">
              <h4 className="font-medium mb-2">❌ Design Issues</h4>
              <ul className="space-y-1 text-sm">
                <li>• Undersized protective conductor (R2 too high)</li>
                <li>• Circuit too long for protective device</li>
                <li>• Wrong protective device type for application</li>
                <li>• Not considering voltage drop alongside Zs</li>
                <li>• Ignoring parallel earth paths in calculations</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500/30 bg-green-500/5">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Testing Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-green-200">
          <div className="space-y-4">
            <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
              <h4 className="font-medium mb-2">Before Testing</h4>
              <ul className="space-y-1 text-sm">
                <li>• Ensure circuit is isolated and proved dead using approved voltage indicator</li>
                <li>• Remove or bridge RCDs during testing (they can interfere with measurements)</li>
                <li>• Check test equipment calibration is current and within date</li>
                <li>• Verify test leads are in good condition with secure connections</li>
                <li>• Identify the furthest point of each circuit for testing</li>
              </ul>
            </div>
            
            <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
              <h4 className="font-medium mb-2">During Testing</h4>
              <ul className="space-y-1 text-sm">
                <li>• Test at the furthest point of each circuit (highest impedance)</li>
                <li>• Include all accessories and terminations in the test path</li>
                <li>• Record ambient temperature if significantly different from 20°C</li>
                <li>• Compare measured values with calculated design values</li>
                <li>• Take multiple readings if results are close to limits</li>
                <li>• Ensure good contact at test points (clean connections)</li>
              </ul>
            </div>
            
            <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
              <h4 className="font-medium mb-2">If Values Are Too High</h4>
              <ul className="space-y-1 text-sm">
                <li>• Check all connections are tight and corrosion-free</li>
                <li>• Verify cable sizes match design specifications</li>
                <li>• Consider actual cable route vs design route length</li>
                <li>• Check main earth bonding connections are secure</li>
                <li>• Investigate parallel earth paths that may affect readings</li>
                <li>• Consider upgrading protective conductor size or device rating</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ZsCalculatorInfo;
