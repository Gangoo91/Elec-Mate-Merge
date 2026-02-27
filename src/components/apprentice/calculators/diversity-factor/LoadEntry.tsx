import { Trash2, Zap } from 'lucide-react';
import {
  CalculatorInput,
  CalculatorSelect,
  CALCULATOR_CONFIG,
} from '@/components/calculators/shared';

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
  };
  index: number;
  canRemove: boolean;
  loadTypes: Record<string, string>;
  errors: Record<string, string>;
  inputMode: 'kw' | 'amperage';
  supplyVoltage: string;
  onUpdate: (id: string, field: string, value: string) => void;
  onRemove: (id: string) => void;
  onClearError: (field: string) => void;
}

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
  // Group load types by category for better organisation
  const groupedLoadTypes = Object.entries(loadTypes).reduce(
    (acc, [key, value]) => {
      let category = 'Other';
      if (key.includes('lighting')) category = 'Lighting';
      else if (key.includes('socket') || key.includes('power')) category = 'Socket Outlets & Power';
      else if (key.includes('cooker') || key.includes('water') || key.includes('heating'))
        category = 'Heating & Cooking';
      else if (key.includes('motor') || key.includes('equipment') || key.includes('conditioning'))
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
            label="Connected Load"
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
            label="Number of Units"
            value={load.numberOfUnits}
            onChange={(value) => onUpdate(load.id, 'numberOfUnits', value)}
            type="text"
            inputMode="numeric"
            error={errors[`${load.id}_numberOfUnits`]}
            hint="Quantity of identical loads"
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
