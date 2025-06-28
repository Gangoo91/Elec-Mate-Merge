
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CableSizingInputs, CableSizingErrors } from "./useCableSizing";

interface EnhancedCableSizingInputsProps {
  inputs: CableSizingInputs;
  errors: CableSizingErrors | null;
  updateInput: (field: string, value: string) => void;
  setInstallationType: (type: string) => void;
  setCableType: (type: string) => void;
  calculateCableSize: () => void;
  resetCalculator: () => void;
}

const EnhancedCableSizingInputs = ({
  inputs,
  errors,
  updateInput,
  setInstallationType,
  setCableType,
  calculateCableSize,
  resetCalculator
}: EnhancedCableSizingInputsProps) => {
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
        {errors?.current && <p className="text-xs text-destructive">{errors.current}</p>}
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
        {errors?.length && <p className="text-xs text-destructive">{errors.length}</p>}
      </div>
      
      <div className="space-y-2">
        <Label>Cable Type</Label>
        <Select 
          value={inputs.cableType} 
          onValueChange={setCableType}
        >
          <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
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
        <p className="text-xs text-muted-foreground">Different cable types have different ratings</p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="installation-type">Cable Insulation Type</Label>
        <RadioGroup 
          value={inputs.installationType} 
          onValueChange={setInstallationType}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="pvc" id="pvc" />
            <Label htmlFor="pvc">PVC</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="xlpe" id="xlpe" />
            <Label htmlFor="xlpe">XLPE</Label>
          </div>
        </RadioGroup>
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
          {errors?.voltage && <p className="text-xs text-destructive">{errors.voltage}</p>}
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
          {errors?.voltageDrop && <p className="text-xs text-destructive">{errors.voltageDrop}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="ambient-temp">Ambient Temperature (°C)</Label>
          <Input 
            id="ambient-temp" 
            type="number" 
            placeholder="30" 
            className="bg-elec-dark border-elec-yellow/20"
            value={inputs.ambientTemp}
            onChange={(e) => updateInput('ambientTemp', e.target.value)}
          />
          {errors?.ambientTemp && <p className="text-xs text-destructive">{errors.ambientTemp}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="cable-grouping">Number of Cables</Label>
          <Select 
            value={inputs.cableGrouping} 
            onValueChange={(value) => updateInput('cableGrouping', value)}
          >
            <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
              <SelectValue placeholder="Select grouping" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 (Single cable)</SelectItem>
              <SelectItem value="2">2 cables</SelectItem>
              <SelectItem value="3">3 cables</SelectItem>
              <SelectItem value="4">4 cables</SelectItem>
              <SelectItem value="5">5 cables</SelectItem>
              <SelectItem value="7">6-7 cables</SelectItem>
              <SelectItem value="10">8-10 cables</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="load-type">Load Type</Label>
          <Select 
            value={inputs.loadType} 
            onValueChange={(value) => updateInput('loadType', value)}
          >
            <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
              <SelectValue placeholder="Select load type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="resistive">Resistive</SelectItem>
              <SelectItem value="inductive">Inductive (Motors)</SelectItem>
              <SelectItem value="non-linear">Non-linear (Electronics)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="diversity-factor">Diversity Factor</Label>
          <Input 
            id="diversity-factor" 
            type="number" 
            step="0.1"
            placeholder="1.0" 
            className="bg-elec-dark border-elec-yellow/20"
            value={inputs.diversityFactor}
            onChange={(e) => updateInput('diversityFactor', e.target.value)}
          />
          {errors?.diversityFactor && <p className="text-xs text-destructive">{errors.diversityFactor}</p>}
        </div>
      </div>

      <div className="flex space-x-3 pt-2">
        <Button onClick={calculateCableSize} className="flex-1">Calculate</Button>
        <Button variant="outline" onClick={resetCalculator} className="flex-1">Reset</Button>
      </div>
    </div>
  );
};

export default EnhancedCableSizingInputs;
