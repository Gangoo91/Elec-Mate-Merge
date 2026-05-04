import { Trash2 } from 'lucide-react';
import { CalculatorInput, CalculatorSelect } from '@/components/calculators/shared';
import { Checkbox } from '@/components/ui/checkbox';

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
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Load {index + 1}
        </span>
        {canRemove && (
          <button
            onClick={() => onRemove(load.id)}
            className="h-9 w-9 flex items-center justify-center rounded-lg text-white/55 hover:text-white hover:bg-white/[0.05] transition-colors touch-manipulation"
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
          <label className="flex items-center gap-3 p-3 rounded-lg border border-white/[0.06] bg-white/[0.02] touch-manipulation cursor-pointer min-h-[44px]">
            <Checkbox
              checked={load.hasCookerSocket}
              onCheckedChange={(checked) => onUpdate(load.id, 'hasCookerSocket', !!checked)}
              className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
            />
            <div>
              <span className="text-[14px] text-white/85 font-medium">
                Cooker unit has socket outlet?
              </span>
              <p className="text-[12px] text-white/55 mt-0.5">
                Adds 5A to diversified demand (Table 1B item 3)
              </p>
            </div>
          </label>
        )}

        {/* Thermostatic control toggle */}
        {showThermostaticToggle && (
          <label className="flex items-center gap-3 p-3 rounded-lg border border-white/[0.06] bg-white/[0.02] touch-manipulation cursor-pointer min-h-[44px]">
            <Checkbox
              checked={load.thermostaticallyControlled}
              onCheckedChange={(checked) =>
                onUpdate(load.id, 'thermostaticallyControlled', !!checked)
              }
              className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
            />
            <div>
              <span className="text-[14px] text-white/85 font-medium">
                Thermostatically controlled?
              </span>
              <p className="text-[12px] text-white/55 mt-0.5">
                {load.thermostaticallyControlled
                  ? '100% — no diversity for thermostatic heating (Table 1B item 4)'
                  : 'Largest 100% + 75% of remainder (Table 1B item 4)'}
              </p>
            </div>
          </label>
        )}

        {load.power && (
          <div className="flex items-baseline justify-between p-3 rounded-lg border border-white/[0.06] bg-white/[0.02]">
            <span className="text-[12px] text-white/55">Calculated power</span>
            <span className="font-mono text-white text-[14px]">{load.power} kW</span>
          </div>
        )}
      </div>
    </div>
  );
}
