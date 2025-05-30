
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Zap, Lightbulb, Settings, CheckCircle } from "lucide-react";

const TroubleshootingGuide = () => {
  const commonProblems = [
    {
      problem: "No Power to Circuit",
      symptoms: ["Complete loss of power", "No lights or sockets working", "Dead circuit"],
      causes: ["Tripped MCB/RCD", "Blown fuse", "Loose connection", "Cable fault"],
      solutions: [
        "Check consumer unit for tripped devices",
        "Reset RCD and MCBs if safe to do so", 
        "Check for loose connections at accessories",
        "Test circuit with appropriate instruments"
      ],
      safety: "Always isolate before investigation",
      severity: "high"
    },
    {
      problem: "RCD Keeps Tripping",
      symptoms: ["RCD trips repeatedly", "Loss of power to multiple circuits", "Won't stay reset"],
      causes: ["Earth fault on circuit", "Neutral-earth fault", "Damaged cable", "Faulty appliance"],
      solutions: [
        "Disconnect all portable appliances",
        "Test each circuit individually",
        "Check for damaged cables or accessories",
        "Use insulation resistance testing"
      ],
      safety: "Do not bypass RCD protection",
      severity: "high"
    },
    {
      problem: "Lights Flickering",
      symptoms: ["Intermittent dimming", "Lights flashing on/off", "Voltage fluctuation"],
      causes: ["Loose connections", "Overloaded circuit", "Neutral fault", "Poor contact"],
      solutions: [
        "Check all connections are tight",
        "Verify circuit loading",
        "Test voltage at various points",
        "Check neutral continuity"
      ],
      safety: "Could indicate dangerous loose connections",
      severity: "medium"
    },
    {
      problem: "Electric Shock from Appliance", 
      symptoms: ["Tingling sensation", "Shock when touching appliance", "Metal casing live"],
      causes: ["Loss of earth continuity", "Insulation failure", "Incorrect wiring"],
      solutions: [
        "Immediately disconnect appliance",
        "Test earth continuity",
        "Check insulation resistance",
        "Verify correct wiring of appliance"
      ],
      safety: "IMMEDIATE SAFETY RISK - Isolate immediately",
      severity: "critical"
    }
  ];

  const testingProcedures = [
    {
      test: "Insulation Resistance",
      when: "Testing between live conductors and earth",
      method: "500V DC test between L-E, N-E, L-N",
      acceptableLimits: "≥1MΩ for most circuits, ≥0.5MΩ for some equipment",
      equipment: "Insulation resistance tester (Megger)"
    },
    {
      test: "Earth Fault Loop Impedance (Zs)",
      when: "Verifying earth fault protection",
      method: "Measurement from line to earth at furthest point",
      acceptableLimits: "Must not exceed maximum Zs for protective device",
      equipment: "Earth fault loop impedance tester"
    },
    {
      test: "RCD Testing",
      when: "Verifying RCD operation and times",
      method: "Test at 0.5x, 1x, and 5x rated tripping current",
      acceptableLimits: "≤300ms at 1x, ≤40ms at 5x rated current",
      equipment: "RCD tester"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "border-red-500 bg-red-500/10";
      case "high": return "border-orange-500 bg-orange-500/10";
      case "medium": return "border-yellow-500 bg-yellow-500/10";
      default: return "border-elec-yellow/20 bg-elec-gray";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical": return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "high": return <Zap className="h-5 w-5 text-orange-500" />;
      case "medium": return <Lightbulb className="h-5 w-5 text-yellow-500" />;
      default: return <Settings className="h-5 w-5 text-elec-yellow" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Electrical Troubleshooting Guide</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Common electrical problems, their causes, and systematic approaches to diagnosis and resolution
        </p>
        <BackButton customUrl="/apprentice/toolbox" label="Back to Guidance Area" />
      </div>

      <Card className="border-red-500/50 bg-red-500/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-red-500" />
            <CardTitle className="text-red-400">Safety First</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
              Always isolate circuits before investigation
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
              Verify isolation with approved voltage indicator
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
              Use appropriate PPE and test equipment
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
              Follow lock-off/tag-out procedures
            </li>
          </ul>
        </CardContent>
      </Card>

      <Tabs defaultValue="problems" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="problems">Common Problems</TabsTrigger>
          <TabsTrigger value="testing">Testing Procedures</TabsTrigger>
        </TabsList>

        <TabsContent value="problems" className="space-y-6">
          {commonProblems.map((problem, index) => (
            <Card key={index} className={getSeverityColor(problem.severity)}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getSeverityIcon(problem.severity)}
                    <CardTitle className="text-xl">{problem.problem}</CardTitle>
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {problem.severity}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-white mb-2">Symptoms:</h4>
                  <ul className="space-y-1">
                    {problem.symptoms.map((symptom, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-elec-yellow mt-1">•</span>
                        {symptom}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-2">Possible Causes:</h4>
                  <ul className="space-y-1">
                    {problem.causes.map((cause, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-elec-yellow mt-1">•</span>
                        {cause}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-2">Troubleshooting Steps:</h4>
                  <ol className="space-y-1">
                    {problem.solutions.map((solution, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-elec-yellow mt-1">{idx + 1}.</span>
                        {solution}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="border-t border-elec-yellow/10 pt-3">
                  <p className="text-sm font-medium text-orange-300">
                    ⚠️ Safety Note: {problem.safety}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="testing" className="space-y-6">
          {testingProcedures.map((test, index) => (
            <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className="text-xl text-elec-yellow">{test.test}</CardTitle>
                <p className="text-muted-foreground">{test.when}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-white mb-2">Test Method:</h4>
                  <p className="text-sm text-muted-foreground">{test.method}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-2">Acceptable Limits:</h4>
                  <p className="text-sm text-muted-foreground">{test.acceptableLimits}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-2">Required Equipment:</h4>
                  <p className="text-sm text-muted-foreground">{test.equipment}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TroubleshootingGuide;
