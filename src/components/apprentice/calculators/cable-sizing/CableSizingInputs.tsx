import { Calculator, RotateCcw, ChevronRight } from 'lucide-react';
import { useState } from 'react';

import { CableSizingInputs, CableSizingErrors, CableType } from './useCableSizing';
import {
  installationCategories,
  getMethodsByCategory,
  isUndergroundMethod,
  isDomesticInsulationMethod,
} from '@/lib/calculators/bs7671-data/installationMethodFactors';
import {
  CalculatorInput,
  CalculatorSelect,
  CalculatorInputGrid,
  CalculatorActions,
  CALCULATOR_CONFIG,
} from '@/components/calculators/shared';
import { cn } from '@/lib/utils';

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
    { value: 'conduit-insulated-wall', label: 'Conduit in insulated wall (Method A)' },
    { value: 'conduit-masonry', label: 'Conduit in masonry (Method A1)' },
    { value: 'conduit-surface', label: 'Conduit on surface (Method A2)' },
  ],
  surface: [
    { value: 'trunking-surface', label: 'Trunking on wall (Method B1)' },
    { value: 'trunking-flush', label: 'Trunking flush in wall (Method B2)' },
  ],
  clipped: [
    { value: 'clipped-direct', label: 'Clipped direct to surface (Method C)' },
    { value: 'tray-non-perforated', label: 'On non-perforated tray (Method C)' },
  ],
  underground: [
    { value: 'buried-direct', label: 'Buried direct in ground (Method D1)' },
    { value: 'buried-duct', label: 'In buried ducts (Method D2)' },
  ],
  'free-air': [
    { value: 'tray-perforated', label: 'Multicore on perforated tray (Method E)' },
    { value: 'cable-ladder', label: 'Multicore on cable ladder (Method E)' },
    { value: 'tray-single-trefoil', label: 'Single-core trefoil on tray (Method F)' },
    { value: 'tray-single-flat', label: 'Single-core flat spaced (Method F)' },
    { value: 'free-air-spaced', label: 'Free air, spaced from surface (Method G)' },
  ],
  domestic: [
    { value: 'ceiling-insulation-below100', label: 'Above ceiling, insulation ≤100mm (100)' },
    { value: 'ceiling-insulation-over100', label: 'Above ceiling, insulation >100mm (101)' },
    { value: 'stud-wall-touching', label: 'Stud wall, touching insulation (102)' },
    { value: 'stud-wall-not-touching', label: 'Stud wall, not touching (103)' },
  ],
};

const cableTypeOptions = [
  { value: 'pvc-twin-earth', label: 'Flat Twin & Earth 70°C (Table 4D5)' },
  { value: 'pvc-single', label: 'PVC Single-core 70°C (Table 4D1A)' },
  { value: 'xlpe-single', label: 'XLPE Single-core 90°C (Table 4D2A)' },
  { value: 'xlpe-twin-earth', label: 'XLPE Twin & Earth 90°C' },
  { value: 'swa', label: 'SWA Multicore Armoured (Table 4D4A)' },
  { value: 'swa-single-core', label: 'SWA Single-core Armoured (Table 4D3A)' },
  { value: 'micc', label: 'Mineral Insulated (MICC)' },
  { value: 'aluminium-xlpe', label: 'Aluminium XLPE 90°C' },
];

const loadTypeOptions = [
  { value: 'resistive', label: 'Resistive (Heating, Lighting)' },
  { value: 'inductive', label: 'Inductive (Motors, Transformers)' },
  { value: 'capacitive', label: 'Capacitive (Power Factor Correction)' },
  { value: 'mixed', label: 'Mixed Load' },
  { value: 'non-linear', label: 'Non-Linear (LED, VFD)' },
];

const voltageOptions = [
  { value: '230', label: '230V Single Phase' },
  { value: '400', label: '400V Three Phase' },
  { value: '110', label: '110V Site Supply' },
];

const soilResistivityOptions = [
  { value: '0.5', label: '0.5 K.m/W (Very wet soil)' },
  { value: '0.7', label: '0.7 K.m/W (Wet soil)' },
  { value: '1.0', label: '1.0 K.m/W (Damp soil)' },
  { value: '1.5', label: '1.5 K.m/W (Dry soil)' },
  { value: '2.0', label: '2.0 K.m/W (Very dry soil)' },
  { value: '2.5', label: '2.5 K.m/W (Standard)' },
  { value: '3.0', label: '3.0 K.m/W (Very dry/rocky)' },
];

const burialDepthOptions = [
  { value: '0.5', label: '0.5m (Minimum for domestic)' },
  { value: '0.7', label: '0.7m (Standard)' },
  { value: '0.8', label: '0.8m' },
  { value: '0.9', label: '0.9m' },
  { value: '1.0', label: '1.0m' },
  { value: '1.25', label: '1.25m' },
  { value: '1.5', label: '1.5m (Road crossings)' },
];

const config = CALCULATOR_CONFIG['cable'];

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

  const getMethodLabel = (method: string): string => {
    for (const options of Object.values(installationOptionsByCategory)) {
      const found = options.find((opt) => opt.value === method);
      if (found) return found.label;
    }
    return method;
  };

  return (
    <div className="space-y-6">
      {/* Section: Basic Parameters */}
      <div className="space-y-3">
        <h3
          className="text-sm font-semibold flex items-center gap-2"
          style={{ color: config.gradientFrom }}
        >
          <Calculator className="h-4 w-4" />
          Cable Sizing Parameters
        </h3>

        {inputMode === 'current' && (
          <CalculatorInputGrid columns={2}>
            <CalculatorInput
              label="Design Current (A)"
              type="text"
              inputMode="decimal"
              value={inputs.current}
              onChange={(value) => updateInput('current', value)}
              placeholder="Enter design current"
              error={errors?.current}
            />
            <CalculatorInput
              label="Cable Length (m)"
              type="text"
              inputMode="decimal"
              value={inputs.length}
              onChange={(value) => updateInput('length', value)}
              placeholder="Enter cable length"
              error={errors?.length}
            />
          </CalculatorInputGrid>
        )}

        {inputMode === 'load' && (
          <CalculatorInput
            label="Cable Length (m)"
            type="text"
            inputMode="decimal"
            value={inputs.length}
            onChange={(value) => updateInput('length', value)}
            placeholder="Enter cable length"
            error={errors?.length}
          />
        )}
      </div>

      {/* Section: Installation Method */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-white">Installation Method (BS 7671)</h4>

        {/* Current Selection Display */}
        <div className="p-3 rounded-xl bg-white/[0.04] border border-white/5">
          <div className="text-xs text-white mb-1">Selected Method</div>
          <div className="text-sm text-white font-medium">
            {getMethodLabel(uiSelections.installationMethodUI)}
          </div>
        </div>

        {/* Category Selection */}
        {!selectedCategory ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {Object.entries(installationCategories).map(([key, { label, description }]) => (
              <button
                key={key}
                onClick={() => handleCategorySelect(key)}
                className={cn(
                  'p-3 text-left rounded-xl border transition-all touch-manipulation min-h-11',
                  'border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                )}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-white text-sm">{label}</div>
                    <div className="text-xs text-white mt-0.5">{description}</div>
                  </div>
                  <ChevronRight
                    className="h-4 w-4 shrink-0"
                    style={{ color: config.gradientFrom }}
                  />
                </div>
              </button>
            ))}
          </div>
        ) : (
          /* Method Selection within Category */
          <div className="space-y-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-sm font-medium flex items-center gap-1 min-h-11 touch-manipulation"
              style={{ color: config.gradientFrom }}
            >
              ← Back to categories
            </button>
            <div className="text-xs text-white mb-1">
              {
                installationCategories[selectedCategory as keyof typeof installationCategories]
                  ?.label
              }
            </div>
            <div className="space-y-2">
              {installationOptionsByCategory[selectedCategory]?.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleMethodSelect(option.value)}
                  className={cn(
                    'w-full p-3 text-left rounded-xl border transition-all touch-manipulation min-h-11 text-sm text-white',
                    uiSelections.installationMethodUI === option.value
                      ? 'border-white/20'
                      : 'border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                  )}
                  style={
                    uiSelections.installationMethodUI === option.value
                      ? {
                          borderColor: `${config.gradientFrom}40`,
                          background: `${config.gradientFrom}10`,
                        }
                      : undefined
                  }
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Section: Cable Type */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-white">Cable Type</h4>
        <CalculatorSelect
          label="Insulation Type"
          value={uiSelections.cableTypeUI}
          onChange={setCableType}
          placeholder="Select cable type"
          options={cableTypeOptions}
        />

        {/* Core Selection for SWA Multicore Cables */}
        {uiSelections.cableTypeUI === 'swa' && (
          <CalculatorSelect
            label="Number of Cores"
            value={inputs.cores || '2'}
            onChange={(value) => updateInput('cores', value)}
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
          <CalculatorSelect
            label="Cable Configuration"
            value={inputs.cores || '2'}
            onChange={(value) => updateInput('cores', value)}
            placeholder="Select configuration"
            options={[
              { value: '2', label: '2 cables (Single Phase L+N)' },
              { value: '3', label: '3 cables (Three Phase)' },
            ]}
          />
        )}
      </div>

      {/* Section: Underground-Specific Fields (Conditional) */}
      {showUndergroundFields && (
        <div className="space-y-3">
          <h4
            className="text-sm font-medium flex items-center gap-2"
            style={{ color: config.gradientFrom }}
          >
            Underground Installation Factors (BS 7671 Tables 4B3/4B4)
          </h4>
          <CalculatorInputGrid columns={2}>
            <CalculatorSelect
              label="Soil Thermal Resistivity"
              value={inputs.soilResistivity ?? '2.5'}
              onChange={(value) => updateInput('soilResistivity', value)}
              placeholder="Select soil type"
              options={soilResistivityOptions}
            />
            <CalculatorSelect
              label="Depth of Laying"
              value={inputs.burialDepth ?? '0.7'}
              onChange={(value) => updateInput('burialDepth', value)}
              placeholder="Select depth"
              options={burialDepthOptions}
            />
          </CalculatorInputGrid>
        </div>
      )}

      {/* Section: Environmental Conditions */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-white">Environmental Conditions</h4>
        <CalculatorInputGrid columns={3}>
          <CalculatorInput
            label={showUndergroundFields ? 'Soil Temperature (°C)' : 'Ambient Temperature (°C)'}
            type="text"
            inputMode="numeric"
            value={inputs.ambientTemp ?? '30'}
            onChange={(value) => updateInput('ambientTemp', value)}
            placeholder="30"
            hint={showUndergroundFields ? 'Standard: 20°C' : 'Standard: 30°C'}
          />
          <CalculatorInput
            label="Cables Grouped"
            type="text"
            inputMode="numeric"
            value={inputs.cableGrouping ?? '1'}
            onChange={(value) => updateInput('cableGrouping', value)}
            placeholder="1"
            hint="Affects current rating"
          />
          <CalculatorInput
            label="Voltage Drop Limit (%)"
            type="text"
            inputMode="decimal"
            value={inputs.voltageDrop ?? '3'}
            onChange={(value) => updateInput('voltageDrop', value)}
            placeholder="3"
            hint="Lighting: 3%, Power: 5%"
          />
        </CalculatorInputGrid>
      </div>

      {/* Section: Load Characteristics */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-white">Load Characteristics</h4>
        <CalculatorInputGrid columns={2}>
          <CalculatorSelect
            label="Load Type"
            value={inputs.loadType ?? 'resistive'}
            onChange={(value) => updateInput('loadType', value)}
            placeholder="Select load type"
            options={loadTypeOptions}
          />
          <CalculatorInput
            label="Diversity Factor"
            type="text"
            inputMode="decimal"
            value={inputs.diversityFactor ?? '1.0'}
            onChange={(value) => updateInput('diversityFactor', value)}
            placeholder="1.0"
            hint="1.0 = 100% simultaneous load"
          />
        </CalculatorInputGrid>
      </div>

      {/* Section: System Parameters (only in current mode) */}
      {inputMode !== 'load' && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-white">System Parameters</h4>
          <CalculatorInputGrid columns={2}>
            <CalculatorSelect
              label="System Voltage (V)"
              value={inputs.voltage ?? '230'}
              onChange={(value) => updateInput('voltage', value)}
              placeholder="Select voltage"
              options={voltageOptions}
            />
            <CalculatorInput
              label="Power Factor"
              type="text"
              inputMode="decimal"
              value={inputs.powerFactor ?? '0.9'}
              onChange={(value) => updateInput('powerFactor', value)}
              placeholder="0.9"
              hint="For voltage drop calculation. Typical: 0.8-0.9"
            />
          </CalculatorInputGrid>
        </div>
      )}

      {/* Action Buttons */}
      <CalculatorActions
        category="cable"
        onCalculate={calculateCableSize}
        onReset={resetCalculator}
        isDisabled={!inputs.current || !inputs.length}
        calculateLabel="Calculate Cable Size"
        resetLabel="Reset"
      />
    </div>
  );
};

export default CableSizingForm;
