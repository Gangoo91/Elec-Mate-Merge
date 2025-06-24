
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TestTube, CheckCircle, Shield, FileText, Zap, AlertTriangle, BookOpen, Clock } from "lucide-react";

const OverviewSection = () => {
  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray h-full">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <TestTube className="h-5 w-5" />
            Why We Test - Electrical Installation Testing Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            Electrical testing is a legal requirement and essential safety practice that ensures electrical installations 
            are safe, compliant with BS 7671, and fit for purpose. Every electrical installation must be tested before 
            being put into service and periodically thereafter.
          </p>
          
          {/* Legal Requirements */}
          <div className="p-4 border border-red-500/30 rounded-lg bg-red-500/10">
            <h4 className="font-medium text-red-300 mb-3 flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Legal Framework & Compliance
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-red-200">Electricity at Work Regulations 1989</p>
                  <p className="text-xs text-red-300">Legal duty to ensure electrical systems are safe</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-red-200">BS 7671:2018+A2:2022 (18th Edition)</p>
                  <p className="text-xs text-red-300">National standard for electrical installations</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-red-200">Building Regulations Part P</p>
                  <p className="text-xs text-red-300">Notification requirements for domestic work</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-red-200">IET Guidance Note 3</p>
                  <p className="text-xs text-red-300">Inspection and testing guidance</p>
                </div>
              </div>
            </div>
          </div>

          {/* Primary Reasons for Testing */}
          <div>
            <h4 className="font-medium text-elec-yellow mb-3">Primary Reasons for Electrical Testing</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-start gap-3 p-3 border border-gray-600 rounded-lg bg-elec-dark/50">
                <Shield className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h5 className="font-medium text-green-300">Safety Protection</h5>
                  <p className="text-sm text-muted-foreground">Prevent electric shock, fire, and burns by verifying protective measures work correctly</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 border border-gray-600 rounded-lg bg-elec-dark/50">
                <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h5 className="font-medium text-blue-300">Legal Compliance</h5>
                  <p className="text-sm text-muted-foreground">Meet statutory requirements and demonstrate due diligence</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 border border-gray-600 rounded-lg bg-elec-dark/50">
                <FileText className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h5 className="font-medium text-amber-300">Documentation Evidence</h5>
                  <p className="text-sm text-muted-foreground">Provide certificates proving installation compliance and safety</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 border border-gray-600 rounded-lg bg-elec-dark/50">
                <TestTube className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h5 className="font-medium text-purple-300">Quality Verification</h5>
                  <p className="text-sm text-muted-foreground">Confirm proper installation and prevent future failures</p>
                </div>
              </div>
            </div>
          </div>

          {/* Test Sequence - Critical Order */}
          <div className="p-4 border border-elec-yellow/30 rounded-lg bg-elec-yellow/10">
            <h4 className="font-medium text-elec-yellow mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Mandatory Test Sequence (BS 7671 Regulation 643)
            </h4>
            <p className="text-sm text-yellow-200 mb-3">
              Tests must be carried out in the following order to ensure safety and prevent damage to equipment:
            </p>
            <ol className="text-sm text-yellow-100 space-y-2">
              <li className="flex items-start gap-2">
                <span className="bg-elec-yellow text-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</span>
                <div>
                  <span className="font-medium text-red-300">Safe Isolation</span> - Secure isolation, prove dead, lock off and post warning notices
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-elec-yellow text-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</span>
                <div>
                  <span className="font-medium">Continuity of Protective Conductors</span> - Test earth continuity (R1+R2 or separate R1 and R2)
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-elec-yellow text-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</span>
                <div>
                  <span className="font-medium">Continuity of Ring Final Circuit Conductors</span> - Verify ring circuits are complete
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-elec-yellow text-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</span>
                <div>
                  <span className="font-medium">Insulation Resistance</span> - Test between live conductors and earth (minimum 1MΩ at 500V)
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-elec-yellow text-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">5</span>
                <div>
                  <span className="font-medium">Protection by SELV, PELV or Electrical Separation</span> - Where applicable
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-elec-yellow text-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">6</span>
                <div>
                  <span className="font-medium">Protection by Barriers or Enclosures</span> - IP rating verification
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-elec-yellow text-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">7</span>
                <div>
                  <span className="font-medium">Insulation of Non-conducting Floors and Walls</span> - Where applicable
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-elec-yellow text-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">8</span>
                <div>
                  <span className="font-medium">Polarity</span> - Verify correct connections of line, neutral and earth
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-elec-yellow text-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">9</span>
                <div>
                  <span className="font-medium">Earth Electrode Resistance</span> - Where earth electrodes are installed
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-elec-yellow text-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">10</span>
                <div>
                  <span className="font-medium text-orange-300">Earth Fault Loop Impedance (Zs)</span> - Test with supply restored
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-elec-yellow text-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">11</span>
                <div>
                  <span className="font-medium text-orange-300">Additional Protection (RCD Testing)</span> - Test RCD operation and times
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-elec-yellow text-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">12</span>
                <div>
                  <span className="font-medium text-orange-300">Prospective Fault Current</span> - Verify protective device ratings
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-elec-yellow text-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">13</span>
                <div>
                  <span className="font-medium text-orange-300">Check of Phase Sequence</span> - Three-phase installations only
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-elec-yellow text-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">14</span>
                <div>
                  <span className="font-medium text-orange-300">Functional Testing</span> - Test operation of switchgear, controls and safety systems
                </div>
              </li>
            </ol>
            <div className="mt-3 p-2 bg-red-500/20 rounded border border-red-500/30">
              <p className="text-xs text-red-200">
                <AlertTriangle className="h-3 w-3 inline mr-1" />
                <strong>Critical:</strong> Tests 10-14 require the supply to be restored. Ensure all previous tests pass before energising.
              </p>
            </div>
          </div>

          {/* When Testing is Required */}
          <div>
            <h4 className="font-medium text-elec-yellow mb-3">When Testing is Required</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3 border border-blue-500/30 rounded-lg bg-blue-500/10">
                <h5 className="font-medium text-blue-300 mb-2">Initial Verification</h5>
                <ul className="text-sm text-blue-200 space-y-1">
                  <li>• New installations</li>
                  <li>• Additions to existing installations</li>
                  <li>• Alterations to existing circuits</li>
                  <li>• Before first use</li>
                </ul>
              </div>
              
              <div className="p-3 border border-green-500/30 rounded-lg bg-green-500/10">
                <h5 className="font-medium text-green-300 mb-2">Periodic Inspection</h5>
                <ul className="text-sm text-green-200 space-y-1">
                  <li>• Domestic: 10 years (rented: 5 years)</li>
                  <li>• Commercial: 5 years</li>
                  <li>• Industrial: 3 years</li>
                  <li>• Special locations: As specified</li>
                </ul>
              </div>
              
              <div className="p-3 border border-amber-500/30 rounded-lg bg-amber-500/10">
                <h5 className="font-medium text-amber-300 mb-2">Other Occasions</h5>
                <ul className="text-sm text-amber-200 space-y-1">
                  <li>• After fault occurrence</li>
                  <li>• Change of use/occupancy</li>
                  <li>• Damage suspected</li>
                  <li>• Insurance requirements</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Key Standards and References */}
          <div className="mt-4 p-4 border border-blue-500/30 rounded-lg bg-blue-500/10">
            <h4 className="font-medium text-blue-300 mb-2">Essential Standards & Guidance</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <ul className="text-sm text-blue-200 space-y-1">
                <li>• BS 7671:2018+A2:2022 (18th Edition Wiring Regulations)</li>
                <li>• IET Guidance Note 3 (Inspection & Testing)</li>
                <li>• IET Code of Practice for In-Service Inspection and Testing</li>
              </ul>
              <ul className="text-sm text-blue-200 space-y-1">
                <li>• GS38 - Electrical Test Equipment for Use by Electricians</li>
                <li>• Electricity at Work Regulations 1989</li>
                <li>• Management of Health and Safety at Work Regulations</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewSection;
