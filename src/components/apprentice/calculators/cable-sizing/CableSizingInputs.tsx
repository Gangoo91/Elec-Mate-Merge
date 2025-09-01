import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, RefreshCw } from "lucide-react";

import { CableSizingInputs, CableSizingErrors } from "./useCableSizing";

interface CableSizingFormProps {
  inputs: CableSizingInputs;
  errors: CableSizingErrors;
  uiSelections: {
    installationMethodUI: string;
    cableTypeUI: string;
  };
  updateInput: (field: keyof CableSizingInputs, value: string) => void;
  setInstallationType: (type: string) => void;
  setCableType: (type: string) => void;
  calculateCableSize: () => void;
  resetCalculator: () => void;
}

const CableSizingForm = ({
  inputs,
  errors,
  uiSelections,
  updateInput,
  setInstallationType,
  setCableType,
  calculateCableSize,
  resetCalculator,
}: CableSizingFormProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-elec-yellow">Cable Sizing Parameters</h3>
      
      {/* Basic Parameters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="current" className="text-sm font-medium text-white">Design Current (A)</Label>
          <Input
            id="current"
            type="number"
            step="0.1"
            value={inputs.current}
            onChange={(e) => updateInput('current', e.target.value)}
            className="bg-elec-dark border-elec-yellow/20 text-white h-11 focus:border-elec-yellow/40 focus:ring-2 focus:ring-elec-yellow/20"
            placeholder="Enter design current"
          />
          {errors?.current && <p className="text-red-400 text-sm mt-1">{errors.current}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="length" className="text-sm font-medium text-white">Cable Length (m)</Label>
          <Input
            id="length"
            type="number"
            step="0.1"
            value={inputs.length}
            onChange={(e) => updateInput('length', e.target.value)}
            className="bg-elec-dark border-elec-yellow/20 text-white h-11 focus:border-elec-yellow/40 focus:ring-2 focus:ring-elec-yellow/20"
            placeholder="Enter cable length"
          />
          {errors?.length && <p className="text-red-400 text-sm mt-1">{errors.length}</p>}
        </div>
      </div>

      {/* Installation Conditions - Enhanced */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="installation-type" className="text-sm font-medium text-white">Installation Method</Label>
          <Select value={uiSelections.installationMethodUI} onValueChange={setInstallationType}>
            <SelectTrigger className="bg-elec-dark border-elec-yellow/20 h-11 focus:border-elec-yellow/40 focus:ring-2 focus:ring-elec-yellow/20">
              <SelectValue placeholder="Select installation method" className="text-white" />
            </SelectTrigger>
            <SelectContent className="bg-elec-dark border-elec-yellow/20">
              <SelectItem value="clipped-direct" className="text-white hover:bg-elec-yellow/20">Clipped Direct (Reference Method C)</SelectItem>
              <SelectItem value="in-conduit" className="text-white hover:bg-elec-yellow/20">In Conduit/Trunking (Reference Method B)</SelectItem>
              <SelectItem value="buried-direct" className="text-white hover:bg-elec-yellow/20">Buried Direct (Reference Method D)</SelectItem>
              <SelectItem value="cable-tray" className="text-white hover:bg-elec-yellow/20">On Cable Tray (Reference Method F)</SelectItem>
              <SelectItem value="free-air" className="text-white hover:bg-elec-yellow/20">Free Air (Reference Method E)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cable-type" className="text-sm font-medium text-white">Cable Type</Label>
          <Select value={uiSelections.cableTypeUI} onValueChange={setCableType}>
            <SelectTrigger className="bg-elec-dark border-elec-yellow/20 h-11 focus:border-elec-yellow/40 focus:ring-2 focus:ring-elec-yellow/20">
              <SelectValue placeholder="Select cable type" className="text-white" />
            </SelectTrigger>
            <SelectContent className="bg-elec-dark border-elec-yellow/20">
              <SelectItem value="pvc-70" className="text-white hover:bg-elec-yellow/20">PVC 70°C (Standard)</SelectItem>
              <SelectItem value="xlpe-90" className="text-white hover:bg-elec-yellow/20">XLPE 90°C (Enhanced)</SelectItem>
              <SelectItem value="lsf-70" className="text-white hover:bg-elec-yellow/20">LSF 70°C (Low Smoke)</SelectItem>
              <SelectItem value="mineral-70" className="text-white hover:bg-elec-yellow/20">MI Cable 70°C</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Environmental Conditions - New */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="ambient-temp" className="text-sm font-medium text-white">Ambient Temperature (°C)</Label>
          <Input
            id="ambient-temp"
            type="number"
            value={inputs.ambientTemp || '30'}
            onChange={(e) => updateInput('ambientTemp', e.target.value)}
            className="bg-elec-dark border-elec-yellow/20 text-white h-11 focus:border-elec-yellow/40 focus:ring-2 focus:ring-elec-yellow/20"
            placeholder="30"
          />
          <p className="text-xs text-muted-foreground mt-1">Standard: 30°C</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cable-grouping" className="text-sm font-medium text-white">Number of Cables Grouped</Label>
          <Input
            id="cable-grouping"
            type="number"
            min="1"
            value={inputs.cableGrouping || '1'}
            onChange={(e) => updateInput('cableGrouping', e.target.value)}
            className="bg-elec-dark border-elec-yellow/20 text-white h-11 focus:border-elec-yellow/40 focus:ring-2 focus:ring-elec-yellow/20"
            placeholder="1"
          />
          <p className="text-xs text-muted-foreground mt-1">Affects current rating</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="voltage-drop-limit" className="text-sm font-medium text-white">Voltage Drop Limit (%)</Label>
          <Input
            id="voltage-drop-limit"
            type="number"
            step="0.1"
            value={inputs.voltageDrop || '3'}
            onChange={(e) => updateInput('voltageDrop', e.target.value)}
            className="bg-elec-dark border-elec-yellow/20 text-white h-11 focus:border-elec-yellow/40 focus:ring-2 focus:ring-elec-yellow/20"
            placeholder="3"
          />
          <p className="text-xs text-muted-foreground mt-1">Lighting: 3%, Power: 5%</p>
        </div>
      </div>

      {/* Load Characteristics - New */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="load-type" className="text-sm font-medium text-white">Load Type</Label>
          <Select value={inputs.loadType || 'resistive'} onValueChange={(value) => updateInput('loadType', value)}>
            <SelectTrigger className="bg-elec-dark border-elec-yellow/20 text-white h-11 focus:border-elec-yellow/40 focus:ring-2 focus:ring-elec-yellow/20">
              <SelectValue placeholder="Select load type" />
            </SelectTrigger>
            <SelectContent className="bg-elec-dark border-elec-yellow/20 text-white">
              <SelectItem value="resistive">Resistive (Heating, Lighting)</SelectItem>
              <SelectItem value="inductive">Inductive (Motors, Transformers)</SelectItem>
              <SelectItem value="capacitive">Capacitive (Power Factor Correction)</SelectItem>
              <SelectItem value="mixed">Mixed Load</SelectItem>
              <SelectItem value="non-linear">Non-Linear (LED, VFD)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="diversity-factor" className="text-sm font-medium text-white">Diversity Factor</Label>
          <Input
            id="diversity-factor"
            type="number"
            step="0.1"
            min="0.1"
            max="1.0"
            value={inputs.diversityFactor || '1.0'}
            onChange={(e) => updateInput('diversityFactor', e.target.value)}
            className="bg-elec-dark border-elec-yellow/20 text-white h-11 focus:border-elec-yellow/40 focus:ring-2 focus:ring-elec-yellow/20"
            placeholder="1.0"
          />
          <p className="text-xs text-muted-foreground mt-1">1.0 = 100% simultaneous load</p>
        </div>
      </div>

      {/* System Parameters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="voltage" className="text-sm font-medium text-white">System Voltage (V)</Label>
          <Select value={inputs.voltage || '230'} onValueChange={(value) => updateInput('voltage', value)}>
            <SelectTrigger className="bg-elec-dark border-elec-yellow/20 text-white h-11 focus:border-elec-yellow/40 focus:ring-2 focus:ring-elec-yellow/20">
              <SelectValue placeholder="Select voltage" />
            </SelectTrigger>
            <SelectContent className="bg-elec-dark border-elec-yellow/20 text-white">
              <SelectItem value="230">230V Single Phase</SelectItem>
              <SelectItem value="400">400V Three Phase</SelectItem>
              <SelectItem value="110">110V Site Supply</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="power-factor" className="text-sm font-medium text-white">Power Factor</Label>
          <Input
            id="power-factor"
            type="number"
            step="0.01"
            min="0.1"
            max="1.0"
            value={inputs.powerFactor || '0.9'}
            onChange={(e) => updateInput('powerFactor', e.target.value)}
            className="bg-elec-dark border-elec-yellow/20 text-white h-11 focus:border-elec-yellow/40 focus:ring-2 focus:ring-elec-yellow/20"
            placeholder="0.9"
          />
          <p className="text-xs text-muted-foreground mt-1">Typical: 0.8-0.9</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button 
          onClick={calculateCableSize} 
          className="bg-elec-yellow text-black hover:bg-elec-yellow/90 flex-1 h-11"
          disabled={!inputs.current || !inputs.length}
        >
          <Calculator className="mr-2 h-4 w-4" />
          Calculate Cable Size
        </Button>
        <Button variant="outline" onClick={resetCalculator} className="h-11 sm:w-auto">
          <RefreshCw className="mr-2 h-4 w-4" />
          Reset
        </Button>
      </div>
    </div>
  );
};

export default CableSizingForm;