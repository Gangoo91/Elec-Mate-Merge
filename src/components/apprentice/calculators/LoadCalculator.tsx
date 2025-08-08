
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Info, RotateCcw, BarChart4, Zap, Copy, Download } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionContent, MobileAccordionItem, MobileAccordionTrigger } from "@/components/ui/mobile-accordion";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileButton } from "@/components/ui/mobile-button";
import { ResultCard } from "@/components/ui/result-card";
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
          <BarChart4 className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Load Assessment Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate total electrical load with diversity factors for BS 7671 compliant installations.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Mobile-optimized accordion layout */}
        <div className="block lg:hidden">
          <MobileAccordion type="single" collapsible defaultValue="inputs">
            <MobileAccordionItem value="inputs">
              <MobileAccordionTrigger icon={<Calculator className="h-4 w-4" />}>
                Load Inputs
              </MobileAccordionTrigger>
              <MobileAccordionContent>
                <div className="space-y-4">
                  <MobileInput
                    label="Lighting Load"
                    type="number"
                    value={lighting}
                    onChange={(e) => setLighting(e.target.value)}
                    placeholder="e.g., 2000"
                    unit="W"
                    hint="No diversity factor applied to lighting"
                  />

                  <MobileInput
                    label="Socket Outlets"
                    type="number"
                    value={sockets}
                    onChange={(e) => setSockets(e.target.value)}
                    placeholder="e.g., 5000"
                    unit="W"
                    hint="Standard diversity: 0.6 (60%)"
                  />

                  <MobileInput
                    label="Heating Load"
                    type="number"
                    value={heating}
                    onChange={(e) => setHeating(e.target.value)}
                    placeholder="e.g., 8000"
                    unit="W"
                    hint="Standard diversity: 1.0 (100%)"
                  />

                  <MobileInput
                    label="Motor Load"
                    type="number"
                    value={motors}
                    onChange={(e) => setMotors(e.target.value)}
                    placeholder="e.g., 1500"
                    unit="W"
                    hint="Full load rating"
                  />

                  <MobileInput
                    label="Overall Diversity Factor"
                    type="number"
                    step="0.1"
                    min="0.1"
                    max="1"
                    value={diversityFactor}
                    onChange={(e) => setDiversityFactor(e.target.value)}
                    placeholder="e.g., 0.8"
                    hint="0.6-0.9 typical for mixed loads"
                  />

                  <div className="flex gap-3 pt-4">
<MobileButton
                      variant="elec"
                      size="wide"
                      onClick={calculateLoad}
                      disabled={!canCalculate}
                      icon={<Calculator className="h-4 w-4" />}
                    >
                      Calculate Load
                    </MobileButton>
                    <MobileButton
                      variant="outline"
                      size="icon"
                      onClick={reset}
                    >
                      <RotateCcw className="h-4 w-4" />
                    </MobileButton>
                  </div>
                </div>
              </MobileAccordionContent>
            </MobileAccordionItem>

            <MobileAccordionItem value="results">
              <MobileAccordionTrigger icon={<Zap className="h-4 w-4" />}>
                Load Assessment Results
              </MobileAccordionTrigger>
              <MobileAccordionContent>
                <div className="space-y-4">
                  {result ? (
                    <>
                      <ResultCard
                        title="Total Connected Load"
                        value={result.totalLoad}
                        unit="W"
                        subtitle={`${(result.totalLoad / 1000).toFixed(1)} kW`}
                        status="info"
                        className="mb-3"
                      />
                      
                      <ResultCard
                        title="After Diversity"
                        value={result.diversifiedLoad}
                        unit="W"
                        subtitle={`${(result.diversifiedLoad / 1000).toFixed(1)} kW`}
                        status="warning"
                        className="mb-3"
                      />
                      
                      <ResultCard
                        title="Recommended Supply"
                        value={result.recommendedSupply}
                        unit="W"
                        subtitle={`${(result.recommendedSupply / 1000).toFixed(1)} kW (25% safety margin)`}
                        status="success"
                        icon={<BarChart4 className="h-6 w-6" />}
                      />
                    </>
                  ) : (
                    <ResultCard
                      isEmpty={true}
                      emptyMessage="Enter load values to calculate total demand"
                      icon={<BarChart4 className="h-8 w-8" />}
                    />
                  )}
                </div>
              </MobileAccordionContent>
            </MobileAccordionItem>

            <MobileAccordionItem value="info">
              <MobileAccordionTrigger>
                BS 7671 Guidelines
              </MobileAccordionTrigger>
              <MobileAccordionContent>
                <Alert className="border-blue-500/20 bg-blue-500/10">
                  <Info className="h-4 w-4 text-blue-500" />
                  <AlertDescription className="text-blue-200 space-y-2">
                    <p><strong>Diversity Factors (BS 7671):</strong></p>
                    <p>• Lighting: 1.0 (100%)</p>
                    <p>• Socket outlets: 0.4-0.8 depending on type</p>
                    <p>• Water heating: 1.0 (100%)</p>
                    <p>• Space heating: 1.0 (100%)</p>
                    <p>• Motors: 1.0 plus appropriate safety factors</p>
                  </AlertDescription>
                </Alert>
              </MobileAccordionContent>
            </MobileAccordionItem>
          </MobileAccordion>
        </div>

        {/* Desktop layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <MobileInput
              label="Lighting Load"
              type="number"
              value={lighting}
              onChange={(e) => setLighting(e.target.value)}
              placeholder="e.g., 2000"
              unit="W"
              hint="No diversity factor applied to lighting"
            />

            <MobileInput
              label="Socket Outlets"
              type="number"
              value={sockets}
              onChange={(e) => setSockets(e.target.value)}
              placeholder="e.g., 5000"
              unit="W"
              hint="Standard diversity: 0.6 (60%)"
            />

            <MobileInput
              label="Heating Load"
              type="number"
              value={heating}
              onChange={(e) => setHeating(e.target.value)}
              placeholder="e.g., 8000"
              unit="W"
              hint="Standard diversity: 1.0 (100%)"
            />

            <MobileInput
              label="Motor Load"
              type="number"
              value={motors}
              onChange={(e) => setMotors(e.target.value)}
              placeholder="e.g., 1500"
              unit="W"
              hint="Full load rating"
            />

            <MobileInput
              label="Overall Diversity Factor"
              type="number"
              step="0.1"
              min="0.1"
              max="1"
              value={diversityFactor}
              onChange={(e) => setDiversityFactor(e.target.value)}
              placeholder="e.g., 0.8"
              hint="0.6-0.9 typical for mixed loads"
            />

            <div className="flex gap-3">
<MobileButton
                variant="elec"
                size="wide"
                onClick={calculateLoad}
                disabled={!canCalculate}
                icon={<Calculator className="h-4 w-4" />}
              >
                Calculate Load
              </MobileButton>
              <MobileButton
                variant="outline"
                size="icon"
                onClick={reset}
              >
                <RotateCcw className="h-4 w-4" />
              </MobileButton>
            </div>
          </div>

          <div className="space-y-4">
            {result ? (
              <>
                <ResultCard
                  title="Total Connected Load"
                  value={result.totalLoad}
                  unit="W"
                  subtitle={`${(result.totalLoad / 1000).toFixed(1)} kW`}
                  status="info"
                />
                
                <ResultCard
                  title="After Diversity"
                  value={result.diversifiedLoad}
                  unit="W"
                  subtitle={`${(result.diversifiedLoad / 1000).toFixed(1)} kW`}
                  status="warning"
                />
                
                <ResultCard
                  title="Recommended Supply"
                  value={result.recommendedSupply}
                  unit="W"
                  subtitle={`${(result.recommendedSupply / 1000).toFixed(1)} kW (25% safety margin)`}
                  status="success"
                  icon={<BarChart4 className="h-6 w-6" />}
                />
              </>
            ) : (
              <ResultCard
                isEmpty={true}
                emptyMessage="Enter load values to calculate total demand"
                icon={<BarChart4 className="h-8 w-8" />}
              />
            )}

            <Alert className="border-blue-500/20 bg-blue-500/10">
              <Info className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-blue-200">
                Calculations follow BS 7671 diversity factors and include 25% safety margin for supply sizing.
              </AlertDescription>
            </Alert>
          </div>
        </div>
        <div className="pt-2 flex gap-2 justify-end">
          <MobileButton variant="elec-outline" onClick={handleCopy} icon={<Copy className="h-4 w-4" />}>Copy</MobileButton>
          <MobileButton variant="elec-outline" onClick={handleExport} icon={<Download className="h-4 w-4" />}>Export</MobileButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoadCalculator;
