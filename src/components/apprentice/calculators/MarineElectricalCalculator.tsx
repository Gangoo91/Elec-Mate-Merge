import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileButton } from "@/components/ui/mobile-button";
import { MobileSelect, MobileSelectContent, MobileSelectItem, MobileSelectTrigger, MobileSelectValue } from "@/components/ui/mobile-select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calculator, RotateCcw, Anchor } from "lucide-react";

const MarineElectricalCalculator = () => {
  const [vesselLength, setVesselLength] = useState("");
  const [vesselType, setVesselType] = useState("pleasure");
  const [navigationLights, setNavigationLights] = useState("");
  const [cabinLights, setCabinLights] = useState("");
  const [electronics, setElectronics] = useState("");
  const [engineLoad, setEngineLoad] = useState("");
  const [shoreConnection, setShoreConnection] = useState("16");
  const [batteryVoltage, setBatteryVoltage] = useState("12");
  const [result, setResult] = useState<{
    totalLoad?: number;
    recommendedBatteryCapacity?: number;
    chargingCurrent?: number;
    cableSize?: string;
    shoreCapacity?: number;
    marineCertification?: string;
  } | null>(null);

  const vesselTypes = [
    { value: "pleasure", label: "Pleasure Craft" },
    { value: "commercial", label: "Commercial Vessel" },
    { value: "fishing", label: "Fishing Vessel" },
    { value: "cargo", label: "Cargo Ship" }
  ];

  const shoreOptions = [
    { value: "16", label: "16A Single Phase" },
    { value: "32", label: "32A Single Phase" },
    { value: "63", label: "63A Three Phase" },
    { value: "125", label: "125A Three Phase" }
  ];

  const voltageOptions = [
    { value: "12", label: "12V DC" },
    { value: "24", label: "24V DC" },
    { value: "48", label: "48V DC" }
  ];

  const calculateMarineElectrical = () => {
    const length = parseFloat(vesselLength);
    const navLights = parseFloat(navigationLights) || 0;
    const cabinLoad = parseFloat(cabinLights) || 0;
    const electronicLoad = parseFloat(electronics) || 0;
    const engine = parseFloat(engineLoad) || 0;
    const voltage = parseFloat(batteryVoltage);
    const shore = parseFloat(shoreConnection);

    if (!length || !voltage) return;

    // Calculate total DC load
    const totalLoad = navLights + cabinLoad + electronicLoad + engine;

    // Marine battery sizing (typically 3-4x daily consumption)
    const dailyConsumption = totalLoad * 8; // 8 hours average usage
    const batteryCapacity = dailyConsumption * 3.5; // Ah

    // Charging current (10-20% of battery capacity)
    const chargingCurrent = batteryCapacity * 0.15;

    // Cable sizing based on current and voltage drop (3% max)
    let cableSize = "2.5mm²";
    const current = totalLoad / voltage;
    if (current > 15) cableSize = "4mm²";
    if (current > 25) cableSize = "6mm²";
    if (current > 40) cableSize = "10mm²";
    if (current > 60) cableSize = "16mm²";

    // Shore power capacity
    const shoreCapacity = shore * 230; // Watts

    // Marine certification requirements
    let certification = "RCD Category C";
    if (length > 12) certification = "RCD Category B";
    if (length > 24) certification = "MCA Category 2";
    if (vesselType === "commercial") certification = "MCA Commercial Code";

    setResult({
      totalLoad,
      recommendedBatteryCapacity: batteryCapacity,
      chargingCurrent,
      cableSize,
      shoreCapacity,
      marineCertification: certification
    });
  };

  const reset = () => {
    setVesselLength("");
    setVesselType("pleasure");
    setNavigationLights("");
    setCabinLights("");
    setElectronics("");
    setEngineLoad("");
    setShoreConnection("16");
    setBatteryVoltage("12");
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Anchor className="h-5 w-5 text-elec-yellow" />
          Marine Electrical Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MobileInput
            label="Vessel Length"
            type="number"
            value={vesselLength}
            onChange={(e) => setVesselLength(e.target.value)}
            placeholder="e.g., 12"
            unit="m"
          />
          <MobileSelect value={vesselType} onValueChange={setVesselType}>
            <MobileSelectTrigger label="Vessel Type">
              <MobileSelectValue />
            </MobileSelectTrigger>
            <MobileSelectContent>
              {vesselTypes.map((option) => (
                <MobileSelectItem key={option.value} value={option.value}>
                  {option.label}
                </MobileSelectItem>
              ))}
            </MobileSelectContent>
          </MobileSelect>
          <MobileInput
            label="Navigation Lights"
            type="number"
            value={navigationLights}
            onChange={(e) => setNavigationLights(e.target.value)}
            placeholder="e.g., 25"
            unit="W"
          />
          <MobileInput
            label="Cabin Lighting"
            type="number"
            value={cabinLights}
            onChange={(e) => setCabinLights(e.target.value)}
            placeholder="e.g., 100"
            unit="W"
          />
          <MobileInput
            label="Electronics Load"
            type="number"
            value={electronics}
            onChange={(e) => setElectronics(e.target.value)}
            placeholder="e.g., 150"
            unit="W"
          />
          <MobileInput
            label="Engine Systems"
            type="number"
            value={engineLoad}
            onChange={(e) => setEngineLoad(e.target.value)}
            placeholder="e.g., 50"
            unit="W"
          />
          <MobileSelect value={batteryVoltage} onValueChange={setBatteryVoltage}>
            <MobileSelectTrigger label="Battery Voltage">
              <MobileSelectValue />
            </MobileSelectTrigger>
            <MobileSelectContent>
              {voltageOptions.map((option) => (
                <MobileSelectItem key={option.value} value={option.value}>
                  {option.label}
                </MobileSelectItem>
              ))}
            </MobileSelectContent>
          </MobileSelect>
          <MobileSelect value={shoreConnection} onValueChange={setShoreConnection}>
            <MobileSelectTrigger label="Shore Power">
              <MobileSelectValue />
            </MobileSelectTrigger>
            <MobileSelectContent>
              {shoreOptions.map((option) => (
                <MobileSelectItem key={option.value} value={option.value}>
                  {option.label}
                </MobileSelectItem>
              ))}
            </MobileSelectContent>
          </MobileSelect>
        </div>

        <div className="flex gap-2">
          <MobileButton onClick={calculateMarineElectrical} className="flex-1">
            <Calculator className="w-4 h-4 mr-2" />
            Calculate Marine Load
          </MobileButton>
          <MobileButton onClick={reset} variant="outline">
            <RotateCcw className="w-4 h-4" />
          </MobileButton>
        </div>

        {result && (
          <div className="mt-6 p-4 bg-elec-dark rounded-lg border border-elec-yellow/20">
            <h3 className="font-semibold text-elec-yellow mb-3">Marine System Results:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p>Total DC load: <span className="text-elec-yellow font-medium">{result.totalLoad?.toFixed(0)} W</span></p>
                <p>Battery capacity: <span className="text-elec-yellow font-medium">{result.recommendedBatteryCapacity?.toFixed(0)} Ah</span></p>
                <p>Charging current: <span className="text-elec-yellow font-medium">{result.chargingCurrent?.toFixed(1)} A</span></p>
              </div>
              <div>
                <p>Cable size: <span className="text-elec-yellow font-medium">{result.cableSize}</span></p>
                <p>Shore capacity: <span className="text-elec-yellow font-medium">{result.shoreCapacity?.toFixed(0)} W</span></p>
                <p>Certification: <span className="text-elec-yellow font-medium">{result.marineCertification}</span></p>
              </div>
            </div>
          </div>
        )}

        <Alert>
          <Anchor className="h-4 w-4" />
          <AlertDescription>
            Marine installations must comply with ISO 13297 and RCD requirements. Use marine-grade cables and IP67 rated equipment.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default MarineElectricalCalculator;