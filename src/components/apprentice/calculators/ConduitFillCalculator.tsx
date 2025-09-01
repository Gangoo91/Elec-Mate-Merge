import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileButton } from "@/components/ui/mobile-button";
import { MobileSelect, MobileSelectContent, MobileSelectItem, MobileSelectTrigger, MobileSelectValue } from "@/components/ui/mobile-select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calculator, Info, AlertTriangle, CheckCircle2, RotateCcw } from "lucide-react";

const ConduitFillCalculator = () => {
  const [conduitSize, setConduitSize] = useState("");
  const [conduitMaterial, setConduitMaterial] = useState("pvc");
  const [cableSize, setCableSize] = useState("");
  const [cableQuantity, setCableQuantity] = useState("");
  const [installationType, setInstallationType] = useState("straight");
  const [fillTarget, setFillTarget] = useState("40");
  const [result, setResult] = useState<{
    fillPercentage: number;
    maxCables: number;
    suitable: boolean;
    actualFillTarget: number;
    bendRadius: number;
    warnings: string[];
    pullTension: number;
  } | null>(null);

  // Enhanced conduit data with different materials - BS EN 61386-1
  const conduitData = {
    pvc: {
      "16": { diameter: 12.2, area: 117, bendRadius: 48 },
      "20": { diameter: 16.0, area: 201, bendRadius: 60 },
      "25": { diameter: 20.4, area: 327, bendRadius: 75 },
      "32": { diameter: 26.0, area: 531, bendRadius: 96 },
      "40": { diameter: 32.0, area: 804, bendRadius: 120 },
      "50": { diameter: 40.0, area: 1257, bendRadius: 150 },
      "63": { diameter: 52.0, area: 2124, bendRadius: 189 },
      "75": { diameter: 62.0, area: 3019, bendRadius: 225 },
      "100": { diameter: 82.0, area: 5281, bendRadius: 300 },
    },
    steel: {
      "16": { diameter: 13.0, area: 133, bendRadius: 60 },
      "20": { diameter: 16.8, area: 222, bendRadius: 75 },
      "25": { diameter: 21.2, area: 353, bendRadius: 90 },
      "32": { diameter: 27.2, area: 581, bendRadius: 120 },
      "40": { diameter: 33.2, area: 866, bendRadius: 150 },
      "50": { diameter: 41.2, area: 1332, bendRadius: 180 },
      "63": { diameter: 53.4, area: 2239, bendRadius: 225 },
      "75": { diameter: 63.4, area: 3157, bendRadius: 270 },
      "100": { diameter: 84.0, area: 5542, bendRadius: 360 },
    }
  };

  // Enhanced cable data for common UK cables
  const cableData = {
    "1.0": { diameter: 3.2, weight: 0.05 },
    "1.5": { diameter: 3.6, weight: 0.07 },
    "2.5": { diameter: 4.2, weight: 0.10 },
    "4.0": { diameter: 4.8, weight: 0.15 },
    "6.0": { diameter: 5.5, weight: 0.22 },
    "10.0": { diameter: 6.8, weight: 0.35 },
    "16.0": { diameter: 8.2, weight: 0.55 },
    "25.0": { diameter: 10.5, weight: 0.85 },
    "35.0": { diameter: 12.0, weight: 1.20 },
  };

  const calculateConduitFill = () => {
    const conduit = conduitData[conduitMaterial as keyof typeof conduitData][conduitSize as keyof typeof conduitData[keyof typeof conduitData]];
    const cable = cableData[cableSize as keyof typeof cableData];
    const quantity = parseInt(cableQuantity);
    const targetFill = parseFloat(fillTarget);

    if (!conduit || !cable || !quantity || !targetFill) return;

    const cableArea = Math.PI * Math.pow(cable.diameter / 2, 2);
    const totalCableArea = cableArea * quantity;
    const fillPercentage = (totalCableArea / conduit.area) * 100;
    
    // Determine actual fill target based on installation and cable count
    let actualFillTarget = targetFill;
    if (quantity === 1) actualFillTarget = 53;
    else if (quantity === 2) actualFillTarget = 31;
    else if (installationType === "bends") actualFillTarget = Math.min(targetFill, 35);
    
    // Calculate maximum cables that can fit
    const maxFillArea = conduit.area * (actualFillTarget / 100);
    const maxCables = Math.floor(maxFillArea / cableArea);
    
    const suitable = fillPercentage <= actualFillTarget;

    // Calculate approximate pulling tension (simplified)
    const totalWeight = quantity * cable.weight;
    const pullTension = totalWeight * 9.81 * 0.3; // Approximate friction coefficient

    // Generate warnings
    const warnings: string[] = [];
    if (fillPercentage > actualFillTarget) {
      warnings.push(`Fill exceeds ${actualFillTarget}% limit for this configuration`);
    }
    if (fillPercentage > 35 && installationType === "bends") {
      warnings.push("High fill percentage may cause pulling difficulties with bends");
    }
    if (quantity > 4 && parseFloat(cableSize) >= 10) {
      warnings.push("Large cables in groups may require derating consideration");
    }
    if (conduitMaterial === "pvc" && parseFloat(cableSize) >= 25) {
      warnings.push("Consider steel conduit for large cables and mechanical protection");
    }
    if (pullTension > 100) {
      warnings.push("High pulling tension - consider cable pulling lubricant");
    }

    setResult({
      fillPercentage: Math.round(fillPercentage * 10) / 10,
      maxCables,
      suitable,
      actualFillTarget,
      bendRadius: conduit.bendRadius,
      warnings,
      pullTension: Math.round(pullTension)
    });
  };

  const resetCalculator = () => {
    setConduitSize("");
    setConduitMaterial("pvc");
    setCableSize("");
    setCableQuantity("");
    setInstallationType("straight");
    setFillTarget("40");
    setResult(null);
  };

  return (
    <Card className="border border-muted/40 bg-card">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          <div>
            <CardTitle>Conduit Fill Calculator</CardTitle>
            <CardDescription className="mt-1">
              Calculate conduit fill percentage with BS EN 61386-1 compliance and practical installation guidance.
            </CardDescription>
          </div>
          <Badge variant="outline" className="ml-auto">
            BS EN 61386-1
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <MobileSelect value={conduitMaterial} onValueChange={setConduitMaterial}>
                <MobileSelectTrigger label="Conduit Material">
                  <MobileSelectValue placeholder="Select material" />
                </MobileSelectTrigger>
                <MobileSelectContent>
                  <MobileSelectItem value="pvc">PVC</MobileSelectItem>
                  <MobileSelectItem value="steel">Steel</MobileSelectItem>
                </MobileSelectContent>
              </MobileSelect>

              <MobileSelect value={conduitSize} onValueChange={setConduitSize}>
                <MobileSelectTrigger label="Conduit Size (mm)">
                  <MobileSelectValue placeholder="Select size" />
                </MobileSelectTrigger>
                <MobileSelectContent>
                  <MobileSelectItem value="16">16mm</MobileSelectItem>
                  <MobileSelectItem value="20">20mm</MobileSelectItem>
                  <MobileSelectItem value="25">25mm</MobileSelectItem>
                  <MobileSelectItem value="32">32mm</MobileSelectItem>
                  <MobileSelectItem value="40">40mm</MobileSelectItem>
                  <MobileSelectItem value="50">50mm</MobileSelectItem>
                  <MobileSelectItem value="63">63mm</MobileSelectItem>
                  <MobileSelectItem value="75">75mm</MobileSelectItem>
                  <MobileSelectItem value="100">100mm</MobileSelectItem>
                </MobileSelectContent>
              </MobileSelect>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <MobileSelect value={cableSize} onValueChange={setCableSize}>
                <MobileSelectTrigger label="Cable Size (mm²)">
                  <MobileSelectValue placeholder="Select cable size" />
                </MobileSelectTrigger>
                <MobileSelectContent>
                  <MobileSelectItem value="1.0">1.0mm²</MobileSelectItem>
                  <MobileSelectItem value="1.5">1.5mm²</MobileSelectItem>
                  <MobileSelectItem value="2.5">2.5mm²</MobileSelectItem>
                  <MobileSelectItem value="4.0">4.0mm²</MobileSelectItem>
                  <MobileSelectItem value="6.0">6.0mm²</MobileSelectItem>
                  <MobileSelectItem value="10.0">10.0mm²</MobileSelectItem>
                  <MobileSelectItem value="16.0">16.0mm²</MobileSelectItem>
                  <MobileSelectItem value="25.0">25.0mm²</MobileSelectItem>
                  <MobileSelectItem value="35.0">35.0mm²</MobileSelectItem>
                </MobileSelectContent>
              </MobileSelect>

              <MobileInput
                label="Number of Cables"
                type="number"
                min="1"
                value={cableQuantity}
                onChange={(e) => setCableQuantity(e.target.value)}
                placeholder="Enter quantity"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <MobileSelect value={installationType} onValueChange={setInstallationType}>
                <MobileSelectTrigger label="Installation Type">
                  <MobileSelectValue />
                </MobileSelectTrigger>
                <MobileSelectContent>
                  <MobileSelectItem value="straight">Straight Run</MobileSelectItem>
                  <MobileSelectItem value="bends">With Bends</MobileSelectItem>
                </MobileSelectContent>
              </MobileSelect>

              <MobileSelect value={fillTarget} onValueChange={setFillTarget}>
                <MobileSelectTrigger label="Fill Target (%)">
                  <MobileSelectValue />
                </MobileSelectTrigger>
                <MobileSelectContent>
                  <MobileSelectItem value="30">30% (Conservative)</MobileSelectItem>
                  <MobileSelectItem value="40">40% (Standard)</MobileSelectItem>
                  <MobileSelectItem value="50">50% (Maximum)</MobileSelectItem>
                </MobileSelectContent>
              </MobileSelect>
            </div>

            <div className="flex gap-2">
              <MobileButton 
                onClick={calculateConduitFill} 
                variant="elec"
                disabled={!conduitSize || !cableSize || !cableQuantity}
                icon={<Calculator className="h-4 w-4" />}
                className="flex-1"
              >
                Calculate
              </MobileButton>
              <MobileButton variant="elec-outline" onClick={resetCalculator}>
                <RotateCcw className="h-4 w-4" />
              </MobileButton>
            </div>
          </div>

          {/* Result Section */}
          <div className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-6 min-h-[300px]">
              {result ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    {result.suitable ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                    )}
                    <h3 className="text-lg font-semibold">Fill Analysis</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Fill Percentage</p>
                      <p className="text-2xl font-bold text-primary">{result.fillPercentage}%</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Target Fill</p>
                      <p className="text-xl font-semibold">{result.actualFillTarget}%</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Max Cables</p>
                      <p className="text-xl font-semibold">{result.maxCables}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Bend Radius</p>
                      <p className="text-xl font-semibold">{result.bendRadius}mm</p>
                    </div>
                  </div>

                  <div className={`p-3 rounded border ${
                    result.suitable 
                      ? 'bg-green-500/10 border-green-500/30 text-green-300' 
                      : 'bg-red-500/10 border-red-500/30 text-red-300'
                  }`}>
                    <p className="text-sm font-medium">
                      {result.suitable ? '✓ Suitable Installation' : '✗ Exceeds Fill Limit'}
                    </p>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <p>Current cables: {cableQuantity}</p>
                    <p>Pull tension: ~{result.pullTension}N</p>
                  </div>

                  {result.warnings.length > 0 && (
                    <Alert className="border-orange-500/20 bg-orange-500/10">
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                      <AlertDescription className="text-orange-200">
                        <div className="space-y-1">
                          {result.warnings.map((warning, index) => (
                            <div key={index}>• {warning}</div>
                          ))}
                        </div>
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <div className="text-center">
                    <Calculator className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>Select parameters to calculate fill</p>
                  </div>
                </div>
              )}
            </div>

            {/* What This Means Panel */}
            <Alert className="border-blue-500/20 bg-blue-500/10">
              <Info className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-blue-200">
                <div className="space-y-2">
                  <p className="font-medium">What This Means:</p>
                  <ul className="text-sm space-y-1">
                    <li>• Fill percentage affects cable pulling difficulty and heat dissipation</li>
                    <li>• High fill causes cables to jam during pulling and overheat</li>
                    <li>• Proper fill allows easier maintenance and future installations</li>
                    <li>• Consider pull tension and lubrication for difficult pulls</li>
                  </ul>
                </div>
              </AlertDescription>
            </Alert>

            {/* Practical Guidance */}
            <Alert className="border-amber-500/20 bg-amber-500/10">
              <Info className="h-4 w-4 text-amber-500" />
              <AlertDescription className="text-amber-200">
                <div className="space-y-2">
                  <p className="font-medium">Practical Guidance:</p>
                  <ul className="text-sm space-y-1">
                    <li>• Use cable pulling lubricant for high fill runs</li>
                    <li>• Install draw strings for future cable additions</li>
                    <li>• Consider larger conduit for cable grouping derating</li>
                    <li>• Plan cable routes to minimise sharp bends</li>
                  </ul>
                </div>
              </AlertDescription>
            </Alert>

            {/* Regs at a Glance */}
            <Alert className="border-green-500/20 bg-green-500/10">
              <Info className="h-4 w-4 text-green-500" />
              <AlertDescription className="text-green-200">
                <div className="space-y-2">
                  <p className="font-medium">Regs at a Glance:</p>
                  <ul className="text-sm space-y-1">
                    <li>• BS EN 61386-1: Conduit systems for cable management</li>
                    <li>• 53% max fill for 1 cable, 31% for 2 cables</li>
                    <li>• 40% max fill for 3+ cables in straight runs</li>
                    <li>• Reduce to 35% for runs with multiple bends</li>
                  </ul>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConduitFillCalculator;