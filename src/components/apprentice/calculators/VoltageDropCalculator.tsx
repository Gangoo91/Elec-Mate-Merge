
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Activity, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const VoltageDropCalculator = () => {
  const [cableLength, setCableLength] = useState<string>("");
  const [cableSize, setCableSize] = useState<string>("");
  const [loadCurrent, setLoadCurrent] = useState<string>("");
  const [voltageDrop, setVoltageDrop] = useState<string | null>(null);
  const [percentage, setPercentage] = useState<string | null>(null);
  const [voltage, setVoltage] = useState<string>("230");
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateInputs = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!voltage) newErrors.voltage = "Supply voltage is required";
    else if (parseFloat(voltage) <= 0) newErrors.voltage = "Supply voltage must be greater than 0";
    
    if (!cableLength) newErrors.cableLength = "Cable length is required";
    else if (parseFloat(cableLength) <= 0) newErrors.cableLength = "Cable length must be greater than 0";
    
    if (!cableSize) newErrors.cableSize = "Cable size is required";
    
    if (!loadCurrent) newErrors.loadCurrent = "Load current is required";
    else if (parseFloat(loadCurrent) <= 0) newErrors.loadCurrent = "Load current must be greater than 0";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateVoltageDrop = () => {
    if (!validateInputs()) return;
    
    const length = parseFloat(cableLength);
    const current = parseFloat(loadCurrent);
    const size = parseFloat(cableSize);
    const v = parseFloat(voltage);
    
    // Simplified voltage drop calculation using the millivolt per amp meter method
    let resistancePerMeter;
    
    switch(cableSize) {
      case "1.5": resistancePerMeter = 0.012; break;
      case "2.5": resistancePerMeter = 0.007; break;
      case "4": resistancePerMeter = 0.0045; break;
      case "6": resistancePerMeter = 0.003; break;
      case "10": resistancePerMeter = 0.0018; break;
      default: resistancePerMeter = 0.007; 
    }
    
    const drop = (length * current * resistancePerMeter * 2).toFixed(2); // *2 for go and return
    const dropPercentage = ((parseFloat(drop) / v) * 100).toFixed(2);
    
    setVoltageDrop(drop);
    setPercentage(dropPercentage);
  };

  const resetCalculator = () => {
    setCableLength("");
    setCableSize("");
    setLoadCurrent("");
    setVoltageDrop(null);
    setPercentage(null);
    setVoltage("230");
    setErrors({});
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Voltage Drop Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate voltage drop in electrical cables based on load and distance.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="voltage">Supply Voltage (V)</Label>
              <Input 
                id="voltage" 
                type="number" 
                placeholder="Enter supply voltage" 
                className={`bg-elec-dark border-elec-yellow/20 ${errors.voltage ? "border-destructive" : ""}`}
                value={voltage}
                onChange={(e) => {
                  setVoltage(e.target.value);
                  if (errors.voltage) {
                    const newErrors = {...errors};
                    delete newErrors.voltage;
                    setErrors(newErrors);
                  }
                }}
              />
              {errors.voltage && <p className="text-xs text-destructive">{errors.voltage}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="cable-length">Cable Length (m)</Label>
              <Input 
                id="cable-length" 
                type="number" 
                placeholder="Enter cable length" 
                className={`bg-elec-dark border-elec-yellow/20 ${errors.cableLength ? "border-destructive" : ""}`}
                value={cableLength}
                onChange={(e) => {
                  setCableLength(e.target.value);
                  if (errors.cableLength) {
                    const newErrors = {...errors};
                    delete newErrors.cableLength;
                    setErrors(newErrors);
                  }
                }}
              />
              {errors.cableLength && <p className="text-xs text-destructive">{errors.cableLength}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="cable-size">Cable Size</Label>
              <Select 
                value={cableSize} 
                onValueChange={(value) => {
                  setCableSize(value);
                  if (errors.cableSize) {
                    const newErrors = {...errors};
                    delete newErrors.cableSize;
                    setErrors(newErrors);
                  }
                }}
              >
                <SelectTrigger className={`bg-elec-dark border-elec-yellow/20 ${errors.cableSize ? "border-destructive" : ""}`}>
                  <SelectValue placeholder="Select cable size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1.5">1.5 mm²</SelectItem>
                  <SelectItem value="2.5">2.5 mm²</SelectItem>
                  <SelectItem value="4">4.0 mm²</SelectItem>
                  <SelectItem value="6">6.0 mm²</SelectItem>
                  <SelectItem value="10">10.0 mm²</SelectItem>
                </SelectContent>
              </Select>
              {errors.cableSize && <p className="text-xs text-destructive">{errors.cableSize}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="load-current">Load Current (A)</Label>
              <Input 
                id="load-current" 
                type="number" 
                placeholder="Enter load current" 
                className={`bg-elec-dark border-elec-yellow/20 ${errors.loadCurrent ? "border-destructive" : ""}`}
                value={loadCurrent}
                onChange={(e) => {
                  setLoadCurrent(e.target.value);
                  if (errors.loadCurrent) {
                    const newErrors = {...errors};
                    delete newErrors.loadCurrent;
                    setErrors(newErrors);
                  }
                }}
              />
              {errors.loadCurrent && <p className="text-xs text-destructive">{errors.loadCurrent}</p>}
            </div>
          </div>
          
          <div className="flex flex-col space-y-4">
            <div className="flex-grow rounded-md bg-elec-dark p-6 flex flex-col items-center justify-center text-center">
              {voltageDrop ? (
                <>
                  <span className="text-elec-yellow text-xl mb-4">Voltage Drop Results</span>
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">Voltage Drop:</div>
                      <div className="text-2xl font-bold text-elec-yellow">{voltageDrop} V</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">Percentage:</div>
                      <div className="text-2xl font-bold text-elec-yellow">{percentage}%</div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-muted-foreground">
                  <Activity className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Enter values and calculate to see results</p>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button onClick={calculateVoltageDrop} className="w-full">Calculate</Button>
              <Button variant="outline" onClick={resetCalculator} className="w-full">Reset</Button>
            </div>
          </div>
        </div>
        
        {voltageDrop && parseFloat(percentage!) > 2.5 && (
          <Alert variant="destructive" className="mt-4 bg-destructive/20 border-destructive/40">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Warning: Voltage drop exceeds 2.5% which may be outside acceptable limits depending on your application.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="mt-2 p-4 bg-elec-dark/50 rounded-md">
          <h3 className="font-medium mb-2">Voltage Drop Information</h3>
          <p className="text-sm text-elec-light/80 mb-2">
            Voltage drop is the reduction in voltage that occurs as current flows through a cable.
          </p>
          <ul className="space-y-2 text-sm text-elec-light/80">
            <li><span className="text-elec-yellow">Standards:</span> Generally, voltage drop should not exceed 2.5% for power circuits.</li>
            <li><span className="text-elec-yellow">Calculation:</span> Based on cable size, length and load current.</li>
            <li><span className="text-elec-yellow">Solutions:</span> To reduce voltage drop, increase cable size or reduce cable length.</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoltageDropCalculator;
