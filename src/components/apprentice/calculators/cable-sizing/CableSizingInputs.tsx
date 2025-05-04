
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CableSizingInputs, CableSizingErrors } from "./useCableSizing";

interface CableSizingFormProps {
  inputs: CableSizingInputs;
  errors: CableSizingErrors;
  updateInput: (field: keyof CableSizingInputs, value: string) => void;
  setInstallationType: (type: "pvc" | "xlpe") => void;
  calculateCableSize: () => void;
  resetCalculator: () => void;
}

const CableSizingForm = ({
  inputs,
  errors,
  updateInput,
  setInstallationType,
  calculateCableSize,
  resetCalculator
}: CableSizingFormProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="current">Design Current (A)</Label>
        <Input 
          id="current" 
          type="number" 
          placeholder="Enter load current" 
          className="bg-elec-dark border-elec-yellow/20"
          value={inputs.current}
          onChange={(e) => updateInput('current', e.target.value)}
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
          value={inputs.length}
          onChange={(e) => updateInput('length', e.target.value)}
        />
        {errors.length && <p className="text-xs text-destructive">{errors.length}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="installation-type">Cable Insulation Type</Label>
        <Select 
          value={inputs.installationType} 
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
            value={inputs.voltage}
            onChange={(e) => updateInput('voltage', e.target.value)}
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
            value={inputs.voltageDrop}
            onChange={(e) => updateInput('voltageDrop', e.target.value)}
          />
          {errors.voltageDrop && <p className="text-xs text-destructive">{errors.voltageDrop}</p>}
        </div>
      </div>

      <div className="flex space-x-3 pt-2">
        <Button onClick={calculateCableSize} className="flex-1">Calculate</Button>
        <Button variant="outline" onClick={resetCalculator} className="flex-1">Reset</Button>
      </div>
    </div>
  );
};

export default CableSizingForm;
