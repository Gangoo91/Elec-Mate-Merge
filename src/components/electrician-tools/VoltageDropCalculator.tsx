
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

const VoltageDropCalculator = () => {
  const [cableLength, setCableLength] = useState<string>("");
  const [cableSize, setCableSize] = useState<string>("");
  const [loadCurrent, setLoadCurrent] = useState<string>("");
  const [voltageDrop, setVoltageDrop] = useState<string | null>(null);

  const calculateVoltageDrop = () => {
    // Basic voltage drop calculation (simplified for demonstration)
    // In reality, this would use the proper electrical engineering formulas
    if (!cableLength || !cableSize || !loadCurrent) return;
    
    const length = parseFloat(cableLength);
    const current = parseFloat(loadCurrent);
    const size = parseFloat(cableSize);
    
    if (isNaN(length) || isNaN(current) || isNaN(size)) return;
    
    // Simple calculation - in a real app this would use proper resistance values and formulas
    const resistanceFactor = 1 / size; // Simplified - larger cables have less resistance
    const drop = (length * current * resistanceFactor * 0.02).toFixed(2);
    
    setVoltageDrop(drop);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
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
            className="bg-elec-dark border-elec-yellow/20"
            value={cableLength}
            onChange={(e) => setCableLength(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cable-size">Cable Size</Label>
          <Select value={cableSize} onValueChange={setCableSize}>
            <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
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
        </div>
        <div className="space-y-2">
          <Label htmlFor="load-current">Load Current (A)</Label>
          <Input 
            id="load-current" 
            type="number" 
            placeholder="Enter load current" 
            className="bg-elec-dark border-elec-yellow/20"
            value={loadCurrent}
            onChange={(e) => setLoadCurrent(e.target.value)}
          />
        </div>
        <Button className="w-full" onClick={calculateVoltageDrop}>Calculate Voltage Drop</Button>
        <div className="rounded-md bg-elec-dark p-4 text-center">
          <div className="text-sm text-muted-foreground">Voltage Drop:</div>
          <div className="text-2xl font-bold text-elec-yellow">{voltageDrop ? `${voltageDrop} V` : '-- V'}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoltageDropCalculator;
