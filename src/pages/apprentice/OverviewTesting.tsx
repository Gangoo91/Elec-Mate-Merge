
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TestTube, Shield, FileText, CheckCircle, Zap, BookOpen, Eye, AlertTriangle } from "lucide-react";
import BackButton from "@/components/common/BackButton";
import { Button } from "@/components/ui/button";

const OverviewTesting = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Overview of Electrical Testing</h1>
        <p className="text-muted-foreground text-center max-w-3xl mb-4">
          Understanding the fundamentals of electrical testing - why we test, what we test, and how we ensure safety and compliance
        </p>
        <BackButton customUrl="/apprentice/bs7671-inspection-testing" label="Back to BS7671 Hub" />
      </div>

      {/* Why We Test Section */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <TestTube className="h-6 w-6" />
            Why We Test Electrical Installations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 border border-gray-600 rounded-lg bg-elec-dark/50">
              <Shield className="h-6 w-6 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-green-300 mb-2">Safety Protection</h4>
                <p className="text-sm text-muted-foreground">
                  Protect people from electrical shock, burns, and fire hazards. Ensure installations 
                  operate safely under normal and fault conditions.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 border border-gray-600 rounded-lg bg-elec-dark/50">
              <CheckCircle className="h-6 w-6 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-blue-300 mb-2">Legal Compliance</h4>
                <p className="text-sm text-muted-foreground">
                  Meet BS 7671 requirements and statutory obligations. Demonstrate due diligence 
                  and professional competence.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 border border-gray-600 rounded-lg bg-elec-dark/50">
              <FileText className="h-6 w-6 text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-amber-300 mb-2">Quality Assurance</h4>
                <p className="text-sm text-muted-foreground">
                  Verify installation quality, detect faults early, and prevent costly failures. 
                  Ensure design calculations are correct.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 border border-gray-600 rounded-lg bg-elec-dark/50">
              <BookOpen className="h-6 w-6 text-purple-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-purple-300 mb-2">Documentation</h4>
                <p className="text-sm text-muted-foreground">
                  Provide evidence of proper installation and testing. Create records for future 
                  maintenance and inspection.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Testing Standards */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            Key Testing Standards & Regulations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-blue-500/30 rounded-lg bg-blue-500/10">
              <h4 className="font-medium text-blue-300 mb-2">BS 7671:2018+A2:2022</h4>
              <p className="text-sm text-blue-200 mb-2">18th Edition Wiring Regulations</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Part 6 - Verification requirements</li>
                <li>• Chapter 61 - Initial verification</li>
                <li>• Chapter 62 - Periodic inspection</li>
                <li>• Appendix 13 - Test methods</li>
              </ul>
            </div>
            
            <div className="p-4 border border-green-500/30 rounded-lg bg-green-500/10">
              <h4 className="font-medium text-green-300 mb-2">IET Guidance Note 3</h4>
              <p className="text-sm text-green-200 mb-2">Inspection & Testing</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Practical guidance on testing procedures</li>
                <li>• Test sequence and methods</li>
                <li>• Equipment requirements</li>
                <li>• Common testing scenarios</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Types of Testing */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Zap className="h-6 w-6" />
            Types of Electrical Testing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-gray-600 rounded-lg bg-elec-dark/50">
              <h4 className="font-medium text-elec-yellow mb-2">Initial Verification</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Testing of new installations before first use
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Complete test sequence required</li>
                <li>• All circuits must be tested</li>
                <li>• EIC certificate issued</li>
              </ul>
            </div>
            
            <div className="p-4 border border-gray-600 rounded-lg bg-elec-dark/50">
              <h4 className="font-medium text-elec-yellow mb-2">Periodic Inspection</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Regular testing of existing installations
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Risk-based test selection</li>
                <li>• Sample testing acceptable</li>
                <li>• EICR certificate issued</li>
              </ul>
            </div>
            
            <div className="p-4 border border-gray-600 rounded-lg bg-elec-dark/50">
              <h4 className="font-medium text-elec-yellow mb-2">Minor Works</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Testing of additions and alterations
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Limited test scope</li>
                <li>• Affected circuits only</li>
                <li>• MWC certificate issued</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Sequence */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <CheckCircle className="h-6 w-6" />
            Standard Test Sequence
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border border-amber-500/30 rounded-lg bg-amber-500/10">
            <h4 className="font-medium text-amber-300 mb-3">Correct Test Order (BS 7671 Appendix 13)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ol className="text-sm text-amber-200 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="font-medium">1.</span>
                  <div>
                    <span className="font-medium">Visual Inspection</span>
                    <p className="text-xs text-muted-foreground">Before any testing begins</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-medium">2.</span>
                  <div>
                    <span className="font-medium">Continuity of Protective Conductors</span>
                    <p className="text-xs text-muted-foreground">R1 + R2 or separate R1 and R2</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-medium">3.</span>
                  <div>
                    <span className="font-medium">Continuity of Ring Final Circuits</span>
                    <p className="text-xs text-muted-foreground">End-to-end and cross-connection tests</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-medium">4.</span>
                  <div>
                    <span className="font-medium">Insulation Resistance</span>
                    <p className="text-xs text-muted-foreground">Between live conductors and earth</p>
                  </div>
                </li>
              </ol>
              
              <ol className="text-sm text-amber-200 space-y-2" start={5}>
                <li className="flex items-start gap-2">
                  <span className="font-medium">5.</span>
                  <div>
                    <span className="font-medium">Polarity</span>
                    <p className="text-xs text-muted-foreground">Single-pole devices in line conductor</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-medium">6.</span>
                  <div>
                    <span className="font-medium">Earth Fault Loop Impedance</span>
                    <p className="text-xs text-muted-foreground">Zs measurements at socket outlets</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-medium">7.</span>
                  <div>
                    <span className="font-medium">RCD Testing</span>
                    <p className="text-xs text-muted-foreground">Trip times and ramp testing</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-medium">8.</span>
                  <div>
                    <span className="font-medium">Functional Testing</span>
                    <p className="text-xs text-muted-foreground">Operation of switchgear and controls</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Concepts */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Eye className="h-6 w-6" />
            Key Testing Concepts for Apprentices
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-white">Test & Inspect vs Test Only</h4>
              <div className="p-3 border border-gray-600 rounded-lg bg-elec-dark/30">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-blue-300">Test & Inspect:</span> Full visual inspection 
                  followed by electrical testing. Used for EICR and initial verification.
                </p>
              </div>
              <div className="p-3 border border-gray-600 rounded-lg bg-elec-dark/30">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-green-300">Test Only:</span> Electrical testing without 
                  detailed visual inspection. Used when visual inspection already completed.
                </p>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-white">Pass/Fail Criteria</h4>
              <div className="p-3 border border-gray-600 rounded-lg bg-elec-dark/30">
                <p className="text-sm text-muted-foreground">
                  Test results must meet the requirements specified in BS 7671. Values exceeding 
                  maximum limits indicate potential safety hazards and require investigation.
                </p>
              </div>
              <div className="p-3 border border-gray-600 rounded-lg bg-elec-dark/30">
                <p className="text-sm text-muted-foreground">
                  Always refer to the design values and BS 7671 tables for acceptable limits. 
                  When in doubt, consult a qualified supervisor.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Safety Reminder */}
      <Card className="border-red-500/50 bg-gradient-to-r from-red-500/10 to-red-500/5">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-red-400 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-red-300 mb-2">Apprentice Safety Reminder</h3>
              <p className="text-muted-foreground mb-3">
                As an apprentice, you must always work under supervision when carrying out electrical testing. 
                Never attempt to test live installations or use equipment you haven't been trained on.
              </p>
              <ul className="text-sm text-red-200 space-y-1">
                <li>• Always ensure safe isolation before testing</li>
                <li>• Use appropriate PPE and testing equipment</li>
                <li>• Follow your company's safety procedures</li>
                <li>• Ask questions if you're unsure about anything</li>
                <li>• Report any unsafe conditions immediately</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
          Download Testing Quick Reference Guide
        </Button>
        <Button variant="outline" className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10">
          View Interactive Test Procedures
        </Button>
      </div>
    </div>
  );
};

export default OverviewTesting;
