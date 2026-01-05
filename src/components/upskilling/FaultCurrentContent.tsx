import { BookOpen, Zap, AlertTriangle, Shield, Settings, CheckCircle, Cable, Target, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const FaultCurrentContent = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="flex items-center gap-2 text-foreground text-lg sm:text-xl">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Core Content
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0">
        
        {/* Understanding Prospective Fault Currents */}
        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold text-foreground">Understanding Prospective Fault Currents</h3>
          <div className="bg-[#323232] rounded-lg p-3 sm:p-4 space-y-3">
            <p className="text-foreground leading-relaxed text-sm sm:text-base">
              Prospective fault currents represent the <strong>maximum current that would flow</strong> under different 
              fault conditions. These values are critical for ensuring protective devices can safely interrupt 
              fault currents without damage to the electrical system.
            </p>
            <div className="bg-blue-600/10 border border-blue-600/20 rounded p-3">
              <p className="text-foreground text-xs sm:text-sm">
                <strong>Why measure PFC?</strong> Every protective device has a maximum breaking capacity. 
                If fault current exceeds this capacity, the device may fail catastrophically during a fault.
              </p>
            </div>
          </div>
        </div>

        {/* PSC - Prospective Short Circuit Current */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">PSC - Prospective Short Circuit Current</h3>
          <div className="bg-[#323232] rounded-lg p-4 space-y-4">
            <div className="flex items-start gap-3">
              <Zap className="h-6 w-6 text-elec-yellow mt-1 flex-shrink-0" />
              <div className="space-y-3">
                <p className="text-foreground leading-relaxed">
                  PSC represents the maximum current that would flow in a <strong>line-to-neutral fault</strong> 
                  (short circuit). This occurs when the line conductor comes into direct contact with the neutral conductor, 
                  creating a very low impedance path.
                </p>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-red-600/10 border border-red-600/20 rounded p-3">
                    <h4 className="text-red-200 font-medium mb-2 text-sm sm:text-base">Characteristics</h4>
                    <ul className="text-foreground text-xs sm:text-sm space-y-1">
                      <li>• Usually the highest fault current in most installations</li>
                      <li>• Limited only by supply and circuit impedances</li>
                      <li>• Can reach several thousand amperes</li>
                      <li>• Critical for MCB and fuse selection</li>
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-600/10 border border-yellow-600/20 rounded p-3">
                    <h4 className="text-yellow-200 font-medium mb-2 text-sm sm:text-base">Typical Values</h4>
                    <ul className="text-foreground text-xs sm:text-sm space-y-1">
                      <li>• Domestic supplies: 1-4 kA</li>
                      <li>• Commercial supplies: 4-16 kA</li>
                      <li>• Industrial supplies: 16-50+ kA</li>
                      <li>• Decreases with distance from source</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-orange-600/10 border border-orange-600/20 rounded p-3">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                    <p className="text-foreground text-sm">
                      <strong>Important:</strong> PSC occurs when there's a direct connection between live and neutral, 
                      bypassing all loads. This creates maximum current flow limited only by the impedance of the supply and cables.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PEFC - Prospective Earth Fault Current */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">PEFC - Prospective Earth Fault Current</h3>
          <div className="bg-[#323232] rounded-lg p-4 space-y-4">
            <div className="flex items-start gap-3">
              <Shield className="h-6 w-6 text-elec-yellow mt-1 flex-shrink-0" />
              <div className="space-y-3">
                <p className="text-foreground leading-relaxed">
                  PEFC represents the maximum current that would flow in a <strong>line-to-earth fault</strong>. 
                  This occurs when the line conductor comes into contact with exposed metalwork, the protective 
                  conductor, or other earthed parts.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-600/10 border border-green-600/20 rounded p-3">
                    <h4 className="text-green-200 font-medium mb-2">Key Features</h4>
                    <ul className="text-foreground text-sm space-y-1">
                      <li>• Usually lower than PSC</li>
                      <li>• Limited by earth loop impedance (Zs)</li>
                      <li>• Critical for earth fault protection</li>
                      <li>• Directly related to Zs measurements</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-600/10 border border-blue-600/20 rounded p-3">
                    <h4 className="text-blue-200 font-medium mb-2">Relationship to Zs</h4>
                    <div className="bg-gray-700 p-2 rounded font-mono text-center mb-2">
                      <span className="text-elec-yellow">PEFC = U₀ ÷ Zs</span>
                    </div>
                    <p className="text-foreground text-xs">
                      Where U₀ = nominal voltage to earth (230V)
                    </p>
                  </div>
                </div>

                <div className="bg-blue-600/10 border border-blue-600/20 rounded p-3">
                  <p className="text-foreground text-sm">
                    <strong>Remember:</strong> PEFC is inversely related to Zs. Lower Zs means higher PEFC, 
                    which is generally good for protective device operation but must not exceed device breaking capacity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testing Equipment and Setup */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Testing Equipment and Setup</h3>
          <div className="space-y-4">
            
            <div className="bg-[#323232] rounded-lg p-4">
              <h4 className="text-foreground font-medium mb-3 flex items-center gap-2">
                <Settings className="h-5 w-5 text-elec-yellow" />
                Equipment Requirements
              </h4>
              <div className="space-y-3">
                <ul className="text-foreground text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Multifunction tester (MFT) with PFC measurement capability
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    GS38-compliant test leads with proper current rating
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Current calibration certificate (within 12 months)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Appropriate PPE for live testing environment
                  </li>
                </ul>
                
                <div className="bg-yellow-600/10 border border-yellow-600/20 rounded p-3">
                  <p className="text-foreground text-sm">
                    <strong>Note:</strong> Most modern MFTs measure PSC and PEFC automatically during 
                    loop impedance testing, displaying both Zs and the corresponding fault currents.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#323232] rounded-lg p-4">
              <h4 className="text-foreground font-medium mb-3 flex items-center gap-2">
                <Eye className="h-5 w-5 text-elec-yellow" />
                Test Procedure
              </h4>
              <ol className="space-y-3">
                <li className="flex gap-3">
                  <span className="w-6 h-6 bg-elec-yellow text-black rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                  <div>
                    <h5 className="text-foreground font-medium">PSC Measurement</h5>
                    <p className="text-foreground text-sm">Connect between line and neutral at the test point</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 bg-elec-yellow text-black rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                  <div>
                    <h5 className="text-foreground font-medium">PEFC Measurement</h5>
                    <p className="text-foreground text-sm">Connect between line and earth at the test point</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 bg-elec-yellow text-black rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                  <div>
                    <h5 className="text-foreground font-medium">Automatic Display</h5>
                    <p className="text-foreground text-sm">Results usually displayed alongside Zs measurement</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 bg-elec-yellow text-black rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">4</span>
                  <div>
                    <h5 className="text-foreground font-medium">Record and Compare</h5>
                    <p className="text-foreground text-sm">Document values and compare to device breaking capacity</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Device Breaking Capacity Requirements */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Device Breaking Capacity Requirements</h3>
          <div className="bg-[#323232] rounded-lg p-4 space-y-4">
            <p className="text-foreground leading-relaxed">
              The most critical aspect of PFC testing is ensuring that prospective fault currents 
              <strong> do not exceed the breaking capacity</strong> of the protective devices installed.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-600/10 border border-blue-600/20 rounded p-4">
                <h4 className="text-blue-200 font-medium mb-3">Common MCB Ratings</h4>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left text-foreground py-1">Application</th>
                      <th className="text-left text-foreground py-1">Breaking Capacity</th>
                    </tr>
                  </thead>
                  <tbody className="text-foreground">
                    <tr><td>Domestic</td><td>6kA or 10kA</td></tr>
                    <tr><td>Commercial</td><td>10kA or 16kA</td></tr>
                    <tr><td>Industrial</td><td>25kA, 36kA, or higher</td></tr>
                  </tbody>
                </table>
              </div>
              
              <div className="bg-green-600/10 border border-green-600/20 rounded p-4">
                <h4 className="text-green-200 font-medium mb-3">Other Device Types</h4>
                <ul className="text-foreground text-sm space-y-1">
                  <li><strong>BS88 Fuses:</strong> Very high breaking capacity (up to 120kA)</li>
                  <li><strong>RCBOs:</strong> Same as equivalent MCB rating</li>
                  <li><strong>Main Switches:</strong> Must handle supply PFC</li>
                  <li><strong>Contactors:</strong> Check AC-3 or AC-1 ratings</li>
                </ul>
              </div>
            </div>

            <div className="bg-red-600/10 border border-red-600/20 rounded p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-red-200 font-medium mb-2">Critical Safety Warning</h4>
                  <p className="text-foreground text-sm mb-2">
                    If prospective fault current exceeds device breaking capacity:
                  </p>
                  <ul className="text-foreground text-sm space-y-1">
                    <li>• Device may fail catastrophically during a fault</li>
                    <li>• Risk of explosion, fire, and serious injury</li>
                    <li>• Fault current cannot be safely interrupted</li>
                    <li>• Installation becomes extremely dangerous</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Where to Test PFC */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Strategic Testing Locations</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#323232] rounded-lg p-4">
              <h4 className="text-foreground font-medium mb-3 flex items-center gap-2">
                <Target className="h-5 w-5 text-elec-yellow" />
                Primary Test Points
              </h4>
              <ul className="text-foreground text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <div>
                    <strong>Supply origin:</strong> At the main switch or meter position
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <div>
                    <strong>Distribution boards:</strong> At each DB to verify device ratings
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <div>
                    <strong>Sub-main origins:</strong> Where large sub-circuits begin
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-[#323232] rounded-lg p-4">
              <h4 className="text-foreground font-medium mb-3 flex items-center gap-2">
                <Cable className="h-5 w-5 text-elec-yellow" />
                Special Considerations
              </h4>
              <ul className="text-foreground text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <div>
                    <strong>Motor starters:</strong> High starting currents require verification
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <div>
                    <strong>Large loads:</strong> Equipment with high fault current contribution
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <div>
                    <strong>Generators:</strong> Additional fault current sources
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* PFC Calculation Methods */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Understanding PFC Calculations</h3>
          <div className="bg-[#323232] rounded-lg p-4 space-y-4">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-600/10 border border-blue-600/20 rounded p-4">
                <h4 className="text-blue-200 font-medium mb-3">PSC Calculation</h4>
                <div className="bg-gray-700 p-3 rounded font-mono text-center mb-2">
                  <span className="text-elec-yellow">PSC = U ÷ (Ze + Zline + Zneutral)</span>
                </div>
                <p className="text-foreground text-sm">
                  Where U = 230V (line-neutral voltage)
                </p>
              </div>
              
              <div className="bg-green-600/10 border border-green-600/20 rounded p-4">
                <h4 className="text-green-200 font-medium mb-3">PEFC Calculation</h4>
                <div className="bg-gray-700 p-3 rounded font-mono text-center mb-2">
                  <span className="text-elec-yellow">PEFC = U₀ ÷ Zs</span>
                </div>
                <p className="text-foreground text-sm">
                  Where U₀ = 230V (line-earth voltage)
                </p>
              </div>
            </div>

            <div className="bg-yellow-600/10 border border-yellow-600/20 rounded p-3">
              <p className="text-foreground text-sm">
                <strong>Note:</strong> Modern testers perform these calculations automatically based on 
                measured impedances, but understanding the relationship helps interpret results.
              </p>
            </div>
          </div>
        </div>

        {/* Common Issues and Solutions */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Common Issues and Solutions</h3>
          <div className="space-y-3">
            
            <div className="bg-[#323232] rounded-lg p-4">
              <h4 className="text-red-200 font-medium mb-3">PFC Exceeds Device Rating</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-red-600/10 border border-red-600/20 rounded p-3">
                  <p className="text-foreground text-sm mb-2">Immediate actions:</p>
                  <ul className="text-foreground text-xs space-y-1">
                    <li>• Do not energise the circuit</li>
                    <li>• Mark installation as dangerous</li>
                    <li>• Notify relevant parties immediately</li>
                    <li>• Investigate root cause</li>
                  </ul>
                </div>
                <div className="bg-green-600/10 border border-green-600/20 rounded p-3">
                  <p className="text-foreground text-sm mb-2">Possible solutions:</p>
                  <ul className="text-foreground text-xs space-y-1">
                    <li>• Upgrade protective devices</li>
                    <li>• Install current-limiting devices</li>
                    <li>• Review supply arrangements</li>
                    <li>• Consider alternative protection methods</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#323232] rounded-lg p-4">
              <h4 className="text-yellow-200 font-medium mb-3">PFC Values Seem Too Low</h4>
              <div className="bg-yellow-600/10 border border-yellow-600/20 rounded p-4">
                <p className="text-foreground text-sm mb-2">Check for:</p>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• High supply impedance (weak supply)</li>
                  <li>• Long cable runs increasing total impedance</li>
                  <li>• Poor connections reducing available current</li>
                  <li>• Incorrect test setup or calibration issues</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};