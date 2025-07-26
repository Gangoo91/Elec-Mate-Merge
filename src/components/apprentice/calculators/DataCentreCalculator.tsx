import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileButton } from "@/components/ui/mobile-button";
import { MobileSelectWrapper as MobileSelect } from "@/components/ui/mobile-select-wrapper";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calculator, RotateCcw, Server } from "lucide-react";

const DataCentreCalculator = () => {
  const [itLoad, setItLoad] = useState("");
  const [redundancy, setRedundancy] = useState("2n");
  const [efficiency, setEfficiency] = useState("90");
  const [coolingRatio, setCoolingRatio] = useState("1.5");
  const [lightsAndMisc, setLightsAndMisc] = useState("5");
  const [upsBatteryHours, setUpsBatteryHours] = useState("15");
  const [upsEfficiency, setUpsEfficiency] = useState("95");
  const [result, setResult] = useState<{
    totalItLoad?: number;
    coolingLoad?: number;
    lightsLoad?: number;
    totalFacilityLoad?: number;
    upsCapacity?: number;
    generatorCapacity?: number;
    batteryCapacity?: number;
    pue?: number;
    estimatedCost?: number;
  } | null>(null);

  const redundancyOptions = [
    { value: "n", label: "N (No Redundancy)" },
    { value: "n+1", label: "N+1 (Single Redundancy)" },
    { value: "2n", label: "2N (Full Redundancy)" },
    { value: "2n+1", label: "2N+1 (Beyond Redundancy)" }
  ];

  const calculateDataCentre = () => {
    const baseItLoad = parseFloat(itLoad);
    const upsEff = parseFloat(upsEfficiency) / 100;
    const facilityEff = parseFloat(efficiency) / 100;
    const coolingMultiplier = parseFloat(coolingRatio);
    const miscLoad = parseFloat(lightsAndMisc) / 100;
    const batteryHours = parseFloat(upsBatteryHours) / 60; // Convert minutes to hours

    if (!baseItLoad || !upsEff || !facilityEff || !coolingMultiplier) return;

    // Calculate redundancy multiplier
    let redundancyMultiplier = 1;
    switch (redundancy) {
      case "n": redundancyMultiplier = 1; break;
      case "n+1": redundancyMultiplier = 1.25; break;
      case "2n": redundancyMultiplier = 2; break;
      case "2n+1": redundancyMultiplier = 2.25; break;
    }

    // Calculate loads
    const totalItLoad = baseItLoad * redundancyMultiplier;
    const coolingLoad = totalItLoad * coolingMultiplier;
    const lightsLoad = totalItLoad * miscLoad;
    const totalFacilityLoad = totalItLoad + coolingLoad + lightsLoad;

    // Calculate UPS sizing (account for inefficiency)
    const upsCapacity = totalFacilityLoad / upsEff;

    // Generator sizing (125% of UPS capacity for starting loads)
    const generatorCapacity = upsCapacity * 1.25;

    // Battery capacity calculation (kWh)
    const batteryCapacity = totalFacilityLoad * batteryHours;

    // Power Usage Effectiveness (PUE)
    const pue = totalFacilityLoad / totalItLoad;

    // Rough cost estimation (£ per kW installed)
    const costPerKw = 15000; // £15k per kW for data centre infrastructure
    const estimatedCost = (upsCapacity / 1000) * costPerKw;

    setResult({
      totalItLoad,
      coolingLoad,
      lightsLoad,
      totalFacilityLoad,
      upsCapacity,
      generatorCapacity,
      batteryCapacity,
      pue,
      estimatedCost
    });
  };

  const reset = () => {
    setItLoad("");
    setRedundancy("2n");
    setEfficiency("90");
    setCoolingRatio("1.5");
    setLightsAndMisc("5");
    setUpsBatteryHours("15");
    setUpsEfficiency("95");
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Server className="h-5 w-5 text-elec-yellow" />
          Data Centre Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
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
            label="Redundancy Level"
            placeholder="Select redundancy level"
            value={redundancy}
            onValueChange={setRedundancy}
            options={redundancyOptions}
          />
          <MobileInput
            label="Cooling Ratio"
            type="number"
            value={coolingRatio}
            onChange={(e) => setCoolingRatio(e.target.value)}
            placeholder="e.g., 1.5"
            hint="Cooling load as ratio of IT load"
          />
          <MobileInput
            label="Lights & Misc Load"
            type="number"
            value={lightsAndMisc}
            onChange={(e) => setLightsAndMisc(e.target.value)}
            placeholder="e.g., 5"
            unit="%"
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

        <div className="flex flex-col sm:flex-row gap-2">
          <MobileButton 
            onClick={calculateDataCentre} 
            variant="elec"
            size="wide"
            className="sm:flex-1"
          >
            <Calculator className="w-4 h-4 mr-2" />
            Calculate Loads
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

        {result && (
          <div className="mt-6 p-4 bg-elec-dark rounded-lg border border-elec-yellow/20">
            <h3 className="font-semibold text-elec-yellow mb-3">Data Centre Results:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p>Total IT load: <span className="text-elec-yellow font-medium">{result.totalItLoad?.toFixed(0)} kW</span></p>
                <p>Cooling load: <span className="text-elec-yellow font-medium">{result.coolingLoad?.toFixed(0)} kW</span></p>
                <p>Lights & misc: <span className="text-elec-yellow font-medium">{result.lightsLoad?.toFixed(0)} kW</span></p>
                <p>Total facility load: <span className="text-elec-yellow font-medium">{result.totalFacilityLoad?.toFixed(0)} kW</span></p>
                <p>PUE: <span className="text-elec-yellow font-medium">{result.pue?.toFixed(2)}</span></p>
              </div>
              <div>
                <p>UPS capacity: <span className="text-elec-yellow font-medium">{result.upsCapacity?.toFixed(0)} kW</span></p>
                <p>Generator capacity: <span className="text-elec-yellow font-medium">{result.generatorCapacity?.toFixed(0)} kW</span></p>
                <p>Battery capacity: <span className="text-elec-yellow font-medium">{result.batteryCapacity?.toFixed(0)} kWh</span></p>
                <p>Estimated cost: <span className="text-elec-yellow font-medium">£{result.estimatedCost?.toLocaleString()}</span></p>
              </div>
            </div>
          </div>
        )}

        <Alert>
          <Server className="h-4 w-4" />
          <AlertDescription>
            PUE of 1.5-2.0 is typical. Modern efficient data centres achieve PUE below 1.3. Costs include UPS, cooling, and infrastructure.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default DataCentreCalculator;