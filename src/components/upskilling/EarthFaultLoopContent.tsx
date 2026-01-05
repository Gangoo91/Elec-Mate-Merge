import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Shield, Calculator, AlertTriangle, CheckCircle } from 'lucide-react';

export const EarthFaultLoopContent = () => {
  return (
    <div className="space-y-6">
      {/* Introduction */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-foreground">Introduction to Earth Fault Loop Impedance</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="text-foreground space-y-3 sm:space-y-4 lg:space-y-6">
          <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
            Earth fault loop impedance is one of the most critical electrical safety parameters in any installation. 
            It determines whether protective devices will operate quickly enough to prevent dangerous electric shock 
            or fire during an earth fault condition.
          </p>
          
          <div className="bg-blue-900/20 border border-blue-600 p-4 rounded-lg">
            <h4 className="text-blue-400 font-semibold mb-2">Why is Earth Fault Loop Impedance Critical?</h4>
            <p className="text-xs sm:text-sm leading-relaxed mb-3">
              When an earth fault occurs, current must flow through the earth fault loop back to the source. 
              The impedance of this path determines how much current will flow - and therefore how quickly 
              the protective device will operate to disconnect the dangerous circuit.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
              <div>
                <p className="font-medium text-blue-300 mb-1">Low Impedance (Good):</p>
                <ul className="space-y-1">
                  <li>• High fault current flows</li>
                  <li>• Protective device operates quickly</li>
                  <li>• Dangerous voltages cleared rapidly</li>
                  <li>• Reduced risk of electric shock</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-red-300 mb-1">High Impedance (Dangerous):</p>
                <ul className="space-y-1">
                  <li>• Low fault current flows</li>
                  <li>• Protective device may not operate</li>
                  <li>• Dangerous voltages persist</li>
                  <li>• High risk of electric shock/fire</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-yellow-900/20 border border-yellow-600 p-4 rounded-lg">
            <h4 className="text-yellow-400 font-semibold mb-2">Real-World Impact</h4>
            <p className="text-xs sm:text-sm leading-relaxed">
              Consider a faulty kettle where the live conductor touches the metal casing. If the earth fault 
              loop impedance is too high, insufficient current will flow to trip the MCB. The kettle casing 
              will remain live at mains voltage, creating a lethal shock hazard for anyone who touches it. 
              This is why accurate measurement and verification of earth fault loop impedance is absolutely 
              essential for electrical safety.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Learning Outcomes */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Zap className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-foreground">Learning Outcomes</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="text-foreground space-y-3 sm:space-y-4 lg:space-y-6">
          <p className="text-sm sm:text-base">By the end of this section, you will be able to:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="bg-green-600 text-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-1">1</div>
                <div>
                  <h4 className="text-foreground font-semibold">Distinguish Between Zs and Ze</h4>
                  <p className="text-xs sm:text-sm leading-relaxed">Clearly explain the difference between external earth fault loop impedance (Ze) and total earth fault loop impedance (Zs), including when and how each is measured.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-green-600 text-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-1">2</div>
                <div>
                  <h4 className="text-foreground font-semibold">Calculate Earth Fault Loop Impedance</h4>
                  <p className="text-sm">Apply the formula Zs = Ze + R1 + R2 to determine total earth fault loop impedance values and verify compliance with BS 7671 requirements.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-green-600 text-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-1">3</div>
                <div>
                  <h4 className="text-foreground font-semibold">Apply Temperature Corrections</h4>
                  <p className="text-sm">Correctly apply temperature correction factors to account for conductor resistance changes at maximum operating temperature.</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="bg-blue-600 text-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-1">4</div>
                <div>
                  <h4 className="text-foreground font-semibold">Interpret Maximum Values</h4>
                  <p className="text-sm">Use BS 7671 tables to determine maximum permitted Zs values for different protective devices and circuit types.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-blue-600 text-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-1">5</div>
                <div>
                  <h4 className="text-foreground font-semibold">Assess Safety Compliance</h4>
                  <p className="text-sm">Evaluate test results to determine whether installations meet safety requirements and identify necessary remedial actions.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-blue-600 text-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-1">6</div>
                <div>
                  <h4 className="text-foreground font-semibold">Understand Fault Current Principles</h4>
                  <p className="text-sm">Explain the relationship between earth fault loop impedance, fault current magnitude, and protective device operation times.</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Core Content - Understanding Zs and Ze */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Calculator className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-foreground">Understanding Zs and Ze - Core Concepts</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="text-foreground space-y-6">
          <p className="text-lg mb-4">
            Understanding the distinction between Ze and Zs is fundamental to electrical safety testing. 
            These measurements represent different portions of the complete earth fault current path.
          </p>

          {/* The Earth Fault Loop Path */}
          <div className="bg-elec-dark p-4 rounded-lg border border-purple-600">
            <h4 className="text-purple-400 font-semibold mb-3">The Complete Earth Fault Loop Path</h4>
            <p className="text-sm mb-3">
              When an earth fault occurs, current flows through a complete loop from the fault point back to the 
              source transformer neutral. This path includes several components, each contributing to the total impedance:
            </p>
            <div className="grid md:grid-cols-1 gap-3">
              <div className="bg-elec-gray p-3 rounded border-l-4 border-purple-400">
                <p className="text-sm"><strong>Fault Point → Line Conductor (R1) → Consumer Unit → Supply Cable → Transformer → 
                Neutral Conductor → Earth → Installation Earth → Protective Conductor (R2) → Fault Point</strong></p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-elec-dark p-4 rounded-lg border border-blue-500">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary" className="bg-blue-600 text-foreground">Ze</Badge>
                <h4 className="text-foreground font-semibold">External Earth Fault Loop Impedance</h4>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-blue-300 mb-1">What it includes:</p>
                  <ul className="space-y-1">
                    <li>• Supply transformer impedance</li>
                    <li>• Supply authority cables (line and neutral)</li>
                    <li>• Service head connections</li>
                    <li>• Consumer's tails to main switch</li>
                    <li>• Earth path back to transformer neutral</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-blue-300 mb-1">Key characteristics:</p>
                  <ul className="space-y-1">
                    <li>• Cannot be controlled by installer</li>
                    <li>• Varies by supply type and location</li>
                    <li>• Measured with earthing conductor disconnected</li>
                    <li>• Forms the baseline for all Zs calculations</li>
                  </ul>
                </div>
                <div className="bg-blue-900/30 p-2 rounded">
                  <p className="font-medium text-blue-200 mb-1">Typical Values:</p>
                  <ul className="space-y-1">
                    <li>• TN-S system: 0.35 - 0.8Ω</li>
                    <li>• TN-C-S (PME): 0.35Ω maximum</li>
                    <li>• TT system: Variable (depends on earth electrode)</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-elec-dark p-4 rounded-lg border border-orange-500">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary" className="bg-orange-600 text-foreground">Zs</Badge>
                <h4 className="text-foreground font-semibold">Total Earth Fault Loop Impedance</h4>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-orange-300 mb-1">What it includes:</p>
                  <ul className="space-y-1">
                    <li>• All of Ze (external impedance)</li>
                    <li>• Line conductor resistance (R1)</li>
                    <li>• Protective conductor resistance (R2)</li>
                    <li>• All connections in the circuit</li>
                    <li>• Consumer unit and accessory impedances</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-orange-300 mb-1">Key characteristics:</p>
                  <ul className="space-y-1">
                    <li>• Controlled by installation design</li>
                    <li>• Must comply with BS 7671 limits</li>
                    <li>• Measured at point of utilisation</li>
                    <li>• Determines actual fault current</li>
                  </ul>
                </div>
                <div className="bg-orange-900/30 p-2 rounded">
                  <p className="font-medium text-orange-200 mb-1">Formula:</p>
                  <p><strong>Zs = Ze + R1 + R2</strong></p>
                  <p className="text-xs mt-1">Where R1 and R2 are at maximum operating temperature</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Practical Example */}
          <div className="bg-green-900/20 border border-green-600 p-4 rounded-lg">
            <h4 className="text-green-400 font-semibold mb-3">Practical Example: 32A Ring Circuit</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-green-300 mb-2">Given Values:</p>
                <ul className="space-y-1">
                  <li>• Ze (measured): 0.4Ω</li>
                  <li>• Cable: 2.5mm² twin & earth, 25m run</li>
                  <li>• R1 (line): 7.41mΩ/m × 25m = 0.185Ω</li>
                  <li>• R2 (cpc): 12.1mΩ/m × 25m = 0.303Ω</li>
                  <li>• Temperature correction factor: 1.25 (copper)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-green-300 mb-2">Calculation:</p>
                <ul className="space-y-1">
                  <li>• (R1 + R2) at 20°C = 0.185 + 0.303 = 0.488Ω</li>
                  <li>• (R1 + R2) at 70°C = 0.488 × 1.25 = 0.61Ω</li>
                  <li>• Zs = Ze + (R1 + R2) = 0.4 + 0.61 = 1.01Ω</li>
                  <li>• Maximum Zs for 32A Type B MCB = 1.44Ω</li>
                  <li>• <strong>Result: COMPLIANT ✓</strong></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-red-900/20 border border-red-600 p-4 rounded-lg">
            <h4 className="text-red-400 font-semibold mb-2">Critical Safety Point</h4>
            <p className="text-sm">
              The relationship Zs = Ze + R1 + R2 shows that even if Ze is acceptable, poor installation 
              practices (inadequate conductor sizes, poor connections, or excessive circuit lengths) can 
              push Zs beyond safe limits. This is why both external and installation impedances must be 
              carefully considered during design and verification.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Temperature Correction - Detailed */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-foreground">Temperature Correction - Critical for Accuracy</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="text-foreground space-y-6">
          <div className="bg-orange-900/20 border border-orange-600 p-4 rounded-lg">
            <h4 className="text-orange-400 font-semibold mb-2">Why Temperature Correction is Essential</h4>
            <p className="text-sm mb-3">
              Conductor resistance increases significantly with temperature. Earth fault loop impedance 
              tests are typically performed with cables at ambient temperature (around 20°C), but during 
              normal operation, cables can reach 70°C or higher. This temperature rise can increase 
              resistance by 25% or more, potentially pushing Zs beyond safe limits.
            </p>
            <p className="text-sm font-medium text-orange-300">
              Failure to apply temperature correction can result in dangerous overestimation of safety margins.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-elec-dark p-4 rounded-lg border-l-4 border-blue-500">
              <h4 className="text-foreground font-semibold mb-3">Copper Conductors</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-blue-300">Temperature Coefficient:</p>
                  <p>0.004 per °C (at 20°C)</p>
                </div>
                <div>
                  <p className="font-medium text-blue-300">Standard Correction Factor:</p>
                  <p className="text-lg font-bold text-blue-400">1.25</p>
                  <p className="text-xs">(20°C to 70°C operation)</p>
                </div>
                <div>
                  <p className="font-medium text-blue-300">Calculation:</p>
                  <p>Factor = 1 + 0.004 × (70-20) = 1.20</p>
                  <p className="text-xs">BS 7671 uses 1.25 for additional safety margin</p>
                </div>
                <div className="bg-blue-900/30 p-2 rounded">
                  <p className="font-medium">Example:</p>
                  <p>(R1 + R2) at 20°C = 0.5Ω</p>
                  <p>(R1 + R2) at 70°C = 0.5 × 1.25 = 0.625Ω</p>
                </div>
              </div>
            </div>
            
            <div className="bg-elec-dark p-4 rounded-lg border-l-4 border-red-500">
              <h4 className="text-foreground font-semibold mb-3">Aluminium Conductors</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-red-300">Temperature Coefficient:</p>
                  <p>0.0044 per °C (at 20°C)</p>
                </div>
                <div>
                  <p className="font-medium text-red-300">Standard Correction Factor:</p>
                  <p className="text-lg font-bold text-red-400">1.28</p>
                  <p className="text-xs">(20°C to 70°C operation)</p>
                </div>
                <div>
                  <p className="font-medium text-red-300">Calculation:</p>
                  <p>Factor = 1 + 0.0044 × (70-20) = 1.22</p>
                  <p className="text-xs">BS 7671 uses 1.28 for additional safety margin</p>
                </div>
                <div className="bg-red-900/30 p-2 rounded">
                  <p className="font-medium">Example:</p>
                  <p>(R1 + R2) at 20°C = 0.5Ω</p>
                  <p>(R1 + R2) at 70°C = 0.5 × 1.28 = 0.64Ω</p>
                </div>
              </div>
            </div>
          </div>

          {/* When to Apply Correction */}
          <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
            <h4 className="text-foreground font-semibold mb-3">When and How to Apply Temperature Correction</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-foreground mb-2">Apply Correction To:</p>
                <ul className="space-y-1">
                  <li>• Measured (R1 + R2) values</li>
                  <li>• Calculated circuit impedances</li>
                  <li>• Design verification calculations</li>
                  <li>• Any resistance values used in Zs calculations</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-foreground mb-2">Do NOT Apply To:</p>
                <ul className="space-y-1">
                  <li>• Ze (external impedance) values</li>
                  <li>• Transformer impedances</li>
                  <li>• Already corrected published values</li>
                  <li>• Final Zs measurement readings</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Practical Impact */}
          <div className="bg-yellow-900/20 border border-yellow-600 p-4 rounded-lg">
            <h4 className="text-yellow-400 font-semibold mb-3">Practical Impact of Temperature Correction</h4>
            <div className="text-sm space-y-2">
              <p>
                <strong>Scenario:</strong> 32A Type B MCB circuit with Ze = 0.4Ω and measured (R1 + R2) = 0.9Ω at 20°C
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-3">
                <div className="bg-red-900/30 p-3 rounded">
                  <p className="font-medium text-red-300">Without Temperature Correction:</p>
                  <p>Zs = 0.4 + 0.9 = 1.3Ω</p>
                  <p>Maximum for 32A Type B = 1.44Ω</p>
                  <p className="text-green-400 font-bold">✓ APPEARS COMPLIANT</p>
                </div>
                <div className="bg-green-900/30 p-3 rounded">
                  <p className="font-medium text-green-300">With Temperature Correction:</p>
                  <p>Zs = 0.4 + (0.9 × 1.25) = 1.525Ω</p>
                  <p>Maximum for 32A Type B = 1.44Ω</p>
                  <p className="text-red-400 font-bold">✗ NON-COMPLIANT</p>
                </div>
              </div>
              <p className="font-medium text-yellow-300 mt-2">
                Without temperature correction, this circuit would falsely appear safe, potentially creating a dangerous situation.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comprehensive Maximum Values and Compliance */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <div className="flex items-center gap-3">
            <CheckCircle className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-foreground">BS 7671 Maximum Zs Values and Compliance</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="text-foreground space-y-6">
          <div className="bg-blue-900/20 border border-blue-600 p-4 rounded-lg">
            <h4 className="text-blue-400 font-semibold mb-2">Understanding Maximum Zs Values</h4>
            <p className="text-sm mb-3">
              The maximum Zs values in BS 7671 are calculated to ensure sufficient fault current flows 
              to operate the protective device within the required disconnection time. These values are 
              derived from the protective device characteristics and the maximum touch voltage limits.
            </p>
            <div className="text-sm">
              <p className="font-medium text-blue-300">Key Formula: Maximum Zs = Supply Voltage ÷ Required Fault Current</p>
              <p className="text-xs mt-1">Where Required Fault Current = current needed for disconnection within specified time</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-elec-dark rounded-lg">
              <thead>
                <tr className="border-b border-gray-600 bg-elec-gray">
                  <th className="text-left p-3 text-foreground font-semibold">Protective Device</th>
                  <th className="text-left p-3 text-foreground font-semibold">Rating (A)</th>
                  <th className="text-left p-3 text-foreground font-semibold">Max Zs (Ω)</th>
                  <th className="text-left p-3 text-foreground font-semibold">Disconnection Time</th>
                  <th className="text-left p-3 text-foreground font-semibold">Application</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-gray-700 hover:bg-elec-gray/50">
                  <td className="p-3 font-medium">Type B MCB</td>
                  <td className="p-3">6A</td>
                  <td className="p-3 text-green-400 font-bold">7.67</td>
                  <td className="p-3">0.4s</td>
                  <td className="p-3 text-foreground">Lighting circuits</td>
                </tr>
                <tr className="border-b border-gray-700 hover:bg-elec-gray/50">
                  <td className="p-3 font-medium">Type B MCB</td>
                  <td className="p-3">16A</td>
                  <td className="p-3 text-green-400 font-bold">2.88</td>
                  <td className="p-3">0.4s</td>
                  <td className="p-3 text-foreground">Small power circuits</td>
                </tr>
                <tr className="border-b border-gray-700 hover:bg-elec-gray/50 bg-blue-900/20">
                  <td className="p-3 font-medium">Type B MCB</td>
                  <td className="p-3">32A</td>
                  <td className="p-3 text-yellow-400 font-bold">1.44</td>
                  <td className="p-3">0.4s</td>
                  <td className="p-3 text-foreground">Ring final/radial circuits</td>
                </tr>
                <tr className="border-b border-gray-700 hover:bg-elec-gray/50">
                  <td className="p-3 font-medium">Type C MCB</td>
                  <td className="p-3">16A</td>
                  <td className="p-3 text-orange-400 font-bold">1.44</td>
                  <td className="p-3">0.4s</td>
                  <td className="p-3 text-foreground">Motor circuits</td>
                </tr>
                <tr className="border-b border-gray-700 hover:bg-elec-gray/50 bg-orange-900/20">
                  <td className="p-3 font-medium">Type C MCB</td>
                  <td className="p-3">32A</td>
                  <td className="p-3 text-red-400 font-bold">0.72</td>
                  <td className="p-3">0.4s</td>
                  <td className="p-3 text-foreground">High inrush equipment</td>
                </tr>
                <tr className="border-b border-gray-700 hover:bg-elec-gray/50">
                  <td className="p-3 font-medium">BS 88 Fuse</td>
                  <td className="p-3">16A</td>
                  <td className="p-3 text-green-400 font-bold">2.19</td>
                  <td className="p-3">5s</td>
                  <td className="p-3 text-foreground">Fixed equipment</td>
                </tr>
                <tr className="border-b border-gray-700 hover:bg-elec-gray/50">
                  <td className="p-3 font-medium">BS 88 Fuse</td>
                  <td className="p-3">32A</td>
                  <td className="p-3 text-yellow-400 font-bold">1.09</td>
                  <td className="p-3">5s</td>
                  <td className="p-3 text-foreground">Distribution circuits</td>
                </tr>
                <tr className="border-b border-gray-700 hover:bg-elec-gray/50">
                  <td className="p-3 font-medium">BS 3036 Fuse</td>
                  <td className="p-3">30A</td>
                  <td className="p-3 text-red-400 font-bold">1.04</td>
                  <td className="p-3">5s</td>
                  <td className="p-3 text-foreground">Older installations</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Disconnection Time Explanation */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-900/20 border border-green-600 p-4 rounded-lg">
              <h4 className="text-green-400 font-semibold mb-2">0.4 Second Disconnection</h4>
              <div className="text-sm space-y-2">
                <p><strong>Required for:</strong></p>
                <ul className="space-y-1">
                  <li>• Socket outlet circuits</li>
                  <li>• Portable equipment circuits</li>
                  <li>• Circuits in special locations</li>
                  <li>• Mobile equipment circuits</li>
                </ul>
                <p className="font-medium text-green-300 mt-2">
                  Faster disconnection required due to higher shock risk from portable equipment
                </p>
              </div>
            </div>
            
            <div className="bg-blue-900/20 border border-blue-600 p-4 rounded-lg">
              <h4 className="text-blue-400 font-semibold mb-2">5 Second Disconnection</h4>
              <div className="text-sm space-y-2">
                <p><strong>Acceptable for:</strong></p>
                <ul className="space-y-1">
                  <li>• Fixed equipment circuits</li>
                  <li>• Distribution circuits</li>
                  <li>• Lighting circuits (in some cases)</li>
                  <li>• Circuits not accessible to ordinary persons</li>
                </ul>
                <p className="font-medium text-blue-300 mt-2">
                  Longer disconnection time acceptable as equipment is not readily portable
                </p>
              </div>
            </div>
          </div>

          {/* Compliance Assessment */}
          <div className="bg-purple-900/20 border border-purple-600 p-4 rounded-lg">
            <h4 className="text-purple-400 font-semibold mb-3">Compliance Assessment Process</h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-elec-dark p-3 rounded">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-purple-600 text-foreground rounded-full flex items-center justify-center text-xs font-bold">1</div>
                  <p className="font-medium text-foreground">Identify Circuit</p>
                </div>
                <ul className="space-y-1">
                  <li>• Determine protective device type</li>
                  <li>• Note the device rating</li>
                  <li>• Check required disconnection time</li>
                </ul>
              </div>
              
              <div className="bg-elec-dark p-3 rounded">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-purple-600 text-foreground rounded-full flex items-center justify-center text-xs font-bold">2</div>
                  <p className="font-medium text-foreground">Calculate Zs</p>
                </div>
                <ul className="space-y-1">
                  <li>• Measure or calculate Zs</li>
                  <li>• Apply temperature correction</li>
                  <li>• Account for measurement uncertainty</li>
                </ul>
              </div>
              
              <div className="bg-elec-dark p-3 rounded">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-purple-600 text-foreground rounded-full flex items-center justify-center text-xs font-bold">3</div>
                  <p className="font-medium text-foreground">Compare & Assess</p>
                </div>
                <ul className="space-y-1">
                  <li>• Compare with table maximum</li>
                  <li>• Document compliance status</li>
                  <li>• Identify remedial actions if needed</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};