import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileButton } from "@/components/ui/mobile-button";
import { MobileSelect, MobileSelectContent, MobileSelectItem, MobileSelectTrigger, MobileSelectValue } from "@/components/ui/mobile-select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Car, Calculator, RotateCcw, Plus, Trash2, Info, AlertTriangle, CheckCircle, Zap } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ResultCard } from "@/components/ui/result-card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { calculateEVSELoad } from "@/lib/evse-calculations";
import { CHARGER_TYPES, EARTHING_SYSTEMS, INSTALLATION_LOCATIONS } from "@/lib/ev-constants";

interface ChargingPoint {
  id: number;
  power: number;
  quantity: number;
  type: string;
}

interface CalculationInputs {
  chargingPoints: ChargingPoint[];
  supplyType: "single" | "three";
  supplyVoltage: number;
  earthingSystem: string;
  installationLocation: string;
  feederRunLength: number;
  voltageDrop: number;
  availableCapacity: number;
  loadManagementEnabled: boolean;
  simultaneityFactor: number;
  powerFactor: number;
}

const EVSELoadCalculator = () => {
  const [chargingPoints, setChargingPoints] = useState<ChargingPoint[]>([]);
  const [newPoint, setNewPoint] = useState({
    power: "",
    quantity: "",
    type: "7kw_ac_single"
  });
  
  // Basic parameters
  const [supplyType, setSupplyType] = useState<"single" | "three">("three");
  const [voltage, setVoltage] = useState<string>("415");
  const [earthingSystem, setEarthingSystem] = useState<string>("tn-c-s");
  const [installationLocation, setInstallationLocation] = useState<string>("external");
  const [feederLength, setFeederLength] = useState<string>("25");
  const [maxVoltageDrop, setMaxVoltageDrop] = useState<string>("5");
  const [availableCapacity, setAvailableCapacity] = useState<string>("100");
  const [hasLoadManagement, setHasLoadManagement] = useState<boolean>(false);
  const [simultaneityFactor, setSimultaneityFactor] = useState<string>("75");
  const [powerFactor, setPowerFactor] = useState<string>("0.95");
  
  const [result, setResult] = useState<any>(null);


  const addChargingPoint = () => {
    if (!newPoint.power || !newPoint.quantity) return;

    const point: ChargingPoint = {
      id: Date.now(),
      power: parseFloat(newPoint.power),
      quantity: parseInt(newPoint.quantity),
      type: newPoint.type
    };

    setChargingPoints([...chargingPoints, point]);
    setNewPoint({ power: "", quantity: "", type: "7kw_ac_single" });
  };

  const removeChargingPoint = (id: number) => {
    setChargingPoints(chargingPoints.filter(point => point.id !== id));
  };

  const handleCalculate = () => {
    if (chargingPoints.length === 0) return;

    const inputs: CalculationInputs = {
      chargingPoints,
      supplyType,
      supplyVoltage: parseFloat(voltage),
      earthingSystem,
      installationLocation,
      feederRunLength: parseFloat(feederLength),
      voltageDrop: parseFloat(maxVoltageDrop),
      availableCapacity: parseFloat(availableCapacity),
      loadManagementEnabled: hasLoadManagement,
      simultaneityFactor: parseFloat(simultaneityFactor),
      powerFactor: parseFloat(powerFactor)
    };

    const calculations = calculateEVSELoad(inputs);
    setResult(calculations);
  };

  const reset = () => {
    setChargingPoints([]);
    setNewPoint({ power: "", quantity: "", type: "7kw_ac_single" });
    setSupplyType("three");
    setVoltage("415");
    setEarthingSystem("tn-c-s");
    setInstallationLocation("external");
    setFeederLength("25");
    setMaxVoltageDrop("5");
    setAvailableCapacity("100");
    setHasLoadManagement(false);
    setSimultaneityFactor("75");
    setPowerFactor("0.95");
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Car className="h-5 w-5 text-elec-yellow" />
          <CardTitle>EVSE Load Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate electrical load and infrastructure requirements for Electric Vehicle Supply Equipment installations.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 lg:p-6">
        <div className="space-y-6">
          {/* Input Section - Mobile Stacked */}
          <div className="space-y-4">
            {/* Charging Points Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-elec-yellow flex items-center gap-2">
                <Car className="h-5 w-5" />
                Charging Points
              </h3>
              
              {/* Mobile-first stacked inputs */}
              <div className="space-y-3">
                <MobileSelect value={newPoint.type} onValueChange={(value) => setNewPoint({ ...newPoint, type: value })}>
                  <MobileSelectTrigger label="Charger Type">
                    <MobileSelectValue />
                  </MobileSelectTrigger>
                  <MobileSelectContent>
                    {Object.entries(CHARGER_TYPES).map(([key, charger]) => (
                      <MobileSelectItem key={key} value={key}>
                        {charger.label}
                      </MobileSelectItem>
                    ))}
                  </MobileSelectContent>
                </MobileSelect>

                <div className="grid grid-cols-2 gap-3">
                  <MobileInput
                    label="Power (kW)"
                    type="number"
                    value={newPoint.power}
                    onChange={(e) => setNewPoint({ ...newPoint, power: e.target.value })}
                    placeholder="e.g., 7"
                    unit="kW"
                  />

                  <MobileInput
                    label="Quantity"
                    type="number"
                    min="1"
                    value={newPoint.quantity}
                    onChange={(e) => setNewPoint({ ...newPoint, quantity: e.target.value })}
                    placeholder="e.g., 4"
                  />
                </div>
              </div>

              <MobileButton 
                onClick={addChargingPoint}
                variant="elec"
                disabled={!newPoint.power || !newPoint.quantity}
                icon={<Plus className="h-4 w-4" />}
                className="w-full"
              >
                Add Charging Points
              </MobileButton>

              {chargingPoints.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-md font-medium">Configured Points</h4>
                  <div className="max-h-32 overflow-y-auto space-y-1">
                    {chargingPoints.map((point) => (
                      <div key={point.id} className="flex items-center justify-between bg-elec-dark/50 p-2 rounded text-sm">
                        <span>{point.quantity}x {point.power}kW {CHARGER_TYPES[point.type as keyof typeof CHARGER_TYPES]?.label}</span>
                        <MobileButton
                          variant="elec-outline"
                          size="sm"
                          onClick={() => removeChargingPoint(point.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </MobileButton>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Separator />

            {/* Supply Details Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-elec-yellow flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Supply Details
              </h3>
              
              <div className="space-y-3">
                <MobileSelect value={supplyType} onValueChange={(value: "single" | "three") => setSupplyType(value)}>
                  <MobileSelectTrigger label="Supply Type">
                    <MobileSelectValue />
                  </MobileSelectTrigger>
                  <MobileSelectContent>
                    <MobileSelectItem value="single">Single Phase</MobileSelectItem>
                    <MobileSelectItem value="three">Three Phase</MobileSelectItem>
                  </MobileSelectContent>
                </MobileSelect>

                <div className="grid grid-cols-2 gap-3">
                  <MobileInput
                    label="Voltage"
                    type="number"
                    value={voltage}
                    onChange={(e) => setVoltage(e.target.value)}
                    placeholder="415"
                    unit="V"
                  />

                  <MobileInput
                    label="Available Capacity"
                    type="number"
                    value={availableCapacity}
                    onChange={(e) => setAvailableCapacity(e.target.value)}
                    placeholder="100"
                    unit="kW"
                  />
                </div>

                <MobileSelect value={earthingSystem} onValueChange={setEarthingSystem}>
                  <MobileSelectTrigger label="Earthing System">
                    <MobileSelectValue />
                  </MobileSelectTrigger>
                  <MobileSelectContent>
                    {Object.entries(EARTHING_SYSTEMS).map(([key, system]) => (
                      <MobileSelectItem key={key} value={key}>
                        {system.label}
                      </MobileSelectItem>
                    ))}
                  </MobileSelectContent>
                </MobileSelect>

                <MobileSelect value={installationLocation} onValueChange={setInstallationLocation}>
                  <MobileSelectTrigger label="Installation Location">
                    <MobileSelectValue />
                  </MobileSelectTrigger>
                  <MobileSelectContent>
                    {Object.entries(INSTALLATION_LOCATIONS).map(([key, location]) => (
                      <MobileSelectItem key={key} value={key}>
                        {location.label}
                      </MobileSelectItem>
                    ))}
                  </MobileSelectContent>
                </MobileSelect>

                <div className="grid grid-cols-2 gap-3">
                  <MobileInput
                    label="Feeder Length"
                    type="number"
                    value={feederLength}
                    onChange={(e) => setFeederLength(e.target.value)}
                    placeholder="25"
                    unit="m"
                  />

                  <MobileInput
                    label="Max Voltage Drop"
                    type="number"
                    value={maxVoltageDrop}
                    onChange={(e) => setMaxVoltageDrop(e.target.value)}
                    placeholder="5"
                    unit="%"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="load-management" className="text-sm">Load Management System</Label>
                  <Switch
                    id="load-management"
                    checked={hasLoadManagement}
                    onCheckedChange={setHasLoadManagement}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Load Factors Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-elec-yellow">Load Factors</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <MobileInput
                  label="Simultaneity Factor"
                  type="number"
                  min="1"
                  max="100"
                  value={simultaneityFactor}
                  onChange={(e) => setSimultaneityFactor(e.target.value)}
                  placeholder="75"
                  unit="%"
                  hint="Workplace: 75%, Public: 50%"
                />

                <MobileInput
                  label="Power Factor"
                  type="number"
                  step="0.01"
                  min="0.8"
                  max="1"
                  value={powerFactor}
                  onChange={(e) => setPowerFactor(e.target.value)}
                  placeholder="0.95"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <MobileButton 
                onClick={handleCalculate}
                variant="elec"
                disabled={chargingPoints.length === 0}
                icon={<Calculator className="h-4 w-4" />}
                className="flex-1"
              >
                Calculate Load
              </MobileButton>
              <MobileButton variant="elec-outline" onClick={reset}>
                <RotateCcw className="h-4 w-4" />
              </MobileButton>
            </div>
          </div>

          {/* Results Section */}
          {result && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-elec-yellow">Results</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <ResultCard
                  title="Connected Load"
                  value={result.connectedLoad}
                  unit="kW"
                  status="info"
                />
                
                <ResultCard
                  title="Simultaneous Load"
                  value={result.simultaneousLoad}
                  unit="kW"
                  status="info"
                />
                
                <ResultCard
                  title="Line Current"
                  value={result.lineCurrent}
                  unit="A"
                  status={result.headroom < 0 ? "warning" : "success"}
                />
                
                <ResultCard
                  title="Cable Size"
                  value={result.cableSize}
                  status={result.voltageDrop > result.maxVoltageDrop ? "warning" : "success"}
                />
                
                <ResultCard
                  title="Protection Device"
                  value={result.protectionDevice}
                  status="info"
                />
                
                <ResultCard
                  title="Voltage Drop"
                  value={result.voltageDrop}
                  unit="%"
                  status={result.voltageDrop > parseFloat(maxVoltageDrop) ? "error" : "success"}
                />
              </div>

              {/* Analysis & Guidance */}
              <div className="space-y-4">
                <ResultCard
                  title="Analysis & Recommendations"
                  status={result.warnings.length > 0 ? "warning" : "success"}
                >
                  <div className="space-y-3 text-sm">
                    {result.warnings.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-medium text-yellow-500 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4" />
                          Warnings
                        </h4>
                        <ul className="space-y-1 text-yellow-300">
                          {result.warnings.map((warning: string, index: number) => (
                            <li key={index} className="text-xs">• {warning}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <h4 className="font-medium text-green-500 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Recommendations
                      </h4>
                      <ul className="space-y-1 text-green-300">
                        {result.recommendations.map((rec: string, index: number) => (
                          <li key={index} className="text-xs">• {rec}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-blue-500 flex items-center gap-2">
                        <Info className="h-4 w-4" />
                        Why This Matters
                      </h4>
                      <p className="text-xs text-blue-300">{result.whyItMatters}</p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-purple-500">Regulations & Standards</h4>
                      <ul className="space-y-1 text-purple-300">
                        {result.regulations.map((reg: string, index: number) => (
                          <li key={index} className="text-xs">• {reg}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-orange-500">Practical Guidance</h4>
                      <ul className="space-y-1 text-orange-300">
                        {result.practicalGuidance.map((guide: string, index: number) => (
                          <li key={index} className="text-xs">• {guide}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </ResultCard>
              </div>
            </div>
          )}

          {!result && chargingPoints.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Car className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Add charging points to calculate EVSE load requirements</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EVSELoadCalculator;