import { MobileInput } from "@/components/ui/mobile-input";
import { MobileButton } from "@/components/ui/mobile-button";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { Calculator, RefreshCw, ChevronRight } from "lucide-react";
import { useState } from "react";

import { CableSizingInputs, CableSizingErrors, CableType } from "./useCableSizing";
import { installationCategories, getMethodsByCategory, isUndergroundMethod, isDomesticInsulationMethod } from "@/lib/calculators/bs7671-data/installationMethodFactors";

interface CableSizingFormProps {
  inputs: CableSizingInputs;
  errors: CableSizingErrors;
  uiSelections: {
    installationMethodUI: string;
    cableTypeUI: string;
  };
  updateInput: (field: keyof CableSizingInputs, value: string) => void;
  setInstallationType: (type: string) => void;
  setCableType: (type: CableType) => void;
  calculateCableSize: () => void;
  resetCalculator: () => void;
  inputMode: 'current' | 'load';
}

// Complete BS 7671 installation method options grouped by category
const installationOptionsByCategory: Record<string, Array<{ value: string; label: string }>> = {
  enclosed: [
    { value: "conduit-insulated-wall", label: "Conduit in insulated wall (Method A)" },
    { value: "conduit-masonry", label: "Conduit in masonry (Method A1)" },
    { value: "conduit-surface", label: "Conduit on surface (Method A2)" },
  ],
  surface: [
    { value: "trunking-surface", label: "Trunking on wall (Method B1)" },
    { value: "trunking-flush", label: "Trunking flush in wall (Method B2)" },
  ],
  clipped: [
    { value: "clipped-direct", label: "Clipped direct to surface (Method C)" },
    { value: "tray-non-perforated", label: "On non-perforated tray (Method C)" },
  ],
  underground: [
    { value: "buried-direct", label: "Buried direct in ground (Method D1)" },
    { value: "buried-duct", label: "In buried ducts (Method D2)" },
  ],
  'free-air': [
    { value: "tray-perforated", label: "Multicore on perforated tray (Method E)" },
    { value: "cable-ladder", label: "Multicore on cable ladder (Method E)" },
    { value: "tray-single-trefoil", label: "Single-core trefoil on tray (Method F)" },
    { value: "tray-single-flat", label: "Single-core flat spaced (Method F)" },
    { value: "free-air-spaced", label: "Free air, spaced from surface (Method G)" },
  ],
  domestic: [
    { value: "ceiling-insulation-below100", label: "Above ceiling, insulation ≤100mm (100)" },
    { value: "ceiling-insulation-over100", label: "Above ceiling, insulation >100mm (101)" },
    { value: "stud-wall-touching", label: "Stud wall, touching insulation (102)" },
    { value: "stud-wall-not-touching", label: "Stud wall, not touching (103)" },
  ]
};

// Flatten for select dropdown
const allInstallationOptions = Object.entries(installationOptionsByCategory).flatMap(([category, options]) => 
  options.map(opt => ({
    ...opt,
    label: opt.label
  }))
);

const cableTypeOptions = [
  { value: "pvc-twin-earth", label: "Flat Twin & Earth 70°C (Table 4D5)" },
  { value: "pvc-single", label: "PVC Single-core 70°C (Table 4D1A)" },
  { value: "xlpe-single", label: "XLPE Single-core 90°C (Table 4D2A)" },
  { value: "xlpe-twin-earth", label: "XLPE Twin & Earth 90°C" },
  { value: "swa", label: "SWA Multicore Armoured (Table 4D4A)" },
  { value: "swa-single-core", label: "SWA Single-core Armoured (Table 4D3A)" },
  { value: "micc", label: "Mineral Insulated (MICC)" },
  { value: "aluminium-xlpe", label: "Aluminium XLPE 90°C" },
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

const soilResistivityOptions = [
  { value: "0.5", label: "0.5 K.m/W (Very wet soil)" },
  { value: "0.7", label: "0.7 K.m/W (Wet soil)" },
  { value: "1.0", label: "1.0 K.m/W (Damp soil)" },
  { value: "1.5", label: "1.5 K.m/W (Dry soil)" },
  { value: "2.0", label: "2.0 K.m/W (Very dry soil)" },
  { value: "2.5", label: "2.5 K.m/W (Standard)" },
  { value: "3.0", label: "3.0 K.m/W (Very dry/rocky)" },
];

const burialDepthOptions = [
  { value: "0.5", label: "0.5m (Minimum for domestic)" },
  { value: "0.7", label: "0.7m (Standard)" },
  { value: "0.8", label: "0.8m" },
  { value: "0.9", label: "0.9m" },
  { value: "1.0", label: "1.0m" },
  { value: "1.25", label: "1.25m" },
  { value: "1.5", label: "1.5m (Road crossings)" },
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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const showUndergroundFields = isUndergroundMethod(uiSelections.installationMethodUI);
  const showDomesticFields = isDomesticInsulationMethod(uiSelections.installationMethodUI);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleMethodSelect = (method: string) => {
    setInstallationType(method);
    setSelectedCategory(null);
  };

  const getCategoryLabel = (method: string): string => {
    for (const [cat, options] of Object.entries(installationOptionsByCategory)) {
      if (options.some(opt => opt.value === method)) {
        return installationCategories[cat as keyof typeof installationCategories]?.label || cat;
      }
    }
    return 'Select installation method';
  };

  const getMethodLabel = (method: string): string => {
    for (const options of Object.values(installationOptionsByCategory)) {
      const found = options.find(opt => opt.value === method);
      if (found) return found.label;
    }
    return method;
  };

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

      {/* Installation Method Selection - Mobile Friendly Two-Step */}
      <div className="space-y-4 p-6 border border-elec-yellow/40 rounded-lg bg-white/10">
        <h4 className="font-medium text-white flex items-center gap-2">
          Installation Method (BS 7671)
        </h4>
        
        {/* Current Selection Display */}
        <div className="p-4 bg-white/10 rounded-lg border border-elec-yellow/20">
          <div className="text-sm text-white mb-1">Selected Method</div>
          <div className="text-white font-medium">
            {getMethodLabel(uiSelections.installationMethodUI)}
          </div>
        </div>

        {/* Category Selection */}
        {!selectedCategory ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(installationCategories).map(([key, { label, description }]) => (
              <button
                key={key}
                onClick={() => handleCategorySelect(key)}
                className="p-4 text-left rounded-lg border border-elec-yellow/30 hover:border-elec-yellow hover:bg-elec-yellow/10 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-white text-sm">{label}</div>
                    <div className="text-xs text-white mt-1">{description}</div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-elec-yellow/50" />
                </div>
              </button>
            ))}
          </div>
        ) : (
          /* Method Selection within Category */
          <div className="space-y-3">
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-sm text-elec-yellow hover:underline flex items-center gap-1"
            >
              ← Back to categories
            </button>
            <div className="text-sm text-white mb-2">
              {installationCategories[selectedCategory as keyof typeof installationCategories]?.label}
            </div>
            <div className="space-y-2">
              {installationOptionsByCategory[selectedCategory]?.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleMethodSelect(option.value)}
                  className={`w-full p-4 text-left rounded-lg border transition-all ${
                    uiSelections.installationMethodUI === option.value
                      ? 'border-elec-yellow bg-elec-yellow/20 text-white'
                      : 'border-elec-yellow/30 hover:border-elec-yellow hover:bg-elec-yellow/10 text-white'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Cable Type Selection */}
      <div className="space-y-6 p-6 border border-elec-yellow/40 rounded-lg bg-white/10">
        <h4 className="font-medium text-white">Cable Type</h4>
        <MobileSelectWrapper
          label="Insulation Type"
          value={uiSelections.cableTypeUI}
          onValueChange={setCableType}
          placeholder="Select cable type"
          options={cableTypeOptions}
        />
        
        {/* Core Selection for SWA Multicore Cables */}
        {uiSelections.cableTypeUI === 'swa' && (
          <MobileSelectWrapper
            label="Number of Cores"
            value={(inputs as any).cores || '2'}
            onValueChange={(value) => updateInput('cores' as any, value)}
            placeholder="Select cores"
            options={[
              { value: '2', label: '2-core (Single Phase)' },
              { value: '3', label: '3-core (Three Phase)' },
              { value: '4', label: '4-core (3P+N)' },
            ]}
          />
        )}

        {/* Cable Configuration for SWA Single-Core */}
        {uiSelections.cableTypeUI === 'swa-single-core' && (
          <MobileSelectWrapper
            label="Cable Configuration"
            value={(inputs as any).cores || '2'}
            onValueChange={(value) => updateInput('cores' as any, value)}
            placeholder="Select configuration"
            options={[
              { value: '2', label: '2 cables (Single Phase L+N)' },
              { value: '3', label: '3 cables (Three Phase)' },
            ]}
          />
        )}
      </div>

      {/* Underground-Specific Fields (Conditional) */}
      {showUndergroundFields && (
        <div className="space-y-6 p-6 border border-orange-500/40 rounded-lg bg-orange-500/5">
          <h4 className="font-medium text-orange-400 flex items-center gap-2">
            Underground Installation Factors (BS 7671 Tables 4B3/4B4)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <MobileSelectWrapper
              label="Soil Thermal Resistivity"
              value={inputs.soilResistivity ?? '2.5'}
              onValueChange={(value) => updateInput('soilResistivity', value)}
              placeholder="Select soil type"
              options={soilResistivityOptions}
            />

            <MobileSelectWrapper
              label="Depth of Laying"
              value={inputs.burialDepth ?? '0.7'}
              onValueChange={(value) => updateInput('burialDepth', value)}
              placeholder="Select depth"
              options={burialDepthOptions}
            />
          </div>
        </div>
      )}

      {/* Environmental Conditions */}
      <div className="space-y-6 p-6 border border-elec-yellow/40 rounded-lg bg-white/10">
        <h4 className="font-medium text-white">Environmental Conditions</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <MobileInput
            label={showUndergroundFields ? "Soil Temperature (°C)" : "Ambient Temperature (°C)"}
            type="text"
            inputMode="numeric"
            value={inputs.ambientTemp ?? '30'}
            onChange={(e) => updateInput('ambientTemp', e.target.value)}
            placeholder="30"
            hint={showUndergroundFields ? "Standard: 20°C" : "Standard: 30°C"}
          />

          <MobileInput
            label="Number of Cables Grouped"
            type="text"
            inputMode="numeric"
            min="1"
            value={inputs.cableGrouping ?? '1'}
            onChange={(e) => updateInput('cableGrouping', e.target.value)}
            placeholder="1"
            hint="Affects current rating"
          />

          <MobileInput
            label="Voltage Drop Limit (%)"
            type="text"
            inputMode="decimal"
            step="0.1"
            value={inputs.voltageDrop ?? '3'}
            onChange={(e) => updateInput('voltageDrop', e.target.value)}
            placeholder="3"
            hint="Lighting: 3%, Power: 5%"
          />
        </div>
      </div>

      {/* Load Characteristics */}
      <div className="space-y-6 p-6 border border-elec-yellow/40 rounded-lg bg-white/10">
        <h4 className="font-medium text-white">Load Characteristics</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <MobileSelectWrapper
            label="Load Type"
            value={inputs.loadType ?? 'resistive'}
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
            value={inputs.diversityFactor ?? '1.0'}
            onChange={(e) => updateInput('diversityFactor', e.target.value)}
            placeholder="1.0"
            hint="1.0 = 100% simultaneous load"
          />
        </div>
      </div>

      {/* System Parameters - Only show when NOT in load mode (already entered for load calc) */}
      {inputMode !== 'load' && (
        <div className="space-y-6 p-6 border border-elec-yellow/40 rounded-lg bg-white/10">
          <h4 className="font-medium text-white">System Parameters</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <MobileSelectWrapper
              label="System Voltage (V)"
              value={inputs.voltage ?? '230'}
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
              value={inputs.powerFactor ?? '0.9'}
              onChange={(e) => updateInput('powerFactor', e.target.value)}
              placeholder="0.9"
              hint="For voltage drop calculation. Typical: 0.8-0.9"
            />
          </div>
        </div>
      )}

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
