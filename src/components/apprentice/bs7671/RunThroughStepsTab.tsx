
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  FileText, 
  Zap, 
  Eye,
  ArrowRight,
  Lightbulb,
  Shield,
  BookOpen
} from "lucide-react";

const RunThroughStepsTab = () => {
  const testingSequence = [
    {
      id: 1,
      title: "Visual Inspection",
      description: "Comprehensive visual examination of all electrical installation components",
      duration: "30-45 mins",
      priority: "CRITICAL",
      icon: Eye,
      requirements: [
        "Check all electrical equipment for damage",
        "Verify conductor condition and connections", 
        "Confirm protective device ratings",
        "Validate earthing and bonding arrangements"
      ],
      safetyNotes: [
        "Prove dead before opening any equipment",
        "Use appropriate PPE throughout inspection"
      ]
    },
    {
      id: 2,
      title: "Continuity of Protective Conductors",
      description: "Test continuity of CPC throughout installation",
      duration: "15-25 mins",
      priority: "HIGH",
      icon: Zap,
      requirements: [
        "Test main protective bonding conductors",
        "Verify CPC continuity to all points",
        "Check supplementary bonding where required",
        "Record all resistance values"
      ],
      safetyNotes: [
        "Ensure complete isolation before testing",
        "Use minimum 200mA test current"
      ]
    },
    {
      id: 3,
      title: "Continuity of Ring Final Circuits",
      description: "Verify ring circuit integrity and correct wiring",
      duration: "20-30 mins",
      priority: "HIGH",
      icon: Zap,
      requirements: [
        "End-to-end continuity tests",
        "Figure-of-eight test procedure",
        "Verify R1+R2 values at outlets",
        "Check for spurious interconnections"
      ],
      safetyNotes: [
        "Disconnect all loads from ring circuit",
        "Ensure proper conductor identification"
      ]
    },
    {
      id: 4,
      title: "Insulation Resistance",
      description: "Test insulation between conductors and to earth",
      duration: "25-35 mins",
      priority: "CRITICAL",
      icon: Shield,
      requirements: [
        "Test L-N, L-E, N-E at 500V DC",
        "Minimum 1MΩ for ≤500V circuits",
        "Remove/isolate electronic equipment",
        "Document all readings"
      ],
      safetyNotes: [
        "High voltage testing - protect equipment",
        "Discharge circuits after testing"
      ]
    },
    {
      id: 5,
      title: "Polarity Testing",
      description: "Verify correct polarity connections throughout",
      duration: "15-20 mins",
      priority: "MEDIUM",
      icon: CheckCircle,
      requirements: [
        "Check switching device connections",
        "Verify socket outlet polarity",
        "Test ES lampholder connections",
        "Confirm correct phase rotation"
      ],
      safetyNotes: [
        "Complete before energising circuits",
        "Pay attention to Edison screw fittings"
      ]
    },
    {
      id: 6,
      title: "Earth Electrode Resistance",
      description: "Measure earth electrode performance (TT systems)",
      duration: "30-40 mins",
      priority: "HIGH",
      icon: Zap,
      requirements: [
        "Fall-of-potential measurement method",
        "Verify resistance within RCD limits",
        "Check electrode connections",
        "Document soil conditions"
      ],
      safetyNotes: [
        "Check for buried services before spike insertion",
        "Use appropriate test spacing"
      ],
      applicability: "TT Systems Only"
    },
    {
      id: 7,
      title: "Earth Fault Loop Impedance (Zs)",
      description: "Measure fault loop impedance for protection verification",
      duration: "20-30 mins",
      priority: "CRITICAL",
      icon: Zap,
      requirements: [
        "Test at furthest points of circuits",
        "Use no-trip method for RCD circuits",
        "Compare with maximum permitted values",
        "Apply temperature correction factors"
      ],
      safetyNotes: [
        "Ensure test method appropriate for circuit type",
        "Consider parallel earth paths"
      ]
    },
    {
      id: 8,
      title: "RCD Testing",
      description: "Comprehensive RCD operation and time testing",
      duration: "25-35 mins",
      priority: "CRITICAL",
      icon: Shield,
      requirements: [
        "Push button test verification",
        "Trip time at 1× and 5× rated current",
        "Half-rated current non-trip test",
        "Test at 0° and 180° phase angles"
      ],
      safetyNotes: [
        "Test push button operation first",
        "Ensure RCD resets between tests"
      ]
    },
    {
      id: 9,
      title: "Prospective Short Circuit Current",
      description: "Verify protective device breaking capacity",
      duration: "20-25 mins",
      priority: "HIGH",
      icon: AlertTriangle,
      requirements: [
        "Measure PSCC at origin and major points",
        "Verify against device breaking capacity",
        "Test both L-N and L-E fault currents",
        "Check discrimination between devices"
      ],
      safetyNotes: [
        "Use no-trip measurement methods",
        "Verify equipment ratings adequate"
      ]
    },
    {
      id: 10,
      title: "Phase Sequence",
      description: "Verify correct three-phase rotation",
      duration: "10-15 mins",
      priority: "MEDIUM",
      icon: CheckCircle,
      requirements: [
        "Check L1-L2-L3 sequence at supply",
        "Verify sequence at motor connections",
        "Test three-phase socket outlets",
        "Confirm phase voltage balance"
      ],
      safetyNotes: [
        "Test before energising rotating equipment",
        "Use appropriate phase sequence indicator"
      ],
      applicability: "Three-Phase Systems"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'CRITICAL': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'HIGH': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'MEDIUM': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  const totalDuration = testingSequence.reduce((total, step) => {
    const minutes = parseInt(step.duration.split('-')[1] || step.duration.split(' ')[0]);
    return total + minutes;
  }, 0);

  return (
    <div className="space-y-6">
      {/* Overview */}
      <Card className="border-blue-500/30 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            BS 7671 Complete Testing Sequence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Complete step-by-step testing sequence following BS 7671:2018 requirements. This systematic 
            approach ensures all required tests are completed in the correct order for accurate results.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-green-500/10 rounded-lg p-3 border border-green-500/20 text-center">
              <div className="text-2xl font-bold text-green-400">{testingSequence.length}</div>
              <div className="text-sm text-muted-foreground">Testing Steps</div>
            </div>
            <div className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/20 text-center">
              <div className="text-2xl font-bold text-blue-400">~{Math.round(totalDuration/60)}h</div>
              <div className="text-sm text-muted-foreground">Est. Duration</div>
            </div>
            <div className="bg-purple-500/10 rounded-lg p-3 border border-purple-500/20 text-center">
              <div className="text-2xl font-bold text-purple-400">100%</div>
              <div className="text-sm text-muted-foreground">BS 7671 Compliant</div>
            </div>
            <div className="bg-yellow-500/10 rounded-lg p-3 border border-yellow-500/20 text-center">
              <div className="text-2xl font-bold text-yellow-400">9</div>
              <div className="text-sm text-muted-foreground">Core Tests</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Testing Steps */}
      <div className="space-y-4">
        {testingSequence.map((step, index) => {
          const IconComponent = step.icon;
          return (
            <Card key={step.id} className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/40 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-elec-yellow/20 flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-elec-yellow" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <CardTitle className="text-white">
                          {step.id}. {step.title}
                        </CardTitle>
                        <Badge className={getPriorityColor(step.priority)}>
                          {step.priority}
                        </Badge>
                        {step.applicability && (
                          <Badge variant="outline" className="text-xs border-cyan-500/30 text-cyan-400">
                            {step.applicability}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                      <div className="flex items-center gap-4">
                        <Badge className="bg-blue-500/20 text-blue-400">
                          <Clock className="h-3 w-3 mr-1" />
                          {step.duration}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          Step {index + 1} of {testingSequence.length}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Requirements */}
                  <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
                    <h4 className="font-medium text-blue-300 mb-3 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Key Requirements
                    </h4>
                    <ul className="space-y-2">
                      {step.requirements.map((req, idx) => (
                        <li key={idx} className="text-sm text-blue-100 flex items-start gap-2">
                          <span className="text-blue-400 mt-1">•</span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Safety Notes */}
                  <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/20">
                    <h4 className="font-medium text-amber-300 mb-3 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      Safety Considerations
                    </h4>
                    <ul className="space-y-2">
                      {step.safetyNotes.map((note, idx) => (
                        <li key={idx} className="text-sm text-amber-100 flex items-start gap-2">
                          <span className="text-amber-400 mt-1">•</span>
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <Button 
                    size="sm"
                    className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
                  >
                    View Detailed Guide
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Professional Tips */}
      <Card className="border-green-500/30 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Professional Testing Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-green-300">Before Testing</h4>
              <ul className="space-y-2 text-sm text-green-100">
                <li>• Obtain and review installation drawings and specifications</li>
                <li>• Ensure all test equipment is calibrated and functioning</li>
                <li>• Complete thorough visual inspection before electrical testing</li>
                <li>• Plan testing sequence to minimise repeated isolation</li>
                <li>• Identify and protect electronic equipment from test voltages</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-green-300">During Testing</h4>
              <ul className="space-y-2 text-sm text-green-100">
                <li>• Follow the prescribed testing sequence strictly</li>
                <li>• Record all readings, even if within acceptable limits</li>
                <li>• Take photographs of test setups and any defects found</li>
                <li>• Investigate any unusual or unexpected results immediately</li>
                <li>• Ensure proper earthing arrangements before energising</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Regulation Reference */}
      <Card className="border-purple-500/30 bg-purple-500/10">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Regulatory Compliance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-purple-100">
              This testing sequence complies with BS 7671:2018 Part 6 - Inspection and Testing requirements. 
              All tests must be completed by competent persons using calibrated equipment.
            </p>
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-purple-500/20 text-purple-400">BS 7671:2018 Part 6</Badge>
              <Badge className="bg-purple-500/20 text-purple-400">Guidance Note 3</Badge>
              <Badge className="bg-purple-500/20 text-purple-400">IET On-Site Guide</Badge>
              <Badge className="bg-purple-500/20 text-purple-400">Building Regulations Part P</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RunThroughStepsTab;
