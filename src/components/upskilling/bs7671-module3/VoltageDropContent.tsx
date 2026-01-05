import { Calculator, Zap, TrendingDown, AlertTriangle, CheckCircle, Target, Info, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export const VoltageDropContent = () => {
  return (
    <div className="space-y-8">
      {/* Comprehensive Voltage Drop Theory */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Calculator className="h-6 w-6 text-elec-yellow" />
            Voltage Drop Fundamentals and Calculations
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-6">
          <p className="text-base leading-relaxed">
            Voltage drop is the reduction in voltage that occurs as current flows through cable conductors. 
            Understanding and controlling voltage drop is essential for equipment performance, energy efficiency, and regulatory compliance.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-blue-600/10 p-4 rounded-lg border border-blue-600/30">
              <h4 className="text-blue-300 font-semibold text-lg mb-3">Basic Voltage Drop Formula</h4>
              <div className="bg-blue-900/30 p-3 rounded mb-3">
                <p className="text-foreground font-mono text-lg text-center mb-2">
                  Vd = (mV/A/m) × Ib × L × CF
                </p>
                <p className="text-xs text-foreground text-center">
                  Where CF = 2 for single phase, √3 for three phase
                </p>
              </div>
              <div className="space-y-2 text-sm">
                <p><strong>Vd:</strong> Voltage drop (volts)</p>
                <p><strong>mV/A/m:</strong> Voltage drop per amp per metre (from tables)</p>
                <p><strong>Ib:</strong> Design current (amperes)</p>
                <p><strong>L:</strong> Length of cable run (metres)</p>
                <p><strong>CF:</strong> Circuit factor (accounts for conductors)</p>
              </div>
            </div>

            <div className="bg-red-600/10 p-4 rounded-lg border border-red-600/30">
              <h4 className="text-red-300 font-semibold text-lg mb-3">BS 7671 Voltage Drop Limits</h4>
              <div className="space-y-3">
                <div className="bg-red-900/30 p-3 rounded">
                  <p className="text-foreground font-semibold">Lighting Circuits: Maximum 3%</p>
                  <p className="text-xs text-foreground">230V system: 6.9V maximum drop</p>
                  <p className="text-xs text-foreground">400V system: 12V maximum drop</p>
                </div>
                <div className="bg-red-900/30 p-3 rounded">
                  <p className="text-foreground font-semibold">Other Uses: Maximum 5%</p>
                  <p className="text-xs text-foreground">230V system: 11.5V maximum drop</p>
                  <p className="text-xs text-foreground">400V system: 20V maximum drop</p>
                </div>
              </div>
              <Alert className="mt-3 border-yellow-600/30 bg-yellow-900/20">
                <Info className="h-4 w-4 text-yellow-400" />
                <AlertDescription className="text-xs text-foreground">
                  These limits apply to the design current under normal operating conditions.
                </AlertDescription>
              </Alert>
            </div>
          </div>

          <div className="bg-elec-dark p-4 rounded-lg">
            <h4 className="text-elec-yellow font-semibold text-lg mb-3">Advanced Three-Phase Calculations</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-foreground font-semibold text-sm mb-2">Balanced Three-Phase Load:</p>
                <div className="bg-gray-800 p-3 rounded mb-2">
                  <p className="font-mono text-center">Vd = √3 × IL × (R cos φ + X sin φ) × L</p>
                </div>
                <ul className="text-xs space-y-1">
                  <li>• IL: Line current</li>
                  <li>• R: Resistance per unit length</li>
                  <li>• X: Reactance per unit length</li>
                  <li>• φ: Phase angle of load</li>
                  <li>• cos φ: Power factor</li>
                </ul>
              </div>
              <div>
                <p className="text-foreground font-semibold text-sm mb-2">Unbalanced Loads:</p>
                <ul className="text-xs space-y-1">
                  <li>• Calculate each phase separately</li>
                  <li>• Consider neutral current effects</li>
                  <li>• Use worst-case phase for compliance</li>
                  <li>• Account for harmonic currents</li>
                  <li>• Consider diversity factors</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Practical Calculation Examples */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Target className="h-6 w-6 text-green-500" />
            Worked Examples and Design Solutions
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Example 1 */}
            <div className="bg-green-600/10 p-4 rounded-lg border border-green-600/30">
              <h4 className="text-green-300 font-semibold text-lg mb-3">Example 1: Lighting Circuit</h4>
              <div className="space-y-3 text-sm">
                <div className="bg-gray-800 p-3 rounded">
                  <p><strong>Given:</strong></p>
                  <ul className="text-xs space-y-1 mt-1">
                    <li>• 16A lighting circuit</li>
                    <li>• 35m cable run</li>
                    <li>• 2.5mm² cable proposed</li>
                    <li>• Single phase 230V</li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-3 rounded">
                  <p><strong>Calculation:</strong></p>
                  <p className="font-mono text-xs mt-1">
                    Vd = 18 × 16 × 35 × 2 = 20,160mV = 20.16V
                  </p>
                  <p className="font-mono text-xs">
                    Percentage = 20.16 ÷ 230 = 8.8%
                  </p>
                </div>
                <div className="bg-red-900/30 p-3 rounded border border-red-600/40">
                  <p className="text-red-300 text-xs">
                    <strong>Result:</strong> Non-compliant! Exceeds 3% limit for lighting.
                  </p>
                  <p className="text-red-300 text-xs">
                    <strong>Solution:</strong> Upgrade to 4mm² cable (11mV/A/m).
                  </p>
                </div>
              </div>
            </div>

            {/* Example 2 */}
            <div className="bg-blue-600/10 p-4 rounded-lg border border-blue-600/30">
              <h4 className="text-blue-300 font-semibold text-lg mb-3">Example 2: Motor Circuit</h4>
              <div className="space-y-3 text-sm">
                <div className="bg-gray-800 p-3 rounded">
                  <p><strong>Given:</strong></p>
                  <ul className="text-xs space-y-1 mt-1">
                    <li>• 25A motor load</li>
                    <li>• 60m cable run</li>
                    <li>• Three-phase 400V</li>
                    <li>• Power factor 0.8</li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-3 rounded">
                  <p><strong>Solution Process:</strong></p>
                  <ul className="text-xs space-y-1 mt-1">
                    <li>• Try 6mm²: 7.3 mV/A/m</li>
                    <li>• Vd = √3 × 25 × 7.3 × 60 ÷ 1000</li>
                    <li>• Vd = 1.732 × 25 × 7.3 × 60 ÷ 1000</li>
                    <li>• Vd = 18.9V (4.7% - Acceptable)</li>
                  </ul>
                </div>
                <div className="bg-green-900/30 p-3 rounded border border-green-600/40">
                  <p className="text-green-300 text-xs">
                    <strong>Result:</strong> 6mm² cable is suitable for this application.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-elec-dark p-4 rounded-lg">
            <h4 className="text-elec-yellow font-semibold text-lg mb-3">Cable Selection Reference Table</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="text-left py-2 px-3 text-elec-yellow">Cable Size</th>
                    <th className="text-left py-2 px-3 text-elec-yellow">Copper mV/A/m</th>
                    <th className="text-left py-2 px-3 text-elec-yellow">Aluminium mV/A/m</th>
                    <th className="text-left py-2 px-3 text-elec-yellow">Max Current*</th>
                    <th className="text-left py-2 px-3 text-elec-yellow">Typical Applications</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700 text-xs">
                  <tr>
                    <td className="py-2 px-3 font-mono">1.5mm²</td>
                    <td className="py-2 px-3">29</td>
                    <td className="py-2 px-3">48</td>
                    <td className="py-2 px-3">20A</td>
                    <td className="py-2 px-3">Lighting, small power</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-mono">2.5mm²</td>
                    <td className="py-2 px-3">18</td>
                    <td className="py-2 px-3">30</td>
                    <td className="py-2 px-3">27A</td>
                    <td className="py-2 px-3">Ring finals, small motors</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-mono">4.0mm²</td>
                    <td className="py-2 px-3">11</td>
                    <td className="py-2 px-3">18</td>
                    <td className="py-2 px-3">37A</td>
                    <td className="py-2 px-3">Cookers, large lighting</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-mono">6.0mm²</td>
                    <td className="py-2 px-3">7.3</td>
                    <td className="py-2 px-3">12</td>
                    <td className="py-2 px-3">47A</td>
                    <td className="py-2 px-3">Showers, small motors</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-mono">10mm²</td>
                    <td className="py-2 px-3">4.4</td>
                    <td className="py-2 px-3">7.3</td>
                    <td className="py-2 px-3">65A</td>
                    <td className="py-2 px-3">Large motors, EV charging</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-mono">16mm²</td>
                    <td className="py-2 px-3">2.8</td>
                    <td className="py-2 px-3">4.4</td>
                    <td className="py-2 px-3">85A</td>
                    <td className="py-2 px-3">Sub-mains, large loads</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-xs text-foreground mt-2">*Current ratings for 70°C thermoplastic cables, reference method C</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Design Optimization Strategies */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-yellow-500" />
            Design Optimization and Cost Management
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-yellow-600/10 p-4 rounded-lg border border-yellow-600/30">
                <h4 className="text-yellow-300 font-semibold mb-3">Economic Optimization</h4>
                <ul className="text-sm space-y-2">
                  <li>• <strong>Cable Cost vs. Energy Loss:</strong> Higher upfront cable cost often pays back through reduced energy losses</li>
                  <li>• <strong>Installation Routes:</strong> Shorter routes reduce both cable costs and voltage drop</li>
                  <li>• <strong>Voltage Selection:</strong> 400V circuits have lower current for same power, reducing voltage drop</li>
                  <li>• <strong>Load Scheduling:</strong> Time-based control can reduce peak demand and cable requirements</li>
                  <li>• <strong>Sub-distribution:</strong> Local distribution boards can reduce main cable requirements</li>
                </ul>
              </div>

              <div className="bg-green-600/10 p-4 rounded-lg border border-green-600/30">
                <h4 className="text-green-300 font-semibold mb-3">Performance Optimization</h4>
                <ul className="text-sm space-y-2">
                  <li>• <strong>Power Factor Correction:</strong> Reduces current and voltage drop for inductive loads</li>
                  <li>• <strong>Load Balancing:</strong> Proper phase distribution minimizes neutral currents</li>
                  <li>• <strong>Diversity Factors:</strong> Account for realistic simultaneous demand</li>
                  <li>• <strong>Future Expansion:</strong> Design headroom for additional loads</li>
                  <li>• <strong>Monitoring Systems:</strong> Track actual vs. calculated performance</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-600/10 p-4 rounded-lg border border-blue-600/30">
                <h4 className="text-blue-300 font-semibold mb-3">Installation Considerations</h4>
                <ul className="text-sm space-y-2">
                  <li>• <strong>Temperature Derating:</strong> Higher temperatures increase resistance and voltage drop</li>
                  <li>• <strong>Grouping Effects:</strong> Multiple cables together generate heat and reduce capacity</li>
                  <li>• <strong>Installation Method:</strong> Affects current carrying capacity and voltage drop</li>
                  <li>• <strong>Cable Route Planning:</strong> Avoid heat sources and minimize length</li>
                  <li>• <strong>Future Access:</strong> Consider maintenance and modification requirements</li>
                </ul>
              </div>

              <div className="bg-purple-600/10 p-4 rounded-lg border border-purple-600/30">
                <h4 className="text-purple-300 font-semibold mb-3">Special Applications</h4>
                <ul className="text-sm space-y-2">
                  <li>• <strong>Motor Starting:</strong> Consider starting current (5-7× full load)</li>
                  <li>• <strong>LED Lighting:</strong> Low current but sensitive to voltage variation</li>
                  <li>• <strong>EV Charging:</strong> High current, long duration loads</li>
                  <li>• <strong>Harmonic Loads:</strong> Non-linear loads increase effective current</li>
                  <li>• <strong>Emergency Supplies:</strong> May have different voltage drop limits</li>
                </ul>
              </div>
            </div>
          </div>

          <Alert className="border-orange-600/30 bg-orange-900/20">
            <AlertTriangle className="h-4 w-4 text-orange-400" />
            <AlertDescription className="text-foreground">
              <strong className="text-orange-300">Design Tip:</strong> Always verify voltage drop calculations with actual measured values during commissioning. 
              Real-world conditions (temperature, installation methods, load diversity) can significantly affect performance.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Troubleshooting and Testing */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <TrendingDown className="h-6 w-6 text-red-500" />
            Troubleshooting Voltage Drop Problems
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-red-600/10 p-4 rounded-lg border border-red-600/30">
              <h4 className="text-red-300 font-semibold mb-3">Common Problems and Symptoms</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-foreground font-semibold">Excessive Voltage Drop Symptoms:</p>
                  <ul className="text-xs space-y-1 mt-1 ml-2">
                    <li>• Lights dimming when large loads start</li>
                    <li>• Motors running hot or failing to start</li>
                    <li>• Equipment malfunction or reduced performance</li>
                    <li>• Increased energy consumption</li>
                    <li>• Overheating of cables and connections</li>
                  </ul>
                </div>
                <div>
                  <p className="text-foreground font-semibold">Root Causes:</p>
                  <ul className="text-xs space-y-1 mt-1 ml-2">
                    <li>• Undersized cables for the load and distance</li>
                    <li>• Poor connections increasing resistance</li>
                    <li>• Unbalanced loads in three-phase systems</li>
                    <li>• Higher than expected ambient temperatures</li>
                    <li>• Load growth beyond original design</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-green-600/10 p-4 rounded-lg border border-green-600/30">
              <h4 className="text-green-300 font-semibold mb-3">Testing and Measurement</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-foreground font-semibold">Voltage Drop Testing:</p>
                  <ul className="text-xs space-y-1 mt-1 ml-2">
                    <li>• Measure voltage at origin and furthest point</li>
                    <li>• Test under full load conditions</li>
                    <li>• Use calibrated digital multimeters</li>
                    <li>• Record ambient temperature during testing</li>
                    <li>• Test all phases in three-phase systems</li>
                  </ul>
                </div>
                <div>
                  <p className="text-foreground font-semibold">Remedial Actions:</p>
                  <ul className="text-xs space-y-1 mt-1 ml-2">
                    <li>• Upgrade cable size where possible</li>
                    <li>• Install sub-distribution boards</li>
                    <li>• Improve connections and terminations</li>
                    <li>• Load balancing across phases</li>
                    <li>• Power factor correction installation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};