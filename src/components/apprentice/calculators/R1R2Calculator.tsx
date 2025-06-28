
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator, Cable } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const R1R2Calculator = () => {
  const [cableLength, setCableLength] = useState("");
  const [cableSize, setCableSize] = useState("");
  const [cableType, setCableType] = useState("");
  const [temperature, setTemperature] = useState("70");
  const [r1r2Result, setR1R2Result] = useState<number | null>(null);
  const [r1Value, setR1Value] = useState<number | null>(null);
  const [r2Value, setR2Value] = useState<number | null>(null);

  // Accurate resistance values (mΩ/m at 20°C) based on BS 7671 Appendix 4
  const cableResistance = {
    "1.0": { r1: 18.1, r2: 18.1 }, // 1.0mm² T&E (same size CPC)
    "1.5": { r1: 12.1, r2: 12.1 }, // 1.5mm² T&E (same size CPC)
    "2.5": { r1: 7.41, r2: 7.41 }, // 2.5mm² T&E (same size CPC)
    "4.0": { r1: 4.61, r2: 4.61 }, // 4.0mm² T&E (same size CPC)
    "6.0": { r1: 3.08, r2: 3.08 }, // 6.0mm² T&E (same size CPC)
    "10.0": { r1: 1.83, r2: 1.83 }, // 10.0mm² T&E (same size CPC)
    "16.0": { r1: 1.15, r2: 1.83 }, // 16.0mm² with 10mm² CPC
    "25.0": { r1: 0.727, r2: 1.20 }, // 25.0mm² with 16mm² CPC
    "35.0": { r1: 0.524, r2: 0.727 }, // 35.0mm² with 25mm² CPC
    "50.0": { r1: 0.387, r2: 0.524 }, // 50.0mm² with 35mm² CPC
    "70.0": { r1: 0.268, r2: 0.387 }, // 70.0mm² with 50mm² CPC
    "95.0": { r1: 0.193, r2: 0.268 }, // 95.0mm² with 70mm² CPC
  };

  // Temperature coefficient for copper (per °C) - BS standard
  const tempCoefficient = 0.004;

  const calculateR1R2 = () => {
    const length = parseFloat(cableLength);
    const temp = parseFloat(temperature);
    
    if (isNaN(length) || !cableSize) return;

    const resistance = cableResistance[cableSize as keyof typeof cableResistance];
    if (!resistance) return;

    // Temperature correction factor: R_temp = R_20 × [1 + α(T - 20)]
    const tempFactor = 1 + (tempCoefficient * (temp - 20));
    
    // Calculate R1 and R2 at operating temperature
    // Formula: R = ρ × L where ρ is resistance per meter and L is length
    const r1 = (resistance.r1 * length * tempFactor) / 1000; // Convert mΩ to Ω
    const r2 = (resistance.r2 * length * tempFactor) / 1000; // Convert mΩ to Ω
    const r1r2 = r1 + r2;

    console.log(`R1+R2 Calculation: ${cableSize}mm², ${length}m, ${temp}°C`);
    console.log(`R1: ${r1.toFixed(4)}Ω, R2: ${r2.toFixed(4)}Ω, Total: ${r1r2.toFixed(4)}Ω`);

    setR1Value(r1);
    setR2Value(r2);
    setR1R2Result(r1r2);
  };

  const resetCalculator = () => {
    setCableLength("");
    setCableSize("");
    setCableType("");
    setTemperature("70");
    setR1R2Result(null);
    setR1Value(null);
    setR2Value(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Cable className="h-5 w-5 text-elec-yellow" />
          <CardTitle>R1 + R2 Calculator</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="cable-type">Cable Type</Label>
              <Select value={cableType} onValueChange={setCableType}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue placeholder="Select cable type" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="twin-earth">Twin & Earth</SelectItem>
                  <SelectItem value="3-core-swa">3 Core SWA</SelectItem>
                  <SelectItem value="4-core-swa">4 Core SWA</SelectItem>
                  <SelectItem value="multicore">Multicore Cable</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="cable-size">Cable Size (mm²)</Label>
              <Select value={cableSize} onValueChange={setCableSize}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue placeholder="Select cable size" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="1.0">1.0mm²</SelectItem>
                  <SelectItem value="1.5">1.5mm²</SelectItem>
                  <SelectItem value="2.5">2.5mm²</SelectItem>
                  <SelectItem value="4.0">4.0mm²</SelectItem>
                  <SelectItem value="6.0">6.0mm²</SelectItem>
                  <SelectItem value="10.0">10.0mm²</SelectItem>
                  <SelectItem value="16.0">16.0mm²</SelectItem>
                  <SelectItem value="25.0">25.0mm²</SelectItem>
                  <SelectItem value="35.0">35.0mm²</SelectItem>
                  <SelectItem value="50.0">50.0mm²</SelectItem>
                  <SelectItem value="70.0">70.0mm²</SelectItem>
                  <SelectItem value="95.0">95.0mm²</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="cable-length">Cable Length (m)</Label>
              <Input
                id="cable-length"
                type="number"
                step="0.1"
                value={cableLength}
                onChange={(e) => setCableLength(e.target.value)}
                placeholder="e.g., 25"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="temperature">Operating Temperature (°C)</Label>
              <Select value={temperature} onValueChange={setTemperature}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="70">70°C (PVC)</SelectItem>
                  <SelectItem value="90">90°C (XLPE)</SelectItem>
                  <SelectItem value="105">105°C (High Temp)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={calculateR1R2} 
                className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
                disabled={!cableLength || !cableSize}
              >
                <Calculator className="mr-2 h-4 w-4" />
                Calculate R1+R2
              </Button>
              <Button variant="outline" onClick={resetCalculator}>
                Reset
              </Button>
            </div>
          </div>

          <div className="bg-elec-dark/50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-elec-yellow mb-4">Results</h3>
            {r1r2Result !== null ? (
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">R1 (Phase Conductor):</p>
                  <p className="text-xl font-bold text-white">{r1Value?.toFixed(4)}Ω</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">R2 (Earth Conductor):</p>
                  <p className="text-xl font-bold text-white">{r2Value?.toFixed(4)}Ω</p>
                </div>

                <div className="border-t border-elec-yellow/20 pt-3">
                  <p className="text-sm text-muted-foreground">R1 + R2 Total:</p>
                  <p className="text-2xl font-bold text-elec-yellow">{r1r2Result.toFixed(4)}Ω</p>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
                  <p className="text-xs text-blue-300">
                    <strong>BS 7671 Values:</strong> Calculated using Appendix 4 resistance values with temperature correction factor of 0.004/°C for copper.
                  </p>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/30 rounded p-3">
                  <p className="text-xs text-amber-300">
                    <strong>Note:</strong> Values assume standard CPC sizing per BS 7671. Larger cables may have reduced CPC sizes as shown.
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">
                Enter cable details to calculate R1 + R2 values for testing.
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default R1R2Calculator;
