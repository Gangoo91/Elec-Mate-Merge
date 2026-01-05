import { BookOpen, Shield, CheckCircle, AlertTriangle, Target, TrendingUp, Lightbulb, Wrench, Zap, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const RCDFundamentalsContent = () => {
  return (
    <div className="space-y-8">
      {/* Enhanced Introduction */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Lightbulb className="h-5 w-5 text-elec-yellow" />
            Introduction to RCD Fundamentals
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm sm:text-base lg:text-lg text-foreground leading-relaxed">
            Residual Current Devices (RCDs) are among the most important safety devices in modern electrical 
            installations. They provide protection against electric shock and electrical fires by monitoring 
            the balance of current flowing in live and neutral conductors. When an imbalance is detected, 
            indicating current leaking to earth, the RCD disconnects the supply within milliseconds.
          </p>
          <p className="text-sm sm:text-base lg:text-lg text-foreground leading-relaxed">
            Understanding RCD operation, selection, and application is fundamental to electrical safety. 
            This section provides comprehensive coverage of RCD principles, from basic operation through 
            to advanced applications and regulatory requirements, ensuring you can specify, install, 
            and test RCDs with confidence.
          </p>
          <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
            <h4 className="text-blue-200 font-medium mb-2">Why This Matters</h4>
              <p className="text-sm sm:text-base text-foreground">
                RCDs save lives and prevent fires. According to the Institution of Engineering and Technology, 
                RCDs prevent approximately 95% of electrocution incidents in properly protected circuits. 
                Understanding their correct application is essential for electrical safety.
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
          <p className="text-sm sm:text-base text-foreground mb-4">Upon completion of this section, you will be able to:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm sm:text-base text-foreground">
                  Explain the fundamental operating principles of RCDs and their safety functions
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm sm:text-base text-foreground">
                  Identify different RCD sensitivity ratings and their appropriate applications
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm sm:text-base text-foreground">
                  Apply BS 7671 regulations for RCD selection and installation requirements
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm sm:text-base text-foreground">
                  Understand the relationship between earth fault current and shock protection
                </p>
              </div>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm sm:text-base text-foreground">
                  Recognise the limitations and failure modes of RCD protection
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm sm:text-base text-foreground">
                  Calculate earth fault current levels and RCD coordination requirements
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm sm:text-base text-foreground">
                  Implement effective RCD maintenance and testing procedures
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm sm:text-base text-foreground">
                  Troubleshoot common RCD installation and operational issues
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
          
          {/* RCD Operating Principles */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">RCD Operating Principles</h3>
            <div className="bg-[#323232] rounded-lg p-4 space-y-4">
              <div className="flex items-start gap-3">
                <Zap className="h-6 w-6 text-elec-yellow mt-1 flex-shrink-0" />
                <div className="space-y-3">
                  <p className="text-sm sm:text-base text-foreground leading-relaxed">
                    RCDs operate on Kirchhoff's current law: the algebraic sum of currents entering 
                    and leaving a circuit must equal zero. Under normal conditions, current flowing 
                    through the live conductor equals current returning through the neutral conductor.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-600/10 border border-green-600/20 rounded p-4">
                      <h4 className="text-green-200 font-medium mb-3">Normal Operation</h4>
                      <ul className="text-sm sm:text-base text-foreground space-y-1">
                        <li>• IL (live current) = IN (neutral current)</li>
                        <li>• Residual current = 0</li>
                        <li>• No magnetic flux in toroidal core</li>
                        <li>• No induced voltage in detection winding</li>
                        <li>• Contacts remain closed</li>
                      </ul>
                    </div>
                    
                    <div className="bg-red-600/10 border border-red-600/20 rounded p-4">
                      <h4 className="text-red-200 font-medium mb-3">Fault Condition</h4>
                      <ul className="text-sm sm:text-base text-foreground space-y-1">
                        <li>• Earth fault current flows (IE)</li>
                        <li>• IL ≠ IN (current imbalance)</li>
                        <li>• Magnetic flux created in core</li>
                        <li>• Voltage induced in detection winding</li>
                        <li>• Trip mechanism activated</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Components */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">RCD Technical Components</h3>
            <div className="bg-[#323232] rounded-lg p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                <div className="bg-blue-600/10 border border-blue-600/20 rounded p-4">
                  <h4 className="text-blue-200 font-medium mb-3">Toroidal Transformer</h4>
                  <ul className="text-sm sm:text-base text-foreground space-y-1">
                    <li>• Core material: High permeability ferrite</li>
                    <li>• Function: Detects current imbalance</li>
                    <li>• Primary: Live and neutral conductors</li>
                    <li>• Secondary: Detection winding</li>
                  </ul>
                </div>
                
                <div className="bg-green-600/10 border border-green-600/20 rounded p-4">
                  <h4 className="text-green-200 font-medium mb-3">Detection Circuit</h4>
                  <ul className="text-sm sm:text-base text-foreground space-y-1">
                    <li>• Amplifies induced voltage signal</li>
                    <li>• Filters unwanted frequencies</li>
                    <li>• Compares against trip threshold</li>
                    <li>• Activates trip mechanism</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-600/10 border border-yellow-600/20 rounded p-4">
                  <h4 className="text-yellow-200 font-medium mb-3">Trip Mechanism</h4>
                  <ul className="text-sm sm:text-base text-foreground space-y-1">
                    <li>• Electromagnetic or electronic</li>
                    <li>• Opens main contacts rapidly</li>
                    <li>• Includes arc extinction system</li>
                    <li>• Manual reset mechanism</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Sensitivity Ratings and Applications */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">RCD Sensitivity Ratings and Applications</h3>
            <div className="bg-[#323232] rounded-lg p-4 space-y-4">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-600/10 border border-green-600/20 rounded p-4">
                  <h4 className="text-green-200 font-medium mb-3">30mA RCDs - Personal Protection</h4>
                  <div className="space-y-3">
                    <p className="text-sm sm:text-base text-foreground">
                      Primary function is preventing dangerous electric shock by disconnecting supply 
                      before ventricular fibrillation can occur.
                    </p>
                    <div className="space-y-2">
                      <h5 className="text-green-200 text-sm font-medium">Mandatory Applications:</h5>
                      <ul className="text-xs sm:text-sm text-foreground space-y-1">
                        <li>• All socket outlets ≤32A (domestic and commercial)</li>
                        <li>• Bathroom circuits (all types)</li>
                        <li>• Outdoor installations</li>
                        <li>• Mobile equipment up to 32A</li>
                        <li>• Cables concealed in walls ≤50mm depth</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-orange-600/10 border border-orange-600/20 rounded p-4">
                  <h4 className="text-orange-200 font-medium mb-3">100mA RCDs - Fire Protection</h4>
                  <div className="space-y-3">
                    <p className="text-sm sm:text-base text-foreground">
                      Designed to detect earth faults that could cause fires while providing 
                      discrimination with downstream 30mA devices.
                    </p>
                    <div className="space-y-2">
                      <h5 className="text-orange-200 text-sm font-medium">Typical Applications:</h5>
                      <ul className="text-xs sm:text-sm text-foreground space-y-1">
                        <li>• Main incoming protection in consumer units</li>
                        <li>• Distribution board protection</li>
                        <li>• Industrial equipment protection</li>
                        <li>• Fire protection in commercial premises</li>
                        <li>• Coordination with downstream 30mA RCDs</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-600/10 border border-blue-600/20 rounded p-4">
                <h4 className="text-blue-200 font-medium mb-3">300mA RCDs - Equipment Protection</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm sm:text-base text-foreground mb-2">
                      Used for protecting equipment and installations where personal protection 
                      is provided by other means.
                    </p>
                    <h5 className="text-blue-200 text-sm font-medium mb-1">Applications:</h5>
                    <ul className="text-xs sm:text-sm text-foreground space-y-1">
                      <li>• IT equipment protection</li>
                      <li>• Industrial machinery</li>
                      <li>• Motor protection circuits</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-blue-200 text-sm font-medium mb-1">Characteristics:</h5>
                    <ul className="text-xs sm:text-sm text-foreground space-y-1">
                      <li>• Higher sensitivity than MCBs alone</li>
                      <li>• Reduced nuisance tripping</li>
                      <li>• Equipment damage prevention</li>
                      <li>• Coordination with other protection</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BS 7671 Requirements */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">BS 7671 Regulatory Requirements</h3>
            <div className="bg-[#323232] rounded-lg p-4 space-y-4">
              
              <div className="bg-yellow-600/10 border border-yellow-600/20 rounded p-4">
                <h4 className="text-yellow-200 font-medium mb-3">Regulation 411.3.3 - Additional Protection</h4>
                <div className="space-y-3">
                  <p className="text-sm sm:text-base text-foreground">
                    Additional protection by RCD with IΔn ≤ 30mA shall be provided for:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-yellow-200 text-sm font-medium mb-2">Socket Outlet Circuits:</h5>
                      <ul className="text-xs sm:text-sm text-foreground space-y-1">
                        <li>• All socket outlets not exceeding 20A in domestic premises</li>
                        <li>• Socket outlets not exceeding 32A in all other premises</li>
                        <li>• Mobile equipment up to 32A outdoors</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-yellow-200 text-sm font-medium mb-2">Specific Circuits:</h5>
                      <ul className="text-xs sm:text-sm text-foreground space-y-1">
                        <li>• All circuits in bathrooms (zones 0, 1, 2)</li>
                        <li>• Outdoor lighting and power circuits</li>
                        <li>• Swimming pool installations</li>
                        <li>• Agricultural and horticultural premises</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-red-600/10 border border-red-600/20 rounded p-4">
                <h4 className="text-red-200 font-medium mb-3">Regulation 522.6.202 - Cable Protection</h4>
                <div className="space-y-2">
                  <p className="text-sm sm:text-base text-foreground">
                    Cables concealed in walls at a depth less than 50mm from the surface require 
                    additional protection by 30mA RCD unless:
                  </p>
                  <ul className="text-sm text-foreground space-y-1">
                    <li>• The cable incorporates an earthed metallic covering</li>
                    <li>• The cable is mechanically protected sufficient to prevent penetration</li>
                    <li>• The cable is installed in a zone within 150mm of the top of the wall or within 150mm of an angle formed by two walls</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Shock Current Analysis */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Electric Shock Current Analysis</h3>
            <div className="bg-[#323232] rounded-lg p-4 space-y-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-red-400 mt-1 flex-shrink-0" />
                <div className="space-y-3">
                  <p className="text-sm sm:text-base text-foreground leading-relaxed">
                    Understanding the physiological effects of electric current is crucial for 
                    appreciating why 30mA is the standard for personal protection.
                  </p>
                  
                  <div className="bg-red-600/10 border border-red-600/20 rounded p-4">
                    <h4 className="text-red-200 font-medium mb-3">Current Levels and Physiological effects</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-red-200 text-sm font-medium mb-2">Dangerous Levels:</h5>
                        <ul className="text-xs sm:text-sm text-foreground space-y-1">
                          <li>• 50mA+: Ventricular fibrillation possible</li>
                          <li>• 30-50mA: Muscular paralysis</li>
                          <li>• 15-30mA: "Let-go" threshold exceeded</li>
                          <li>• 10-15mA: Muscular control affected</li>
                          <li>• 5-10mA: Painful shock</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-red-200 text-sm font-medium mb-2">30mA RCD Protection:</h5>
                        <ul className="text-xs sm:text-sm text-foreground space-y-1">
                          <li>• Trips before ventricular fibrillation</li>
                          <li>• Response time: ≤300ms at rated current</li>
                          <li>• ≤40ms at 5× rated current (150mA)</li>
                          <li>• Provides margin of safety</li>
                          <li>• Accounts for individual variations</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  );
};