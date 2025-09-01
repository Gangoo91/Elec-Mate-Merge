import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, AlertTriangle, CheckCircle, Calculator, Shield, Lightbulb, Wrench } from "lucide-react";
import InfoBox from "@/components/common/InfoBox";

const RingCircuitGuidance = () => {
  const testProcedureSteps = [
    "Isolate the circuit at the consumer unit and verify with voltage indicator",
    "Remove all loads (unplug appliances and switch off FCUs)",
    "Identify the ring circuit conductors at the consumer unit",
    "Connect live ends together (L1 to L2) and neutral ends together (N1 to N2)",
    "Measure resistance between live conductors at each socket outlet",
    "Measure resistance between earth conductors at each socket outlet",
    "Calculate R1+R2 values and verify consistency around the ring"
  ];

  const commonIssues = [
    {
      issue: "High Resistance Readings",
      causes: ["Loose connections at socket outlets", "Corroded conductors", "Poor quality terminations"],
      solutions: ["Check and retighten all connections", "Inspect cable for damage", "Replace damaged sections"]
    },
    {
      issue: "Open Circuit (Infinite Reading)",
      causes: ["Disconnected conductor", "Severe cable damage", "Incorrect wiring"],
      solutions: ["Trace cable route carefully", "Check all junction boxes", "Verify ring circuit design"]
    },
    {
      issue: "Cross-Connected Rings",
      causes: ["Accidental interconnection", "Wiring errors", "Junction box mistakes"],
      solutions: ["Check current distribution patterns", "Verify socket operation", "Use phase rotation testing"]
    }
  ];

  const bs7671Requirements = [
    "Maximum floor area: 100m² (Regulation 433.1.204)",
    "Minimum cable size: 2.5mm² live conductors",
    "Maximum protective device: 32A MCB/RCBO",
    "Minimum earth conductor: 1.5mm²",
    "Continuity testing required (Chapter 64)",
    "Earth fault loop impedance verification"
  ];

  return (
    <div className="space-y-6">
      {/* Test Procedure */}
      <InfoBox
        title="Step-by-Step Test Procedure"
        icon={<BookOpen className="h-5 w-5 text-elec-yellow" />}
        points={testProcedureSteps}
        as="section"
      />

      {/* Theory and Calculations */}
      <Card className="bg-elec-card border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-elec-yellow" />
            Understanding Ring Circuit Mathematics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="r1-r2" className="border-elec-yellow/20">
              <AccordionTrigger className="text-elec-light">R1 + R2 Calculation</AccordionTrigger>
              <AccordionContent className="text-elec-light/80 space-y-3">
                <p>
                  R1 + R2 represents the resistance of the live and earth conductors combined. For a ring circuit:
                </p>
                <div className="bg-elec-dark rounded p-3 font-mono text-sm border border-elec-yellow/20">
                  R1 + R2 (at midpoint) = (End-to-End Live + End-to-End CPC) ÷ 4
                </div>
                <p className="text-sm">
                  This is because at the midpoint of the ring, you have two parallel paths, each with half the total resistance.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="end-to-end" className="border-elec-yellow/20">
              <AccordionTrigger className="text-elec-light">End-to-End Resistance</AccordionTrigger>
              <AccordionContent className="text-elec-light/80 space-y-3">
                <p>
                  End-to-end resistance is measured across the entire loop to confirm continuity:
                </p>
                <div className="bg-elec-dark rounded p-3 font-mono text-sm border border-elec-yellow/20">
                  Individual Leg Resistance = End-to-End Reading ÷ 4
                </div>
                <p className="text-sm">
                  This confirms the ring is continuous and helps identify any high resistance joints.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="cross-connection" className="border-elec-yellow/20">
              <AccordionTrigger className="text-elec-light">Cross-Connection Testing</AccordionTrigger>
              <AccordionContent className="text-elec-light/80 space-y-3">
                <p>
                  Cross-connection tests verify the ring is properly wired and not interconnected with other circuits:
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Live to Neutral:</strong> Should equal R1 + Rn</li>
                  <li>• <strong>Live to CPC:</strong> Should equal R1 + R2</li>
                  <li>• <strong>Neutral to CPC:</strong> Should equal Rn + R2</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {/* Common Issues */}
      <Card className="bg-elec-card border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="h-5 w-5 text-elec-yellow" />
            Common Issues & Troubleshooting
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {commonIssues.map((item, index) => (
              <AccordionItem key={index} value={`issue-${index}`} className="border-elec-yellow/20">
                <AccordionTrigger className="text-elec-light">{item.issue}</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div>
                    <h5 className="font-medium text-red-300 mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      Possible Causes:
                    </h5>
                    <ul className="text-sm text-elec-light/80 space-y-1">
                      {item.causes.map((cause, causeIndex) => (
                        <li key={causeIndex}>• {cause}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-300 mb-2 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Solutions:
                    </h5>
                    <ul className="text-sm text-elec-light/80 space-y-1">
                      {item.solutions.map((solution, solutionIndex) => (
                        <li key={solutionIndex}>• {solution}</li>
                      ))}
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* BS 7671 Requirements */}
      <InfoBox
        title="BS 7671:2018 Requirements"
        icon={<Shield className="h-5 w-5 text-elec-yellow" />}
        points={bs7671Requirements}
        as="section"
      />

      {/* Key Tips */}
      <Card className="bg-elec-card border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-elec-yellow" />
            Professional Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-green-300 mb-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Good Results Indicate:
              </h4>
              <ul className="text-sm text-elec-light/80 space-y-1">
                <li>• Consistent readings around the ring</li>
                <li>• R1 ≈ Rn (similar conductor sizes)</li>
                <li>• Cross-connection values match calculations</li>
                <li>• No readings above expected values</li>
              </ul>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-red-300 mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Warning Signs:
              </h4>
              <ul className="text-sm text-elec-light/80 space-y-1">
                <li>• High resistance at specific points</li>
                <li>• Significant difference between R1 and R2</li>
                <li>• Infinite readings (open circuit)</li>
                <li>• Inconsistent readings around ring</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RingCircuitGuidance;