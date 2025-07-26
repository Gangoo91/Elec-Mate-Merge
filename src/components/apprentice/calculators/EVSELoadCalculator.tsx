import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileButton } from "@/components/ui/mobile-button";
import { MobileSelect, MobileSelectContent, MobileSelectItem, MobileSelectTrigger, MobileSelectValue } from "@/components/ui/mobile-select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Car, Calculator, RotateCcw, Plus, Trash2, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ChargingPoint {
  id: number;
  power: number;
  quantity: number;
  type: string;
}

const EVSELoadCalculator = () => {
  const [chargingPoints, setChargingPoints] = useState<ChargingPoint[]>([]);
  const [newPoint, setNewPoint] = useState({
    power: "",
    quantity: "",
    type: "ac-single"
  });
  const [simultaneityFactor, setSimultaneityFactor] = useState<string>("75");
  const [powerFactor, setPowerFactor] = useState<string>("0.95");
  const [result, setResult] = useState<{
    totalConnectedLoad: number;
    simultaneousLoad: number;
    totalCurrent: number;
    recommendedSupply: number;
    cableSize: string;
    protectionDevice: string;
  } | null>(null);

  const chargingTypes = {
    "ac-single": "AC Single Phase (Type 2)",
    "ac-three": "AC Three Phase (Type 2)", 
    "dc-rapid": "DC Rapid (CCS/CHAdeMO)",
    "dc-ultra": "DC Ultra Rapid (350kW+)"
  };

  const addChargingPoint = () => {
    if (!newPoint.power || !newPoint.quantity) return;

    const point: ChargingPoint = {
      id: Date.now(),
      power: parseFloat(newPoint.power),
      quantity: parseInt(newPoint.quantity),
      type: newPoint.type
    };

    setChargingPoints([...chargingPoints, point]);
    setNewPoint({ power: "", quantity: "", type: "ac-single" });
  };

  const removeChargingPoint = (id: number) => {
    setChargingPoints(chargingPoints.filter(point => point.id !== id));
  };

  const calculateEVSELoad = () => {
    if (chargingPoints.length === 0) return;

    const totalConnectedLoad = chargingPoints.reduce((sum, point) => 
      sum + (point.power * point.quantity), 0
    );

    const simultaneity = parseFloat(simultaneityFactor) / 100;
    const pf = parseFloat(powerFactor);
    
    const simultaneousLoad = totalConnectedLoad * simultaneity;
    
    // Calculate current for three-phase supply (most common for commercial EVSE)
    const totalCurrent = simultaneousLoad / (Math.sqrt(3) * 415 * pf);
    
    // Recommended supply capacity (with 20% margin)
    const recommendedSupply = simultaneousLoad * 1.2;
    
    // Cable sizing based on current
    let cableSize = "";
    if (totalCurrent <= 16) cableSize = "2.5mm²";
    else if (totalCurrent <= 20) cableSize = "4.0mm²";
    else if (totalCurrent <= 27) cableSize = "6.0mm²";
    else if (totalCurrent <= 37) cableSize = "10.0mm²";
    else if (totalCurrent <= 50) cableSize = "16.0mm²";
    else if (totalCurrent <= 68) cableSize = "25.0mm²";
    else if (totalCurrent <= 89) cableSize = "35.0mm²";
    else if (totalCurrent <= 119) cableSize = "50.0mm²";
    else cableSize = "Specialist sizing required";

    // Protection device recommendation
    let protectionDevice = "";
    const protectionCurrent = Math.ceil(totalCurrent * 1.1); // 10% margin
    if (protectionCurrent <= 16) protectionDevice = "16A MCB";
    else if (protectionCurrent <= 20) protectionDevice = "20A MCB";
    else if (protectionCurrent <= 25) protectionDevice = "25A MCB";
    else if (protectionCurrent <= 32) protectionDevice = "32A MCB";
    else if (protectionCurrent <= 40) protectionDevice = "40A MCB";
    else if (protectionCurrent <= 50) protectionDevice = "50A MCB";
    else if (protectionCurrent <= 63) protectionDevice = "63A MCB";
    else if (protectionCurrent <= 80) protectionDevice = "80A MCB";
    else if (protectionCurrent <= 100) protectionDevice = "100A MCB";
    else protectionDevice = "MCCB required";

    setResult({
      totalConnectedLoad,
      simultaneousLoad,
      totalCurrent,
      recommendedSupply,
      cableSize,
      protectionDevice
    });
  };

  const reset = () => {
    setChargingPoints([]);
    setNewPoint({ power: "", quantity: "", type: "ac-single" });
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
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-elec-yellow">Charging Points</h3>
            
            <div className="grid grid-cols-3 gap-3">
              <MobileSelect value={newPoint.type} onValueChange={(value) => setNewPoint({ ...newPoint, type: value })}>
                <MobileSelectTrigger label="Charger Type">
                  <MobileSelectValue />
                </MobileSelectTrigger>
                <MobileSelectContent>
                  <MobileSelectItem value="ac-single">7kW AC Single</MobileSelectItem>
                  <MobileSelectItem value="ac-three">22kW AC Three Phase</MobileSelectItem>
                  <MobileSelectItem value="dc-rapid">50kW DC Rapid</MobileSelectItem>
                  <MobileSelectItem value="dc-ultra">150kW DC Ultra</MobileSelectItem>
                </MobileSelectContent>
              </MobileSelect>

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
                <h4 className="text-md font-medium">Configured Charging Points</h4>
                <div className="max-h-32 overflow-y-auto space-y-1">
                  {chargingPoints.map((point) => (
                    <div key={point.id} className="flex items-center justify-between bg-elec-dark/50 p-2 rounded text-sm">
                      <span>{point.quantity}x {point.power}kW {chargingTypes[point.type as keyof typeof chargingTypes]}</span>
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

            <Separator />

            <h3 className="text-lg font-medium text-elec-yellow">Load Factors</h3>

            <MobileInput
              label="Simultaneity Factor (%)"
              type="number"
              min="1"
              max="100"
              value={simultaneityFactor}
              onChange={(e) => setSimultaneityFactor(e.target.value)}
              placeholder="75"
              unit="%"
              hint="Typical: 75% for workplace, 50% for public"
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

            <div className="flex gap-2">
              <MobileButton 
                onClick={calculateEVSELoad}
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
          <div className="space-y-4">
            <div className="rounded-md bg-elec-dark p-6 min-h-[400px]">
              {result ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-elec-yellow mb-2">EVSE Load Analysis</h3>
                    <Badge variant="secondary" className="mb-4">
                      {chargingPoints.length} Charging Point{chargingPoints.length !== 1 ? 's' : ''}
                    </Badge>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Total Connected Load:</span>
                      <div className="font-mono text-elec-yellow">{result.totalConnectedLoad} kW</div>
                    </div>
                    
                    <div>
                      <span className="text-muted-foreground">Simultaneous Load:</span>
                      <div className="font-mono text-elec-yellow">{result.simultaneousLoad.toFixed(1)} kW</div>
                    </div>

                    <div>
                      <span className="text-muted-foreground">Total Current (3φ):</span>
                      <div className="font-mono text-elec-yellow">{result.totalCurrent.toFixed(1)} A</div>
                    </div>

                    <Separator />

                    <div>
                      <span className="text-muted-foreground">Recommended Supply:</span>
                      <div className="font-mono text-elec-yellow">{result.recommendedSupply.toFixed(1)} kW</div>
                    </div>

                    <div>
                      <span className="text-muted-foreground">Cable Size:</span>
                      <div className="font-mono text-elec-yellow">{result.cableSize}</div>
                    </div>

                    <div>
                      <span className="text-muted-foreground">Protection Device:</span>
                      <div className="font-mono text-elec-yellow">{result.protectionDevice}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Add charging points to calculate EVSE load requirements
                </div>
              )}
            </div>

            <Alert className="border-blue-500/20 bg-blue-500/10">
              <Info className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-blue-200">
                Calculations assume 415V three-phase supply. Consider load management systems 
                for large installations. Verify with local DNO requirements.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EVSELoadCalculator;