import { Wrench, CheckCircle, AlertTriangle, Settings, Shield, Eye, Battery, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const TestEquipmentPractical = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="flex items-center gap-2 text-foreground text-lg sm:text-xl">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          Practical Guidance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0">
        
        {/* Pre-Test Setup Procedure */}
        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold text-foreground">Pre-Test Setup Procedure</h3>
          <div className="bg-[#323232] rounded-lg p-3 sm:p-4">
            <div className="space-y-3 sm:space-y-4">
              
              <div className="flex gap-3 sm:gap-4">
                <span className="w-7 h-7 sm:w-8 sm:h-8 bg-elec-yellow text-black rounded-full flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0">1</span>
                <div>
                  <h4 className="text-foreground font-medium text-sm sm:text-base">Equipment Inspection</h4>
                  <p className="text-foreground text-xs sm:text-sm mb-2">Perform comprehensive visual and functional checks</p>
                  <ul className="text-foreground text-xs space-y-1">
                    <li>• Check equipment exterior for damage</li>
                    <li>• Verify all controls and displays function correctly</li>
                    <li>• Confirm battery level is adequate for testing</li>
                    <li>• Check calibration certificate validity</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="w-8 h-8 bg-elec-yellow text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                <div>
                  <h4 className="text-foreground font-medium">Test Lead Verification</h4>
                  <p className="text-foreground text-sm mb-2">Ensure test leads are safe and accurate</p>
                  <ul className="text-foreground text-xs space-y-1">
                    <li>• Inspect lead insulation for damage or wear</li>
                    <li>• Test continuity through each lead</li>
                    <li>• Verify probe tips are clean and undamaged</li>
                    <li>• Check connector integrity and security</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="w-8 h-8 bg-elec-yellow text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                <div>
                  <h4 className="text-foreground font-medium">Reference Standard Check</h4>
                  <p className="text-foreground text-sm mb-2">Verify accuracy using known references</p>
                  <ul className="text-foreground text-xs space-y-1">
                    <li>• Test against calibrated reference resistor</li>
                    <li>• Verify voltage measurement accuracy</li>
                    <li>• Check insulation resistance function</li>
                    <li>• Document verification results</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="w-8 h-8 bg-elec-yellow text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                <div>
                  <h4 className="text-foreground font-medium">Environmental Assessment</h4>
                  <p className="text-foreground text-sm mb-2">Record conditions that may affect measurements</p>
                  <ul className="text-foreground text-xs space-y-1">
                    <li>• Measure and record ambient temperature</li>
                    <li>• Note humidity levels if significant</li>
                    <li>• Identify potential EMI sources</li>
                    <li>• Ensure adequate lighting for safe working</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Test Mode Configuration */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Test Mode Configuration</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
            
            <div className="bg-[#323232] rounded-lg p-3 sm:p-4">
              <h4 className="text-foreground font-medium mb-3 flex items-center gap-2 text-sm sm:text-base">
                <Settings className="h-5 w-5 text-elec-yellow" />
                Loop Impedance Testing
              </h4>
              <div className="space-y-3">
                <ul className="text-foreground text-xs sm:text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Select appropriate test mode (standard or non-trip)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Set correct nominal voltage for system</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Configure temperature compensation if available</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Verify measurement range is appropriate</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-[#323232] rounded-lg p-3 sm:p-4">
              <h4 className="text-foreground font-medium mb-3 flex items-center gap-2 text-sm sm:text-base">
                <Target className="h-5 w-5 text-elec-yellow" />
                Insulation Resistance Testing
              </h4>
              <div className="space-y-3">
                <ul className="text-foreground text-xs sm:text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Select appropriate test voltage (250V, 500V, 1000V)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Set test duration for stable reading</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Configure auto-discharge function</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Verify circuit isolation before testing</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Safety Protocols */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Safety Protocols for Live Testing</h3>
          
          <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4 space-y-4">
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-red-400" />
              <h4 className="text-red-200 font-medium">Critical Safety Procedures</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="text-red-200 text-sm font-medium mb-2">Before Testing:</h5>
                <ul className="text-foreground text-xs space-y-1">
                  <li>• Confirm voltage presence using proved detector</li>
                  <li>• Identify all energy sources and isolation points</li>
                  <li>• Establish exclusion zones around work area</li>
                  <li>• Brief all personnel on emergency procedures</li>
                  <li>• Ensure rescue equipment is readily available</li>
                </ul>
              </div>
              <div>
                <h5 className="text-red-200 text-sm font-medium mb-2">During Testing:</h5>
                <ul className="text-foreground text-xs space-y-1">
                  <li>• Maintain safe working distances</li>
                  <li>• Use only one hand for probe connections</li>
                  <li>• Keep body clear of potential fault paths</li>
                  <li>• Monitor for signs of equipment distress</li>
                  <li>• Be prepared for immediate isolation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Troubleshooting Common Issues */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Troubleshooting Common Issues</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
            
            <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-3 sm:p-4">
              <h4 className="text-yellow-200 font-medium mb-3 flex items-center gap-2 text-sm sm:text-base">
                <AlertTriangle className="h-5 w-5" />
                Unstable Readings
              </h4>
              <div className="space-y-2">
                <p className="text-foreground text-xs sm:text-sm">When measurements fluctuate significantly:</p>
                <ul className="text-foreground text-xs space-y-1">
                  <li>• Check test lead connections for security</li>
                  <li>• Clean contact points to remove oxidation</li>
                  <li>• Verify supply voltage stability</li>
                  <li>• Check for loose connections in circuit</li>
                  <li>• Allow equipment warm-up time</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-3 sm:p-4">
              <h4 className="text-blue-200 font-medium mb-3 flex items-center gap-2 text-sm sm:text-base">
                <Eye className="h-5 w-5" />
                High Readings
              </h4>
              <div className="space-y-2">
                <p className="text-foreground text-xs sm:text-sm">When impedance readings are higher than expected:</p>
                <ul className="text-foreground text-xs space-y-1">
                  <li>• Verify correct circuit identification</li>
                  <li>• Check for open circuit conditions</li>
                  <li>• Inspect for corroded connections</li>
                  <li>• Consider parallel path disconnection</li>
                  <li>• Review cable route and terminations</li>
                </ul>
              </div>
            </div>

            <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-3 sm:p-4">
              <h4 className="text-green-200 font-medium mb-3 flex items-center gap-2 text-sm sm:text-base">
                <Battery className="h-5 w-5" />
                Equipment Malfunction
              </h4>
              <div className="space-y-2">
                <p className="text-foreground text-xs sm:text-sm">When equipment fails to operate correctly:</p>
                <ul className="text-foreground text-xs space-y-1">
                  <li>• Check battery voltage and connections</li>
                  <li>• Verify correct test lead connection</li>
                  <li>• Reset equipment to default settings</li>
                  <li>• Consult manufacturer troubleshooting guide</li>
                  <li>• Use backup equipment if available</li>
                </ul>
              </div>
            </div>

            <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-3 sm:p-4">
              <h4 className="text-purple-200 font-medium mb-3 flex items-center gap-2 text-sm sm:text-base">
                <Settings className="h-5 w-5" />
                Calibration Errors
              </h4>
              <div className="space-y-2">
                <p className="text-foreground text-xs sm:text-sm">When reference checks fail:</p>
                <ul className="text-foreground text-xs space-y-1">
                  <li>• Verify reference standard is within tolerance</li>
                  <li>• Check ambient temperature effects</li>
                  <li>• Repeat measurement with different leads</li>
                  <li>• Schedule recalibration if required</li>
                  <li>• Document deviation and take corrective action</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Environmental Considerations */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Environmental Adaptation Strategies</h3>
          
          <div className="bg-[#323232] rounded-lg p-4 space-y-4">
            <h4 className="text-foreground font-medium">Temperature Compensation Techniques</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-600/10 border border-blue-600/20 rounded p-3">
                <h5 className="text-blue-200 text-sm font-medium mb-2">Cold Conditions</h5>
                <ul className="text-foreground text-xs space-y-1">
                  <li>• Allow equipment warm-up time</li>
                  <li>• Protect batteries from cold</li>
                  <li>• Consider temperature correction factors</li>
                  <li>• Use heated storage between tests</li>
                </ul>
              </div>
              
              <div className="bg-red-600/10 border border-red-600/20 rounded p-3">
                <h5 className="text-red-200 text-sm font-medium mb-2">Hot Conditions</h5>
                <ul className="text-foreground text-xs space-y-1">
                  <li>• Provide shade for equipment</li>
                  <li>• Monitor for overheating warnings</li>
                  <li>• Apply conductor temperature corrections</li>
                  <li>• Schedule testing during cooler periods</li>
                </ul>
              </div>
              
              <div className="bg-green-600/10 border border-green-600/20 rounded p-3">
                <h5 className="text-green-200 text-sm font-medium mb-2">High Humidity</h5>
                <ul className="text-foreground text-xs space-y-1">
                  <li>• Clean and dry connection points</li>
                  <li>• Allow stabilisation time</li>
                  <li>• Consider reduced insulation values</li>
                  <li>• Protect equipment from moisture</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Best Practice Checklist */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Best Practice Checklist</h3>
          <div className="bg-elec-yellow/10 border border-elec-yellow/20 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-elec-yellow font-medium mb-2">Setup Excellence</h4>
                <ul className="text-foreground text-sm space-y-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    Equipment inspection completed
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    Calibration status verified
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    Test leads checked and secure
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    Environmental conditions noted
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-elec-yellow font-medium mb-2">Safety Assurance</h4>
                <ul className="text-foreground text-sm space-y-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    PPE appropriate for task
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    Work area secured
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    Emergency procedures known
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    Communication established
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};