
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Shield, AlertTriangle, BookOpen, Zap, Eye, FileText, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/common/BackButton";
import { Link } from "react-router-dom";

const OverviewTesting = () => {
  const testSequenceSteps = [
    {
      step: "0",
      title: "Safe Isolation (PREREQUISITE)",
      description: "Secure isolation, prove dead, and apply locks/signs",
      icon: Shield,
      color: "text-red-400",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/30",
      critical: true
    },
    {
      step: "1",
      title: "Continuity of Protective Conductors",
      description: "Test continuity of circuit protective conductors (CPC)",
      icon: Zap,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30"
    },
    {
      step: "2",
      title: "Continuity of Ring Final Circuits",
      description: "Test continuity and correct wiring of ring circuits",
      icon: CheckCircle,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30"
    },
    {
      step: "3",
      title: "Insulation Resistance",
      description: "Test insulation resistance between conductors and earth",
      icon: BookOpen,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30"
    },
    {
      step: "4",
      title: "Polarity",
      description: "Verify correct polarity of all circuits and accessories",
      icon: Wrench,
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/30"
    },
    {
      step: "5",
      title: "Earth Fault Loop Impedance",
      description: "Measure Zs values for all circuits and verify compliance",
      icon: Zap,
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-500/30"
    },
    {
      step: "6",
      title: "RCD Operation",
      description: "Test RCD trip times and operating currents",
      icon: Shield,
      color: "text-pink-400",
      bgColor: "bg-pink-500/10",
      borderColor: "border-pink-500/30"
    },
    {
      step: "7",
      title: "Functional Testing",
      description: "Test operation of switches, isolators, and controls",
      icon: CheckCircle,
      color: "text-indigo-400",
      bgColor: "bg-indigo-500/10",
      borderColor: "border-indigo-500/30"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Overview - Electrical Testing</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Complete introduction to electrical installation testing following BS 7671:2018+A2:2022 and EICR requirements
        </p>
        <BackButton customUrl="/apprentice/bs7671-inspection-testing" label="Back to BS7671 Hub" />
      </div>

      {/* Critical Safety Notice */}
      <Card className="border-red-500/50 bg-gradient-to-r from-red-500/20 to-red-500/10">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-red-400 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-red-300 mb-2">SAFETY FIRST - NEVER BYPASS SAFE ISOLATION</h3>
              <p className="text-red-200">
                Safe isolation must ALWAYS be completed before any testing begins. This is not optional - it's a legal 
                requirement under BS 7671 and essential for preventing serious injury or death. Step 0 is your lifeline.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Why We Test */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Why Do We Test Electrical Installations?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-white">Safety & Compliance</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Ensure installations are safe for users</li>
                <li>• Comply with BS 7671 (18th Edition) requirements</li>
                <li>• Meet insurance and legal obligations</li>
                <li>• Identify potential hazards before they cause harm</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-white">EICR Requirements</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Periodic inspection every 5-10 years</li>
                <li>• Classify defects (C1, C2, C3, FI)</li>
                <li>• Document overall installation condition</li>
                <li>• Recommend remedial actions</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Standard Test Sequence - BS 7671 Appendix 13 */}
      <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/5 to-elec-yellow/10">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Standard Test Sequence - BS 7671 Appendix 13
          </CardTitle>
          <p className="text-muted-foreground">
            This sequence MUST be followed for all testing work. Each step builds on the previous ones.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {testSequenceSteps.map((step) => (
            <div 
              key={step.step}
              className={`flex items-start gap-4 p-4 rounded-lg border ${step.borderColor} ${step.bgColor} ${
                step.critical ? 'ring-2 ring-red-500/50' : ''
              }`}
            >
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step.bgColor} ${step.color} font-bold text-sm`}>
                {step.step}
              </div>
              <step.icon className={`h-5 w-5 ${step.color} mt-0.5 flex-shrink-0`} />
              <div className="flex-1">
                <h4 className={`font-medium ${step.color} mb-1`}>
                  {step.title}
                  {step.critical && <span className="ml-2 text-red-400 text-xs font-bold">(MANDATORY FIRST)</span>}
                </h4>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Types of Testing */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-blue-300 text-lg">Initial Verification</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Testing of new installations before energisation and handover to client.
            </p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• All circuits tested</li>
              <li>• Full documentation required</li>
              <li>• EIC certificate issued</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-green-300 text-lg">Periodic Inspection (EICR)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Regular testing of existing installations to assess condition and safety.
            </p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Sample testing acceptable</li>
              <li>• Fault classification system</li>
              <li>• EICR certificate issued</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-purple-300 text-lg">Minor Works</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Testing following small additions or alterations to existing circuits.
            </p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Limited scope testing</li>
              <li>• Quick completion</li>
              <li>• Minor Works certificate</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Key Testing Standards */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Key Standards & References
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-white">Primary Standards</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• BS 7671:2018+A2:2022 (18th Edition)</li>
                <li>• IET Guidance Note 3: Inspection & Testing</li>
                <li>• IET Code of Practice for EICR</li>
                <li>• HSE GS38: Electrical Test Equipment</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-white">Key Regulations</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Chapter 61: Initial verification</li>
                <li>• Chapter 64: Periodic inspection</li>
                <li>• Appendix 13: Methods of test</li>
                <li>• Regulation 643: Testing sequence</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/apprentice/bs7671-inspection-testing">
          <Button className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90">
            Start BS7671 Learning Journey
          </Button>
        </Link>
        <Button variant="outline" className="w-full border-elec-yellow text-elec-yellow hover:bg-elec-yellow/10">
          Download Testing Checklist
        </Button>
      </div>

      {/* EICR Context Footer */}
      <Card className="border-green-500/30 bg-gradient-to-r from-green-500/10 to-green-500/5">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <FileText className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-green-300 mb-2">EICR Context</h3>
              <p className="text-green-200 mb-2">
                When conducting an EICR, you're assessing the installation's condition and identifying any 
                deterioration or defects that could affect safety. The test sequence ensures systematic 
                evaluation while maintaining safety throughout.
              </p>
              <p className="text-sm text-green-200">
                Remember: C1 = Danger present, C2 = Potentially dangerous, C3 = Improvement recommended, FI = Further investigation required.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewTesting;
