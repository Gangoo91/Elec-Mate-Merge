import { MobileInput } from "@/components/ui/mobile-input";
import { MobileButton } from "@/components/ui/mobile-button";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
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
  inputMode: 'current' | 'load';
}

const installationOptions = [
  { value: "clipped-direct", label: "Clipped Direct (Reference Method C)" },
  { value: "in-conduit", label: "In Conduit/Trunking (Reference Method B)" },
  { value: "buried-direct", label: "Buried Direct (Reference Method D)" },
  { value: "cable-tray", label: "On Cable Tray (Reference Method F)" },
  { value: "free-air", label: "Free Air (Reference Method E)" },
];

const cableTypeOptions = [
  { value: "pvc-70", label: "PVC 70°C (Standard)" },
  { value: "xlpe-90", label: "XLPE 90°C (Enhanced)" },
  { value: "lsf-70", label: "LSF 70°C (Low Smoke)" },
  { value: "mineral-70", label: "MI Cable 70°C" },
];

const loadTypeOptions = [
  { value: "resistive", label: "Resistive (Heating, Lighting)" },
  { value: "inductive", label: "Inductive (Motors, Transformers)" },
  { value: "capacitive", label: "Capacitive (Power Factor Correction)" },
  { value: "mixed", label: "Mixed Load" },
  { value: "non-linear", label: "Non-Linear (LED, VFD)" },
];

const voltageOptions = [
  { value: "230", label: "230V Single Phase" },
  { value: "400", label: "400V Three Phase" },
  { value: "110", label: "110V Site Supply" },
];

const CableSizingForm = ({
  inputs,
  errors,
  uiSelections,
  updateInput,
  setInstallationType,
  setCableType,
  calculateCableSize,
  resetCalculator,
  inputMode,
}: CableSizingFormProps) => {
  return (
    <div className="space-y-8">
      <h3 className="text-lg font-semibold text-elec-yellow flex items-center gap-2">
        <Calculator className="h-5 w-5" />
        Cable Sizing Parameters
      </h3>
      
      {/* Basic Parameters - Only show current input in "current" mode */}
      {inputMode === 'current' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 border border-blue-500/40 rounded-lg bg-blue-500/5">
          <MobileInput
            label="Design Current (A)"
            type="text"
            inputMode="decimal"
            step="0.1"
            value={inputs.current}
            onChange={(e) => updateInput('current', e.target.value)}
            placeholder="Enter design current"
            error={errors?.current}
          />

          <MobileInput
            label="Cable Length (m)"
            type="text"
            inputMode="decimal"
            step="0.1"
            value={inputs.length}
            onChange={(e) => updateInput('length', e.target.value)}
            placeholder="Enter cable length"
            error={errors?.length}
          />
        </div>
      )}

      {/* In load mode, only show cable length */}
      {inputMode === 'load' && (
        <div className="p-6 border border-blue-500/40 rounded-lg bg-blue-500/5">
          <div className="space-y-3 max-w-md">
            <MobileInput
              label="Cable Length (m)"
              type="text"
              inputMode="decimal"
              step="0.1"
              value={inputs.length}
              onChange={(e) => updateInput('length', e.target.value)}
              placeholder="Enter cable length"
              error={errors?.length}
            />
          </div>
        </div>
      )}

      {/* Installation Conditions */}
      <div className="space-y-6 p-6 border border-elec-yellow/40 rounded-lg bg-elec-dark/30">
        <h4 className="font-medium text-white flex items-center gap-2">
          Installation & Cable Selection
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <MobileSelectWrapper
            label="Installation Method"
            value={uiSelections.installationMethodUI}
            onValueChange={setInstallationType}
            placeholder="Select installation method"
            options={installationOptions}
          />

          <MobileSelectWrapper
            label="Cable Type"
            value={uiSelections.cableTypeUI}
            onValueChange={setCableType}
            placeholder="Select cable type"
            options={cableTypeOptions}
          />
        </div>
      </div>

      {/* Environmental Conditions */}
      <div className="space-y-6 p-6 border border-elec-yellow/40 rounded-lg bg-elec-dark/30">
        <h4 className="font-medium text-white">Environmental Conditions</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <MobileInput
            label="Ambient Temperature (°C)"
            type="text"
            inputMode="numeric"
            value={inputs.ambientTemp || '30'}
            onChange={(e) => updateInput('ambientTemp', e.target.value)}
            placeholder="30"
            hint="Standard: 30°C"
          />

          <MobileInput
            label="Number of Cables Grouped"
            type="text"
            inputMode="numeric"
            min="1"
            value={inputs.cableGrouping || '1'}
            onChange={(e) => updateInput('cableGrouping', e.target.value)}
            placeholder="1"
            hint="Affects current rating"
          />

          <MobileInput
            label="Voltage Drop Limit (%)"
            type="text"
            inputMode="decimal"
            step="0.1"
            value={inputs.voltageDrop || '3'}
            onChange={(e) => updateInput('voltageDrop', e.target.value)}
            placeholder="3"
            hint="Lighting: 3%, Power: 5%"
          />
        </div>
      </div>

      {/* Load Characteristics */}
      <div className="space-y-6 p-6 border border-elec-yellow/40 rounded-lg bg-elec-dark/30">
        <h4 className="font-medium text-white">Load Characteristics</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <MobileSelectWrapper
            label="Load Type"
            value={inputs.loadType || 'resistive'}
            onValueChange={(value) => updateInput('loadType', value)}
            placeholder="Select load type"
            options={loadTypeOptions}
          />

          <MobileInput
            label="Diversity Factor"
            type="text"
            inputMode="decimal"
            step="0.1"
            min="0.1"
            max="1.0"
            value={inputs.diversityFactor || '1.0'}
            onChange={(e) => updateInput('diversityFactor', e.target.value)}
            placeholder="1.0"
            hint="1.0 = 100% simultaneous load"
          />
        </div>
      </div>

      {/* System Parameters */}
      <div className="space-y-6 p-6 border border-elec-yellow/40 rounded-lg bg-elec-dark/30">
        <h4 className="font-medium text-white">System Parameters</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <MobileSelectWrapper
            label="System Voltage (V)"
            value={inputs.voltage || '230'}
            onValueChange={(value) => updateInput('voltage', value)}
            placeholder="Select voltage"
            options={voltageOptions}
          />

          <MobileInput
            label="Power Factor"
            type="text"
            inputMode="decimal"
            step="0.01"
            min="0.1"
            max="1.0"
            value={inputs.powerFactor || '0.9'}
            onChange={(e) => updateInput('powerFactor', e.target.value)}
            placeholder="0.9"
            hint="Typical: 0.8-0.9"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6">
        <MobileButton 
          onClick={calculateCableSize} 
          variant="elec"
          size="wide"
          className="flex-1"
          disabled={!inputs.current || !inputs.length}
        >
          <Calculator className="mr-2 h-5 w-5" />
          Calculate Cable Size
        </MobileButton>
        <MobileButton 
          variant="outline" 
          onClick={resetCalculator} 
          size="lg"
        >
          <RefreshCw className="mr-2 h-5 w-5" />
          Reset All Fields
        </MobileButton>
      </div>
    </div>
  );
};

export default CableSizingForm;
