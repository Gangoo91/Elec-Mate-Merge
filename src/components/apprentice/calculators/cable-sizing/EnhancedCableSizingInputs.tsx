
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, RefreshCw } from "lucide-react";

interface EnhancedCableSizingInputsProps {
  inputs: any;
  errors: any;
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
  resetCalculator,
}: EnhancedCableSizingInputsProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-elec-yellow">Cable Sizing Parameters</h3>
      
      {/* Basic Parameters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="current">Design Current (A)</Label>
          <Input
            id="current"
            type="number"
            step="0.1"
            value={inputs.current}
            onChange={(e) => updateInput('current', e.target.value)}
            className="bg-elec-dark border-elec-yellow/20"
            placeholder="Enter design current"
          />
          {errors?.current && <p className="text-red-400 text-sm mt-1">{errors.current}</p>}
        </div>

        <div>
          <Label htmlFor="length">Cable Length (m)</Label>
          <Input
            id="length"
            type="number"
            step="0.1"
            value={inputs.length}
            onChange={(e) => updateInput('length', e.target.value)}
            className="bg-elec-dark border-elec-yellow/20"
            placeholder="Enter cable length"
          />
          {errors?.length && <p className="text-red-400 text-sm mt-1">{errors.length}</p>}
        </div>
      </div>

      {/* Installation Conditions - Enhanced */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="installation-type">Installation Method</Label>
          <Select value={inputs.installationType} onValueChange={setInstallationType}>
            <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
              <SelectValue placeholder="Select installation method" />
            </SelectTrigger>
            <SelectContent className="bg-elec-dark border-elec-yellow/20">
              <SelectItem value="clipped-direct">Clipped Direct (Reference Method C)</SelectItem>
              <SelectItem value="in-conduit">In Conduit/Trunking (Reference Method B)</SelectItem>
              <SelectItem value="buried-direct">Buried Direct (Reference Method D)</SelectItem>
              <SelectItem value="cable-tray">On Cable Tray (Reference Method F)</SelectItem>
              <SelectItem value="free-air">Free Air (Reference Method E)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="cable-type">Cable Type</Label>
          <Select value={inputs.cableType} onValueChange={setCableType}>
            <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
              <SelectValue placeholder="Select cable type" />
            </SelectTrigger>
            <SelectContent className="bg-elec-dark border-elec-yellow/20">
              <SelectItem value="pvc-70">PVC 70°C (Standard)</SelectItem>
              <SelectItem value="xlpe-90">XLPE 90°C (Enhanced)</SelectItem>
              <SelectItem value="lsf-70">LSF 70°C (Low Smoke)</SelectItem>
              <SelectItem value="mineral-70">MI Cable 70°C</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Environmental Conditions - New */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="ambient-temp">Ambient Temperature (°C)</Label>
          <Input
            id="ambient-temp"
            type="number"
            value={inputs.ambientTemp || '30'}
            onChange={(e) => updateInput('ambientTemp', e.target.value)}
            className="bg-elec-dark border-elec-yellow/20"
            placeholder="30"
          />
          <p className="text-xs text-muted-foreground mt-1">Standard: 30°C</p>
        </div>

        <div>
          <Label htmlFor="cable-grouping">Number of Cables Grouped</Label>
          <Input
            id="cable-grouping"
            type="number"
            min="1"
            value={inputs.cableGrouping || '1'}
            onChange={(e) => updateInput('cableGrouping', e.target.value)}
            className="bg-elec-dark border-elec-yellow/20"
            placeholder="1"
          />
          <p className="text-xs text-muted-foreground mt-1">Affects current rating</p>
        </div>

        <div>
          <Label htmlFor="voltage-drop-limit">Voltage Drop Limit (%)</Label>
          <Input
            id="voltage-drop-limit"
            type="number"
            step="0.1"
            value={inputs.voltageDrop || '3'}
            onChange={(e) => updateInput('voltageDrop', e.target.value)}
            className="bg-elec-dark border-elec-yellow/20"
            placeholder="3"
          />
          <p className="text-xs text-muted-foreground mt-1">Lighting: 3%, Power: 5%</p>
        </div>
      </div>

      {/* Load Characteristics - New */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="load-type">Load Type</Label>
          <Select value={inputs.loadType || 'resistive'} onValueChange={(value) => updateInput('loadType', value)}>
            <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
              <SelectValue placeholder="Select load type" />
            </SelectTrigger>
            <SelectContent className="bg-elec-dark border-elec-yellow/20">
              <SelectItem value="resistive">Resistive (Heating, Lighting)</SelectItem>
              <SelectItem value="inductive">Inductive (Motors, Transformers)</SelectItem>
              <SelectItem value="capacitive">Capacitive (Power Factor Correction)</SelectItem>
              <SelectItem value="mixed">Mixed Load</SelectItem>
              <SelectItem value="non-linear">Non-Linear (LED, VFD)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="diversity-factor">Diversity Factor</Label>
          <Input
            id="diversity-factor"
            type="number"
            step="0.1"
            min="0.1"
            max="1.0"
            value={inputs.diversityFactor || '1.0'}
            onChange={(e) => updateInput('diversityFactor', e.target.value)}
            className="bg-elec-dark border-elec-yellow/20"
            placeholder="1.0"
          />
          <p className="text-xs text-muted-foreground mt-1">1.0 = 100% simultaneous load</p>
        </div>
      </div>

      {/* System Parameters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="voltage">System Voltage (V)</Label>
          <Select value={inputs.voltage || '230'} onValueChange={(value) => updateInput('voltage', value)}>
            <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
              <SelectValue placeholder="Select voltage" />
            </SelectTrigger>
            <SelectContent className="bg-elec-dark border-elec-yellow/20">
              <SelectItem value="230">230V Single Phase</SelectItem>
              <SelectItem value="400">400V Three Phase</SelectItem>
              <SelectItem value="110">110V Site Supply</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="power-factor">Power Factor</Label>
          <Input
            id="power-factor"
            type="number"
            step="0.01"
            min="0.1"
            max="1.0"
            value={inputs.powerFactor || '0.9'}
            onChange={(e) => updateInput('powerFactor', e.target.value)}
            className="bg-elec-dark border-elec-yellow/20"
            placeholder="0.9"
          />
          <p className="text-xs text-muted-foreground mt-1">Typical: 0.8-0.9</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 pt-4">
        <Button 
          onClick={calculateCableSize} 
          className="bg-elec-yellow text-black hover:bg-elec-yellow/90 flex-1"
          disabled={!inputs.current || !inputs.length}
        >
          <Calculator className="mr-2 h-4 w-4" />
          Calculate Cable Size
        </Button>
        <Button variant="outline" onClick={resetCalculator}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Reset
        </Button>
      </div>
    </div>
  );
};

export default EnhancedCableSizingInputs;
