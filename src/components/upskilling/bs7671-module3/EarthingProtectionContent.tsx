import { Shield, Zap, AlertTriangle, CheckCircle, Target, Info, Settings, TestTube } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export const EarthingProtectionContent = () => {
  return (
    <div className="space-y-8">
      {/* Comprehensive Protection Measures Overview */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Shield className="h-6 w-6 text-elec-yellow" />
            Protection Against Electric Shock - Complete Framework
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-6">
          <p className="text-base leading-relaxed">
            BS 7671 provides multiple protective measures against electric shock, each suited to different installation types and risk levels. 
            Understanding when and how to apply each measure is crucial for safe electrical design.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* ADS Protection */}
            <div className="bg-blue-600/10 p-4 rounded-lg border border-blue-600/30">
              <h4 className="text-blue-300 font-semibold text-lg mb-3 flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Automatic Disconnection of Supply (ADS)
              </h4>
              <div className="space-y-3">
                <p className="text-sm">Most common protective measure, relies on automatic disconnection during fault conditions.</p>
                <div className="bg-blue-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm mb-2">Essential Requirements:</p>
                  <ul className="text-xs space-y-1">
                    <li>• Protective earthing of exposed-conductive-parts</li>
                    <li>• Protective equipotential bonding</li>
                    <li>• Automatic disconnection by protective device</li>
                    <li>• Earth fault loop impedance within limits</li>
                  </ul>
                </div>
                <div className="bg-blue-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm mb-2">Disconnection Times:</p>
                  <ul className="text-xs space-y-1">
                    <li>• Final circuits ≤32A: 0.4s maximum</li>
                    <li>• Distribution circuits: 5s maximum</li>
                    <li>• Fixed equipment circuits: 5s maximum</li>
                    <li>• Socket outlet circuits: 0.4s maximum</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* SELV/PELV Systems */}
            <div className="bg-green-600/10 p-4 rounded-lg border border-green-600/30">
              <h4 className="text-green-300 font-semibold text-lg mb-3 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                SELV and PELV Systems
              </h4>
              <div className="space-y-3">
                <p className="text-sm">Safety through voltage limitation and electrical separation.</p>
                <div className="bg-green-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm mb-2">SELV (Safety Extra Low Voltage):</p>
                  <ul className="text-xs space-y-1">
                    <li>• Nominal voltage ≤50V AC or ≤120V DC</li>
                    <li>• Separated from other systems</li>
                    <li>• No connection to earth</li>
                    <li>• Basic insulation sufficient</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm mb-2">PELV (Protective Extra Low Voltage):</p>
                  <ul className="text-xs space-y-1">
                    <li>• Similar voltage limits to SELV</li>
                    <li>• Earthed at one point only</li>
                    <li>• Used where earthing is essential</li>
                    <li>• Battery systems, automotive applications</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Electrical Separation */}
            <div className="bg-yellow-600/10 p-4 rounded-lg border border-yellow-600/30">
              <h4 className="text-yellow-300 font-semibold text-lg mb-3 flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Electrical Separation
              </h4>
              <div className="space-y-3">
                <p className="text-sm">Isolation from earth and other circuits through separation transformers.</p>
                <div className="bg-yellow-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm mb-2">Requirements:</p>
                  <ul className="text-xs space-y-1">
                    <li>• Unearthed separated circuit</li>
                    <li>• Isolation transformer or motor-generator</li>
                    <li>• No connection between circuits</li>
                    <li>• Single item of equipment preferred</li>
                  </ul>
                </div>
                <div className="bg-yellow-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm mb-2">Applications:</p>
                  <ul className="text-xs space-y-1">
                    <li>• Medical equipment supply</li>
                    <li>• High-risk maintenance areas</li>
                    <li>• Laboratory installations</li>
                    <li>• Temporary repair situations</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* RCD Protection */}
            <div className="bg-purple-600/10 p-4 rounded-lg border border-purple-600/30">
              <h4 className="text-purple-300 font-semibold text-lg mb-3 flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                RCD Protection Systems
              </h4>
              <div className="space-y-3">
                <p className="text-sm">Residual current protection for enhanced safety and TT system requirements.</p>
                <div className="bg-purple-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm mb-2">RCD Types and Applications:</p>
                  <ul className="text-xs space-y-1">
                    <li>• <strong>Type AC:</strong> AC fault currents only</li>
                    <li>• <strong>Type A:</strong> AC + pulsing DC currents</li>
                    <li>• <strong>Type B:</strong> All current types including smooth DC</li>
                    <li>• <strong>Type F:</strong> Higher frequency compatibility</li>
                  </ul>
                </div>
                <div className="bg-purple-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm mb-2">Sensitivity Ratings:</p>
                  <ul className="text-xs space-y-1">
                    <li>• 30mA: Personal protection</li>
                    <li>• 100mA: Fire protection</li>
                    <li>• 300mA: Equipment protection</li>
                    <li>• 500mA: Special applications</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Earth Fault Loop Impedance */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <TestTube className="h-6 w-6 text-blue-500" />
            Earth Fault Loop Impedance (Zs) Theory and Practice
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-6">
          <p className="text-base leading-relaxed">
            Earth fault loop impedance determines how quickly protective devices operate during earth faults. 
            Understanding Zs calculation and testing is essential for ADS compliance.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-elec-dark p-4 rounded-lg">
              <h4 className="text-elec-yellow font-semibold text-lg mb-3">Zs Calculation and Components</h4>
              <div className="bg-blue-900/30 p-3 rounded mb-3">
                <p className="text-foreground font-mono text-center text-lg mb-2">Zs = Ze + R1 + R2</p>
                <p className="text-xs text-foreground text-center">Total earth fault loop impedance</p>
              </div>
              <div className="space-y-2 text-sm">
                <p><strong>Ze:</strong> External earth fault loop impedance (supply authority)</p>
                <p><strong>R1:</strong> Resistance of line conductor to point of fault</p>
                <p><strong>R2:</strong> Resistance of protective conductor to point of fault</p>
              </div>
              <div className="bg-gray-800 p-3 rounded mt-3">
                <p className="text-foreground font-semibold text-sm mb-2">Alternative Method:</p>
                <p className="font-mono text-xs">Zs = Ze + (R1 + R2) × m × L</p>
                <p className="text-xs text-foreground mt-1">Where m = multiplier from tables, L = length</p>
              </div>
            </div>

            <div className="bg-elec-dark p-4 rounded-lg">
              <h4 className="text-elec-yellow font-semibold text-lg mb-3">Maximum Zs Values Table</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left py-2 px-2 text-elec-yellow">Protective Device</th>
                      <th className="text-left py-2 px-2 text-elec-yellow">0.4s (Ω)</th>
                      <th className="text-left py-2 px-2 text-elec-yellow">5s (Ω)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    <tr>
                      <td className="py-1 px-2">6A Type B MCB</td>
                      <td className="py-1 px-2 text-center">7.67</td>
                      <td className="py-1 px-2 text-center">15.33</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2">10A Type B MCB</td>
                      <td className="py-1 px-2 text-center">4.60</td>
                      <td className="py-1 px-2 text-center">9.20</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2">16A Type B MCB</td>
                      <td className="py-1 px-2 text-center">2.87</td>
                      <td className="py-1 px-2 text-center">5.75</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2">20A Type B MCB</td>
                      <td className="py-1 px-2 text-center">2.30</td>
                      <td className="py-1 px-2 text-center">4.60</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2">32A Type B MCB</td>
                      <td className="py-1 px-2 text-center">1.44</td>
                      <td className="py-1 px-2 text-center">2.87</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-foreground mt-2">Values for 230V nominal voltage</p>
            </div>
          </div>

          <div className="bg-orange-600/10 p-4 rounded-lg border border-orange-600/30">
            <h4 className="text-orange-300 font-semibold mb-3">Practical Zs Testing Considerations</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-foreground font-semibold text-sm mb-2">Testing Method:</p>
                <ul className="text-xs space-y-1">
                  <li>• Use calibrated earth fault loop impedance tester</li>
                  <li>• Test at the furthest point of each circuit</li>
                  <li>• Account for temperature correction factors</li>
                  <li>• Test with all parallel earth paths connected</li>
                  <li>• Record Ze at origin for reference</li>
                </ul>
              </div>
              <div>
                <p className="text-foreground font-semibold text-sm mb-2">Common Issues:</p>
                <ul className="text-xs space-y-1">
                  <li>• High resistance joints increasing Zs</li>
                  <li>• Inadequate protective conductor sizing</li>
                  <li>• Parallel earth paths affecting readings</li>
                  <li>• Temperature effects on conductor resistance</li>
                  <li>• Supply impedance variations</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System-Specific Protection Requirements */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Target className="h-6 w-6 text-green-500" />
            Earthing System Specific Protection Strategies
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* TN Systems */}
            <div className="bg-green-600/10 p-4 rounded-lg border border-green-600/30">
              <h4 className="text-green-300 font-semibold text-lg mb-3">TN Systems (TN-S, TN-C-S)</h4>
              <div className="space-y-3">
                <div className="bg-green-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm mb-2">Characteristics:</p>
                  <ul className="text-xs space-y-1">
                    <li>• Direct earth connection via supply</li>
                    <li>• Low earth fault loop impedance</li>
                    <li>• Reliable ADS operation</li>
                    <li>• Good fault current magnitude</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm mb-2">Protection Strategy:</p>
                  <ul className="text-xs space-y-1">
                    <li>• ADS as primary protection</li>
                    <li>• Overcurrent devices typically sufficient</li>
                    <li>• RCD for additional protection</li>
                    <li>• Main equipotential bonding essential</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm mb-2">Design Considerations:</p>
                  <ul className="text-xs space-y-1">
                    <li>• Calculate Zs for each circuit</li>
                    <li>• Ensure protective device coordination</li>
                    <li>• Consider neutral-earth voltage</li>
                    <li>• PME earthing arrangements</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* TT Systems */}
            <div className="bg-yellow-600/10 p-4 rounded-lg border border-yellow-600/30">
              <h4 className="text-yellow-300 font-semibold text-lg mb-3">TT Systems</h4>
              <div className="space-y-3">
                <div className="bg-yellow-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm mb-2">Characteristics:</p>
                  <ul className="text-xs space-y-1">
                    <li>• Independent earth electrode</li>
                    <li>• High earth fault loop impedance</li>
                    <li>• Low fault current magnitude</li>
                    <li>• Variable earth electrode resistance</li>
                  </ul>
                </div>
                <div className="bg-yellow-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm mb-2">Protection Strategy:</p>
                  <ul className="text-xs space-y-1">
                    <li>• RCD protection essential</li>
                    <li>• ADS rarely achievable with overcurrent devices</li>
                    <li>• Time-delayed RCDs for selectivity</li>
                    <li>• Earth electrode resistance critical</li>
                  </ul>
                </div>
                <div className="bg-yellow-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm mb-2">Design Considerations:</p>
                  <ul className="text-xs space-y-1">
                    <li>• Earth electrode design and installation</li>
                    <li>• RCD sensitivity selection</li>
                    <li>• Coordination between RCDs</li>
                    <li>• Seasonal resistance variations</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* IT Systems */}
            <div className="bg-red-600/10 p-4 rounded-lg border border-red-600/30">
              <h4 className="text-red-300 font-semibold text-lg mb-3">IT Systems</h4>
              <div className="space-y-3">
                <div className="bg-red-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm mb-2">Characteristics:</p>
                  <ul className="text-xs space-y-1">
                    <li>• Isolated or high impedance earthed supply</li>
                    <li>• First fault does not require disconnection</li>
                    <li>• Continuous operation during single faults</li>
                    <li>• Insulation monitoring required</li>
                  </ul>
                </div>
                <div className="bg-red-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm mb-2">Protection Strategy:</p>
                  <ul className="text-xs space-y-1">
                    <li>• Insulation monitoring device (IMD)</li>
                    <li>• ADS for second fault</li>
                    <li>• RCD protection where required</li>
                    <li>• Fault location systems</li>
                  </ul>
                </div>
                <div className="bg-red-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm mb-2">Applications:</p>
                  <ul className="text-xs space-y-1">
                    <li>• Medical locations (specific requirements)</li>
                    <li>• Industrial processes requiring continuity</li>
                    <li>• Critical safety systems</li>
                    <li>• Ships and offshore installations</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <Alert className="border-blue-600/30 bg-blue-900/20">
            <Info className="h-4 w-4 text-blue-400" />
            <AlertDescription className="text-foreground">
              <strong className="text-blue-300">System Selection Guidance:</strong> The choice of earthing system affects the entire protection philosophy. 
              TN systems are most common in the UK, TT systems for remote locations, and IT systems for special applications requiring continuity of supply.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Advanced Protection Topics */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-orange-500" />
            Advanced Protection Concepts and Special Applications
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-purple-600/10 p-4 rounded-lg border border-purple-600/30">
                <h4 className="text-purple-300 font-semibold mb-3">Protective Device Coordination</h4>
                <ul className="text-sm space-y-2">
                  <li>• <strong>Selectivity:</strong> Closest protective device to fault operates first</li>
                  <li>• <strong>Discrimination:</strong> Time/current grading between devices</li>
                  <li>• <strong>Back-up Protection:</strong> Upstream device provides backup</li>
                  <li>• <strong>RCD Coordination:</strong> Time-delayed upstream, instantaneous downstream</li>
                  <li>• <strong>Current Limitation:</strong> Consider prospective fault current</li>
                </ul>
              </div>

              <div className="bg-blue-600/10 p-4 rounded-lg border border-blue-600/30">
                <h4 className="text-blue-300 font-semibold mb-3">Equipotential Bonding</h4>
                <ul className="text-sm space-y-2">
                  <li>• <strong>Main Bonding:</strong> Services entering building (gas, water, etc.)</li>
                  <li>• <strong>Supplementary Bonding:</strong> Local equipotential zones</li>
                  <li>• <strong>Conductor Sizing:</strong> Half the earthing conductor (minimum 6mm²)</li>
                  <li>• <strong>Special Locations:</strong> Enhanced bonding requirements</li>
                  <li>• <strong>Testing:</strong> Verify low resistance paths</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-orange-600/10 p-4 rounded-lg border border-orange-600/30">
                <h4 className="text-orange-300 font-semibold mb-3">Special Location Requirements</h4>
                <ul className="text-sm space-y-2">
                  <li>• <strong>Bathrooms:</strong> Supplementary bonding, 30mA RCD protection</li>
                  <li>• <strong>Swimming Pools:</strong> SELV in zones 0 and 1, enhanced protection</li>
                  <li>• <strong>Medical Locations:</strong> IT systems, enhanced monitoring</li>
                  <li>• <strong>Construction Sites:</strong> Reduced voltage, enhanced earth monitoring</li>
                  <li>• <strong>Agricultural:</strong> Enhanced protection against touch voltage</li>
                </ul>
              </div>

              <div className="bg-green-600/10 p-4 rounded-lg border border-green-600/30">
                <h4 className="text-green-300 font-semibold mb-3">Modern Protection Challenges</h4>
                <ul className="text-sm space-y-2">
                  <li>• <strong>Harmonic Currents:</strong> Effects on RCD operation and neutral sizing</li>
                  <li>• <strong>DC Components:</strong> EV charging, solar PV affecting RCD selection</li>
                  <li>• <strong>High-Frequency Effects:</strong> IT equipment and LED drivers</li>
                  <li>• <strong>Earth Electrode Corrosion:</strong> Long-term performance degradation</li>
                  <li>• <strong>Smart Grid Integration:</strong> Bidirectional power flow considerations</li>
                </ul>
              </div>
            </div>
          </div>

          <Alert className="border-red-600/30 bg-red-900/20">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <AlertDescription className="text-foreground">
              <strong className="text-red-300">Critical Safety Note:</strong> Protection system design must account for all credible fault scenarios. 
              Regular testing and maintenance of protective devices is essential to ensure continued safe operation throughout the installation's life.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};