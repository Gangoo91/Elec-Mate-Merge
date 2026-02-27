import { Trash2, Zap } from 'lucide-react';
import {
  CalculatorInput,
  CalculatorSelect,
  CALCULATOR_CONFIG,
} from '@/components/calculators/shared';
import { Checkbox } from '@/components/ui/checkbox';

const config = CALCULATOR_CONFIG['power'];

interface LoadEntryProps {
  load: {
    id: string;
    type: string;
    connectedLoad: string;
    numberOfUnits: string;
    power: string;
    inputMode: 'kw' | 'amperage';
    powerFactor: string;
    hasCookerSocket: boolean;
    thermostaticallyControlled: boolean;
  };
  index: number;
  canRemove: boolean;
  loadTypes: Record<string, string>;
  errors: Record<string, string>;
  inputMode: 'kw' | 'amperage';
  supplyVoltage: string;
  onUpdate: (id: string, field: string, value: string | boolean) => void;
  onRemove: (id: string) => void;
  onClearError: (field: string) => void;
}

// Types that show the cooker socket checkbox
const COOKER_TYPES = ['electric-cooker'];

// Types that show the thermostatic toggle
const HEATING_TYPES = ['electric-heating', 'heat-pumps'];

// Types that use "Number of Ring Circuits" label
const RING_TYPES = ['ring-main-sockets'];

export function LoadEntry({
  load,
  index,
  canRemove,
  loadTypes,
  errors,
  inputMode,
  supplyVoltage,
  onUpdate,
  onRemove,
  onClearError,
}: LoadEntryProps) {
  const groupedLoadTypes = Object.entries(loadTypes).reduce(
    (acc, [key, value]) => {
      let category = 'Other';
      if (key.includes('lighting')) category = 'Lighting';
      else if (
        key.includes('socket') ||
        key.includes('power') ||
        key.includes('ring') ||
        key.includes('radial')
      )
        category = 'Socket Outlets & Power';
      else if (
        key.includes('cooker') ||
        key.includes('water') ||
        key.includes('shower') ||
        key.includes('immersion') ||
        key.includes('catering')
      )
        category = 'Cooking & Water Heating';
      else if (key.includes('heating') || key.includes('heat') || key.includes('underfloor'))
        category = 'Space Heating';
      else if (
        key.includes('motor') ||
        key.includes('lift') ||
        key.includes('conditioning') ||
        key.includes('ev') ||
        key.includes('welding') ||
        key.includes('server')
      )
        category = 'Motors & Equipment';

      if (!acc[category]) acc[category] = [];
      acc[category].push({
        value: key,
        label: key
          .split('-')
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' '),
        description: value,
      });
      return acc;
    },
    {} as Record<string, Array<{ value: string; label: string; description: string }>>
  );

  const selectOptions = Object.entries(groupedLoadTypes).flatMap(([category, items]) => [...items]);

  const showCookerSocket = COOKER_TYPES.includes(load.type);
  const showThermostaticToggle = HEATING_TYPES.includes(load.type);
  const isRingType = RING_TYPES.includes(load.type);

  // For ring types, the "number of units" becomes "number of ring circuits"
  const unitsLabel = isRingType ? 'Number of Rings' : 'Number of Units';
  const unitsHint = isRingType
    ? 'Number of ring circuits (engine assumes 32A per ring)'
    : 'Quantity of identical loads';

  // For ring types, the connected load is per-ring so the label changes
  const loadLabel = isRingType ? 'Rating per Ring' : 'Connected Load';

  return (
    <div className="p-4 rounded-xl bg-white/[0.04] border border-white/5 space-y-4">
      <div className="flex items-center justify-between">
        <span
          className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border"
          style={{
            background: `${config.gradientFrom}10`,
            borderColor: `${config.gradientFrom}20`,
            color: config.gradientFrom,
          }}
        >
          Load #{index + 1}
        </span>
        {canRemove && (
          <button
            onClick={() => onRemove(load.id)}
            className="h-8 w-8 flex items-center justify-center rounded-lg text-red-400 hover:bg-red-500/10 transition-colors touch-manipulation"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="space-y-4">
        <CalculatorSelect
          label="Load Type"
          value={load.type}
          onChange={(value) => onUpdate(load.id, 'type', value)}
          options={selectOptions}
          placeholder="Select load type"
          error={errors[`${load.id}_type`]}
          hint="Choose the type of electrical load for accurate diversity calculation"
        />

        <div className="grid grid-cols-2 gap-3">
          <CalculatorInput
            label={loadLabel}
            value={load.connectedLoad}
            onChange={(value) => onUpdate(load.id, 'connectedLoad', value)}
            type="text"
            inputMode="decimal"
            unit={inputMode === 'kw' ? 'kW' : 'A'}
            error={errors[`${load.id}_connectedLoad`]}
            hint={
              inputMode === 'kw' ? 'Power rating in kilowatts' : 'Full load current of the circuit'
            }
          />

          <CalculatorInput
            label={unitsLabel}
            value={load.numberOfUnits}
            onChange={(value) => onUpdate(load.id, 'numberOfUnits', value)}
            type="text"
            inputMode="numeric"
            error={errors[`${load.id}_numberOfUnits`]}
            hint={unitsHint}
          />
        </div>

        {inputMode === 'kw' && (
          <CalculatorInput
            label="Power Factor"
            value={load.powerFactor}
            onChange={(value) => onUpdate(load.id, 'powerFactor', value)}
            type="text"
            inputMode="decimal"
            error={errors[`${load.id}_powerFactor`]}
            hint="Power factor (0.1 to 1.0, typical 0.9)"
          />
        )}

        {/* Cooker socket checkbox */}
        {showCookerSocket && (
          <label className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/5 touch-manipulation cursor-pointer min-h-[44px]">
            <Checkbox
              checked={load.hasCookerSocket}
              onCheckedChange={(checked) => onUpdate(load.id, 'hasCookerSocket', !!checked)}
              className="border-white/40 data-[state=checked]:bg-amber-400 data-[state=checked]:border-amber-400 data-[state=checked]:text-black"
            />
            <div>
              <span className="text-sm text-white font-medium">Cooker unit has socket outlet?</span>
              <p className="text-xs text-white mt-0.5">
                Adds 5A to diversified demand (Table 1B item 3)
              </p>
            </div>
          </label>
        )}

        {/* Thermostatic control toggle */}
        {showThermostaticToggle && (
          <label className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/5 touch-manipulation cursor-pointer min-h-[44px]">
            <Checkbox
              checked={load.thermostaticallyControlled}
              onCheckedChange={(checked) =>
                onUpdate(load.id, 'thermostaticallyControlled', !!checked)
              }
              className="border-white/40 data-[state=checked]:bg-amber-400 data-[state=checked]:border-amber-400 data-[state=checked]:text-black"
            />
            <div>
              <span className="text-sm text-white font-medium">Thermostatically controlled?</span>
              <p className="text-xs text-white mt-0.5">
                {load.thermostaticallyControlled
                  ? '100% — no diversity for thermostatic heating (Table 1B item 4)'
                  : 'Largest 100% + 75% of remainder (Table 1B item 4)'}
              </p>
            </div>
          </label>
        )}

        {load.power && (
          <div
            className="p-3 rounded-xl border"
            style={{
              background: `${config.gradientFrom}08`,
              borderColor: `${config.gradientFrom}20`,
            }}
          >
            <div className="flex items-center gap-2 text-sm">
              <Zap className="h-4 w-4" style={{ color: config.gradientFrom }} />
              <span className="text-white">Calculated Power:</span>
              <span className="font-semibold" style={{ color: config.gradientFrom }}>
                {load.power} kW
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
