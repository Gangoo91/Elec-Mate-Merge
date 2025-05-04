
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sigma, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CableSizeOption {
  value: string;
  size: string;
  currentRating: {
    pvc: number;
    xlpe: number;
  };
  voltageDropPerAmpereMeter: number;
  calculatedVoltageDrop?: number; // Added property
  meetsVoltageDrop?: boolean;     // Added property
}

const CableSizingCalculator = () => {
  const [current, setCurrent] = useState<string>("");
  const [length, setLength] = useState<string>("");
  const [installationType, setInstallationType] = useState<"pvc" | "xlpe">("pvc");
  const [voltageDrop, setVoltageDrop] = useState<string>("5"); // Default 5%
  const [voltage, setVoltage] = useState<string>("230"); // Default 230V
  const [recommendedCable, setRecommendedCable] = useState<CableSizeOption | null>(null);
  const [alternativeCables, setAlternativeCables] = useState<CableSizeOption[]>([]);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Cable data - typical values for copper cables
  const cableSizes: CableSizeOption[] = [
    {
      value: "1.5",
      size: "1.5 mm²",
      currentRating: { pvc: 17, xlpe: 20 },
      voltageDropPerAmpereMeter: 0.029
    },
    {
      value: "2.5",
      size: "2.5 mm²",
      currentRating: { pvc: 23, xlpe: 28 },
      voltageDropPerAmpereMeter: 0.018
    },
    {
      value: "4",
      size: "4 mm²",
      currentRating: { pvc: 31, xlpe: 38 },
      voltageDropPerAmpereMeter: 0.011
    },
    {
      value: "6",
      size: "6 mm²",
      currentRating: { pvc: 40, xlpe: 49 },
      voltageDropPerAmpereMeter: 0.0074
    },
    {
      value: "10",
      size: "10 mm²",
      currentRating: { pvc: 54, xlpe: 67 },
      voltageDropPerAmpereMeter: 0.0044
    },
    {
      value: "16",
      size: "16 mm²",
      currentRating: { pvc: 73, xlpe: 89 },
      voltageDropPerAmpereMeter: 0.0028
    },
    {
      value: "25",
      size: "25 mm²",
      currentRating: { pvc: 95, xlpe: 118 },
      voltageDropPerAmpereMeter: 0.0018
    },
    {
      value: "35",
      size: "35 mm²",
      currentRating: { pvc: 117, xlpe: 145 },
      voltageDropPerAmpereMeter: 0.0013
    },
  ];

  const validateInputs = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!current) newErrors.current = "Current is required";
    else if (isNaN(parseFloat(current)) || parseFloat(current) <= 0) 
      newErrors.current = "Please enter a valid positive number";
    
    if (!length) newErrors.length = "Cable length is required";
    else if (isNaN(parseFloat(length)) || parseFloat(length) <= 0) 
      newErrors.length = "Please enter a valid positive number";
    
    if (!voltageDrop) newErrors.voltageDrop = "Voltage drop percentage is required";
    else if (isNaN(parseFloat(voltageDrop)) || parseFloat(voltageDrop) <= 0) 
      newErrors.voltageDrop = "Please enter a valid positive number";
    
    if (!voltage) newErrors.voltage = "Voltage is required";
    else if (isNaN(parseFloat(voltage)) || parseFloat(voltage) <= 0) 
      newErrors.voltage = "Please enter a valid positive number";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateCableSize = () => {
    if (!validateInputs()) return;
    
    const currentAmp = parseFloat(current);
    const cableLength = parseFloat(length);
    const maxVoltageDrop = (parseFloat(voltageDrop) / 100) * parseFloat(voltage);
    
    // First filter by current carrying capacity
    const suitableCables = cableSizes.filter(cable => 
      cable.currentRating[installationType] >= currentAmp
    );
    
    if (suitableCables.length === 0) {
      setRecommendedCable(null);
      setAlternativeCables([]);
      setErrors({
        current: `Current exceeds maximum rating for available cables. Maximum current for ${installationType.toUpperCase()} insulation is ${
          Math.max(...cableSizes.map(c => c.currentRating[installationType]))
        }A`
      });
      return;
    }
    
    // Then check voltage drop for each suitable cable
    const cablesWithVoltageDrop = suitableCables.map(cable => {
      const vDrop = cable.voltageDropPerAmpereMeter * currentAmp * cableLength;
      return {
        ...cable,
        calculatedVoltageDrop: vDrop,
        meetsVoltageDrop: vDrop <= maxVoltageDrop
      };
    });
    
    // Filter cables that meet voltage drop criteria
    const compliantCables = cablesWithVoltageDrop.filter(cable => cable.meetsVoltageDrop);
    
    if (compliantCables.length === 0) {
      // If no cables meet criteria, recommend parallel cables or higher voltage
      setRecommendedCable(null);
      setAlternativeCables(cablesWithVoltageDrop.sort((a, b) => 
        a.calculatedVoltageDrop! - b.calculatedVoltageDrop!
      ));
      setErrors({
        general: "No single cable meets both current capacity and voltage drop requirements. Consider parallel cables or a higher voltage system."
      });
      return;
    }
    
    // Recommend the smallest compliant cable
    const recommended = compliantCables[0];
    setRecommendedCable(recommended);
    
    // Suggest alternatives (next size up)
    const alternatives = compliantCables.slice(1, 3);
    setAlternativeCables(alternatives);
    
    // Clear any previous errors
    setErrors({});
  };

  const clearError = (field: string) => {
    if (errors[field]) {
      const newErrors = {...errors};
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const resetCalculator = () => {
    setCurrent("");
    setLength("");
    setInstallationType("pvc");
    setVoltageDrop("5");
    setVoltage("230");
    setRecommendedCable(null);
    setAlternativeCables([]);
    setErrors({});
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sigma className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Cable Sizing Calculator</CardTitle>
        </div>
        <CardDescription>
          Determine appropriate cable size based on current capacity and voltage drop.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current">Design Current (A)</Label>
              <Input 
                id="current" 
                type="number" 
                placeholder="Enter load current" 
                className="bg-elec-dark border-elec-yellow/20"
                value={current}
                onChange={(e) => {
                  setCurrent(e.target.value);
                  clearError('current');
                }}
              />
              {errors.current && <p className="text-xs text-destructive">{errors.current}</p>}
              <p className="text-xs text-muted-foreground">Maximum current the cable will carry</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cable-length">Cable Length (m)</Label>
              <Input 
                id="cable-length" 
                type="number" 
                placeholder="Enter cable length" 
                className="bg-elec-dark border-elec-yellow/20"
                value={length}
                onChange={(e) => {
                  setLength(e.target.value);
                  clearError('length');
                }}
              />
              {errors.length && <p className="text-xs text-destructive">{errors.length}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="installation-type">Cable Insulation Type</Label>
              <Select 
                value={installationType} 
                onValueChange={(value: "pvc" | "xlpe") => setInstallationType(value)}
              >
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue placeholder="Select insulation type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pvc">PVC Insulation</SelectItem>
                  <SelectItem value="xlpe">XLPE Insulation</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">Different insulation affects current carrying capacity</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="voltage">Supply Voltage (V)</Label>
                <Input 
                  id="voltage" 
                  type="number" 
                  placeholder="230" 
                  className="bg-elec-dark border-elec-yellow/20"
                  value={voltage}
                  onChange={(e) => {
                    setVoltage(e.target.value);
                    clearError('voltage');
                  }}
                />
                {errors.voltage && <p className="text-xs text-destructive">{errors.voltage}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="voltage-drop">Max Voltage Drop (%)</Label>
                <Input 
                  id="voltage-drop" 
                  type="number" 
                  placeholder="5" 
                  className="bg-elec-dark border-elec-yellow/20"
                  value={voltageDrop}
                  onChange={(e) => {
                    setVoltageDrop(e.target.value);
                    clearError('voltageDrop');
                  }}
                />
                {errors.voltageDrop && <p className="text-xs text-destructive">{errors.voltageDrop}</p>}
              </div>
            </div>

            <div className="flex space-x-3 pt-2">
              <Button onClick={calculateCableSize} className="flex-1">Calculate</Button>
              <Button variant="outline" onClick={resetCalculator} className="flex-1">Reset</Button>
            </div>
          </div>
          
          <div className="flex flex-col space-y-4">
            <div className="rounded-md bg-elec-dark p-6 flex-grow flex flex-col">
              {errors.general && (
                <Alert className="mb-4 bg-amber-900/30 border-amber-500/50">
                  <Info className="h-4 w-4 text-amber-500" />
                  <AlertDescription className="text-amber-100">
                    {errors.general}
                  </AlertDescription>
                </Alert>
              )}
              
              {recommendedCable ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-elec-yellow text-lg font-medium mb-3">Recommended Cable Size</h3>
                    <div className="bg-elec-gray/30 rounded-md p-4 border border-elec-yellow/20">
                      <div className="text-3xl font-bold text-elec-yellow mb-2">{recommendedCable.size}</div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Insulation: </span>
                          <span className="font-medium">{installationType.toUpperCase()}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Rating: </span>
                          <span className="font-medium">{recommendedCable.currentRating[installationType]}A</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-muted-foreground">Voltage drop: </span>
                          <span className="font-medium">
                            {(recommendedCable.voltageDropPerAmpereMeter * parseFloat(current) * parseFloat(length)).toFixed(2)}V 
                            ({((recommendedCable.voltageDropPerAmpereMeter * parseFloat(current) * parseFloat(length)) / parseFloat(voltage) * 100).toFixed(2)}%)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {alternativeCables.length > 0 && (
                    <div>
                      <h3 className="text-elec-yellow text-sm font-medium mb-2">Alternative Options</h3>
                      <div className="space-y-2">
                        {alternativeCables.map((cable, index) => (
                          <div key={index} className="bg-elec-gray/30 rounded-md p-3 border border-elec-yellow/10 text-sm">
                            <div className="font-medium">{cable.size}</div>
                            <div className="text-muted-foreground text-xs">
                              Rating: {cable.currentRating[installationType]}A | 
                              V-Drop: {(cable.voltageDropPerAmpereMeter * parseFloat(current) * parseFloat(length)).toFixed(1)}V
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : alternativeCables.length > 0 ? (
                <div className="space-y-4">
                  <h3 className="text-red-400 text-lg font-medium">Voltage Drop Too High</h3>
                  <p className="text-sm text-muted-foreground">
                    Even the largest available cable cannot meet the voltage drop requirements for this length and current.
                  </p>
                  <div>
                    <h4 className="text-elec-yellow text-sm font-medium mb-2">Best Option (with high voltage drop)</h4>
                    <div className="bg-elec-gray/30 rounded-md p-3 border border-red-500/20">
                      <div className="font-medium">{alternativeCables[0].size}</div>
                      <div className="text-muted-foreground text-xs">
                        Rating: {alternativeCables[0].currentRating[installationType]}A<br/>
                        Voltage Drop: {(alternativeCables[0].calculatedVoltageDrop).toFixed(1)}V 
                        ({((alternativeCables[0].calculatedVoltageDrop) / parseFloat(voltage) * 100).toFixed(1)}%)
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Consider using parallel cables, a higher voltage system, or a different route with shorter cable length.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground">
                  <Sigma className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Enter values to calculate recommended cable size</p>
                </div>
              )}
            </div>
            
            <Alert className="bg-elec-dark/50 border-elec-yellow/20">
              <div className="space-y-2">
                <h3 className="font-medium">Cable Selection Factors</h3>
                <p className="text-sm text-elec-light/80">
                  Cable sizing depends on multiple factors beyond current rating alone:
                </p>
                <ul className="space-y-1 text-xs text-elec-light/80 list-disc pl-5">
                  <li>Current-carrying capacity</li>
                  <li>Voltage drop over distance</li>
                  <li>Installation method & ambient temperature</li>
                  <li>Grouping factors when multiple cables run together</li>
                  <li>Short circuit protection requirements</li>
                </ul>
                <p className="text-xs text-elec-light/80 mt-1">
                  Always consult relevant electrical codes and standards for your specific application.
                </p>
              </div>
            </Alert>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CableSizingCalculator;
