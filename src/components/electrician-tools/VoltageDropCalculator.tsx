
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { cableSizes } from "@/components/apprentice/calculators/cable-sizing/cableSizeData"; 

const VoltageDropCalculator = () => {
  const [cableLength, setCableLength] = useState<string>("");
  const [cableSize, setCableSize] = useState<string>("");
  const [cableType, setCableType] = useState<string>("single");
  const [loadCurrent, setLoadCurrent] = useState<string>("");
  const [voltageDrop, setVoltageDrop] = useState<string | null>(null);

  const calculateVoltageDrop = () => {
    // Enhanced voltage drop calculation using the cable data
    if (!cableLength || !cableSize || !loadCurrent) return;
    
    const length = parseFloat(cableLength);
    const current = parseFloat(loadCurrent);
    
    if (isNaN(length) || isNaN(current)) return;
    
    // Find the selected cable in our data
    const selectedCable = cableSizes.find(cable => cable.value === cableSize);
    
    if (!selectedCable) return;
    
    // Calculate voltage drop using the actual per-amp-meter factor from our data
    const drop = (selectedCable.voltageDropPerAmpereMeter * length * current).toFixed(2);
    
    setVoltageDrop(drop);
  };

  // Get cable options for the selected type
  const getCableOptionsForType = () => {
    return cableSizes
      .filter(cable => cable.cableType === cableType)
      .map(cable => ({
        value: cable.value,
        label: cable.size
      }));
  };

  const cableOptions = getCableOptionsForType();

  return (
    <Card className="border border-muted/40 bg-card">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Voltage Drop Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate voltage drop in electrical cables based on load and distance.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="cable-length">Cable Length (m)</Label>
          <Input 
            id="cable-length" 
            type="number" 
            placeholder="Enter cable length" 
            className="bg-card border border-muted/40"
            value={cableLength}
            onChange={(e) => setCableLength(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cable-type">Cable Type</Label>
          <Select value={cableType} onValueChange={setCableType}>
            <SelectTrigger className="bg-card border border-muted/40">
              <SelectValue placeholder="Select cable type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single">Single Core</SelectItem>
              <SelectItem value="twin-and-earth">Twin and Earth</SelectItem>
              <SelectItem value="swa">Steel Wire Armored (SWA)</SelectItem>
              <SelectItem value="lsf">Low Smoke and Fume (LSF)</SelectItem>
              <SelectItem value="armored">Armored</SelectItem>
              <SelectItem value="heat-resistant">Heat Resistant</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="cable-size">Cable Size</Label>
          <Select value={cableSize} onValueChange={setCableSize}>
            <SelectTrigger className="bg-card border border-muted/40">
              <SelectValue placeholder="Select cable size" />
            </SelectTrigger>
            <SelectContent>
              {cableOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="load-current">Load Current (A)</Label>
          <Input 
            id="load-current" 
            type="number" 
            placeholder="Enter load current" 
            className="bg-card border border-muted/40"
            value={loadCurrent}
            onChange={(e) => setLoadCurrent(e.target.value)}
          />
        </div>
        <Button className="w-full" onClick={calculateVoltageDrop}>Calculate Voltage Drop</Button>
        <div className="rounded-md bg-muted p-4 text-center">
          <div className="text-sm text-muted-foreground">Voltage Drop:</div>
          <div className="text-2xl font-bold text-elec-yellow">{voltageDrop ? `${voltageDrop} V` : '-- V'}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoltageDropCalculator;
