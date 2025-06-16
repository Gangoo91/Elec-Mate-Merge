
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Cable, ArrowLeft, Calculator, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const CableSizingCalculator = () => {
  const [current, setCurrent] = useState("");
  const [length, setLength] = useState("");
  const [voltage, setVoltage] = useState("230");
  const [installationMethod, setInstallationMethod] = useState("");
  const [cableType, setCableType] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculateCableSize = () => {
    const currentValue = parseFloat(current);
    const lengthValue = parseFloat(length);
    const voltageValue = parseFloat(voltage);

    if (!currentValue || !lengthValue || !voltageValue) {
      return;
    }

    // Basic cable sizing calculation
    // This is a simplified version - in practice, you'd use proper tables
    let recommendedSize = "1.5";
    
    if (currentValue <= 10) recommendedSize = "1.5";
    else if (currentValue <= 16) recommendedSize = "2.5";
    else if (currentValue <= 20) recommendedSize = "4.0";
    else if (currentValue <= 25) recommendedSize = "6.0";
    else if (currentValue <= 32) recommendedSize = "10.0";
    else if (currentValue <= 40) recommendedSize = "16.0";
    else recommendedSize = "25.0";

    // Calculate voltage drop
    const resistance = 18.1 / 1000; // Simplified resistance per meter for copper
    const voltageDrop = (2 * currentValue * lengthValue * resistance) / 1000;
    const voltageDropPercentage = (voltageDrop / voltageValue) * 100;

    setResult({
      recommendedSize,
      voltageDrop: voltageDrop.toFixed(2),
      voltageDropPercentage: voltageDropPercentage.toFixed(2),
      current: currentValue,
      length: lengthValue,
      voltage: voltageValue
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Cable className="h-8 w-8 text-elec-yellow" />
            Cable Sizing Calculator
          </h1>
          <p className="text-muted-foreground mt-2">
            Calculate appropriate cable sizes for electrical installations
          </p>
        </div>
        <Link to="/electrician-tools/calculations">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Calculations
          </Button>
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-elec-yellow flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Cable Parameters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current">Load Current (A)</Label>
              <Input
                id="current"
                type="number"
                placeholder="Enter current in amps"
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="length">Cable Length (m)</Label>
              <Input
                id="length"
                type="number"
                placeholder="Enter length in metres"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="voltage">Supply Voltage (V)</Label>
              <Select value={voltage} onValueChange={setVoltage}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="230">230V (Single Phase)</SelectItem>
                  <SelectItem value="400">400V (Three Phase)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="installation">Installation Method</Label>
              <Select value={installationMethod} onValueChange={setInstallationMethod}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue placeholder="Select installation method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clipped-direct">Clipped Direct</SelectItem>
                  <SelectItem value="conduit">In Conduit</SelectItem>
                  <SelectItem value="trunking">In Trunking</SelectItem>
                  <SelectItem value="buried">Buried Direct</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cable-type">Cable Type</Label>
              <Select value={cableType} onValueChange={setCableType}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue placeholder="Select cable type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pvc-copper">PVC/Copper</SelectItem>
                  <SelectItem value="xlpe-copper">XLPE/Copper</SelectItem>
                  <SelectItem value="pvc-aluminium">PVC/Aluminium</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={calculateCableSize}
              className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90"
              disabled={!current || !length}
            >
              Calculate Cable Size
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-elec-yellow flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Calculation Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            {result ? (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-elec-yellow mb-2">
                    {result.recommendedSize}mm²
                  </div>
                  <p className="text-muted-foreground">Recommended Cable Size</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-lg bg-elec-dark/50">
                    <div className="text-lg font-semibold">{result.voltageDrop}V</div>
                    <p className="text-sm text-muted-foreground">Voltage Drop</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-elec-dark/50">
                    <div className="text-lg font-semibold">{result.voltageDropPercentage}%</div>
                    <p className="text-sm text-muted-foreground">Percentage Drop</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Load Current:</span>
                    <span>{result.current}A</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cable Length:</span>
                    <span>{result.length}m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Supply Voltage:</span>
                    <span>{result.voltage}V</span>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <p className="text-sm text-amber-400">
                    <strong>Important:</strong> This is a simplified calculation. Always verify 
                    with BS 7671 tables and consider derating factors, grouping, and ambient temperature.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                <Cable className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Enter cable parameters to calculate the recommended size</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Information Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-blue-500/20 bg-blue-500/5">
          <CardHeader>
            <CardTitle className="text-blue-400">Cable Sizing Factors</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Current carrying capacity</li>
              <li>• Voltage drop limitations (3% for lighting, 5% for power)</li>
              <li>• Installation method and environment</li>
              <li>• Grouping and derating factors</li>
              <li>• Ambient temperature conditions</li>
              <li>• Short circuit protection</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-green-500/20 bg-green-500/5">
          <CardHeader>
            <CardTitle className="text-green-400">BS 7671 Compliance</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Follow Appendix 4 current carrying capacity tables</li>
              <li>• Apply appropriate derating factors</li>
              <li>• Consider voltage drop requirements</li>
              <li>• Ensure adequate short circuit protection</li>
              <li>• Verify earth fault loop impedance</li>
              <li>• Document design calculations</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CableSizingCalculator;
