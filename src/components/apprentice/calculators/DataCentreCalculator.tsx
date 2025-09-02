import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileButton } from "@/components/ui/mobile-button";
import { MobileSelectWrapper as MobileSelect } from "@/components/ui/mobile-select-wrapper";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calculator, RotateCcw, Server } from "lucide-react";
import { 
  calculateDataCentre, 
  redundancyOptions, 
  coolingMethodOptions, 
  facilityTypeOptions, 
  climateZoneOptions,
  type DataCentreResults 
} from "@/lib/datacentre";
import { DataCentreGuidance } from "./datacentre/DataCentreGuidance";

const DataCentreCalculator = () => {
  // Core inputs
  const [itLoad, setItLoad] = useState("");
  const [redundancy, setRedundancy] = useState("2n");
  const [coolingMethod, setCoolingMethod] = useState("air");
  const [coolingRatio, setCoolingRatio] = useState("1.5");
  const [lightsAndMisc, setLightsAndMisc] = useState("5");
  
  // Infrastructure inputs
  const [upsBatteryHours, setUpsBatteryHours] = useState("15");
  const [upsEfficiency, setUpsEfficiency] = useState("95");
  const [powerRedundancy, setPowerRedundancy] = useState("2n");
  const [coolingRedundancy, setCoolingRedundancy] = useState("n+1");
  
  // Advanced inputs
  const [energyCost, setEnergyCost] = useState("0.15");
  const [carbonFactor, setCarbonFactor] = useState("0.233");
  const [designMargin, setDesignMargin] = useState("20");
  const [facilityType, setFacilityType] = useState("enterprise");
  const [climateZone, setClimateZone] = useState("temperate");
  
  const [result, setResult] = useState<DataCentreResults | null>(null);


  const handleCalculate = () => {
    const baseItLoad = parseFloat(itLoad);
    
    if (!baseItLoad || baseItLoad <= 0) {
      return;
    }

    const inputs = {
      itLoad: baseItLoad,
      redundancy,
      coolingMethod,
      coolingRatio: parseFloat(coolingRatio) || 1.5,
      lightsAndMisc: parseFloat(lightsAndMisc) || 5,
      upsBatteryHours: parseFloat(upsBatteryHours) || 15,
      upsEfficiency: parseFloat(upsEfficiency) || 95,
      powerRedundancy,
      coolingRedundancy,
      energyCost: parseFloat(energyCost) || 0.15,
      carbonFactor: parseFloat(carbonFactor) || 0.233,
      designMargin: parseFloat(designMargin) || 20,
      facilityType,
      climateZone
    };

    const results = calculateDataCentre(inputs);
    setResult(results);
  };

  const reset = () => {
    setItLoad("");
    setRedundancy("2n");
    setCoolingMethod("air");
    setCoolingRatio("1.5");
    setLightsAndMisc("5");
    setUpsBatteryHours("15");
    setUpsEfficiency("95");
    setPowerRedundancy("2n");
    setCoolingRedundancy("n+1");
    setEnergyCost("0.15");
    setCarbonFactor("0.233");
    setDesignMargin("20");
    setFacilityType("enterprise");
    setClimateZone("temperate");
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5 text-elec-yellow" />
            Data Centre Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Core Parameters */}
          <div className="space-y-4">
            <h3 className="font-semibold text-elec-yellow">Core Parameters</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MobileInput
                label="IT Load"
                type="number"
                value={itLoad}
                onChange={(e) => setItLoad(e.target.value)}
                placeholder="e.g., 500"
                unit="kW"
              />
              <MobileSelect
                label="Overall Redundancy Level"
                placeholder="Select redundancy level"
                value={redundancy}
                onValueChange={setRedundancy}
                options={redundancyOptions}
              />
              <MobileSelect
                label="Facility Type"
                placeholder="Select facility type"
                value={facilityType}
                onValueChange={setFacilityType}
                options={facilityTypeOptions}
              />
              <MobileSelect
                label="Climate Zone"
                placeholder="Select climate zone"
                value={climateZone}
                onValueChange={setClimateZone}
                options={climateZoneOptions}
              />
            </div>
          </div>

          {/* Infrastructure Sizing */}
          <div className="space-y-4">
            <h3 className="font-semibold text-elec-yellow">Infrastructure Sizing</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MobileSelect
                label="Cooling Method"
                placeholder="Select cooling method"
                value={coolingMethod}
                onValueChange={setCoolingMethod}
                options={coolingMethodOptions}
              />
              <MobileInput
                label="Design Margin"
                type="number"
                value={designMargin}
                onChange={(e) => setDesignMargin(e.target.value)}
                placeholder="e.g., 20"
                unit="%"
                hint="Safety margin for equipment sizing"
              />
              <MobileSelect
                label="Power Redundancy"
                placeholder="Select power redundancy"
                value={powerRedundancy}
                onValueChange={setPowerRedundancy}
                options={redundancyOptions}
              />
              <MobileSelect
                label="Cooling Redundancy"
                placeholder="Select cooling redundancy"
                value={coolingRedundancy}
                onValueChange={setCoolingRedundancy}
                options={redundancyOptions}
              />
              <MobileInput
                label="UPS Battery Runtime"
                type="number"
                value={upsBatteryHours}
                onChange={(e) => setUpsBatteryHours(e.target.value)}
                placeholder="e.g., 15"
                unit="minutes"
              />
              <MobileInput
                label="UPS Efficiency"
                type="number"
                value={upsEfficiency}
                onChange={(e) => setUpsEfficiency(e.target.value)}
                placeholder="e.g., 95"
                unit="%"
              />
            </div>
          </div>

          {/* Advanced Parameters */}
          <div className="space-y-4">
            <h3 className="font-semibold text-elec-yellow">Advanced Parameters</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MobileInput
                label="Lights & Misc Load"
                type="number"
                value={lightsAndMisc}
                onChange={(e) => setLightsAndMisc(e.target.value)}
                placeholder="e.g., 5"
                unit="%"
              />
              <MobileInput
                label="Energy Cost"
                type="number"
                value={energyCost}
                onChange={(e) => setEnergyCost(e.target.value)}
                placeholder="e.g., 0.15"
                unit="£/kWh"
                step="0.01"
              />
              <MobileInput
                label="Carbon Factor"
                type="number"
                value={carbonFactor}
                onChange={(e) => setCarbonFactor(e.target.value)}
                placeholder="e.g., 0.233"
                unit="kg CO2e/kWh"
                step="0.001"
                hint="UK grid carbon intensity"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <MobileButton 
              onClick={handleCalculate} 
              variant="elec"
              size="wide"
              className="sm:flex-1"
            >
              <Calculator className="w-4 h-4 mr-2" />
              Calculate Data Centre
            </MobileButton>
            <MobileButton 
              onClick={reset} 
              variant="outline" 
              size="default"
              className="sm:w-auto"
            >
              <RotateCcw className="w-4 h-4" />
            </MobileButton>
          </div>
        </CardContent>
      </Card>

      {/* Results and Guidance */}
      {result && <DataCentreGuidance results={result} />}

      {/* Information Alert */}
      <Alert>
        <Server className="h-4 w-4" />
        <AlertDescription>
          This calculator provides comprehensive data centre design guidance including load analysis, 
          efficiency metrics, annual consumption, costs, and regulatory compliance. Results require 
          professional engineering validation for critical infrastructure projects.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default DataCentreCalculator;