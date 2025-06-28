
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator, Shield } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PFCCalculator = () => {
  const [voltage, setVoltage] = useState("230");
  const [ze, setZe] = useState("");
  const [r1r2, setR1R2] = useState("");
  const [pfcAtOrigin, setPfcAtOrigin] = useState<number | null>(null);
  const [pfcAtLoad, setPfcAtLoad] = useState<number | null>(null);
  const [breakingCapacity, setBreakingCapacity] = useState("");

  // Common MCB breaking capacities (Amperes)
  const breakingCapacities = {
    "6000": "6kA (Type 1)",
    "10000": "10kA (Type 2)", 
    "15000": "15kA (Type 3)",
    "25000": "25kA (Type 4)"
  };

  const calculatePFC = () => {
    const v = parseFloat(voltage);
    const zeValue = parseFloat(ze);
    const r1r2Value = parseFloat(r1r2);

    if (isNaN(v) || isNaN(zeValue)) return;

    // Prospective Fault Current formula: PFC = U / Z
    // Where U is the nominal voltage and Z is the impedance

    // PFC at origin (supply point) - only considers Ze
    const pfcOrigin = v / zeValue;
    setPfcAtOrigin(pfcOrigin);
    
    console.log(`PFC at origin: ${v}V / ${zeValue}Ω = ${pfcOrigin.toFixed(0)}A`);

    // PFC at end of circuit (if R1+R2 provided)
    if (!isNaN(r1r2Value)) {
      // Total circuit impedance = Ze + R1 + R2
      const totalImpedance = zeValue + r1r2Value;
      const pfcLoad = v / totalImpedance;
      setPfcAtLoad(pfcLoad);
      
      console.log(`PFC at load: ${v}V / ${totalImpedance}Ω = ${pfcLoad.toFixed(0)}A`);
    } else {
      setPfcAtLoad(null);
    }
  };

  const checkBreakingCapacity = (pfc: number) => {
    if (!breakingCapacity) return null;
    const capacity = parseFloat(breakingCapacity);
    return pfc <= capacity;
  };

  const resetCalculator = () => {
    setVoltage("230");
    setZe("");
    setR1R2("");
    setPfcAtOrigin(null);
    setPfcAtLoad(null);
    setBreakingCapacity("");
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Prospective Fault Current (PFC) Calculator</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="voltage">Supply Voltage (V)</Label>
              <Select value={voltage} onValueChange={setVoltage}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="230">230V (Single Phase)</SelectItem>
                  <SelectItem value="400">400V (Three Phase)</SelectItem>
                  <SelectItem value="110">110V (Site Supply)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="ze">Ze (External Earth Fault Loop Impedance) Ω</Label>
              <Input
                id="ze"
                type="number"
                step="0.01"
                value={ze}
                onChange={(e) => setZe(e.target.value)}
                placeholder="e.g., 0.35"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="r1r2">R1+R2 (Circuit Resistance) Ω - Optional</Label>
              <Input
                id="r1r2"
                type="number"
                step="0.001"
                value={r1r2}
                onChange={(e) => setR1R2(e.target.value)}
                placeholder="e.g., 0.25"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="breaking-capacity">MCB Breaking Capacity - Optional</Label>
              <Select value={breakingCapacity} onValueChange={setBreakingCapacity}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue placeholder="Select breaking capacity" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  {Object.entries(breakingCapacities).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={calculatePFC} 
                className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
                disabled={!voltage || !ze}
              >
                <Calculator className="mr-2 h-4 w-4" />
                Calculate PFC
              </Button>
              <Button variant="outline" onClick={resetCalculator}>
                Reset
              </Button>
            </div>
          </div>

          <div className="bg-elec-dark/50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-elec-yellow mb-4">Results</h3>
            {pfcAtOrigin !== null ? (
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">PFC at Origin (Ze only):</p>
                  <p className="text-2xl font-bold text-white">{pfcAtOrigin.toFixed(0)}A</p>
                  <p className="text-sm text-white">{(pfcAtOrigin / 1000).toFixed(2)}kA</p>
                </div>

                {pfcAtLoad !== null && (
                  <div>
                    <p className="text-sm text-muted-foreground">PFC at End of Circuit:</p>
                    <p className="text-2xl font-bold text-white">{pfcAtLoad.toFixed(0)}A</p>
                    <p className="text-sm text-white">{(pfcAtLoad / 1000).toFixed(2)}kA</p>
                  </div>
                )}

                {breakingCapacity && pfcAtOrigin && (
                  <div className={`p-3 rounded ${checkBreakingCapacity(pfcAtOrigin) ? 'bg-green-500/20 border border-green-500/30' : 'bg-red-500/20 border border-red-500/30'}`}>
                    <p className={`font-medium ${checkBreakingCapacity(pfcAtOrigin) ? 'text-green-300' : 'text-red-300'}`}>
                      {checkBreakingCapacity(pfcAtOrigin) ? '✓ ADEQUATE' : '✗ INADEQUATE'}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      MCB breaking capacity: {breakingCapacities[breakingCapacity as keyof typeof breakingCapacities]}
                    </p>
                  </div>
                )}

                <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
                  <p className="text-xs text-blue-300">
                    <strong>Formula:</strong> PFC = U / Z<br />
                    At origin: PFC = U / Ze<br />
                    At load: PFC = U / (Ze + R1 + R2)
                  </p>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/30 rounded p-3">
                  <p className="text-xs text-amber-300">
                    <strong>Note:</strong> Ensure protective device breaking capacity exceeds calculated PFC. 
                    Use the higher of the two PFC values when selecting protection.
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">
                Enter voltage and Ze values to calculate prospective fault current.
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PFCCalculator;
