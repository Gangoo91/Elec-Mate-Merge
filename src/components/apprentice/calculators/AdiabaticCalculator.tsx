
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Sigma } from "lucide-react";

const AdiabaticCalculator = () => {
  const [faultCurrent, setFaultCurrent] = useState("");
  const [disconnectionTime, setDisconnectionTime] = useState("");
  const [conductorMaterial, setConductorMaterial] = useState("");
  const [calculationType, setCalculationType] = useState("");
  const [cableSize, setCableSize] = useState("");
  const [result, setResult] = useState<number | null>(null);

  // k values for different conductor materials (BS 7671 Table 54.2)
  const kValues = {
    copper_pvc: 115,      // Copper conductors with PVC insulation
    copper_xlpe: 143,     // Copper conductors with XLPE insulation
    aluminium_pvc: 76,    // Aluminium conductors with PVC insulation
    aluminium_xlpe: 94    // Aluminium conductors with XLPE insulation
  };

  const calculateAdiabatic = () => {
    const I = parseFloat(faultCurrent);
    const t = parseFloat(disconnectionTime);
    const k = kValues[conductorMaterial as keyof typeof kValues];
    const s = parseFloat(cableSize);

    if (!I || !t || !k) return;

    if (calculationType === "minCsa") {
      // Calculate minimum cross-sectional area: S = (I × √t) / k
      const minCsa = (I * Math.sqrt(t)) / k;
      setResult(Math.ceil(minCsa * 100) / 100); // Round up to 2 decimal places
    } else if (calculationType === "maxTime" && s) {
      // Calculate maximum disconnection time: t = (S × k / I)²
      const maxTime = Math.pow((s * k) / I, 2);
      setResult(Math.ceil(maxTime * 1000) / 1000); // Round up to 3 decimal places
    } else if (calculationType === "maxCurrent" && s) {
      // Calculate maximum fault current: I = (S × k) / √t
      const maxCurrent = (s * k) / Math.sqrt(t);
      setResult(Math.ceil(maxCurrent * 10) / 10); // Round up to 1 decimal place
    }
  };

  const resetCalculator = () => {
    setFaultCurrent("");
    setDisconnectionTime("");
    setConductorMaterial("");
    setCalculationType("");
    setCableSize("");
    setResult(null);
  };

  const getResultLabel = () => {
    switch (calculationType) {
      case "minCsa": return "Minimum CSA";
      case "maxTime": return "Maximum Time";
      case "maxCurrent": return "Maximum Current";
      default: return "Result";
    }
  };

  const getResultUnit = () => {
    switch (calculationType) {
      case "minCsa": return "mm²";
      case "maxTime": return "seconds";
      case "maxCurrent": return "A";
      default: return "";
    }
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sigma className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Adiabatic Equation Calculator</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="calculation-type">What do you want to calculate?</Label>
              <Select value={calculationType} onValueChange={setCalculationType}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue placeholder="Select calculation type" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="minCsa">Minimum Cross-Sectional Area</SelectItem>
                  <SelectItem value="maxTime">Maximum Disconnection Time</SelectItem>
                  <SelectItem value="maxCurrent">Maximum Fault Current</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="conductor-material">Conductor Material & Insulation</Label>
              <Select value={conductorMaterial} onValueChange={setConductorMaterial}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue placeholder="Select material" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="copper_pvc">Copper with PVC (k=115)</SelectItem>
                  <SelectItem value="copper_xlpe">Copper with XLPE (k=143)</SelectItem>
                  <SelectItem value="aluminium_pvc">Aluminium with PVC (k=76)</SelectItem>
                  <SelectItem value="aluminium_xlpe">Aluminium with XLPE (k=94)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {calculationType !== "maxCurrent" && (
              <div>
                <Label htmlFor="fault-current">Prospective Fault Current (A)</Label>
                <Input
                  id="fault-current"
                  type="number"
                  value={faultCurrent}
                  onChange={(e) => setFaultCurrent(e.target.value)}
                  placeholder="Enter fault current in amperes"
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>
            )}

            {calculationType !== "maxTime" && (
              <div>
                <Label htmlFor="disconnection-time">Disconnection Time (s)</Label>
                <Input
                  id="disconnection-time"
                  type="number"
                  step="0.001"
                  value={disconnectionTime}
                  onChange={(e) => setDisconnectionTime(e.target.value)}
                  placeholder="Enter time in seconds"
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>
            )}

            {calculationType !== "minCsa" && (
              <div>
                <Label htmlFor="cable-size">Cable Cross-Sectional Area (mm²)</Label>
                <Input
                  id="cable-size"
                  type="number"
                  step="0.1"
                  value={cableSize}
                  onChange={(e) => setCableSize(e.target.value)}
                  placeholder="Enter CSA in mm²"
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>
            )}

            <div className="flex gap-2">
              <Button 
                onClick={calculateAdiabatic} 
                className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
                disabled={!calculationType || !conductorMaterial}
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
            <h3 className="text-lg font-medium text-elec-yellow mb-4">{getResultLabel()}</h3>
            {result !== null ? (
              <div className="space-y-2">
                <div className="text-2xl font-bold text-white">
                  {result} {getResultUnit()}
                </div>
                <p className="text-sm text-muted-foreground">
                  Based on adiabatic equation: S = (I × √t) / k
                </p>
                {calculationType === "minCsa" && (
                  <div className="bg-green-500/10 border border-green-500/30 rounded p-3 mt-4">
                    <p className="text-xs text-green-300">
                      <strong>Result:</strong> Cable must have minimum CSA of {result}mm² 
                      to withstand the fault current safely.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-muted-foreground">Enter values and select calculation type to see result</p>
            )}
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-300 mb-2">Adiabatic Equation</h4>
          <p className="text-xs text-muted-foreground mb-2">
            <strong>S = (I × √t) / k</strong>
          </p>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li><strong>S</strong> = Minimum cross-sectional area (mm²)</li>
            <li><strong>I</strong> = Prospective fault current (A)</li>
            <li><strong>t</strong> = Disconnection time (s)</li>
            <li><strong>k</strong> = Material constant from BS 7671 Table 54.2</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdiabaticCalculator;
