
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertTriangle, Info } from "lucide-react";

const RunThroughStepsTab = () => {
  const testingSteps = [
    {
      id: "safe-isolation",
      title: "Safe Isolation Procedures",
      time: "15-20 minutes",
      importance: "Critical",
      description: "Essential safety procedures before any testing begins",
      steps: [
        "Switch off and lock off the main switch",
        "Place warning notices at the distribution board",
        "Test voltage indicator on known live source",
        "Test the circuit to confirm it's dead",
        "Re-test voltage indicator on known live source",
        "Fit warning labels on the circuit under test"
      ],
      safetyNotes: [
        "Never assume a circuit is dead without testing",
        "Always use a properly functioning voltage indicator",
        "Ensure warning notices are clearly visible"
      ]
    },
    {
      id: "visual-inspection",
      title: "Visual Inspection",
      time: "30-45 minutes",
      importance: "Essential",
      description: "Thorough visual examination of the installation",
      steps: [
        "Check general condition of equipment",
        "Verify correct cable types and ratings",
        "Inspect connections for signs of overheating",
        "Check protective devices are correctly rated",
        "Verify earthing and bonding arrangements",
        "Examine accessibility of equipment"
      ],
      safetyNotes: [
        "Look for signs of damage or deterioration",
        "Check for non-standard or dangerous modifications"
      ]
    },
    {
      id: "continuity-testing",
      title: "Continuity Testing",
      time: "20-30 minutes",
      importance: "Essential",
      description: "Testing continuity of protective conductors and ring circuits",
      steps: [
        "Test continuity of protective conductors",
        "Perform ring final circuit continuity tests",
        "Record R1 + R2 values",
        "Verify polarity of single-pole devices",
        "Check continuity of supplementary bonding"
      ],
      safetyNotes: [
        "Ensure all circuits are isolated",
        "Use lowest voltage setting on test instrument"
      ]
    },
    {
      id: "insulation-resistance",
      title: "Insulation Resistance Testing",
      time: "15-25 minutes",
      importance: "Essential",
      description: "Testing insulation between conductors",
      steps: [
        "Disconnect electronic equipment",
        "Test between phase and neutral conductors",
        "Test between phase and earth",
        "Test between neutral and earth",
        "Record all readings and compare with minimum values"
      ],
      safetyNotes: [
        "Remove or isolate electronic equipment",
        "Use appropriate test voltage (250V or 500V)"
      ]
    },
    {
      id: "polarity-testing",
      title: "Polarity Testing",
      time: "10-15 minutes",
      importance: "Important",
      description: "Verify correct polarity connections",
      steps: [
        "Check polarity at the origin of the installation",
        "Verify polarity at all socket outlets",
        "Test polarity of lighting circuits",
        "Check single-pole switching devices"
      ],
      safetyNotes: [
        "Incorrect polarity can be dangerous",
        "Pay special attention to bathroom circuits"
      ]
    },
    {
      id: "earth-fault-loop",
      title: "Earth Fault Loop Impedance",
      time: "20-30 minutes",
      importance: "Critical",
      description: "Testing earth fault loop impedance (Zs)",
      steps: [
        "Connect test instrument correctly",
        "Test at the furthest point of each circuit",
        "Record Zs values",
        "Compare with maximum permitted values",
        "Test prospective fault current if required"
      ],
      safetyNotes: [
        "Ensure RCDs are temporarily bridged out",
        "Use appropriate test method for the installation"
      ]
    },
    {
      id: "rcd-testing",
      title: "RCD Testing",
      time: "15-20 minutes",
      importance: "Critical", 
      description: "Testing RCD operation and trip times",
      steps: [
        "Perform RCD push button test",
        "Test RCD trip time at rated current",
        "Test RCD trip time at 5 times rated current",
        "Check RCD doesn't trip at 50% rated current",
        "Record all trip times"
      ],
      safetyNotes: [
        "Ensure all circuits protected by RCD are isolated",
        "Check RCD resets properly after each test"
      ]
    },
    {
      id: "functional-testing",
      title: "Functional Testing",
      time: "15-30 minutes",
      importance: "Important",
      description: "Testing operation of switchgear and controls",
      steps: [
        "Test all switching devices",
        "Check operation of emergency stops",
        "Verify interlocks function correctly",
        "Test indication and warning systems",
        "Check automatic controls operate correctly"
      ],
      safetyNotes: [
        "Ensure safe operation of all controls",
        "Test emergency systems thoroughly"
      ]
    }
  ];

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'Critical': return 'bg-red-500/10 text-red-400 border-red-500/30';
      case 'Essential': return 'bg-orange-500/10 text-orange-400 border-orange-500/30';
      case 'Important': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
      default: return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <Card className="border-blue-500/30 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <Info className="h-5 w-5" />
            BS 7671 Testing Sequence Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-3 border border-blue-500/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">{testingSteps.length}</div>
              <div className="text-sm text-muted-foreground">Testing Steps</div>
            </div>
            <div className="text-center p-3 border border-blue-500/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">2-4 hrs</div>
              <div className="text-sm text-muted-foreground">Typical Duration</div>
            </div>
            <div className="text-center p-3 border border-blue-500/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">BS 7671</div>
              <div className="text-sm text-muted-foreground">18th Edition</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Testing Steps Accordion */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Step-by-Step Testing Procedures</CardTitle>
          <p className="text-muted-foreground">
            Follow these procedures in the correct sequence for BS 7671 compliance
          </p>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {testingSteps.map((step, index) => (
              <AccordionItem key={step.id} value={step.id} className="border-elec-yellow/20">
                <AccordionTrigger className="hover:text-elec-yellow">
                  <div className="flex items-center justify-between w-full mr-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-elec-yellow text-elec-dark flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                      <span className="font-medium">{step.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="border-blue-500/40 text-blue-400 text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {step.time}
                      </Badge>
                      <Badge variant="outline" className={getImportanceColor(step.importance)}>
                        {step.importance}
                      </Badge>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pt-4 space-y-4">
                    <p className="text-muted-foreground">{step.description}</p>
                    
                    <div>
                      <h4 className="font-medium text-white mb-3">Procedure Steps:</h4>
                      <div className="space-y-2">
                        {step.steps.map((procedureStep, stepIndex) => (
                          <div key={stepIndex} className="flex items-start gap-3 p-2 bg-elec-dark/30 rounded">
                            <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{procedureStep}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {step.safetyNotes && step.safetyNotes.length > 0 && (
                      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                        <h4 className="font-medium text-red-400 mb-2 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4" />
                          Safety Notes
                        </h4>
                        <ul className="space-y-1">
                          {step.safetyNotes.map((note, noteIndex) => (
                            <li key={noteIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-red-400">•</span>
                              {note}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Quick Reference Card */}
      <Card className="border-green-500/30 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-400">Quick Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-green-300">Test Sequence (Must Follow Order)</h4>
              <ol className="space-y-1 text-sm">
                <li>1. Safe isolation</li>
                <li>2. Visual inspection</li>
                <li>3. Continuity testing</li>
                <li>4. Insulation resistance</li>
                <li>5. Polarity</li>
                <li>6. Earth fault loop impedance</li>
                <li>7. RCD testing</li>
                <li>8. Functional testing</li>
              </ol>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-green-300">Essential Equipment</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Multifunction tester (MFT)</li>
                <li>• RCD tester</li>
                <li>• Voltage indicator</li>
                <li>• Proving unit</li>
                <li>• Test leads and probes</li>
                <li>• Lock-off devices</li>
                <li>• Warning labels</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RunThroughStepsTab;
