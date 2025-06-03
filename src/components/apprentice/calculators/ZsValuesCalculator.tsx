
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
  const [fuseType, setFuseType] = useState("");
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
    "bs88": {
      5: 9.2, 10: 4.6, 15: 3.07, 20: 2.3, 25: 1.84, 30: 1.53, 45: 1.02
    },
    "bs1361": {
      5: 9.2, 15: 3.07, 20: 2.3, 30: 1.53, 45: 1.02
    },
    "bs3036": {
      5: 11.5, 15: 3.83, 20: 2.87, 30: 1.92, 45: 1.28
    },
    "bs1362": {
      3: 15.33, 5: 9.2, 13: 1.77
    }
  };

  const fuseTypes = {
    "bs88": "BS 88 Fuse (HRC)",
    "bs1361": "BS 1361 Cartridge Fuse",
    "bs3036": "BS 3036 Rewirable Fuse",
    "bs1362": "BS 1362 Plug Fuse (13A Socket)"
  };

  const fuseRatings = {
    "bs88": [5, 10, 15, 20, 25, 30, 45],
    "bs1361": [5, 15, 20, 30, 45],
    "bs3036": [5, 15, 20, 30, 45],
    "bs1362": [3, 5, 13]
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
      deviceType = fuseType as keyof typeof zsValues;
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
    setFuseType("");
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
                  <SelectItem value="fuse">Fuse</SelectItem>
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
              <>
                <div>
                  <Label htmlFor="fuse-type">Fuse Type</Label>
                  <Select value={fuseType} onValueChange={(value) => {
                    setFuseType(value);
                    setFusRating(""); // Reset rating when type changes
                  }}>
                    <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                      <SelectValue placeholder="Select fuse type" />
                    </SelectTrigger>
                    <SelectContent className="bg-elec-dark border-elec-yellow/20">
                      {Object.entries(fuseTypes).map(([key, label]) => (
                        <SelectItem key={key} value={key}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {fuseType && (
                  <div>
                    <Label htmlFor="fuse-rating">Fuse Rating (A)</Label>
                    <Select value={fusRating} onValueChange={setFusRating}>
                      <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                        <SelectValue placeholder="Select fuse rating" />
                      </SelectTrigger>
                      <SelectContent className="bg-elec-dark border-elec-yellow/20">
                        {fuseRatings[fuseType as keyof typeof fuseRatings]?.map((rating) => (
                          <SelectItem key={rating} value={rating.toString()}>
                            {rating}A
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </>
            )}

            <div className="flex gap-2">
              <Button 
                onClick={calculateZs} 
                className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
                disabled={!protectionType || 
                  (protectionType === "mcb" && !mcbRating) ||
                  (protectionType === "rcbo" && !rcboRating) ||
                  (protectionType === "fuse" && (!fuseType || !fusRating))
                }
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
                  Maximum earth fault loop impedance for{" "}
                  {protectionType === "mcb" && `MCB ${mcbRating}A`}
                  {protectionType === "rcbo" && `RCBO ${rcboRating}A`}
                  {protectionType === "fuse" && fuseType && fusRating && 
                    `${fuseTypes[fuseType as keyof typeof fuseTypes]} ${fusRating}A`
                  }
                </p>
                <div className="bg-amber-500/10 border border-amber-500/30 rounded p-3 mt-4">
                  <p className="text-xs text-amber-300">
                    <strong>Note:</strong> These values are for {
                      protectionType === "fuse" && fuseType === "bs3036" 
                        ? "rewirable fuses" 
                        : protectionType === "fuse" && fuseType === "bs1362"
                        ? "plug fuses in 13A sockets"
                        : "Type B MCBs and cartridge fuses"
                    } at 230V. 
                    Actual measured Zs must be less than this maximum value for safe operation.
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">
                Select protection device type{protectionType === "fuse" ? ", fuse type," : ""} and rating to calculate maximum Zs value
              </p>
            )}
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-300 mb-2">Fuse Types Explained</h4>
          <div className="text-xs text-muted-foreground space-y-1">
            <p><strong>BS 88 (HRC):</strong> High Rupturing Capacity fuses for distribution boards</p>
            <p><strong>BS 1361:</strong> Cartridge fuses commonly used in older consumer units</p>
            <p><strong>BS 3036:</strong> Rewirable fuses (wire element) - less common in modern installations</p>
            <p><strong>BS 1362:</strong> Plug fuses found in 13A socket outlets and plugs</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ZsValuesCalculator;
