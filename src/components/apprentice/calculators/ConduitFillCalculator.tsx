
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator } from "lucide-react";

const ConduitFillCalculator = () => {
  const [conduitSize, setConduitSize] = useState("");
  const [cableSize, setCableSize] = useState("");
  const [cableQuantity, setCableQuantity] = useState("");
  const [result, setResult] = useState<{
    fillPercentage: number;
    maxCables: number;
    suitable: boolean;
  } | null>(null);

  // Conduit internal diameters (mm) - BS EN 61386-1
  const conduitData = {
    "16": { diameter: 12.2, area: 117 },
    "20": { diameter: 16.0, area: 201 },
    "25": { diameter: 20.4, area: 327 },
    "32": { diameter: 26.0, area: 531 },
    "40": { diameter: 32.0, area: 804 },
    "50": { diameter: 40.0, area: 1257 },
    "63": { diameter: 52.0, area: 2124 },
    "75": { diameter: 62.0, area: 3019 },
    "100": { diameter: 82.0, area: 5281 },
  };

  // Cable outer diameters (mm) for common UK cables
  const cableData = {
    "1.0": 3.2,
    "1.5": 3.6,
    "2.5": 4.2,
    "4.0": 4.8,
    "6.0": 5.5,
    "10.0": 6.8,
    "16.0": 8.2,
    "25.0": 10.5,
    "35.0": 12.0,
  };

  const calculateConduitFill = () => {
    const conduit = conduitData[conduitSize as keyof typeof conduitData];
    const cableDiameter = cableData[cableSize as keyof typeof cableData];
    const quantity = parseInt(cableQuantity);

    if (!conduit || !cableDiameter || !quantity) return;

    const cableArea = Math.PI * Math.pow(cableDiameter / 2, 2);
    const totalCableArea = cableArea * quantity;
    const fillPercentage = (totalCableArea / conduit.area) * 100;
    
    // Calculate maximum cables that can fit (40% fill for more than 2 cables)
    const maxFillArea = conduit.area * 0.4; // 40% fill factor
    const maxCables = Math.floor(maxFillArea / cableArea);
    
    const suitable = fillPercentage <= 40; // BS 7671 recommends max 40% fill

    setResult({
      fillPercentage: Math.round(fillPercentage * 10) / 10,
      maxCables,
      suitable
    });
  };

  const resetCalculator = () => {
    setConduitSize("");
    setCableSize("");
    setCableQuantity("");
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Conduit Fill Calculator</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="conduit-size">Conduit Size (mm)</Label>
              <Select value={conduitSize} onValueChange={setConduitSize}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue placeholder="Select conduit size" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="16">16mm</SelectItem>
                  <SelectItem value="20">20mm</SelectItem>
                  <SelectItem value="25">25mm</SelectItem>
                  <SelectItem value="32">32mm</SelectItem>
                  <SelectItem value="40">40mm</SelectItem>
                  <SelectItem value="50">50mm</SelectItem>
                  <SelectItem value="63">63mm</SelectItem>
                  <SelectItem value="75">75mm</SelectItem>
                  <SelectItem value="100">100mm</SelectItem>
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
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="cable-quantity">Number of Cables</Label>
              <Input
                id="cable-quantity"
                type="number"
                min="1"
                value={cableQuantity}
                onChange={(e) => setCableQuantity(e.target.value)}
                placeholder="Enter number of cables"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={calculateConduitFill} 
                className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
                disabled={!conduitSize || !cableSize || !cableQuantity}
              >
                <Calculator className="mr-2 h-4 w-4" />
                Calculate
              </Button>
              <Button variant="outline" onClick={resetCalculator}>
                Reset
              </Button>
            </div>
          </div>

          <div className="bg-elec-dark/50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-elec-yellow mb-4">Fill Analysis</h3>
            {result ? (
              <div className="space-y-3">
                <div className="text-2xl font-bold text-white">
                  {result.fillPercentage}%
                </div>
                <div className={`p-3 rounded border ${
                  result.suitable 
                    ? 'bg-green-500/10 border-green-500/30 text-green-300' 
                    : 'bg-red-500/10 border-red-500/30 text-red-300'
                }`}>
                  <p className="text-sm font-medium">
                    {result.suitable ? '✓ Suitable' : '✗ Exceeds recommended fill'}
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Maximum cables: {result.maxCables}</p>
                  <p>Current cables: {cableQuantity}</p>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">Select conduit size, cable size, and quantity to calculate fill</p>
            )}
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-300 mb-2">BS 7671 Guidance</h4>
          <p className="text-xs text-muted-foreground">
            Maximum recommended fill: 40% for more than 2 cables, 45% for 2 cables, 53% for 1 cable.
            This calculator uses 40% as a safe general limit.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConduitFillCalculator;
