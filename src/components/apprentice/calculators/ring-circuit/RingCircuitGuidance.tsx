import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, AlertTriangle, CheckCircle, Calculator, Shield, Lightbulb, Wrench } from "lucide-react";
import InfoBox from "@/components/common/InfoBox";

const RingCircuitGuidance = () => {
  const testProcedureSteps = [
    "Isolate the circuit at the consumer unit and verify isolation with approved voltage indicator",
    "Remove all loads: unplug appliances, switch off FCUs, and inform occupants",
    "Identify the ring circuit conductors at the consumer unit (typically 2 × 2.5mm² cables)",
    "Connect live ends together (L1 to L2) and neutral ends together (N1 to N2) using test leads",
    "Measure end-to-end resistance between live conductors using calibrated low-resistance ohmmeter",
    "Measure end-to-end resistance between earth (CPC) conductors",
    "Measure end-to-end resistance between neutral conductors",
    "Connect one end of live to one end of neutral, then measure L/N at opposite ends",
    "Connect one end of live to one end of CPC, then measure L/E at opposite ends",
    "Connect one end of neutral to one end of CPC, then measure N/E at opposite ends",
    "Calculate individual leg resistances (R1, R2, Rn) by dividing end-to-end by 4",
    "Verify cross-connection readings match calculated values within tolerance",
    "Test at multiple socket outlets to confirm ring integrity throughout circuit"
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
    "Maximum floor area: 100m² per ring (Regulation 433.1.204)",
    "Minimum cable size: 2.5mm² live conductors for 32A ring circuits",
    "Maximum protective device: 32A Type B MCB or 30mA RCBO (433.1.204)",
    "Minimum CPC size: 1.5mm² when live conductors are 2.5mm² (Table 54.7)",
    "Continuity testing mandatory before energising (Section 612.2)",
    "Earth fault loop impedance verification (Section 612.9)",
    "Maximum Zs values: 1.44Ω for 32A Type B MCB (Table 41.3)",
    "RCD protection required for socket outlets (Section 411.3.3)",
    "Unfused spurs limited to single or twin socket outlet (433.1.204)",
    "Cable installation to Part 2 requirements including safe zones (Section 522)"
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
          <Accordion type="single" collapsible className="w-full space-y-2">
            <AccordionItem value="r1-r2" className="border-elec-yellow/20 bg-elec-dark/20 rounded-lg px-4">
              <AccordionTrigger className="text-elec-light hover:text-elec-yellow text-left py-4">
                R1 + R2 Calculation
              </AccordionTrigger>
              <AccordionContent className="text-elec-light/80 space-y-3 pb-4">
                <p className="text-sm sm:text-base leading-relaxed">
                  R1 + R2 represents the resistance of the live and earth conductors combined. For a ring circuit:
                </p>
                <div className="bg-elec-dark rounded-lg p-3 sm:p-4 font-mono text-xs sm:text-sm border border-elec-yellow/20">
                  R1 + R2 (at midpoint) = (End-to-End Live + End-to-End CPC) ÷ 4
                </div>
                <p className="text-xs sm:text-sm leading-relaxed">
                  This is because at the midpoint of the ring, you have two parallel paths, each with half the total resistance.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="end-to-end" className="border-elec-yellow/20 bg-elec-dark/20 rounded-lg px-4">
              <AccordionTrigger className="text-elec-light hover:text-elec-yellow text-left py-4">
                End-to-End Resistance
              </AccordionTrigger>
              <AccordionContent className="text-elec-light/80 space-y-3 pb-4">
                <p className="text-sm sm:text-base leading-relaxed">
                  End-to-end resistance is measured across the entire loop to confirm continuity:
                </p>
                <div className="bg-elec-dark rounded-lg p-3 sm:p-4 font-mono text-xs sm:text-sm border border-elec-yellow/20">
                  Individual Leg Resistance = End-to-End Reading ÷ 4
                </div>
                <p className="text-xs sm:text-sm leading-relaxed">
                  This confirms the ring is continuous and helps identify any high resistance joints.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="cross-connection" className="border-elec-yellow/20 bg-elec-dark/20 rounded-lg px-4">
              <AccordionTrigger className="text-elec-light hover:text-elec-yellow text-left py-4">
                Cross-Connection Testing
              </AccordionTrigger>
              <AccordionContent className="text-elec-light/80 space-y-3 pb-4">
                <p className="text-sm sm:text-base leading-relaxed">
                  Cross-connection tests verify the ring is properly wired and not interconnected with other circuits:
                </p>
                <ul className="space-y-2 text-xs sm:text-sm">
                  <li className="flex items-start gap-2">
                    <span className="flex-shrink-0 w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2"></span>
                    <span><strong>Live to Neutral:</strong> Should equal R1 + Rn</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex-shrink-0 w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2"></span>
                    <span><strong>Live to CPC:</strong> Should equal R1 + R2</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex-shrink-0 w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2"></span>
                    <span><strong>Neutral to CPC:</strong> Should equal Rn + R2</span>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="cable-calculations" className="border-elec-yellow/20 bg-elec-dark/20 rounded-lg px-4">
              <AccordionTrigger className="text-elec-light hover:text-elec-yellow text-left py-4">
                Cable Size Impact & Temperature Correction
              </AccordionTrigger>
              <AccordionContent className="text-elec-light/80 space-y-3 pb-4">
                <p className="text-sm sm:text-base leading-relaxed">
                  Cable size significantly affects resistance values. Expected resistances at 20°C:
                </p>
                <div className="bg-elec-dark rounded-lg p-3 sm:p-4 text-xs sm:text-sm border border-elec-yellow/20 space-y-2">
                  <div><strong>2.5mm² T&E:</strong> Live: 7.41mΩ/m, CPC (1.5mm²): 12.1mΩ/m</div>
                  <div><strong>4.0mm² T&E:</strong> Live: 4.61mΩ/m, CPC (2.5mm²): 7.41mΩ/m</div>
                  <div><strong>6.0mm² T&E:</strong> Live: 3.08mΩ/m, CPC (4.0mm²): 4.61mΩ/m</div>
                  <div><strong>10mm² T&E:</strong> Live: 1.83mΩ/m, CPC (6.0mm²): 3.08mΩ/m</div>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 sm:p-4">
                  <p className="text-xs sm:text-sm"><strong>Temperature Correction:</strong></p>
                  <p className="text-xs sm:text-sm">Resistance increases by 0.393% per °C above 20°C</p>
                  <div className="font-mono text-xs mt-2">R(temp) = R(20°C) × [1 + 0.00393 × (T - 20)]</div>
                </div>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-green-300 mb-3 flex items-center gap-2 text-sm sm:text-base">
                <CheckCircle className="h-4 w-4 flex-shrink-0" />
                Good Results Indicate:
              </h4>
              <ul className="text-xs sm:text-sm text-elec-light/80 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-green-400 rounded-full mt-2"></span>
                  <span>Consistent readings around the ring</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-green-400 rounded-full mt-2"></span>
                  <span>R1 ≈ Rn (similar conductor sizes)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-green-400 rounded-full mt-2"></span>
                  <span>Cross-connection values match calculations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-green-400 rounded-full mt-2"></span>
                  <span>Values within cable specification tolerances</span>
                </li>
              </ul>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-red-300 mb-3 flex items-center gap-2 text-sm sm:text-base">
                <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                Warning Signs:
              </h4>
              <ul className="text-xs sm:text-sm text-elec-light/80 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-red-400 rounded-full mt-2"></span>
                  <span>High resistance at specific points</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-red-400 rounded-full mt-2"></span>
                  <span>Significant difference between R1 and R2</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-red-400 rounded-full mt-2"></span>
                  <span>Infinite readings (open circuit)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-red-400 rounded-full mt-2"></span>
                  <span>Values significantly off from cable specs</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RingCircuitGuidance;