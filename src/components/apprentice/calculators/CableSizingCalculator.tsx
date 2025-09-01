import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sigma, Calculator, RefreshCw, Zap, AlertCircle, CheckCircle2, Info } from "lucide-react";
import { useCableSizing } from "./cable-sizing/useCableSizing";
import CableSizingForm from "./cable-sizing/CableSizingInputs";
import CableSizingResult from "./cable-sizing/CableSizingResult";
import CableSizingInfo from "./cable-sizing/CableSizingInfo";
import SimpleValidationIndicator from "./SimpleValidationIndicator";
import CalculationReport from "./CalculationReport";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { SimpleValidator, SimpleValidationResult } from "@/services/simplifiedValidation";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const CableSizingCalculator = () => {
  const { toast } = useToast();
  const [validation, setValidation] = useState<SimpleValidationResult | null>(null);
  const [calculationInputs, setCalculationInputs] = useState<any>({});
  const [calculationResults, setCalculationResults] = useState<any>({});
  
  // Enhanced inputs for protective device integration
  const [protectiveDevice, setProtectiveDevice] = useState<string>("mcb");
  const [deviceRating, setDeviceRating] = useState<string>("32");
  const [designCurrent, setDesignCurrent] = useState<string>("");
  
  const {
    inputs,
    result,
    updateInput,
    setInstallationType,
    setCableType,
    calculateCableSize,
    resetCalculator,
  } = useCableSizing();

  // Calculate Ib ≤ In ≤ Iz compliance
  const calculateCompliance = () => {
    if (!designCurrent || !deviceRating || !result.recommendedCable) return null;
    
    const Ib = parseFloat(designCurrent); // Design current
    const In = parseFloat(deviceRating);  // Device rating  
    const Iz = result.recommendedCable.currentRating[inputs.installationType] || 0; // Cable capacity
    
    const ibInCompliant = Ib <= In;
    const inIzCompliant = In <= Iz;
    const overallCompliant = ibInCompliant && inIzCompliant;
    
    return {
      Ib,
      In, 
      Iz,
      ibInCompliant,
      inIzCompliant,
      overallCompliant,
      safetyMargin: Iz > 0 ? ((Iz - In) / Iz * 100) : 0
    };
  };

  // Enhanced validation with safety factors
  useEffect(() => {
    if (result.recommendedCable && !result.errors) {
      const current = parseFloat(inputs.current);
      const length = parseFloat(inputs.length);
      const ambientTemp = parseFloat((inputs as any).ambientTemp || '30');
      const cableGrouping = parseInt((inputs as any).cableGrouping || '1');
      
      const safetyValidation = SimpleValidator.validateCableSizing(
        current,
        result.recommendedCable.size,
        inputs.installationType,
        ambientTemp,
        cableGrouping,
        length
      );

      setValidation(safetyValidation);
      setCalculationInputs({
        current,
        length,
        ambientTemp,
        cableGrouping,
        installationType: inputs.installationType,
        cableType: inputs.cableType,
        loadType: (inputs as any).loadType || 'resistive',
        diversityFactor: parseFloat((inputs as any).diversityFactor || '1.0'),
        protectiveDevice,
        deviceRating: parseFloat(deviceRating)
      });
      
      setCalculationResults({
        recommendedCable: result.recommendedCable.size,
        currentRating: result.recommendedCable.currentRating[inputs.installationType],
        deratedCurrentRating: result.recommendedCable.currentRating[inputs.installationType] * 
                             safetyValidation.safetyFactors.temperatureDerating * 
                             safetyValidation.safetyFactors.groupingFactor,
        safetyMargin: safetyValidation.safetyFactors.safetyMargin,
        compliance: calculateCompliance()
      });

      const compliance = calculateCompliance();
      if (compliance && !compliance.overallCompliant) {
        toast({
          title: "⚠️ Ib ≤ In ≤ Iz Compliance Issue",
          description: "Circuit does not meet BS 7671 design requirements",
          variant: "destructive",
        });
      } else if (safetyValidation.criticalAlerts.length > 0) {
        toast({
          title: "⚠️ CRITICAL SAFETY ALERT",
          description: "Serious safety issues detected. Do not proceed with installation.",
          variant: "destructive",
        });
      } else if (safetyValidation.warnings.length > 0) {
        toast({
          title: "Cable Size Calculated with Warnings",
          description: "Please review safety warnings below",
          variant: "default",
        });
      } else {
        toast({
          title: "Cable Size Calculated Safely",
          description: `Recommended ${result.recommendedCable.size} cable with safety margin ${safetyValidation.safetyFactors.safetyMargin.toFixed(2)}`,
          variant: "default",
        });
      }
    }
  }, [result, inputs, protectiveDevice, deviceRating, designCurrent, toast]);

  const handleCalculate = () => {
    if (!inputs.current || !inputs.length) {
      toast({
        title: "Missing Required Inputs",
        description: "Please enter both current and cable length to calculate.",
        variant: "destructive",
      });
      return;
    }

    const currentValue = parseFloat(inputs.current);
    const lengthValue = parseFloat(inputs.length);

    if (currentValue <= 0 || lengthValue <= 0) {
      toast({
        title: "Invalid Input Values",
        description: "Current and length must be positive numbers.",
        variant: "destructive",
      });
      return;
    }

    calculateCableSize();
  };

  const handleReset = () => {
    resetCalculator();
    setValidation(null);
    setCalculationInputs({});
    setCalculationResults({});
    setProtectiveDevice("mcb");
    setDeviceRating("32");
    setDesignCurrent("");
  };

  const compliance = calculateCompliance();

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sigma className="h-5 w-5 text-primary" />
            <div>
              <CardTitle>Cable Sizing Calculator</CardTitle>
              <CardDescription className="mt-1">
                Professional cable sizing with BS 7671 compliance validation and protective device integration.
              </CardDescription>
            </div>
            <Badge variant="outline" className="ml-auto">
              BS 7671
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {/* Compliance Status */}
          {compliance && (
            <Alert className={`mb-6 ${compliance.overallCompliant ? 'border-green-500/20 bg-green-950/20' : 'border-red-500/20 bg-red-950/20'}`}>
              {compliance.overallCompliant ? (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-500" />
              )}
              <AlertDescription>
                <div className="font-medium mb-2">
                  {compliance.overallCompliant ? "BS 7671 Compliance: ✓ PASSED" : "BS 7671 Compliance: ✗ FAILED"}
                </div>
                <div className="text-sm grid grid-cols-3 gap-4">
                  <div>Ib = {compliance.Ib}A</div>
                  <div>In = {compliance.In}A</div>
                  <div>Iz = {compliance.Iz}A</div>
                </div>
                <div className="text-xs mt-1">
                  Ib ≤ In: {compliance.ibInCompliant ? "✓" : "✗"} | In ≤ Iz: {compliance.inIzCompliant ? "✓" : "✗"} | 
                  Safety margin: {compliance.safetyMargin.toFixed(1)}%
                </div>
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Enhanced Input Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-elec-yellow">Circuit Design Parameters</h3>
              
              {/* Protective Device Section */}
              <div className="space-y-4 p-4 border border-elec-yellow/40 rounded-lg bg-elec-dark/50">
                <h4 className="font-medium">Protective Device</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Device Type</Label>
                    <Select value={protectiveDevice} onValueChange={setProtectiveDevice}>
                      <SelectTrigger className="bg-elec-dark border-elec-yellow/40 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-elec-dark border-elec-yellow/40 z-50 text-white">
                        <SelectItem value="mcb">MCB</SelectItem>
                        <SelectItem value="rcbo">RCBO</SelectItem>
                        <SelectItem value="fuse">Fuse</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Device Rating (A)</Label>
                    <Select value={deviceRating} onValueChange={setDeviceRating}>
                      <SelectTrigger className="bg-elec-dark border-elec-yellow/40 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-elec-dark border-elec-yellow/40 z-50 text-white">
                        <SelectItem value="6">6A</SelectItem>
                        <SelectItem value="10">10A</SelectItem>
                        <SelectItem value="16">16A</SelectItem>
                        <SelectItem value="20">20A</SelectItem>
                        <SelectItem value="25">25A</SelectItem>
                        <SelectItem value="32">32A</SelectItem>
                        <SelectItem value="40">40A</SelectItem>
                        <SelectItem value="50">50A</SelectItem>
                        <SelectItem value="63">63A</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Design Current Ib (A)</Label>
                  <input
                    type="number"
                    step="0.1"
                    value={designCurrent}
                    onChange={(e) => setDesignCurrent(e.target.value)}
                    placeholder="Enter design current"
                    className="w-full px-3 py-2 bg-elec-dark border border-elec-yellow/40 rounded-md text-white"
                  />
                </div>
              </div>

              <Separator />

              <CableSizingForm
                inputs={inputs}
                errors={result.errors}
                updateInput={updateInput}
                setInstallationType={(type: string) => setInstallationType(type as any)}
                setCableType={setCableType}
                calculateCableSize={handleCalculate}
                resetCalculator={handleReset}
              />
            </div>
            
            <div className="flex flex-col space-y-4">
              <div className="rounded-md bg-elec-dark border border-elec-yellow/40 p-6 flex-grow flex flex-col min-h-[400px]">
                <CableSizingResult
                  recommendedCable={result.recommendedCable}
                  alternativeCables={result.alternativeCables}
                  errors={result.errors}
                  inputs={inputs}
                />
              </div>
              
              <CableSizingInfo />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Safety Validation Results */}
      <SimpleValidationIndicator validation={validation} calculationType="Cable Sizing" />

      {/* What This Means Panel */}
      <Alert className="border-blue-500/20 bg-blue-500/10">
        <Info className="h-4 w-4 text-blue-500" />
        <AlertDescription className="text-blue-200">
          <div className="space-y-2">
            <p className="font-medium">What This Means:</p>
            <ul className="text-sm space-y-1">
              <li>• Ib ≤ In ≤ Iz ensures safe circuit operation per BS 7671</li>
              <li>• Design current (Ib) must not exceed device rating (In)</li>
              <li>• Device rating (In) must not exceed cable capacity (Iz)</li>
              <li>• Safety margin provides protection against overload conditions</li>
            </ul>
          </div>
        </AlertDescription>
      </Alert>

      {/* BS 7671 Guidance */}
      <Alert className="border-green-500/20 bg-green-500/10">
        <Info className="h-4 w-4 text-green-500" />
        <AlertDescription className="text-green-200">
          <div className="space-y-2">
            <p className="font-medium">BS 7671 Regulations:</p>
            <ul className="text-sm space-y-1">
              <li>• Section 433: Overcurrent protection requirements</li>
              <li>• Appendix 4: Voltage drop limitations</li>
              <li>• Table 4D5: Current-carrying capacity and correction factors</li>
              <li>• Consider ambient temperature, grouping, and thermal insulation</li>
            </ul>
          </div>
        </AlertDescription>
      </Alert>

      {/* Detailed Calculation Report */}
      {validation && Object.keys(calculationResults).length > 0 && (
        <CalculationReport
          calculationType="Enhanced Cable Sizing"
          inputs={calculationInputs}
          results={calculationResults}
          validation={validation}
        />
      )}
    </div>
  );
};

export default CableSizingCalculator;