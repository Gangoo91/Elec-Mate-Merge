
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Zap } from "lucide-react";

const ZsValuesCalculator = () => {
  const [mcbRating, setMcbRating] = useState("");
  const [rcboRating, setRcboRating] = useState("");
  const [fusRating, setFusRating] = useState("");
  const [protectionType, setProtectionType] = useState("");
  const [result, setResult] = useState<number | null>(null);

  // Maximum Zs values for different protection devices (BS 7671)
  const zsValues = {
    mcb: {
      6: 7.67, 10: 4.6, 16: 2.87, 20: 2.3, 25: 1.84, 32: 1.44, 40: 1.15, 50: 0.92, 63: 0.73
    },
    rcbo: {
      6: 7.67, 10: 4.6, 16: 2.87, 20: 2.3, 25: 1.84, 32: 1.44, 40: 1.15, 50: 0.92, 63: 0.73
    },
    fuse: {
      5: 9.2, 10: 4.6, 15: 3.07, 20: 2.3, 25: 1.84, 30: 1.53, 45: 1.02
    }
  };

  const calculateZs = () => {
    let rating: number;
    let deviceType: keyof typeof zsValues;

    if (protectionType === "mcb") {
      rating = parseInt(mcbRating);
      deviceType = "mcb";
    } else if (protectionType === "rcbo") {
      rating = parseInt(rcboRating);
      deviceType = "rcbo";
    } else if (protectionType === "fuse") {
      rating = parseInt(fusRating);
      deviceType = "fuse";
    } else {
      return;
    }

    const maxZs = zsValues[deviceType][rating as keyof typeof zsValues[typeof deviceType]];
    setResult(maxZs || null);
  };

  const resetCalculator = () => {
    setMcbRating("");
    setRcboRating("");
    setFusRating("");
    setProtectionType("");
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Maximum Zs Values Calculator</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="protection-type">Protection Device Type</Label>
              <Select value={protectionType} onValueChange={setProtectionType}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue placeholder="Select device type" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="mcb">MCB (Miniature Circuit Breaker)</SelectItem>
                  <SelectItem value="rcbo">RCBO (RCD + MCB)</SelectItem>
                  <SelectItem value="fuse">BS 88 Fuse</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {protectionType === "mcb" && (
              <div>
                <Label htmlFor="mcb-rating">MCB Rating (A)</Label>
                <Select value={mcbRating} onValueChange={setMcbRating}>
                  <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                    <SelectValue placeholder="Select MCB rating" />
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
            )}

            {protectionType === "rcbo" && (
              <div>
                <Label htmlFor="rcbo-rating">RCBO Rating (A)</Label>
                <Select value={rcboRating} onValueChange={setRcboRating}>
                  <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                    <SelectValue placeholder="Select RCBO rating" />
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
            )}

            {protectionType === "fuse" && (
              <div>
                <Label htmlFor="fuse-rating">Fuse Rating (A)</Label>
                <Select value={fusRating} onValueChange={setFusRating}>
                  <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                    <SelectValue placeholder="Select fuse rating" />
                  </SelectTrigger>
                  <SelectContent className="bg-elec-dark border-elec-yellow/20">
                    <SelectItem value="5">5A</SelectItem>
                    <SelectItem value="10">10A</SelectItem>
                    <SelectItem value="15">15A</SelectItem>
                    <SelectItem value="20">20A</SelectItem>
                    <SelectItem value="25">25A</SelectItem>
                    <SelectItem value="30">30A</SelectItem>
                    <SelectItem value="45">45A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex gap-2">
              <Button 
                onClick={calculateZs} 
                className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
                disabled={!protectionType || (!mcbRating && !rcboRating && !fusRating)}
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
            <h3 className="text-lg font-medium text-elec-yellow mb-4">Maximum Zs Value</h3>
            {result !== null ? (
              <div className="space-y-2">
                <div className="text-2xl font-bold text-white">{result}Ω</div>
                <p className="text-sm text-muted-foreground">
                  Maximum earth fault loop impedance for {protectionType?.toUpperCase()} 
                  {protectionType === "mcb" && mcbRating && ` ${mcbRating}A`}
                  {protectionType === "rcbo" && rcboRating && ` ${rcboRating}A`}
                  {protectionType === "fuse" && fusRating && ` ${fusRating}A`}
                </p>
                <div className="bg-amber-500/10 border border-amber-500/30 rounded p-3 mt-4">
                  <p className="text-xs text-amber-300">
                    <strong>Note:</strong> These values are for Type B MCBs and BS 88 fuses at 230V. 
                    Actual measured Zs must be less than this maximum value for safe operation.
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">Select protection device type and rating to calculate maximum Zs value</p>
            )}
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-300 mb-2">What is Zs?</h4>
          <p className="text-xs text-muted-foreground">
            Zs is the earth fault loop impedance - the total impedance of the path taken by fault current 
            from the point of fault to earth and back to the source. It must be low enough to ensure 
            protective devices operate within required time limits as per BS 7671.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ZsValuesCalculator;
