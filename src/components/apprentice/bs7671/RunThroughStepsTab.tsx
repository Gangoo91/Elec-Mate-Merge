
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  AlertTriangle, 
  Zap, 
  Shield, 
  Activity, 
  TestTube, 
  FileText,
  Clock,
  Users,
  Wrench
} from "lucide-react";

const RunThroughStepsTab = () => {
  const stepCategories = [
    {
      id: "preparation",
      title: "Pre-Testing Preparation",
      icon: CheckCircle,
      description: "Essential preparation steps before beginning any testing",
      steps: [
        {
          title: "Safe Isolation",
          description: "Proper isolation procedures including LOTO (Lock Out Tag Out)",
          duration: "15-20 mins",
          priority: "Critical",
          details: [
            "Identify all sources of supply",
            "Switch off and lock off at the origin",
            "Test voltage indicator on known live source",
            "Test installation to confirm it's dead",
            "Re-test voltage indicator on known live source"
          ]
        },
        {
          title: "Visual Inspection",
          description: "Comprehensive visual examination of the installation",
          duration: "30-45 mins",
          priority: "High",
          details: [
            "Check cable routing and support",
            "Inspect accessories and connections",
            "Verify protective device ratings",
            "Check earthing and bonding arrangements",
            "Examine cable entry points"
          ]
        },
        {
          title: "Equipment Setup",
          description: "Prepare and calibrate testing equipment",
          duration: "10-15 mins",
          priority: "Medium",
          details: [
            "Check MFT calibration certificates",
            "Verify test lead condition",
            "Set up proving unit",
            "Prepare documentation templates"
          ]
        }
      ]
    },
    {
      id: "continuity",
      title: "Continuity Testing",
      icon: Zap,
      description: "Testing continuity of protective conductors and ring circuits",
      steps: [
        {
          title: "Protective Conductor Continuity",
          description: "Test continuity of all protective conductors",
          duration: "20-30 mins",
          priority: "Critical",
          details: [
            "Connect test leads to main earthing terminal and circuit protective conductor",
            "Record resistance values (should be ≤ 0.05Ω per 100m)",
            "Test each circuit separately",
            "Check bonding conductor continuity"
          ]
        },
        {
          title: "Ring Final Circuit Continuity",
          description: "Verify ring circuit integrity using cross-connection method",
          duration: "25-35 mins",
          priority: "High",
          details: [
            "Cross-connect line conductors at consumer unit",
            "Test between line and neutral at each socket",
            "Cross-connect neutral conductors",
            "Test between line and earth at each socket",
            "Calculate R1+R2 values"
          ]
        }
      ]
    },
    {
      id: "insulation",
      title: "Insulation Resistance Testing",
      icon: Shield,
      description: "Testing insulation resistance between conductors and earth",
      steps: [
        {
          title: "Phase to Neutral IR",
          description: "Test insulation between phase and neutral conductors",
          duration: "15-20 mins",
          priority: "Critical",
          details: [
            "Set MFT to 500V DC for circuits ≤500V",
            "Ensure all equipment disconnected",
            "Test each circuit separately",
            "Minimum acceptable value: 1MΩ"
          ]
        },
        {
          title: "Phase to Earth IR",
          description: "Test insulation between phase conductors and earth",
          duration: "15-20 mins",
          priority: "Critical",
          details: [
            "Connect phase conductors together",
            "Test between combined phases and earth",
            "Record values for each circuit",
            "Check for any deterioration"
          ]
        },
        {
          title: "Neutral to Earth IR",
          description: "Test insulation between neutral and earth",
          duration: "10-15 mins",
          priority: "High",
          details: [
            "Disconnect neutral from main earthing terminal",
            "Test between neutral and earth",
            "Ensure no parallel paths exist",
            "Reconnect after testing"
          ]
        }
      ]
    },
    {
      id: "polarity",
      title: "Polarity Verification",
      icon: Activity,
      description: "Verify correct polarity of all connections",
      steps: [
        {
          title: "Single Pole Device Polarity",
          description: "Check polarity of single pole switches and protective devices",
          duration: "20-25 mins",
          priority: "High",
          details: [
            "Verify switches are connected in phase conductor only",
            "Check fuse and MCB connections",
            "Test centre contact of ES lampholders",
            "Confirm polarity at all outlets"
          ]
        }
      ]
    },
    {
      id: "earth-fault",
      title: "Earth Fault Loop Impedance",
      icon: TestTube,
      description: "Measure Zs values and verify protective device operation",
      steps: [
        {
          title: "Zs Measurement",
          description: "Measure earth fault loop impedance at each circuit",
          duration: "30-40 mins",
          priority: "Critical",
          details: [
            "Energise installation for testing",
            "Test at furthest point of each circuit",
            "Record Zs values",
            "Compare with maximum permissible values",
            "Consider temperature correction factors"
          ]
        },
        {
          title: "Prospective Fault Current",
          description: "Measure prospective short circuit and earth fault current",
          duration: "15-20 mins",
          priority: "High",
          details: [
            "Test at main distribution board",
            "Record PSCC and PEFC values",
            "Verify protective device breaking capacity",
            "Check compliance with BS 7671"
          ]
        }
      ]
    },
    {
      id: "rcd",
      title: "RCD Testing",
      icon: Wrench,
      description: "Test RCD operation and trip times",
      steps: [
        {
          title: "RCD Trip Time Test",
          description: "Test RCD operation at various test currents",
          duration: "20-25 mins",
          priority: "Critical",
          details: [
            "Test at 50% rated current (should not trip)",
            "Test at 100% rated current (should trip ≤300ms)",
            "Test at 500% rated current (should trip ≤40ms)",
            "Test push button operation monthly"
          ]
        },
        {
          title: "RCD Ramp Test",
          description: "Determine actual trip current using ramp test",
          duration: "15-20 mins",
          priority: "Medium",
          details: [
            "Gradually increase test current",
            "Record actual trip current",
            "Should be between 50% and 100% of rated current",
            "Document any variations"
          ]
        }
      ]
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'High': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'Medium': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      default: return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            BS 7671 Testing Sequence Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-3 border border-elec-yellow/20 rounded-lg">
              <div className="text-2xl font-bold text-elec-yellow">{stepCategories.length}</div>
              <div className="text-sm text-muted-foreground">Testing Categories</div>
            </div>
            <div className="text-center p-3 border border-elec-yellow/20 rounded-lg">
              <div className="text-2xl font-bold text-elec-yellow">
                {stepCategories.reduce((total, category) => total + category.steps.length, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Individual Steps</div>
            </div>
            <div className="text-center p-3 border border-elec-yellow/20 rounded-lg">
              <div className="text-2xl font-bold text-elec-yellow">2-4 hrs</div>
              <div className="text-sm text-muted-foreground">Typical Duration</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Accordion for Testing Steps */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Step-by-Step Testing Procedures
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full space-y-2">
            {stepCategories.map((category) => (
              <AccordionItem 
                key={category.id} 
                value={category.id}
                className="border border-elec-yellow/20 rounded-lg px-4"
              >
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center gap-3 text-left">
                    <category.icon className="h-5 w-5 text-elec-yellow flex-shrink-0" />
                    <div>
                      <div className="font-medium text-white">{category.title}</div>
                      <div className="text-sm text-muted-foreground">{category.description}</div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <div className="space-y-4 mt-4">
                    {category.steps.map((step, index) => (
                      <div key={index} className="border border-elec-yellow/10 rounded-lg p-4 bg-elec-dark/30">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="font-medium text-white mb-1">{step.title}</h4>
                            <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="border-blue-500/40 text-blue-400">
                                <Clock className="h-3 w-3 mr-1" />
                                {step.duration}
                              </Badge>
                              <Badge variant="outline" className={getPriorityColor(step.priority)}>
                                {step.priority}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <h5 className="text-sm font-medium text-elec-yellow">Key Steps:</h5>
                          <ul className="space-y-1">
                            {step.details.map((detail, detailIndex) => (
                              <li key={detailIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></span>
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" className="flex-1">
                            Start Step
                          </Button>
                          <Button size="sm" variant="outline">
                            View Guide
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Safety Reminder */}
      <Card className="border-red-500/30 bg-red-500/10">
        <CardHeader>
          <CardTitle className="text-red-400 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Safety Reminder
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-red-300">Before Testing</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Always follow safe isolation procedures</li>
                <li>• Use proper PPE and safety equipment</li>
                <li>• Verify test equipment calibration</li>
                <li>• Inform relevant personnel of testing</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-red-300">During Testing</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Follow testing sequence strictly</li>
                <li>• Document all results accurately</li>
                <li>• Stop if any unsafe conditions arise</li>
                <li>• Never bypass safety procedures</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RunThroughStepsTab;
