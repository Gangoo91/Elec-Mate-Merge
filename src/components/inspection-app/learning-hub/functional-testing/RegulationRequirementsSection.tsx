
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Scale, FileCheck, AlertTriangle, CheckCircle2, Info } from 'lucide-react';

const RegulationRequirementsSection = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            BS 7671 Regulation Requirements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8 text-gray-300">
          
          {/* Main Regulation */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <Scale className="h-4 w-4 text-blue-400" />
              Regulation 612.13 - Functional Testing
            </h4>
            
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <div className="flex items-start gap-3 mb-3">
                <FileCheck className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-semibold text-blue-400 mb-2">Primary Requirement</h5>
                  <p className="text-sm text-gray-300 mb-3">
                    "Assemblies, including switchgear and controlgear assemblies, and components 
                    of the electrical installation shall be subjected to a functional test to show 
                    that they are properly mounted, adjusted and installed in accordance with the 
                    requirements of BS 7671."
                  </p>
                  <div className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded inline-block">
                    BS 7671:18+A3:2024 - Regulation 612.13
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Specific Requirements */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-400" />
              Specific Testing Requirements
            </h4>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="bg-muted/30 border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-foreground">Regulation 612.13.1</CardTitle>
                  <Badge variant="outline" className="text-green-400 border-green-400 text-xs w-fit">
                    Switchgear Operation
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-xs text-gray-300">
                    All switchgear and controlgear shall be operated to ensure correct functioning including:
                  </p>
                  <ul className="text-xs space-y-1 ml-3">
                    <li>• Main switches and isolators</li>
                    <li>• Circuit breakers and fuses</li>
                    <li>• Control switches and contactors</li>
                    <li>• Protective device coordination</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-muted/30 border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-foreground">Regulation 612.13.2</CardTitle>
                  <Badge variant="outline" className="text-blue-400 border-blue-400 text-xs w-fit">
                    RCD Testing
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-xs text-gray-300">
                    RCDs shall be tested using the integral test facility to verify:
                  </p>
                  <ul className="text-xs space-y-1 ml-3">
                    <li>• Test button operation</li>
                    <li>• Correct tripping function</li>
                    <li>• Reset capability</li>
                    <li>• Mechanical condition</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-muted/30 border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-foreground">Regulation 612.13.3</CardTitle>
                  <Badge variant="outline" className="text-red-400 border-red-400 text-xs w-fit">
                    Emergency Systems
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-xs text-gray-300">
                    Emergency switching and stopping devices shall be tested to ensure:
                  </p>
                  <ul className="text-xs space-y-1 ml-3">
                    <li>• Immediate operation when activated</li>
                    <li>• Complete isolation of intended circuits</li>
                    <li>• Proper reset procedures</li>
                    <li>• Clear identification and accessibility</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-muted/30 border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-foreground">Regulation 612.13.4</CardTitle>
                  <Badge variant="outline" className="text-purple-400 border-purple-400 text-xs w-fit">
                    Control Circuits
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-xs text-gray-300">
                    Control and auxiliary circuits shall be functionally tested including:
                  </p>
                  <ul className="text-xs space-y-1 ml-3">
                    <li>• Interlocking systems</li>
                    <li>• Safety circuits</li>
                    <li>• Automatic control functions</li>
                    <li>• Indication and alarm systems</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Related Regulations */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <Info className="h-4 w-4 text-yellow-400" />
              Related BS 7671 Requirements
            </h4>
            
            <div className="space-y-3">
              <div className="p-3 bg-muted/50 rounded-lg border border-border">
                <div className="flex items-center justify-between mb-2">
                  <h6 className="font-medium text-foreground">Regulation 132.16 - Emergency Switching</h6>
                  <Badge variant="outline" className="text-orange-400 border-orange-400 text-xs">Design Requirement</Badge>
                </div>
                <p className="text-xs text-gray-300">
                  Emergency switching devices must be clearly identified, readily accessible, 
                  and capable of cutting off electrical energy to parts of an installation.
                </p>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg border border-border">
                <div className="flex items-center justify-between mb-2">
                  <h6 className="font-medium text-foreground">Regulation 411.3.3 - RCD Protection</h6>
                  <Badge variant="outline" className="text-teal-400 border-teal-400 text-xs">Protection Requirement</Badge>
                </div>
                <p className="text-xs text-gray-300">
                  RCDs used for additional protection must have rated residual operating current 
                  not exceeding 30mA and operate within specified time limits.
                </p>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg border border-border">
                <div className="flex items-center justify-between mb-2">
                  <h6 className="font-medium text-foreground">Regulation 514.12 - Identification</h6>
                  <Badge variant="outline" className="text-cyan-400 border-cyan-400 text-xs">Identification Requirement</Badge>
                </div>
                <p className="text-xs text-gray-300">
                  Every device for isolation and switching must be clearly identified to indicate 
                  the circuit or equipment controlled.
                </p>
              </div>
            </div>
          </div>

          {/* Compliance Documentation */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <FileCheck className="h-4 w-4 text-green-400" />
              Documentation & Certification
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h6 className="font-medium text-gray-200">Required Records</h6>
                <div className="space-y-2">
                  <div className="p-2 bg-green-500/10 border border-green-500/20 rounded text-xs">
                    <strong className="text-green-400">Test Results:</strong><br />
                    All functional tests must be recorded with pass/fail outcomes
                  </div>
                  <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded text-xs">
                    <strong className="text-blue-400">Defect Records:</strong><br />
                    Any defects found must be documented with remedial actions
                  </div>
                  <div className="p-2 bg-purple-500/10 border border-purple-500/20 rounded text-xs">
                    <strong className="text-purple-400">Test Frequency:</strong><br />
                    Next test due dates must be clearly recorded
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h6 className="font-medium text-gray-200">Certificate Requirements</h6>
                <div className="space-y-2">
                  <div className="p-2 bg-amber-500/10 border border-amber-500/20 rounded text-xs">
                    <strong className="text-amber-400">EIC Schedule:</strong><br />
                    Initial verification requires functional test completion
                  </div>
                  <div className="p-2 bg-red-500/10 border border-red-500/20 rounded text-xs">
                    <strong className="text-red-400">EICR Requirements:</strong><br />
                    Periodic inspection includes functional testing verification
                  </div>
                  <div className="p-2 bg-cyan-500/10 border border-cyan-500/20 rounded text-xs">
                    <strong className="text-cyan-400">Competent Person:</strong><br />
                    Tests must be carried out by qualified electrical personnel
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Legal Framework */}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-amber-400 mb-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Legal Framework & Enforcement
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h6 className="font-medium text-foreground mb-2">Primary Legislation:</h6>
                <ul className="space-y-1 text-xs">
                  <li>• <strong>Electricity at Work Regulations 1989</strong> - Reg 4(2): Equipment maintained to prevent danger</li>
                  <li>• <strong>Health & Safety at Work Act 1974</strong> - Duty of care to employees and public</li>
                  <li>• <strong>Management of H&S at Work Regulations 1999</strong> - Risk assessment requirements</li>
                  <li>• <strong>Building Regulations Part P</strong> - Notification and certification</li>
                </ul>
              </div>
              <div>
                <h6 className="font-medium text-foreground mb-2">Enforcement & Penalties:</h6>
                <ul className="space-y-1 text-xs">
                  <li>• <strong>HSE Enforcement:</strong> Improvement/prohibition notices possible</li>
                  <li>• <strong>Criminal Liability:</strong> Up to 2 years imprisonment for serious breaches</li>
                  <li>• <strong>Civil Liability:</strong> Compensation claims for accidents</li>
                  <li>• <strong>Insurance Issues:</strong> Claims may be rejected for non-compliance</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegulationRequirementsSection;
