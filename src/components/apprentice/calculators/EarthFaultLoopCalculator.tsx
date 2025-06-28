
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Shield, Calculator } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const EarthFaultLoopCalculator = () => {
  const [ze, setZe] = useState("");
  const [r1, setR1] = useState("");
  const [r2, setR2] = useState("");
  const [calculatedZs, setCalculatedZs] = useState<number | null>(null);
  const [protectionType, setProtectionType] = useState("");
  const [protectionRating, setProtectionRating] = useState("");
  const [curveType, setCurveType] = useState("");
  const [maxZs, setMaxZs] = useState<number | null>(null);
  const [isCompliant, setIsCompliant] = useState<boolean | null>(null);

  // Maximum Zs values for MCBs (BS 7671) - Type B curves
  const maxZsValues = {
    mcb: {
      "type-b": {
        6: 7.67, 10: 4.6, 16: 2.87, 20: 2.3, 25: 1.84, 32: 1.44, 40: 1.15, 50: 0.92, 63: 0.73
      },
      "type-c": {
        6: 3.83, 10: 2.3, 16: 1.44, 20: 1.15, 25: 0.92, 32: 0.72, 40: 0.57, 50: 0.46, 63: 0.37
      }
    },
    fuse: {
      "bs88": {
        6: 7.67, 10: 4.6, 16: 2.87, 20: 2.3, 25: 1.84, 32: 1.44
      },
      "bs1361": {
        5: 9.2, 15: 3.07, 20: 2.3, 30: 1.53, 45: 1.02
      }
    }
  };

  const calculateZs = () => {
    const zeValue = parseFloat(ze);
    const r1Value = parseFloat(r1) || 0;
    const r2Value = parseFloat(r2) || 0;

    if (isNaN(zeValue)) return;

    // Earth Fault Loop Impedance: Zs = Ze + R1 + R2
    const calculatedValue = zeValue + r1Value + r2Value;
    setCalculatedZs(calculatedValue);

    console.log(`Zs Calculation: Ze=${zeValue}Ω + R1=${r1Value}Ω + R2=${r2Value}Ω = ${calculatedValue}Ω`);

    // Check against protection device limits
    if (protectionType && protectionRating) {
      let maxZsValue: number | undefined;
      
      if (protectionType === "mcb" && curveType) {
        const curveData = maxZsValues.mcb[curveType as keyof typeof maxZsValues.mcb];
        maxZsValue = curveData?.[parseInt(protectionRating) as keyof typeof curveData];
      } else if (protectionType === "fuse") {
        const fuseData = maxZsValues.fuse["bs88"];
        maxZsValue = fuseData[parseInt(protectionRating) as keyof typeof fuseData];
      }

      if (maxZsValue !== undefined) {
        setMaxZs(maxZsValue);
        setIsCompliant(calculatedValue <= maxZsValue);
        console.log(`Compliance check: ${calculatedValue}Ω ${calculatedValue <= maxZsValue ? '≤' : '>'} ${maxZsValue}Ω`);
      }
    }
  };

  const resetCalculator = () => {
    setZe("");
    setR1("");
    setR2("");
    setCalculatedZs(null);
    setProtectionType("");
    setProtectionRating("");
    setCurveType("");
    setMaxZs(null);
    setIsCompliant(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Earth Fault Loop Impedance (Zs) Calculator</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
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
              <Label htmlFor="r1">R1 (Phase Conductor Resistance) Ω</Label>
              <Input
                id="r1"
                type="number"
                step="0.001"
                value={r1}
                onChange={(e) => setR1(e.target.value)}
                placeholder="e.g., 0.125"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="r2">R2 (Earth Conductor Resistance) Ω</Label>
              <Input
                id="r2"
                type="number"
                step="0.001"
                value={r2}
                onChange={(e) => setR2(e.target.value)}
                placeholder="e.g., 0.125"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div className="border-t border-elec-yellow/20 pt-4">
              <h4 className="text-sm font-medium text-elec-yellow mb-2">Protection Device (Optional)</h4>
              
              <div className="space-y-3">
                <div>
                  <Label htmlFor="protection-type">Protection Type</Label>
                  <Select value={protectionType} onValueChange={setProtectionType}>
                    <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                      <SelectValue placeholder="Select protection type" />
                    </SelectTrigger>
                    <SelectContent className="bg-elec-dark border-elec-yellow/20">
                      <SelectItem value="mcb">MCB</SelectItem>
                      <SelectItem value="fuse">Fuse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {protectionType === "mcb" && (
                  <div>
                    <Label htmlFor="curve-type">MCB Curve Type</Label>
                    <Select value={curveType} onValueChange={setCurveType}>
                      <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                        <SelectValue placeholder="Select curve type" />
                      </SelectTrigger>
                      <SelectContent className="bg-elec-dark border-elec-yellow/20">
                        <SelectItem value="type-b">Type B</SelectItem>
                        <SelectItem value="type-c">Type C</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div>
                  <Label htmlFor="protection-rating">Rating (A)</Label>
                  <Select value={protectionRating} onValueChange={setProtectionRating}>
                    <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                    <SelectContent className="bg-elec-dark border-elec-yellow/20">
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
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={calculateZs} 
                className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
                disabled={!ze}
              >
                <Calculator className="mr-2 h-4 w-4" />
                Calculate Zs
              </Button>
              <Button variant="outline" onClick={resetCalculator}>
                Reset
              </Button>
            </div>
          </div>

          <div className="bg-elec-dark/50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-elec-yellow mb-4">Results</h3>
            {calculatedZs !== null ? (
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Earth Fault Loop Impedance (Zs):</p>
                  <p className="text-2xl font-bold text-white">{calculatedZs.toFixed(4)}Ω</p>
                </div>

                {maxZs !== null && isCompliant !== null && (
                  <>
                    <div>
                      <p className="text-sm text-muted-foreground">Maximum Zs for {protectionRating}A {protectionType.toUpperCase()}:</p>
                      <p className="text-xl font-bold text-white">{maxZs}Ω</p>
                    </div>

                    <div className={`p-3 rounded ${isCompliant ? 'bg-green-500/20 border border-green-500/30' : 'bg-red-500/20 border border-red-500/30'}`}>
                      <p className={`font-medium ${isCompliant ? 'text-green-300' : 'text-red-300'}`}>
                        {isCompliant ? '✓ COMPLIANT' : '✗ NON-COMPLIANT'}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {isCompliant ? 
                          'Earth fault loop impedance is within acceptable limits.' : 
                          'Earth fault loop impedance exceeds maximum allowed value.'
                        }
                      </p>
                    </div>
                  </>
                )}

                <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
                  <p className="text-xs text-blue-300">
                    <strong>Formula:</strong> Zs = Ze + R1 + R2<br />
                    Where Ze is external impedance, R1 is phase resistance, and R2 is earth resistance.
                  </p>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/30 rounded p-3">
                  <p className="text-xs text-amber-300">
                    <strong>Note:</strong> Maximum Zs values based on BS 7671. Ensure disconnection time ≤ 0.4s for socket circuits, ≤ 5s for fixed equipment.
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">
                Enter Ze value to calculate earth fault loop impedance.
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EarthFaultLoopCalculator;
