
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileButton } from "@/components/ui/mobile-button";
import { MobileInputWrapper } from "@/components/ui/mobile-input-wrapper";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { ResultCard } from "@/components/ui/result-card";
import WhyThisMatters from "@/components/common/WhyThisMatters";
import { Calculator, Car, Zap, AlertTriangle, CheckCircle, Info, PoundSterling, Clock } from "lucide-react";
import { calculateEVCharging, type EVCalculationInputs } from "@/lib/ev-calculations";
import { CHARGER_TYPES, EARTHING_SYSTEMS, DIVERSITY_FACTORS, INSTALLATION_LOCATIONS } from "@/lib/ev-constants";
import { formatCurrency } from "@/lib/format";
import { toast } from "@/hooks/use-toast";

const EVChargingCalculator = () => {
  const [inputs, setInputs] = useState({
    batteryCapacity: "",
    chargerType: "7kw-ac" as keyof typeof CHARGER_TYPES,
    currentCharge: "20",
    targetCharge: "80",
    electricityRate: "0.30",
    diversityFactor: "1.0",
    supplyType: "tn-c-s" as keyof typeof EARTHING_SYSTEMS,
    runLength: "20",
    ambientTemp: "30",
    installationLocation: "external",
    existingLoadCurrent: "0"
  });

  const [results, setResults] = useState<ReturnType<typeof calculateEVCharging> | null>(null);

  const calculateEVChargingResults = () => {
    const calculationInputs: EVCalculationInputs = {
      batteryCapacity: parseFloat(inputs.batteryCapacity),
      chargerType: inputs.chargerType,
      currentCharge: parseFloat(inputs.currentCharge),
      targetCharge: parseFloat(inputs.targetCharge),
      electricityRate: parseFloat(inputs.electricityRate),
      diversityFactor: parseFloat(inputs.diversityFactor),
      supplyType: inputs.supplyType,
      runLength: parseFloat(inputs.runLength),
      ambientTemp: parseFloat(inputs.ambientTemp),
      installationLocation: inputs.installationLocation,
      existingLoadCurrent: parseFloat(inputs.existingLoadCurrent)
    };

    // Validate inputs
    if (!calculationInputs.batteryCapacity || calculationInputs.currentCharge >= calculationInputs.targetCharge) {
      toast({
        title: "Invalid Input",
        description: "Please check your battery capacity and charge levels.",
        variant: "destructive"
      });
      return;
    }

    try {
      const calculationResults = calculateEVCharging(calculationInputs);
      setResults(calculationResults);
      
      if (!calculationResults.installationCompliant) {
        toast({
          title: "Installation Issues Detected",
          description: "The calculation shows potential compliance issues. Review the warnings below.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Calculation Complete",
          description: "EV charging requirements calculated successfully.",
          variant: "success"
        });
      }
    } catch (error) {
      toast({
        title: "Calculation Error",
        description: "Unable to complete calculation. Please check your inputs.",
        variant: "destructive"
      });
    }
  };

  const resetCalculator = () => {
    setInputs({
      batteryCapacity: "",
      chargerType: "7kw-ac",
      currentCharge: "20",
      targetCharge: "80",
      electricityRate: "0.30",
      diversityFactor: "1.0",
      supplyType: "tn-c-s",
      runLength: "20",
      ambientTemp: "30",
      installationLocation: "external",
      existingLoadCurrent: "0"
    });
    setResults(null);
  };

  const chargerOptions = Object.entries(CHARGER_TYPES).map(([key, value]) => ({
    value: key,
    label: value.label
  }));

  const earthingOptions = Object.entries(EARTHING_SYSTEMS).map(([key, value]) => ({
    value: key,
    label: value.label
  }));

  const diversityOptions = Object.entries(DIVERSITY_FACTORS).map(([key, value]) => ({
    value: value.value.toString(),
    label: value.label
  }));

  const locationOptions = Object.entries(INSTALLATION_LOCATIONS).map(([key, value]) => ({
    value: key,
    label: value.label
  }));

  return (
    <div className="space-y-6 bg-elec-gray min-h-screen p-4">
      <Card className="border-elec-yellow/20 bg-elec-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-elec-yellow">
            <Car className="h-5 w-5" />
            EV Charging Station Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Vehicle & Charging Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-elec-yellow border-b border-elec-yellow/20 pb-2">
              Vehicle & Charging Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <MobileInputWrapper
                label="Battery Capacity"
                placeholder="Enter vehicle battery capacity"
                value={inputs.batteryCapacity}
                onChange={(value) => setInputs({...inputs, batteryCapacity: value})}
                type="number"
                unit="kWh"
              />
              <MobileSelectWrapper
                label="Charger Type"
                placeholder="Select charger type"
                value={inputs.chargerType}
                onValueChange={(value) => setInputs({...inputs, chargerType: value as keyof typeof CHARGER_TYPES})}
                options={chargerOptions}
              />
              <MobileInputWrapper
                label="Current Charge"
                placeholder="Current battery level"
                value={inputs.currentCharge}
                onChange={(value) => setInputs({...inputs, currentCharge: value})}
                type="number"
                unit="%"
                min="0"
                max="100"
              />
              <MobileInputWrapper
                label="Target Charge"
                placeholder="Desired battery level"
                value={inputs.targetCharge}
                onChange={(value) => setInputs({...inputs, targetCharge: value})}
                type="number"
                unit="%"
                min="0"
                max="100"
              />
            </div>
          </div>

          {/* Installation Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-elec-yellow border-b border-elec-yellow/20 pb-2">
              Installation Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <MobileSelectWrapper
                label="Supply Type"
                placeholder="Select earthing system"
                value={inputs.supplyType}
                onValueChange={(value) => setInputs({...inputs, supplyType: value as keyof typeof EARTHING_SYSTEMS})}
                options={earthingOptions}
              />
              <MobileSelectWrapper
                label="Installation Location"
                placeholder="Select installation location"
                value={inputs.installationLocation}
                onValueChange={(value) => setInputs({...inputs, installationLocation: value})}
                options={locationOptions}
              />
              <MobileInputWrapper
                label="Cable Run Length"
                placeholder="Distance from consumer unit"
                value={inputs.runLength}
                onChange={(value) => setInputs({...inputs, runLength: value})}
                type="number"
                unit="m"
              />
              <MobileInputWrapper
                label="Ambient Temperature"
                placeholder="Installation ambient temperature"
                value={inputs.ambientTemp}
                onChange={(value) => setInputs({...inputs, ambientTemp: value})}
                type="number"
                unit="°C"
              />
            </div>
          </div>

          {/* Load & Cost Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-elec-yellow border-b border-elec-yellow/20 pb-2">
              Load & Cost Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <MobileSelectWrapper
                label="Diversity Factor"
                placeholder="Select diversity factor"
                value={inputs.diversityFactor}
                onValueChange={(value) => setInputs({...inputs, diversityFactor: value})}
                options={diversityOptions}
              />
              <MobileInputWrapper
                label="Existing Load Current"
                placeholder="Current installation load"
                value={inputs.existingLoadCurrent}
                onChange={(value) => setInputs({...inputs, existingLoadCurrent: value})}
                type="number"
                unit="A"
              />
              <MobileInputWrapper
                label="Electricity Rate"
                placeholder="Cost per unit of electricity"
                value={inputs.electricityRate}
                onChange={(value) => setInputs({...inputs, electricityRate: value})}
                type="number"
                step="0.01"
                unit="£/kWh"
              />
            </div>
          </div>

          {/* Calculate Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <MobileButton
              onClick={calculateEVChargingResults}
              variant="elec"
              size="default"
              className="sm:w-auto w-full"
            >
              <Calculator className="h-4 w-4 mr-2" />
              Calculate EV Charging
            </MobileButton>
            <MobileButton
              onClick={resetCalculator}
              variant="outline"
              size="default"
              className="sm:w-auto w-full"
            >
              Reset
            </MobileButton>
          </div>
        </CardContent>
      </Card>

      {results && (
        <div className="space-y-6">
          {/* Primary Results */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ResultCard
              title="Energy Required"
              value={results.energyRequired}
              unit="kWh"
              status={results.energyRequired > 50 ? "warning" : "success"}
              icon={<Zap className="h-5 w-5" />}
            />
            <ResultCard
              title="Charging Time"
              value={results.chargingTime}
              unit="hours"
              status={results.chargingTime > 8 ? "warning" : "success"}
              icon={<Clock className="h-5 w-5" />}
            />
            <ResultCard
              title="Charging Cost"
              value={formatCurrency(results.cost)}
              status={results.cost > 20 ? "warning" : "success"}
              icon={<PoundSterling className="h-5 w-5" />}
            />
            <ResultCard
              title="Installation Compliance"
              value={results.installationCompliant ? "Compliant" : "Issues Found"}
              status={results.installationCompliant ? "success" : "error"}
              icon={results.installationCompliant ? <CheckCircle className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
            />
          </div>

          {/* Technical Results */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ResultCard
              title="Peak Demand"
              value={results.peakDemand}
              unit="kW"
              subtitle="Maximum power requirement"
              status="success"
            />
            <ResultCard
              title="Circuit Current"
              value={results.circuitCurrent}
              unit="A"
              subtitle="Design current including safety factors"
              status={results.circuitCurrent > 32 ? "warning" : "success"}
            />
            <ResultCard
              title="Recommended Cable"
              value={results.recommendedCable}
              subtitle={`Voltage drop: ${results.voltageDrop.toFixed(1)}V (${((results.voltageDrop / 230) * 100).toFixed(1)}%)`}
              status={results.voltageDrop / 230 > 0.05 ? "warning" : "success"}
            />
            <ResultCard
              title="Earth Fault Loop"
              value={results.actualZs}
              unit="Ω"
              subtitle={`Max allowed: ${results.maxZs}Ω`}
              status={results.actualZs > results.maxZs ? "error" : "success"}
            />
            <ResultCard
              title="Protection Required"
              value={results.protectionRequired}
              subtitle="Required protective devices"
              status="info"
            />
          </div>

          {/* Review Summary */}
          <Card className="border-elec-yellow/20 bg-elec-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-elec-yellow">
                <Info className="h-5 w-5" />
                Installation Review Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="p-4 bg-elec-gray/50 rounded-lg border border-elec-yellow/10">
                  <h4 className="font-medium text-elec-yellow mb-2">Load Analysis</h4>
                  <p className="text-sm text-elec-light/90 leading-relaxed">{results.reviewFindings.loadAnalysis}</p>
                </div>
                <div className="p-4 bg-elec-gray/50 rounded-lg border border-elec-yellow/10">
                  <h4 className="font-medium text-elec-yellow mb-2">Cable Assessment</h4>
                  <p className="text-sm text-elec-light/90 leading-relaxed">{results.reviewFindings.cableAssessment}</p>
                </div>
                <div className="p-4 bg-elec-gray/50 rounded-lg border border-elec-yellow/10">
                  <h4 className="font-medium text-elec-yellow mb-2">Protection Compliance</h4>
                  <p className="text-sm text-elec-light/90 leading-relaxed">{results.reviewFindings.protectionCompliance}</p>
                </div>
                <div className="p-4 bg-elec-gray/50 rounded-lg border border-elec-yellow/10">
                  <h4 className="font-medium text-elec-yellow mb-2">Installation Requirements</h4>
                  <p className="text-sm text-elec-light/90 leading-relaxed">{results.reviewFindings.installationRequirements}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          {results.recommendations.length > 0 && (
            <WhyThisMatters
              title="Recommendations"
              points={results.recommendations}
            />
          )}

          {/* Warnings */}
          {results.warnings.length > 0 && (
            <Card className="border-red-500/30 bg-red-500/5">
              <CardHeader>
                <CardTitle className="text-red-300 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Installation Warnings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {results.warnings.map((warning, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                      <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                      <p className="text-red-200 text-sm leading-relaxed">{warning}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      <WhyThisMatters
        title="EV Charging Installation Requirements"
        points={[
          "Dedicated circuit with RCD protection (Type A or B) ensures safety and prevents nuisance tripping from vehicle charging systems",
          "DC fault protection required for AC charging points to detect dangerous DC leakage currents that standard RCDs cannot detect",
          "Earth electrode may be required for outdoor installations, particularly on TT earthing systems or long cable runs",
          "Load balancing considerations prevent supply overload when multiple charge points operate simultaneously",
          "BS EN 61851 series compliance ensures charging equipment meets rigorous safety and performance standards",
          "Building Regulations Part P notification required for new circuits and installations over 3.68kW capacity",
          "DNO notification for high-power installations prevents supply network issues and ensures grid stability"
        ]}
      />
    </div>
  );
};

export default EVChargingCalculator;
