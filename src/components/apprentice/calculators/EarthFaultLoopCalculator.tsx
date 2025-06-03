
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
  const [maxZs, setMaxZs] = useState<number | null>(null);
  const [isCompliant, setIsCompliant] = useState<boolean | null>(null);

  // Simplified max Zs values for common protection devices
  const maxZsValues = {
    "mcb-b": {
      6: 7.67, 10: 4.6, 16: 2.87, 20: 2.3, 25: 1.84, 32: 1.44, 40: 1.15, 50: 0.92, 63: 0.73
    },
    "mcb-c": {
      6: 3.83, 10: 2.3, 16: 1.44, 20: 1.15, 25: 0.92, 32: 0.72, 40: 0.57, 50: 0.46, 63: 0.37
    },
    "bs88": {
      5: 9.2, 10: 4.6, 15: 3.07, 20: 2.3, 25: 1.84, 32: 1.44, 40: 1.15, 50: 0.92
    }
  };

  const calculateZs = () => {
    const zeValue = parseFloat(ze);
    const r1Value = parseFloat(r1);
    const r2Value = parseFloat(r2);

    if (isNaN(zeValue) || isNaN(r1Value) || isNaN(r2Value)) {
      return;
    }

    const zs = zeValue + r1Value + r2Value;
    setCalculatedZs(zs);

    // Check compliance if protection device is selected
    if (protectionType && protectionRating) {
      const deviceData = maxZsValues[protectionType as keyof typeof maxZsValues];
      const maxAllowed = deviceData?.[parseInt(protectionRating) as keyof typeof deviceData];
      
      if (maxAllowed) {
        setMaxZs(maxAllowed);
        setIsCompliant(zs <= maxAllowed);
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
    setMaxZs(null);
    setIsCompliant(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Earth Fault Loop Impedance Calculator</CardTitle>
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
                step="0.01"
                value={r1}
                onChange={(e) => setR1(e.target.value)}
                placeholder="e.g., 0.15"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="r2">R2 (Earth Conductor Resistance) Ω</Label>
              <Input
                id="r2"
                type="number"
                step="0.01"
                value={r2}
                onChange={(e) => setR2(e.target.value)}
                placeholder="e.g., 0.25"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="protection-type">Protection Device (Optional)</Label>
              <Select value={protectionType} onValueChange={setProtectionType}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue placeholder="Select device type" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="mcb-b">MCB Type B</SelectItem>
                  <SelectItem value="mcb-c">MCB Type C</SelectItem>
                  <SelectItem value="bs88">BS88 Fuse</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {protectionType && (
              <div>
                <Label htmlFor="protection-rating">Device Rating (A)</Label>
                <Select value={protectionRating} onValueChange={setProtectionRating}>
                  <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent className="bg-elec-dark border-elec-yellow/20">
                    {Object.keys(maxZsValues[protectionType as keyof typeof maxZsValues] || {}).map((rating) => (
                      <SelectItem key={rating} value={rating}>
                        {rating}A
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex gap-2">
              <Button 
                onClick={calculateZs} 
                className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
                disabled={!ze || !r1 || !r2}
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
                  <p className="text-sm text-muted-foreground">Calculated Zs:</p>
                  <p className="text-2xl font-bold text-white">{calculatedZs.toFixed(3)}Ω</p>
                </div>

                {maxZs !== null && (
                  <>
                    <div>
                      <p className="text-sm text-muted-foreground">Maximum allowed Zs:</p>
                      <p className="text-xl font-bold text-white">{maxZs}Ω</p>
                    </div>

                    <div className={`p-3 rounded ${isCompliant ? 'bg-green-500/20 border border-green-500/30' : 'bg-red-500/20 border border-red-500/30'}`}>
                      <p className={`font-medium ${isCompliant ? 'text-green-300' : 'text-red-300'}`}>
                        {isCompliant ? '✓ COMPLIANT' : '✗ NON-COMPLIANT'}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {isCompliant ? 
                          'The measured Zs is within acceptable limits.' : 
                          'The measured Zs exceeds the maximum allowed value.'
                        }
                      </p>
                    </div>
                  </>
                )}

                <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
                  <p className="text-xs text-blue-300">
                    <strong>Formula:</strong> Zs = Ze + R1 + R2<br />
                    Where Ze is external impedance, R1 is phase conductor resistance, and R2 is earth conductor resistance.
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">
                Enter Ze, R1, and R2 values to calculate the earth fault loop impedance.
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EarthFaultLoopCalculator;
