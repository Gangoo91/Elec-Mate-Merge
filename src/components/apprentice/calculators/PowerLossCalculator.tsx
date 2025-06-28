
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingDown } from "lucide-react";

const PowerLossCalculator = () => {
  const [current, setCurrent] = useState("");
  const [resistance, setResistance] = useState("");
  const [voltage, setVoltage] = useState("");
  const [length, setLength] = useState("");
  const [cableType, setCableType] = useState("");
  const [calculationType, setCalculationType] = useState("basic");
  const [result, setResult] = useState<{
    powerLoss: number;
    voltageDrop: number;
    efficiency: number;
    costPerYear: number;
    heatGenerated: number;
  } | null>(null);

  const cableResistances: { [key: string]: number } = {
    "1.5mm2-cu": 12.1, // mΩ/m
    "2.5mm2-cu": 7.41,
    "4mm2-cu": 4.61,
    "6mm2-cu": 3.08,
    "10mm2-cu": 1.83,
    "16mm2-cu": 1.15,
    "25mm2-cu": 0.727,
    "35mm2-cu": 0.524,
    "50mm2-cu": 0.387
  };

  const calculatePowerLoss = () => {
    let I = parseFloat(current);
    let R = parseFloat(resistance);
    
    if (calculationType === "cable" && cableType && length) {
      const cableR = cableResistances[cableType] || 0;
      const cableLength = parseFloat(length);
      R = (cableR * cableLength * 2) / 1000; // Convert mΩ/m to Ω, multiply by 2 for return path
    }

    if (!I || !R) return;

    const V = parseFloat(voltage) || 230;
    
    const powerLoss = I * I * R; // I²R loss in Watts
    const voltageDrop = I * R; // Voltage drop in Volts
    const outputPower = V * I - powerLoss;
    const efficiency = (outputPower / (V * I)) * 100;
    
    // Annual cost assuming continuous operation at £0.30/kWh
    const costPerYear = (powerLoss * 24 * 365 * 0.30) / 1000;
    
    // Heat generated is equal to power loss
    const heatGenerated = powerLoss;

    setResult({
      powerLoss,
      voltageDrop,
      efficiency,
      costPerYear,
      heatGenerated
    });
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <TrendingDown className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Power Loss Calculator</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Calculate I²R losses, efficiency, and heat generation in electrical circuits
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Calculation Method</Label>
              <Select value={calculationType} onValueChange={setCalculationType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic (Known Resistance)</SelectItem>
                  <SelectItem value="cable">Cable Run Analysis</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="current">Current (A)</Label>
              <Input
                id="current"
                type="number"
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                placeholder="e.g. 20"
              />
            </div>

            {calculationType === "basic" && (
              <div className="space-y-2">
                <Label htmlFor="resistance">Resistance (Ω)</Label>
                <Input
                  id="resistance"
                  type="number"
                  step="0.001"
                  value={resistance}
                  onChange={(e) => setResistance(e.target.value)}
                  placeholder="e.g. 0.1"
                />
              </div>
            )}

            {calculationType === "cable" && (
              <>
                <div className="space-y-2">
                  <Label>Cable Type (Copper)</Label>
                  <Select value={cableType} onValueChange={setCableType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select cable size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1.5mm2-cu">1.5mm² Copper</SelectItem>
                      <SelectItem value="2.5mm2-cu">2.5mm² Copper</SelectItem>
                      <SelectItem value="4mm2-cu">4mm² Copper</SelectItem>
                      <SelectItem value="6mm2-cu">6mm² Copper</SelectItem>
                      <SelectItem value="10mm2-cu">10mm² Copper</SelectItem>
                      <SelectItem value="16mm2-cu">16mm² Copper</SelectItem>
                      <SelectItem value="25mm2-cu">25mm² Copper</SelectItem>
                      <SelectItem value="35mm2-cu">35mm² Copper</SelectItem>
                      <SelectItem value="50mm2-cu">50mm² Copper</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="length">Cable Length (m)</Label>
                  <Input
                    id="length"
                    type="number"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    placeholder="e.g. 25"
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="voltage">Supply Voltage (V)</Label>
              <Input
                id="voltage"
                type="number"
                value={voltage}
                onChange={(e) => setVoltage(e.target.value)}
                placeholder="e.g. 230"
              />
            </div>

            <Button onClick={calculatePowerLoss} className="w-full">
              Calculate Power Loss
            </Button>
          </div>

          <div className="space-y-4">
            {result ? (
              <Card className="border-red-500/30 bg-red-500/5">
                <CardHeader>
                  <CardTitle className="text-red-300 text-lg">Power Loss Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-center">
                    <div className="text-red-200 text-sm">Power Loss (I²R)</div>
                    <div className={`font-mono text-3xl font-bold ${
                      result.powerLoss > 100 ? 'text-red-300' :
                      result.powerLoss > 50 ? 'text-yellow-300' : 'text-green-300'
                    }`}>
                      {result.powerLoss.toFixed(1)} W
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-red-200">Voltage Drop</div>
                      <div className="text-red-300 font-mono font-bold">{result.voltageDrop.toFixed(2)} V</div>
                    </div>
                    <div>
                      <div className="text-red-200">Efficiency</div>
                      <div className="text-red-300 font-mono font-bold">{result.efficiency.toFixed(1)}%</div>
                    </div>
                    <div>
                      <div className="text-red-200">Heat Generated</div>
                      <div className="text-red-300 font-mono font-bold">{result.heatGenerated.toFixed(1)} W</div>
                    </div>
                    <div>
                      <div className="text-red-200">Annual Cost</div>
                      <div className="text-red-300 font-mono font-bold">£{result.costPerYear.toFixed(2)}</div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded p-3">
                    <div className="text-blue-300 text-sm font-medium">Formula</div>
                    <div className="text-blue-200 text-xs mt-1">
                      Power Loss = I² × R<br/>
                      Voltage Drop = I × R<br/>
                      Heat = Power Loss
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-elec-yellow/20 bg-elec-yellow/5">
                <CardContent className="pt-4">
                  <div className="text-center text-elec-yellow/80">
                    <TrendingDown className="h-8 w-8 mx-auto mb-2" />
                    <p>Enter current and resistance values to calculate power losses</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PowerLossCalculator;
