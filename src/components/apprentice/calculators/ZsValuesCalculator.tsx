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
      2: 23, 4: 11.5, 5: 9.2, 6: 7.67, 10: 4.6, 15: 3.07, 16: 2.87, 20: 2.3, 25: 1.84, 30: 1.53, 32: 1.44, 35: 1.31, 40: 1.15, 45: 1.02, 50: 0.92, 63: 0.73, 80: 0.58, 100: 0.46
    },
    "bs1361": {
      5: 9.2, 15: 3.07, 20: 2.3, 30: 1.53, 45: 1.02
    },
    "bs1361-type2": {
      5: 9.2, 15: 3.07, 20: 2.3, 30: 1.53, 45: 1.02
    },
    "bs3036": {
      5: 11.5, 15: 3.83, 20: 2.87, 30: 1.92, 45: 1.28
    },
    "bs1362": {
      3: 15.33, 5: 9.2, 13: 1.77
    },
    "bs646": {
      5: 9.2, 15: 3.07, 20: 2.3, 30: 1.53, 45: 1.02, 60: 0.77
    },
    "bs88-4": {
      2: 23, 4: 11.5, 6: 7.67, 10: 4.6, 16: 2.87, 20: 2.3, 25: 1.84, 32: 1.44
    },
    "bs88-6": {
      2: 23, 4: 11.5, 6: 7.67, 10: 4.6, 16: 2.87, 20: 2.3, 25: 1.84, 32: 1.44, 40: 1.15, 50: 0.92, 63: 0.73, 80: 0.58, 100: 0.46
    },
    "iec60269": {
      2: 23, 4: 11.5, 6: 7.67, 10: 4.6, 16: 2.87, 20: 2.3, 25: 1.84, 32: 1.44, 40: 1.15, 50: 0.92, 63: 0.73
    },
    "iec60269-1": {
      2: 23, 4: 11.5, 6: 7.67, 10: 4.6, 16: 2.87, 20: 2.3, 25: 1.84, 32: 1.44, 40: 1.15, 50: 0.92, 63: 0.73, 80: 0.58, 100: 0.46
    },
    "iec60269-2": {
      2: 23, 4: 11.5, 6: 7.67, 10: 4.6, 16: 2.87, 20: 2.3, 25: 1.84, 32: 1.44, 50: 0.92, 63: 0.73
    },
    "din": {
      2: 23, 4: 11.5, 6: 7.67, 10: 4.6, 16: 2.87, 20: 2.3, 25: 1.84, 32: 1.44, 35: 1.31, 50: 0.92, 63: 0.73
    },
    "din43653": {
      6: 7.67, 10: 4.6, 16: 2.87, 20: 2.3, 25: 1.84, 35: 1.31, 50: 0.92, 63: 0.73
    },
    "neozed": {
      2: 23, 6: 7.67, 10: 4.6, 16: 2.87, 20: 2.3, 25: 1.84, 35: 1.31
    },
    "diazed": {
      2: 23, 4: 11.5, 6: 7.67, 10: 4.6, 16: 2.87, 20: 2.3, 25: 1.84, 35: 1.31, 50: 0.92, 63: 0.73
    }
  };

  const fuseTypes = {
    "bs88": "BS 88 Fuse (HRC)",
    "bs1361": "BS 1361 Cartridge Fuse Type I",
    "bs1361-type2": "BS 1361 Cartridge Fuse Type II",
    "bs3036": "BS 3036 Rewirable Fuse",
    "bs1362": "BS 1362 Plug Fuse (13A Socket)",
    "bs646": "BS 646 Cartridge Fuse",
    "bs88-4": "BS 88-4 Compact HRC Fuse",
    "bs88-6": "BS 88-6 Motor Circuit HRC Fuse",
    "iec60269": "IEC 60269 European Fuse",
    "iec60269-1": "IEC 60269-1 General Purpose",
    "iec60269-2": "IEC 60269-2 Partial Range",
    "din": "DIN VDE Industrial Fuse",
    "din43653": "DIN 43653 Blade Fuse",
    "neozed": "NEOZED Bottle Fuse",
    "diazed": "DIAZED Screw-in Fuse"
  };

  const fuseRatings = {
    "bs88": [2, 4, 5, 6, 10, 15, 16, 20, 25, 30, 32, 35, 40, 45, 50, 63, 80, 100],
    "bs1361": [5, 15, 20, 30, 45],
    "bs1361-type2": [5, 15, 20, 30, 45],
    "bs3036": [5, 15, 20, 30, 45],
    "bs1362": [3, 5, 13],
    "bs646": [5, 15, 20, 30, 45, 60],
    "bs88-4": [2, 4, 6, 10, 16, 20, 25, 32],
    "bs88-6": [2, 4, 6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100],
    "iec60269": [2, 4, 6, 10, 16, 20, 25, 32, 40, 50, 63],
    "iec60269-1": [2, 4, 6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100],
    "iec60269-2": [2, 4, 6, 10, 16, 20, 25, 32, 50, 63],
    "din": [2, 4, 6, 10, 16, 20, 25, 32, 35, 50, 63],
    "din43653": [6, 10, 16, 20, 25, 35, 50, 63],
    "neozed": [2, 6, 10, 16, 20, 25, 35],
    "diazed": [2, 4, 6, 10, 16, 20, 25, 35, 50, 63]
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
                    <SelectContent className="bg-elec-dark border-elec-yellow/20 max-h-48">
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
                        : protectionType === "fuse" && (fuseType?.includes("iec") || fuseType?.includes("din") || fuseType?.includes("neozed") || fuseType?.includes("diazed"))
                        ? "European/industrial fuses"
                        : protectionType === "fuse" && fuseType === "bs88-6"
                        ? "motor circuit HRC fuses"
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
          <h4 className="text-sm font-medium text-blue-300 mb-2">International Fuse Types Explained</h4>
          <div className="text-xs text-muted-foreground space-y-1">
            <p><strong>BS 88 (HRC):</strong> High Rupturing Capacity fuses for distribution boards and industrial use</p>
            <p><strong>BS 1361:</strong> Cartridge fuses commonly used in older consumer units (Type I & II)</p>
            <p><strong>BS 3036:</strong> Rewirable fuses (wire element) - less common in modern installations</p>
            <p><strong>BS 1362:</strong> Plug fuses found in 13A socket outlets and plugs</p>
            <p><strong>BS 646:</strong> Cartridge fuses for lighting and small appliance circuits</p>
            <p><strong>BS 88-4:</strong> Compact HRC fuses for modern consumer units</p>
            <p><strong>BS 88-6:</strong> Motor circuit protection HRC fuses for industrial applications</p>
            <p><strong>IEC 60269:</strong> European standard fuses (General & Partial range types)</p>
            <p><strong>DIN:</strong> German/European industrial fuses for motor and industrial circuits</p>
            <p><strong>NEOZED:</strong> German bottle-type fuses commonly used in Europe</p>
            <p><strong>DIAZED:</strong> German screw-in fuses for distribution boards</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ZsValuesCalculator;
