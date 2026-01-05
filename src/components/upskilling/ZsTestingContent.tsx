import { BookOpen, Zap, Shield, AlertTriangle, Target, Settings, CheckCircle, Cable, Eye, Lightbulb, TrendingUp, Calculator } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ZsTestingContent = () => {
  return (
    <div className="space-y-8">
      {/* Introduction */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Lightbulb className="h-5 w-5 text-elec-yellow" />
            Introduction to Testing Zs at Various Points
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground text-sm sm:text-base leading-relaxed">
            Testing earth fault loop impedance (Zs) at various points throughout an electrical installation is a critical 
            verification process that ensures automatic disconnection of supply under earth fault conditions. This comprehensive 
            testing approach is required by BS 7671 to demonstrate that every point in the installation can achieve the 
            required disconnection times for both shock protection and fire protection.
          </p>
          <p className="text-foreground text-sm sm:text-base leading-relaxed">
            Unlike testing at the origin of an installation, testing at various points reveals the true performance 
            characteristics of individual circuits, accounting for cable impedance, connection quality, and the cumulative 
            effects of distribution path lengths. This testing is essential for verifying that protective devices will 
            operate correctly under fault conditions throughout the entire installation.
          </p>
          <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
            <h4 className="text-blue-200 font-medium mb-2">Why This Matters</h4>
            <p className="text-foreground text-xs sm:text-sm">
              Zs values increase with distance from the source due to additional cable impedance. The furthest points 
              in circuits often represent the worst-case scenarios for fault clearance. Without proper testing at these 
              critical points, potentially dangerous situations could exist where protective devices fail to operate 
              within required time limits.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Learning Outcomes */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <TrendingUp className="h-5 w-5 text-elec-yellow" />
            Learning Outcomes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground mb-4">Upon completion of this section, you will be able to:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-foreground text-sm">
                  Explain why Zs testing must be conducted at multiple points throughout an installation
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-foreground text-sm">
                  Identify the most critical testing points for different types of circuits (ring, radial, lighting)
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-foreground text-sm">
                  Select appropriate test methods for circuits with and without RCD protection
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-foreground text-sm">
                  Apply special considerations for testing in locations such as bathrooms and outbuildings
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-foreground text-sm">
                  Understand the relationship between circuit length, conductor size, and Zs values
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-foreground text-sm">
                  Interpret test results and determine compliance with BS 7671 requirements
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-foreground text-sm">
                  Implement systematic testing procedures to ensure comprehensive coverage
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-foreground text-sm">
                  Document test results appropriately and recommend corrective actions where necessary
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Core Content */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
            Core Content
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
        
        {/* Why Test at Various Points */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Why Test Zs at Various Points?</h3>
          <div className="bg-[#323232] rounded-lg p-4 space-y-3">
            <p className="text-foreground leading-relaxed text-sm sm:text-base">
              Testing Zs at different locations throughout an installation ensures that <strong>every point</strong> 
              where equipment might be connected can achieve proper automatic disconnection under fault conditions.
            </p>
            <div className="bg-red-600/10 border border-red-600/20 rounded p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-red-200 font-medium mb-2">Critical Point</h4>
                  <p className="text-foreground text-xs sm:text-sm">
                    Zs increases as you move further from the supply origin due to the additional 
                    resistance of longer cable runs. The furthest points are always most at risk 
                    of having Zs values that are too high.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Circuit Testing Requirements */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Live Circuit Testing Requirements</h3>
          <div className="bg-[#323232] rounded-lg p-4 space-y-4">
            <div className="flex items-start gap-3">
              <Zap className="h-6 w-6 text-elec-yellow mt-1 flex-shrink-0" />
              <div className="space-y-3">
                <p className="text-foreground leading-relaxed text-sm sm:text-base">
                  Zs testing <strong>must be carried out on live circuits</strong> to get accurate readings. 
                  The test requires current to flow through the complete earth fault loop path to measure its impedance correctly.
                </p>
                
                <div className="bg-blue-600/10 border border-blue-600/20 rounded p-3">
                  <h4 className="text-blue-200 font-medium mb-2">Why Live Testing?</h4>
                  <ul className="text-foreground text-xs sm:text-sm space-y-1">
                    <li>• The test current must complete the full loop path</li>
                    <li>• Supply transformer impedance is only measurable when energised</li>
                    <li>• Parallel earth paths only function when the system is live</li>
                    <li>• Dead testing cannot replicate actual fault current paths</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RCD Circuit Considerations */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Testing RCD-Protected Circuits</h3>
          <div className="bg-[#323232] rounded-lg p-4 space-y-4">
            <div className="flex items-start gap-3">
              <Shield className="h-6 w-6 text-elec-yellow mt-1 flex-shrink-0" />
              <div className="space-y-3">
                <p className="text-foreground leading-relaxed text-sm sm:text-base">
                  When testing circuits protected by RCDs, you must use the <strong>non-trip loop test mode</strong> 
                  to prevent unwanted disconnection during testing.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-yellow-600/10 border border-yellow-600/20 rounded p-3">
                    <h4 className="text-yellow-200 font-medium mb-2">Standard Loop Test</h4>
                    <ul className="text-foreground text-xs sm:text-sm space-y-1">
                      <li>• High test current (typically 10-25A)</li>
                      <li>• Will trip 30mA RCDs immediately</li>
                      <li>• Cannot complete test on RCD circuits</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-600/10 border border-green-600/20 rounded p-3">
                    <h4 className="text-green-200 font-medium mb-2">Non-Trip Mode</h4>
                    <ul className="text-foreground text-xs sm:text-sm space-y-1">
                      <li>• Reduced test current (typically &lt;15mA)</li>
                      <li>• Stays below RCD trip threshold</li>
                      <li>• Allows Zs measurement on RCD circuits</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-red-600/10 border border-red-600/20 rounded p-3">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <p className="text-foreground text-xs sm:text-sm">
                      <strong>Note:</strong> Non-trip readings may be slightly higher than standard loop tests 
                      due to the lower test current, but they still provide valid Zs measurements.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Systematic Testing Approach */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Systematic Testing Approach by Circuit Type</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#323232] rounded-lg p-4">
              <h4 className="text-foreground font-medium mb-3 flex items-center gap-2">
                <Cable className="h-5 w-5 text-elec-yellow" />
                Ring Final Circuits
              </h4>
              <div className="space-y-3">
                <p className="text-foreground text-xs sm:text-sm">
                  Ring circuits require testing at multiple points due to their configuration.
                </p>
                <ul className="text-foreground text-xs sm:text-sm space-y-1">
                  <li>• Test at the point furthest from the DB (usually mid-ring)</li>
                  <li>• Test at any spur outlets off the ring</li>
                  <li>• Consider the ring integrity when interpreting results</li>
                  <li>• Remember: broken ring becomes radial with higher Zs</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-[#323232] rounded-lg p-4">
              <h4 className="text-foreground font-medium mb-3 flex items-center gap-2">
                <Target className="h-5 w-5 text-elec-yellow" />
                Radial Circuits
              </h4>
              <div className="space-y-3">
                <p className="text-foreground text-sm">
                  Radial circuits have predictable Zs increases with distance.
                </p>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Test at the end of the circuit run</li>
                  <li>• Include any sub-circuits or spurs</li>
                  <li>• Zs will be highest at the furthest point</li>
                  <li>• Consider cable length and conductor sizes</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-[#323232] rounded-lg p-4">
              <h4 className="text-foreground font-medium mb-3 flex items-center gap-2">
                <Eye className="h-5 w-5 text-elec-yellow" />
                Lighting Circuits
              </h4>
              <div className="space-y-3">
                <p className="text-foreground text-sm">
                  Lighting circuits often have complex switching arrangements.
                </p>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Test at the furthest light fitting from the DB</li>
                  <li>• Include intermediate switch positions where accessible</li>
                  <li>• Consider two-way and intermediate switching</li>
                  <li>• Emergency lighting circuits need separate testing</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-[#323232] rounded-lg p-4">
              <h4 className="text-foreground font-medium mb-3 flex items-center gap-2">
                <Settings className="h-5 w-5 text-elec-yellow" />
                Fixed Equipment
              </h4>
              <div className="space-y-3">
                <p className="text-foreground text-sm">
                  Fixed equipment requires testing at connection points.
                </p>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Test at the equipment terminal or isolator</li>
                  <li>• Include motor starters and control gear</li>
                  <li>• Consider heating circuits and large appliances</li>
                  <li>• Test both at load and isolator positions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Special Location Requirements */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Special Location Requirements</h3>
          <div className="space-y-3">
            
            <div className="bg-[#323232] rounded-lg p-4">
              <h4 className="text-blue-200 font-medium mb-3">Bathroom Circuits</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-600/10 border border-blue-600/20 rounded p-3">
                  <p className="text-foreground text-sm mb-2">Testing requirements:</p>
                  <ul className="text-foreground text-xs space-y-1">
                    <li>• All circuits in zones 0, 1, and 2</li>
                    <li>• Supplementary bonding connections</li>
                    <li>• SELV/PELV circuit testing</li>
                    <li>• RCD protection verification</li>
                  </ul>
                </div>
                <div className="bg-yellow-600/10 border border-yellow-600/20 rounded p-3">
                  <p className="text-foreground text-sm mb-2">Special considerations:</p>
                  <ul className="text-foreground text-xs space-y-1">
                    <li>• 30mA RCD protection mandatory</li>
                    <li>• Enhanced bonding requirements</li>
                    <li>• IP ratings for equipment in zones</li>
                    <li>• Reduced disconnection times may apply</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#323232] rounded-lg p-4">
              <h4 className="text-green-200 font-medium mb-3">Outdoor and Outbuilding Circuits</h4>
              <div className="bg-green-600/10 border border-green-600/20 rounded p-4">
                <p className="text-foreground text-sm mb-2">Key considerations:</p>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Additional cable length increases Zs significantly</li>
                  <li>• TT systems may require different approach</li>
                  <li>• Consider voltage drop as well as Zs</li>
                  <li>• Test at building origin and final circuits</li>
                  <li>• Document earthing arrangements clearly</li>
                </ul>
              </div>
            </div>
            
          </div>
        </div>

        {/* Testing Procedure Step by Step */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Step-by-Step Testing Procedure</h3>
          <div className="bg-[#323232] rounded-lg p-4">
            <ol className="space-y-3">
              <li className="flex gap-4">
                <span className="w-8 h-8 bg-elec-yellow text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                <div>
                  <h4 className="text-foreground font-medium">Verify Circuit Details</h4>
                  <p className="text-foreground text-sm">Check protective device type, rating, and RCD protection</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="w-8 h-8 bg-elec-yellow text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                <div>
                  <h4 className="text-foreground font-medium">Select Test Mode</h4>
                  <p className="text-foreground text-sm">Use non-trip mode for RCD circuits, standard mode for others</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="w-8 h-8 bg-elec-yellow text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                <div>
                  <h4 className="text-foreground font-medium">Connect Test Leads</h4>
                  <p className="text-foreground text-sm">Line probe to live terminal, earth probe to earth terminal</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="w-8 h-8 bg-elec-yellow text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                <div>
                  <h4 className="text-foreground font-medium">Perform Test</h4>
                  <p className="text-foreground text-sm">Press test button and wait for stable reading</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="w-8 h-8 bg-elec-yellow text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">5</span>
                <div>
                  <h4 className="text-foreground font-medium">Record and Compare</h4>
                  <p className="text-foreground text-sm">Note actual value and compare to BS7671 maximum for the protective device</p>
                </div>
              </li>
            </ol>
          </div>
        </div>

        {/* Interpreting Results */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Interpreting Test Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
              <CheckCircle className="h-6 w-6 text-green-400 mb-3" />
              <h4 className="text-green-200 font-medium mb-2">Acceptable Results</h4>
              <ul className="text-foreground text-sm space-y-1">
                <li>• Well below BS7671 maximum</li>
                <li>• Consistent across similar circuits</li>
                <li>• Allow for temperature effects</li>
                <li>• Document actual values</li>
              </ul>
            </div>
            
            <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
              <AlertTriangle className="h-6 w-6 text-yellow-400 mb-3" />
              <h4 className="text-yellow-200 font-medium mb-2">Borderline Results</h4>
              <ul className="text-foreground text-sm space-y-1">
                <li>• Close to maximum limits</li>
                <li>• Consider conductor heating</li>
                <li>• May need improvement</li>
                <li>• Monitor on future tests</li>
              </ul>
            </div>
            
            <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
              <AlertTriangle className="h-6 w-6 text-red-400 mb-3" />
              <h4 className="text-red-200 font-medium mb-2">Unacceptable Results</h4>
              <ul className="text-foreground text-sm space-y-1">
                <li>• Exceed BS7671 maximums</li>
                <li>• Investigation required</li>
                <li>• No certificate until fixed</li>
                <li>• Consider RCD backup protection</li>
              </ul>
            </div>
          </div>
        </div>

        </CardContent>
      </Card>
    </div>
  );
};