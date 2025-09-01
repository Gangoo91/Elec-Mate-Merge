
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileButton } from "@/components/ui/mobile-button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BarChart4, Info, Calculator, RotateCcw, Copy, Download } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { usePersistentState } from "@/hooks/usePersistentState";
import { copyToClipboard, downloadJSON } from "@/lib/calc-utils";

const LoadCalculator = () => {
  const [lighting, setLighting] = usePersistentState<string>("calc.load.lighting", "");
  const [sockets, setSockets] = usePersistentState<string>("calc.load.sockets", "");
  const [heating, setHeating] = usePersistentState<string>("calc.load.heating", "");
  const [motors, setMotors] = usePersistentState<string>("calc.load.motors", "");
  const [diversityFactor, setDiversityFactor] = usePersistentState<string>("calc.load.diversity", "0.8");
  const [result, setResult] = usePersistentState<{
    totalLoad: number;
    diversifiedLoad: number;
    recommendedSupply: number;
  } | null>("calc.load.result", null);

  const canCalculate = (() => {
    const vals = [lighting, sockets, heating, motors].map((v) => parseFloat(v) || 0);
    const diversity = parseFloat(diversityFactor);
    const anyPositive = vals.some((n) => n > 0);
    return anyPositive && diversity > 0 && diversity <= 1;
  })();

  const calculateLoad = () => {
    const lightingLoad = parseFloat(lighting) || 0;
    const socketsLoad = parseFloat(sockets) || 0;
    const heatingLoad = parseFloat(heating) || 0;
    const motorsLoad = parseFloat(motors) || 0;
    const diversity = parseFloat(diversityFactor);

    const totalLoad = lightingLoad + socketsLoad + heatingLoad + motorsLoad;
    const diversifiedLoad = totalLoad * diversity;
    const recommendedSupply = Math.ceil(diversifiedLoad * 1.25); // 25% safety margin

    setResult({
      totalLoad,
      diversifiedLoad,
      recommendedSupply
    });
  };

  const reset = () => {
    setLighting("");
    setSockets("");
    setHeating("");
    setMotors("");
    setDiversityFactor("0.8");
    setResult(null);
  };

  const handleCopy = async () => {
    const payload = {
      inputs: { lighting, sockets, heating, motors, diversityFactor },
      result,
      standard: "BS 7671",
    };
    await copyToClipboard(JSON.stringify(payload, null, 2));
  };

  const handleExport = () => {
    const payload = {
      inputs: { lighting, sockets, heating, motors, diversityFactor },
      result,
      standard: "BS 7671",
    };
    downloadJSON(payload, "load-calculation.json");
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <BarChart4 className="h-5 w-5 text-primary" />
          <div>
            <CardTitle>Load Assessment Calculator</CardTitle>
            <CardDescription className="mt-1">
              Calculate total electrical load with diversity factors for BS 7671 compliant installations.
            </CardDescription>
          </div>
          <Badge variant="outline" className="ml-auto">
            BS 7671
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <MobileInput
              label="Lighting Load (W)"
              type="number"
              value={lighting}
              onChange={(e) => setLighting(e.target.value)}
              placeholder="e.g., 2000"
              unit="W"
            />

            <MobileInput
              label="Socket Outlets (W)"
              type="number"
              value={sockets}
              onChange={(e) => setSockets(e.target.value)}
              placeholder="e.g., 5000"
              unit="W"
            />

            <MobileInput
              label="Heating Load (W)"
              type="number"
              value={heating}
              onChange={(e) => setHeating(e.target.value)}
              placeholder="e.g., 8000"
              unit="W"
            />

            <MobileInput
              label="Motor Load (W)"
              type="number"
              value={motors}
              onChange={(e) => setMotors(e.target.value)}
              placeholder="e.g., 1500"
              unit="W"
            />

            <MobileInput
              label="Diversity Factor"
              type="number"
              step="0.1"
              min="0.1"
              max="1"
              value={diversityFactor}
              onChange={(e) => setDiversityFactor(e.target.value)}
              placeholder="e.g., 0.8"
            />

            <div className="flex gap-2">
              <MobileButton
                onClick={calculateLoad}
                className="flex-1"
                variant="elec"
                icon={<Calculator className="h-4 w-4" />}
                disabled={!canCalculate}
              >
                Calculate
              </MobileButton>
              <MobileButton variant="elec-outline" onClick={reset}>
                <RotateCcw className="h-4 w-4" />
              </MobileButton>
            </div>

            <div className="flex gap-2 pt-2">
              <MobileButton variant="elec-outline" onClick={handleCopy} className="flex-1" icon={<Copy className="h-4 w-4" />}>
                Copy
              </MobileButton>
              <MobileButton variant="elec-outline" onClick={handleExport} className="flex-1" icon={<Download className="h-4 w-4" />}>
                Export
              </MobileButton>
            </div>
          </div>

          {/* Result Section */}
          <div className="space-y-4">
            <div className="rounded-md bg-muted/50 p-6 min-h-[200px]">
              {result ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">Load Assessment Results</h3>
                    <Badge variant="secondary" className="mb-4">
                      BS 7671 Compliant
                    </Badge>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-1 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Total Connected Load:</span>
                      <div className="font-mono text-primary">{result.totalLoad.toLocaleString()} W ({(result.totalLoad / 1000).toFixed(1)} kW)</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">After Diversity ({parseFloat(diversityFactor) * 100}%):</span>
                      <div className="font-mono text-primary">{result.diversifiedLoad.toLocaleString()} W ({(result.diversifiedLoad / 1000).toFixed(1)} kW)</div>
                    </div>
                    <div className="pt-2 border-t border-primary/20">
                      <span className="text-muted-foreground">Recommended Supply:</span>
                      <div className="font-mono text-primary text-lg">{result.recommendedSupply.toLocaleString()} W ({(result.recommendedSupply / 1000).toFixed(1)} kW)</div>
                      <div className="text-xs text-muted-foreground mt-1">Includes 25% safety margin</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Estimated Current (230V):</span>
                      <div className="font-mono text-primary">{(result.diversifiedLoad / 230).toFixed(1)} A</div>
                      <div className="text-xs text-muted-foreground mt-1">Per phase current for single-phase supply</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Enter load values to calculate total demand
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
                    <li>• Total load determines cable and protective device sizing</li>
                    <li>• Diversity prevents over-sizing of installation components</li>
                    <li>• Current calculation helps determine supply adequacy</li>
                    <li>• Safety margin protects against load growth</li>
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
                    <li>• BS 7671 Table 311: Standard diversity factors</li>
                    <li>• Lighting: 66% after 5A plus 25% remainder</li>
                    <li>• Socket outlets: Variable based on floor area</li>
                    <li>• Water heating: 100% - no diversity allowed</li>
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

export default LoadCalculator;
