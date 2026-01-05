import { Wrench, CheckCircle, AlertTriangle, Eye, Shield, Target, Settings, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const RCDFundamentalsPractical = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          Practical Guidance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* RCD Selection Process */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">RCD Selection Process</h3>
          <div className="bg-[#323232] rounded-lg p-4">
            <div className="space-y-4">
              
              <div className="flex gap-4">
                <span className="w-8 h-8 bg-elec-yellow text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                <div>
                  <h4 className="text-foreground font-medium">Identify Protection Requirements</h4>
                  <p className="text-sm sm:text-base text-foreground mb-2">Determine what protection is needed based on application</p>
                  <ul className="text-xs sm:text-sm text-foreground space-y-1">
                    <li>• Personal protection: 30mA required</li>
                    <li>• Fire protection: 100mA or 300mA</li>
                    <li>• Equipment protection: 100mA to 300mA</li>
                    <li>• Regulatory compliance: Check BS 7671 requirements</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="w-8 h-8 bg-elec-yellow text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                <div>
                  <h4 className="text-foreground font-medium">Assess Installation Environment</h4>
                  <p className="text-sm sm:text-base text-foreground mb-2">Consider environmental factors affecting RCD performance</p>
                  <ul className="text-xs sm:text-sm text-foreground space-y-1">
                    <li>• Connected load types (electronic vs. resistive)</li>
                    <li>• Ambient temperature ranges</li>
                    <li>• Humidity and contamination levels</li>
                    <li>• Electromagnetic interference sources</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="w-8 h-8 bg-elec-yellow text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                <div>
                  <h4 className="text-foreground font-medium">Calculate Current Ratings</h4>
                  <p className="text-sm sm:text-base text-foreground mb-2">Ensure RCD can handle the expected load currents</p>
                  <ul className="text-xs sm:text-sm text-foreground space-y-1">
                    <li>• Normal load current requirements</li>
                    <li>• Inrush current considerations</li>
                    <li>• Diversity factors for multiple loads</li>
                    <li>• Future load expansion requirements</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="w-8 h-8 bg-elec-yellow text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                <div>
                  <h4 className="text-foreground font-medium">Verify Coordination</h4>
                  <p className="text-sm sm:text-base text-foreground mb-2">Ensure proper discrimination between protection devices</p>
                  <ul className="text-xs sm:text-sm text-foreground space-y-1">
                    <li>• Time-graded coordination with upstream RCDs</li>
                    <li>• Selectivity ratios (typically 3:1 minimum)</li>
                    <li>• Backup protection arrangements</li>
                    <li>• Testing and maintenance accessibility</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Installation Best Practices */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Installation Best Practices</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="bg-[#323232] rounded-lg p-4">
              <h4 className="text-foreground font-medium mb-3 flex items-center gap-2">
                <Settings className="h-5 w-5 text-elec-yellow" />
                Physical Installation
              </h4>
              <div className="space-y-3">
                <ul className="text-sm text-foreground space-y-2 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Mount in accessible location for testing and maintenance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Ensure adequate ventilation around device</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Protect from mechanical damage and contamination</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Verify correct orientation per manufacturer instructions</span>
                  </li>
                </ul>
                ...
                <ul className="text-sm text-foreground space-y-2 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Ensure tight, corrosion-free connections</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Use correct conductor sizes for rated current</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Verify phase sequence and neutral connections</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Test insulation resistance before energising</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Common Installation Issues */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Common Installation Issues and Solutions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
              <h4 className="text-red-200 font-medium mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Nuisance Tripping
              </h4>
              <div className="space-y-2">
                <p className="text-sm sm:text-base text-foreground">When RCDs trip unexpectedly during normal operation:</p>
                <div className="space-y-2">
                  <h5 className="text-red-200 text-sm font-medium">Common Causes:</h5>
                  <ul className="text-xs sm:text-sm text-foreground space-y-1">
                    <li>• Neutral-earth insulation breakdown</li>
                    <li>• Multiple earth paths</li>
                    <li>• Electronic equipment interference</li>
                    <li>• Moisture ingress in circuits</li>
                  </ul>
                  <h5 className="text-red-200 text-sm font-medium">Solutions:</h5>
                  <ul className="text-xs sm:text-sm text-foreground space-y-1">
                    <li>• Check insulation resistance of all circuits</li>
                    <li>• Verify neutral-earth separation</li>
                    <li>• Consider time-delayed RCDs</li>
                    <li>• Install surge protection devices</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
              <h4 className="text-blue-200 font-medium mb-3 flex items-center gap-2">
                <Target className="h-5 w-5" />
                Failure to Trip
              </h4>
              <div className="space-y-2">
                <p className="text-sm sm:text-base text-foreground">When RCDs fail to operate during fault conditions:</p>
                <div className="space-y-2">
                  <h5 className="text-blue-200 text-sm font-medium">Possible Causes:</h5>
                  <ul className="text-xs sm:text-sm text-foreground space-y-1">
                    <li>• Defective RCD internal components</li>
                    <li>• Incorrect RCD type for load</li>
                    <li>• High-frequency interference</li>
                    <li>• DC current component effects</li>
                  </ul>
                  <h5 className="text-blue-200 text-sm font-medium">Solutions:</h5>
                  <ul className="text-xs sm:text-sm text-foreground space-y-1">
                    <li>• Perform comprehensive RCD testing</li>
                    <li>• Verify RCD type compatibility</li>
                    <li>• Check for DC current sources</li>
                    <li>• Replace defective devices</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testing Verification */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Post-Installation Verification</h3>
          
          <div className="bg-[#323232] rounded-lg p-4 space-y-4">
            <h4 className="text-foreground font-medium">Essential Tests</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-600/10 border border-green-600/20 rounded p-3">
                <h5 className="text-green-200 text-sm font-medium mb-2">Functional Test</h5>
                <ul className="text-xs sm:text-sm text-foreground space-y-1">
                  <li>• Test button operation</li>
                  <li>• Verify manual reset function</li>
                  <li>• Check contact operation</li>
                  <li>• Confirm visual indicators</li>
                </ul>
              </div>
              
              <div className="bg-blue-600/10 border border-blue-600/20 rounded p-3">
                <h5 className="text-blue-200 text-sm font-medium mb-2">Trip Time Testing</h5>
                <ul className="text-xs sm:text-sm text-foreground space-y-1">
                  <li>• Test at ½ × IΔn (should not trip)</li>
                  <li>• Test at IΔn (should trip ≤300ms)</li>
                  <li>• Test at 5 × IΔn (should trip ≤40ms)</li>
                  <li>• Record actual trip times</li>
                </ul>
              </div>
              
              <div className="bg-yellow-600/10 border border-yellow-600/20 rounded p-3">
                <h5 className="text-yellow-200 text-sm font-medium mb-2">Polarity Verification</h5>
                <ul className="text-xs sm:text-sm text-foreground space-y-1">
                  <li>• Confirm correct phase/neutral connections</li>
                  <li>• Verify earth continuity</li>
                  <li>• Check installation polarity</li>
                  <li>• Test with realistic loads</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Real-World Scenarios */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Real-World Application Scenarios</h3>
          
          <div className="bg-[#323232] rounded-lg p-4 space-y-4">
            <h4 className="text-foreground font-medium">Scenario 1: Domestic Consumer Unit Upgrade</h4>
            <div className="bg-blue-600/10 border border-blue-600/20 rounded p-3">
              <p className="text-sm sm:text-base text-foreground mb-2">
                <strong>Situation:</strong> Replacing old consumer unit in 1970s house with modern RCD protection
              </p>
              <div className="space-y-2">
                <p className="text-blue-200 text-sm"><strong>Key Considerations:</strong></p>
                <ul className="text-xs sm:text-sm text-foreground space-y-1">
                  <li>• Existing wiring may have reduced insulation resistance</li>
                  <li>• 30mA RCD required for all socket outlets</li>
                  <li>• Consider split-load design for lighting circuits</li>
                  <li>• Test all circuits before connecting to RCDs</li>
                  <li>• Plan for minimal disruption during changeover</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-[#323232] rounded-lg p-4 space-y-4">
            <h4 className="text-foreground font-medium">Scenario 2: Commercial Kitchen Installation</h4>
            <div className="bg-green-600/10 border border-green-600/20 rounded p-3">
              <p className="text-sm sm:text-base text-foreground mb-2">
                <strong>Situation:</strong> Installing RCD protection in commercial kitchen with high-power equipment
              </p>
              <div className="space-y-2">
                <p className="text-green-200 text-sm"><strong>Key Considerations:</strong></p>
                <ul className="text-xs sm:text-sm text-foreground space-y-1">
                  <li>• High ambient temperature affects RCD performance</li>
                  <li>• Steam and moisture create challenging environment</li>
                  <li>• Large motor starting currents may cause nuisance tripping</li>
                  <li>• Consider time-delayed RCDs for coordination</li>
                  <li>• IP ratings important for equipment protection</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Maintenance Recommendations */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Maintenance Recommendations</h3>
          <div className="bg-elec-yellow/10 border border-elec-yellow/20 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-elec-yellow font-medium mb-2">Regular Maintenance</h4>
                <ul className="text-sm sm:text-base text-foreground space-y-1">
                  <li>• Monthly test button operation</li>
                  <li>• Annual trip time testing</li>
                  <li>• Visual inspection for damage</li>
                  <li>• Check connection tightness</li>
                  <li>• Verify label information remains legible</li>
                </ul>
              </div>
              <div>
                <h4 className="text-elec-yellow font-medium mb-2">Performance Monitoring</h4>
                <ul className="text-sm sm:text-base text-foreground space-y-1">
                  <li>• Track trip time trends over time</li>
                  <li>• Record nuisance trip incidents</li>
                  <li>• Monitor environmental conditions</li>
                  <li>• Update maintenance schedules based on usage</li>
                  <li>• Replace devices showing performance degradation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};