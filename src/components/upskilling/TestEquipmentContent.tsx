import { BookOpen, Shield, AlertTriangle, Settings, CheckCircle, Cable, Eye, Zap, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const TestEquipmentContent = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="flex items-center gap-2 text-foreground text-lg sm:text-xl">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Core Content
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0">
        
        {/* GS38 Compliance Requirements */}
        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold text-foreground">GS38 Compliance Requirements</h3>
          <div className="bg-[#323232] rounded-lg p-3 sm:p-4 space-y-3">
            <p className="text-foreground leading-relaxed text-sm sm:text-base">
              Health and Safety Executive Guidance Note GS38 <strong>sets mandatory standards</strong> for electrical 
              test equipment used on systems operating above 50V AC. Compliance isn't optional—it's a legal requirement.
            </p>
            <div className="bg-red-600/10 border border-red-600/20 rounded p-3 sm:p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-red-200 font-medium mb-2 text-sm sm:text-base">Legal Requirement</h4>
                  <p className="text-foreground text-xs sm:text-sm">
                    Using non-compliant test equipment can result in serious injury, prosecution under 
                    health and safety legislation, and invalidation of insurance claims.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Test Lead Requirements */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Test Lead Safety Requirements</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
            
            <div className="bg-[#323232] rounded-lg p-3 sm:p-4">
              <h4 className="text-foreground font-medium mb-3 flex items-center gap-2 text-sm sm:text-base">
                <Shield className="h-5 w-5 text-elec-yellow" />
                Probe Specifications
              </h4>
              <ul className="text-foreground text-xs sm:text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Maximum 2mm exposed metal tip
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Finger barriers to prevent accidental contact
                </li>
<li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Fused probes for overcurrent protection
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Insulated shrouds covering connections
                </li>
              </ul>
            </div>

            <div className="bg-[#323232] rounded-lg p-3 sm:p-4">
              <h4 className="text-foreground font-medium mb-3 flex items-center gap-2 text-sm sm:text-base">
                <Cable className="h-5 w-5 text-elec-yellow" />
                Lead Specifications
              </h4>
              <ul className="text-foreground text-xs sm:text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Adequate current rating for test type
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Double insulation throughout length
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Flexible and resistant to damage
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Clear identification and markings
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-red-600/10 border border-red-600/20 rounded p-4">
            <h4 className="text-red-200 font-medium mb-3">Common Non-Compliant Equipment</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-foreground text-sm mb-2">Avoid these dangerous items:</p>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Bare metal crocodile clips</li>
                  <li>• Long exposed probe tips</li>
                  <li>• Unfused test leads</li>
                  <li>• Damaged or cracked insulation</li>
                </ul>
              </div>
              <div>
                <p className="text-foreground text-sm mb-2">Consequences of use:</p>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Electric shock risk</li>
                  <li>• Arc flash incidents</li>
                  <li>• Legal liability</li>
                  <li>• Insurance void</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Equipment Category Ratings */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Equipment Category Ratings</h3>
          <div className="bg-[#323232] rounded-lg p-4 space-y-4">
            <p className="text-foreground">
              Test equipment must be rated for the electrical environment where it will be used. 
              Category ratings define the level of transient voltage protection.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-600/10 border border-blue-600/20 rounded p-4">
                <h4 className="text-blue-200 font-medium mb-3">CAT III - Distribution Level</h4>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Fixed installations and distribution boards</li>
                  <li>• Building wiring and consumer units</li>
                  <li>• Industrial equipment and motors</li>
                  <li>• Minimum rating for mains voltage testing</li>
                </ul>
              </div>
              
              <div className="bg-green-600/10 border border-green-600/20 rounded p-4">
                <h4 className="text-green-200 font-medium mb-3">CAT IV - Utility Level</h4>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Overhead lines and cable systems</li>
                  <li>• Primary equipment and meters</li>
                  <li>• Service entrance equipment</li>
                  <li>• Required for origin testing</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-600/10 border border-yellow-600/20 rounded p-3">
              <p className="text-foreground text-sm">
                <strong>Important:</strong> Never use lower category equipment in higher category environments. 
                The equipment may not survive transient overvoltages, potentially causing injury.
              </p>
            </div>
          </div>
        </div>

        {/* Pre-Testing Equipment Checks */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Pre-Testing Equipment Checks</h3>
          <div className="bg-[#323232] rounded-lg p-4">
            <div className="space-y-4">
              
              <div className="bg-blue-600/10 border border-blue-600/20 rounded p-4">
                <h4 className="text-blue-200 font-medium mb-3 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Visual Inspection Checklist
                </h4>
                <ol className="space-y-2 text-foreground text-sm">
                  <li className="flex gap-3">
                    <span className="w-6 h-6 bg-elec-yellow text-black rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                    Check test leads for cuts, cracks, or damage to insulation
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 bg-elec-yellow text-black rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                    Verify probe tips are not bent, damaged, or excessively worn
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 bg-elec-yellow text-black rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                    Ensure finger barriers are present and secure
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 bg-elec-yellow text-black rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">4</span>
                    Check connectors are tight and not corroded
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 bg-elec-yellow text-black rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">5</span>
                    Verify tester display is clear and functioning
                  </li>
                </ol>
              </div>

              <div className="bg-green-600/10 border border-green-600/20 rounded p-4">
                <h4 className="text-green-200 font-medium mb-3 flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Calibration Verification
                </h4>
                <ul className="text-foreground text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Check calibration certificate date (must be within 12 months)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Verify calibration was performed by accredited laboratory
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Test equipment function using a proving unit
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    Document calibration status on test certificates
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Safe Testing Procedures */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Safe Testing Procedures</h3>
          <div className="space-y-4">
            
            <div className="bg-[#323232] rounded-lg p-4">
              <h4 className="text-foreground font-medium mb-3 flex items-center gap-2">
                <Eye className="h-5 w-5 text-elec-yellow" />
                Environmental Assessment
              </h4>
              <div className="space-y-3">
                <p className="text-foreground text-sm sm:text-base">
                  Before beginning any live testing, assess the working environment for additional hazards:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-yellow-600/10 border border-yellow-600/20 rounded p-3">
                    <p className="text-foreground text-sm sm:text-base mb-2">Environmental factors:</p>
                    <ul className="text-foreground text-xs sm:text-sm space-y-1">
                      <li>• Adequate lighting and workspace</li>
                      <li>• Dry conditions (moisture increases risk)</li>
                      <li>• Absence of flammable materials</li>
                      <li>• Clear escape routes</li>
                    </ul>
                  </div>
                  <div className="bg-blue-600/10 border border-blue-600/20 rounded p-3">
                    <p className="text-foreground text-sm sm:text-base mb-2">Working at height:</p>
                    <ul className="text-foreground text-xs sm:text-sm space-y-1">
                      <li>• Secure three points of contact</li>
                      <li>• Use tool lanyards for equipment</li>
                      <li>• Avoid overstretching</li>
                      <li>• Consider assistant for heavy equipment</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#323232] rounded-lg p-4">
              <h4 className="text-foreground font-medium mb-3 flex items-center gap-2">
                <Target className="h-5 w-5 text-elec-yellow" />
                Step-by-Step Safety Protocol
              </h4>
              <ol className="space-y-3">
                <li className="flex gap-4">
                  <span className="w-8 h-8 bg-elec-yellow text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                  <div>
                    <h5 className="text-foreground font-medium">Prove Tester Operation</h5>
                    <p className="text-foreground text-sm sm:text-base">Test on known live source to verify equipment function</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="w-8 h-8 bg-elec-yellow text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                  <div>
                    <h5 className="text-foreground font-medium">Identify Circuit Details</h5>
                    <p className="text-foreground text-sm sm:text-base">Confirm circuit type, voltage, and protective device ratings</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="w-8 h-8 bg-elec-yellow text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                  <div>
                    <h5 className="text-foreground font-medium">Select Appropriate Test Mode</h5>
                    <p className="text-foreground text-sm sm:text-base">Use non-trip mode for RCD circuits, standard for others</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="w-8 h-8 bg-elec-yellow text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                  <div>
                    <h5 className="text-foreground font-medium">Apply Test Safely</h5>
                    <p className="text-foreground text-sm sm:text-base">Maintain safe working distance, avoid parallel paths</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="w-8 h-8 bg-elec-yellow text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">5</span>
                  <div>
                    <h5 className="text-foreground font-medium">Prove Tester Again</h5>
                    <p className="text-foreground text-sm sm:text-base">Re-test on known live source to confirm continued operation</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Personal Protective Equipment */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Personal Protective Equipment (PPE)</h3>
          <div className="bg-[#323232] rounded-lg p-4 space-y-4">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-600/10 border border-green-600/20 rounded p-4">
                <h4 className="text-green-200 font-medium mb-3">Essential PPE</h4>
                <ul className="text-foreground text-sm sm:text-base space-y-1">
                  <li>• Safety glasses or face shield</li>
                  <li>• Arc-rated clothing where required</li>
                  <li>• Insulated gloves for confined spaces</li>
                  <li>• Safety footwear with electrical rating</li>
                </ul>
              </div>
              
              <div className="bg-blue-600/10 border border-blue-600/20 rounded p-4">
                <h4 className="text-blue-200 font-medium mb-3">Additional Equipment</h4>
                <ul className="text-foreground text-sm sm:text-base space-y-1">
                  <li>• Insulating mats for confined areas</li>
                  <li>• Barriers to prevent accidental contact</li>
                  <li>• Warning signs and barriers</li>
                  <li>• First aid kit accessible</li>
                </ul>
              </div>
            </div>

            <div className="bg-red-600/10 border border-red-600/20 rounded p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-red-200 font-medium mb-2">Arc Flash Considerations</h4>
                  <p className="text-foreground text-sm sm:text-base leading-relaxed">
                    High-energy electrical systems can produce arc flash incidents during testing. 
                    Consider arc-rated PPE for high-fault-current installations and ensure appropriate 
                    working distances are maintained.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Procedures */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Emergency Procedures</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="bg-[#323232] rounded-lg p-4">
              <h4 className="text-red-200 font-medium mb-3">Electric Shock Response</h4>
              <ol className="text-gray-300 text-sm space-y-1">
                <li>1. Switch off power immediately if possible</li>
                <li>2. Do not touch the victim if still in contact</li>
                <li>3. Use insulated tools to separate if needed</li>
                <li>4. Call emergency services immediately</li>
                <li>5. Begin CPR if trained and necessary</li>
              </ol>
            </div>

            <div className="bg-[#323232] rounded-lg p-4">
              <h4 className="text-orange-200 font-medium mb-3">Equipment Failure</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Immediately stop testing</li>
                <li>• Secure the area</li>
                <li>• Remove failed equipment from service</li>
                <li>• Report incident and investigate cause</li>
                <li>• Do not continue without replacement</li>
              </ul>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};