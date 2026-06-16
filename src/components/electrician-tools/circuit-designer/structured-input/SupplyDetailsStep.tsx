import * as React from 'react';
import { IOSInput } from '@/components/ui/ios-input';
import { IOSSelect } from '@/components/ui/ios-select';
import { cn } from '@/lib/utils';
import { Eyebrow } from '@/components/college/primitives';

interface SupplyDetailsStepProps {
  voltage: number;
  setVoltage: (value: number) => void;
  phases: 'single' | 'three';
  setPhases: (value: 'single' | 'three') => void;
  ze: number;
  setZe: (value: number) => void;
  earthingSystem: 'TN-S' | 'TN-C-S' | 'TT';
  setEarthingSystem: (value: 'TN-S' | 'TN-C-S' | 'TT') => void;
  pscc: number | undefined;
  setPscc: (value: number | undefined) => void;
  ambientTemp: number;
  setAmbientTemp: (value: number) => void;
  installationMethod: string;
  setInstallationMethod: (value: string) => void;
  groupingFactor: number;
  setGroupingFactor: (value: number) => void;
  installationType: 'domestic' | 'commercial' | 'industrial';
  mainSwitchRating: number | undefined;
  setMainSwitchRating: (value: number | undefined) => void;
  propertyAge: 'new-build' | 'modern' | 'older' | 'very-old' | undefined;
  setPropertyAge: (value: 'new-build' | 'modern' | 'older' | 'very-old' | undefined) => void;
}

const SUPPLY_TYPES = [
  {
    value: '110-single',
    label: '110V single phase',
    description: 'Site or temporary supply — transformer-fed.',
  },
  {
    value: '230-single',
    label: '230V single phase',
    description: 'UK standard domestic and light commercial.',
  },
  {
    value: '400-three',
    label: '400V three phase',
    description: 'Higher capacity — commercial and industrial.',
  },
] as const;

const EARTHING_SYSTEMS = [
  {
    value: 'TN-S',
    label: 'TN-S',
    description: 'Separate earth conductor from supply.',
  },
  {
    value: 'TN-C-S',
    label: 'TN-C-S',
    description: 'PME — most common UK arrangement.',
  },
  {
    value: 'TT',
    label: 'TT',
    description: 'Earth rod at installation — rural or special.',
  },
] as const;

const PROPERTY_AGE_OPTIONS = [
  { value: 'new-build', label: 'New build', description: 'Less than 5 years old.' },
  { value: 'modern', label: 'Modern', description: '5 to 20 years old.' },
  { value: 'older', label: 'Older', description: '20 to 40 years old.' },
  { value: 'very-old', label: 'Very old', description: '40+ years — likely upgrade needed.' },
] as const;

export const SupplyDetailsStep = ({
  voltage,
  setVoltage,
  phases,
  setPhases,
  ze,
  setZe,
  earthingSystem,
  setEarthingSystem,
  pscc,
  setPscc,
  ambientTemp,
  setAmbientTemp,
  installationMethod,
  setInstallationMethod,
  groupingFactor,
  setGroupingFactor,
  installationType,
  mainSwitchRating,
  setMainSwitchRating,
  propertyAge,
  setPropertyAge,
}: SupplyDetailsStepProps) => {
  const [showAdvanced, setShowAdvanced] = React.useState(false);

  // Get main switch rating options based on installation type
  const mainSwitchOptions = React.useMemo(() => {
    switch (installationType) {
      case 'domestic':
        return [
          { value: '60', label: '60A' },
          { value: '80', label: '80A' },
          { value: '100', label: '100A (standard)' },
          { value: '125', label: '125A' },
        ];
      case 'commercial':
        return [
          { value: '100', label: '100A' },
          { value: '125', label: '125A' },
          { value: '160', label: '160A' },
          { value: '200', label: '200A (standard)' },
          { value: '250', label: '250A' },
          { value: '315', label: '315A' },
          { value: '400', label: '400A' },
        ];
      case 'industrial':
        return [
          { value: '160', label: '160A' },
          { value: '200', label: '200A' },
          { value: '250', label: '250A' },
          { value: '315', label: '315A' },
          { value: '400', label: '400A (standard)' },
          { value: '500', label: '500A' },
          { value: '630', label: '630A' },
          { value: '800', label: '800A' },
          { value: '1000', label: '1000A' },
        ];
      default:
        return [
          { value: '60', label: '60A' },
          { value: '80', label: '80A' },
          { value: '100', label: '100A (standard)' },
          { value: '125', label: '125A' },
        ];
    }
  }, [installationType]);

  // Combined supply type (voltage + phases)
  const supplyType =
    phases === 'single' ? (voltage === 110 ? '110-single' : '230-single') : '400-three';

  const handleSupplyTypeChange = (value: string) => {
    switch (value) {
      case '110-single':
        setVoltage(110);
        setPhases('single');
        break;
      case '230-single':
        setVoltage(230);
        setPhases('single');
        break;
      case '400-three':
        setVoltage(400);
        setPhases('three');
        break;
    }
  };

  // Auto-fill Ze based on earthing system
  React.useEffect(() => {
    if (earthingSystem === 'TN-S' || earthingSystem === 'TN-C-S') {
      if (ze === 0.35 || ze === 200) setZe(0.35);
    } else if (earthingSystem === 'TT') {
      if (ze === 0.35) setZe(200);
    }
  }, [earthingSystem]);

  // Friendly label for the configured supply
  const supplyLabel =
    supplyType === '110-single'
      ? '110V single'
      : supplyType === '230-single'
        ? '230V single'
        : '400V three';

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Section header — editorial */}
      <div className="space-y-2">
        <Eyebrow>02 · SUPPLY</Eyebrow>
        <h2 className="text-[26px] sm:text-[32px] lg:text-[36px] font-semibold tracking-tight leading-[1.1] text-white">
          Supply details.
        </h2>
        <p className="text-[14px] leading-relaxed text-white/85 max-w-2xl">
          Confirm the incoming supply parameters — the designer uses these to validate Zs, PFC and
          earth fault loop calcs against BS 7671.
        </p>
      </div>

      {/* Read-only summary strip — what you've configured */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-black border border-white/[0.08] rounded-2xl overflow-hidden">
        <div className="bg-[hsl(0_0%_10%)] px-4 py-3">
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/50">
            Supply
          </div>
          <div className="mt-1 text-[14px] font-semibold text-white tabular-nums">
            {supplyLabel}
          </div>
        </div>
        <div className="bg-[hsl(0_0%_10%)] px-4 py-3">
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/50">
            Earthing
          </div>
          <div className="mt-1 text-[14px] font-semibold text-white">{earthingSystem}</div>
        </div>
        <div className="bg-[hsl(0_0%_10%)] px-4 py-3">
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/50">
            Ze
          </div>
          <div className="mt-1 text-[14px] font-semibold text-white tabular-nums">{ze} Ω</div>
        </div>
        <div className="bg-[hsl(0_0%_10%)] px-4 py-3">
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/50">
            Main switch
          </div>
          <div className="mt-1 text-[14px] font-semibold text-white tabular-nums">
            {mainSwitchRating ? `${mainSwitchRating}A` : 'Auto'}
          </div>
        </div>
      </div>

      {/* Property context */}
      <div className="space-y-3">
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/60">
            Property context
          </span>
          <span className="text-[11px] text-white/50 tabular-nums">
            {PROPERTY_AGE_OPTIONS.length} options
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {PROPERTY_AGE_OPTIONS.map((opt, i) => {
            const isSelected = propertyAge === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setPropertyAge(isSelected ? undefined : opt.value)}
                className={cn(
                  'group relative bg-[hsl(0_0%_10%)] border rounded-2xl px-4 py-5 sm:px-5 sm:py-5 flex flex-col text-left touch-manipulation transition-all min-h-[110px]',
                  'hover:bg-[hsl(0_0%_15%)] active:scale-[0.99]',
                  isSelected
                    ? 'border-elec-yellow/60 bg-gradient-to-br from-elec-yellow/[0.10] via-amber-500/[0.03] to-transparent'
                    : 'border-white/[0.10] hover:border-white/20'
                )}
              >
                <span
                  className={cn(
                    'text-[10.5px] font-semibold uppercase tracking-[0.18em] tabular-nums',
                    isSelected ? 'text-elec-yellow' : 'text-white/50'
                  )}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div
                  className={cn(
                    'mt-2 text-[16px] sm:text-[18px] font-semibold tracking-tight leading-[1.15]',
                    isSelected ? 'text-elec-yellow' : 'text-white'
                  )}
                >
                  {opt.label}
                </div>
                <div className="mt-1 text-[12.5px] leading-snug text-white/70">
                  {opt.description}
                </div>
              </button>
            );
          })}
        </div>
        <p className="text-[12px] text-white/55 leading-relaxed">
          Helps the designer adjust diversity factors and flag upgrade recommendations.
        </p>
      </div>

      {/* Primary supply — editorial cards */}
      <div className="space-y-3">
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
            Primary supply *
          </span>
          <span className="text-[11px] text-white/50 tabular-nums">
            {SUPPLY_TYPES.length} options
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {SUPPLY_TYPES.map((opt, i) => {
            const isSelected = supplyType === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleSupplyTypeChange(opt.value)}
                className={cn(
                  'group relative bg-[hsl(0_0%_10%)] border rounded-2xl px-4 py-5 sm:px-6 sm:py-6 flex flex-col text-left touch-manipulation transition-all min-h-[120px]',
                  'hover:bg-[hsl(0_0%_15%)] active:scale-[0.99]',
                  isSelected
                    ? 'border-elec-yellow/60 bg-gradient-to-br from-elec-yellow/[0.10] via-amber-500/[0.03] to-transparent'
                    : 'border-white/[0.10] hover:border-white/20'
                )}
              >
                <span
                  className={cn(
                    'text-[10.5px] font-semibold uppercase tracking-[0.18em] tabular-nums',
                    isSelected ? 'text-elec-yellow' : 'text-white/50'
                  )}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div
                  className={cn(
                    'mt-2 text-[18px] sm:text-[20px] font-semibold tracking-tight leading-[1.15]',
                    isSelected ? 'text-elec-yellow' : 'text-white'
                  )}
                >
                  {opt.label}
                </div>
                <div className="mt-1 text-[12.5px] leading-snug text-white/70">
                  {opt.description}
                </div>
              </button>
            );
          })}
        </div>

        {supplyType === '110-single' && (
          <div className="rounded-2xl border border-orange-500/30 bg-orange-500/[0.06] px-4 py-3">
            <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-orange-300">
              Caution
            </div>
            <p className="mt-1 text-[12.5px] leading-snug text-orange-100/90">
              110V requires reduced low voltage transformers. Ensure correct labelling and verify
              the supply source on site.
            </p>
          </div>
        )}

        {supplyType === '400-three' && (
          <div className="rounded-2xl border border-white/[0.10] bg-white/[0.03] px-4 py-3">
            <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/60">
              Note
            </div>
            <p className="mt-1 text-[12.5px] leading-snug text-white/75">
              Three-phase provides higher capacity. Phase balance across final circuits is critical
              for compliance.
            </p>
          </div>
        )}
      </div>

      {/* Earthing system — editorial cards */}
      <div className="space-y-3">
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
            Earthing system *
          </span>
          <span className="text-[11px] text-white/50 tabular-nums">
            {EARTHING_SYSTEMS.length} options
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {EARTHING_SYSTEMS.map((opt, i) => {
            const isSelected = earthingSystem === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setEarthingSystem(opt.value)}
                className={cn(
                  'group relative bg-[hsl(0_0%_10%)] border rounded-2xl px-4 py-5 sm:px-6 sm:py-6 flex flex-col text-left touch-manipulation transition-all min-h-[120px]',
                  'hover:bg-[hsl(0_0%_15%)] active:scale-[0.99]',
                  isSelected
                    ? 'border-elec-yellow/60 bg-gradient-to-br from-elec-yellow/[0.10] via-amber-500/[0.03] to-transparent'
                    : 'border-white/[0.10] hover:border-white/20'
                )}
              >
                <span
                  className={cn(
                    'text-[10.5px] font-semibold uppercase tracking-[0.18em] tabular-nums',
                    isSelected ? 'text-elec-yellow' : 'text-white/50'
                  )}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div
                  className={cn(
                    'mt-2 text-[18px] sm:text-[20px] font-semibold tracking-tight leading-[1.15]',
                    isSelected ? 'text-elec-yellow' : 'text-white'
                  )}
                >
                  {opt.label}
                </div>
                <div className="mt-1 text-[12.5px] leading-snug text-white/70">
                  {opt.description}
                </div>
              </button>
            );
          })}
        </div>
        <p className="text-[12px] text-white/55 leading-relaxed">
          Check the consumer unit label or supplier paperwork if unsure.
        </p>
      </div>

      {/* Earth fault loop figures */}
      <div className="space-y-3">
        <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/60">
          Earth fault loop
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <IOSInput
            label="Ze (Ω) *"
            type="number"
            value={ze.toString()}
            onChange={(e) => setZe(Number(e.target.value))}
            hint={`Typical: ${earthingSystem === 'TT' ? '200 Ω' : '0.35 Ω'}`}
          />
          <IOSInput
            label="PSCC (kA)"
            type="number"
            value={pscc?.toString() || ''}
            onChange={(e) => setPscc(e.target.value ? Number(e.target.value) : undefined)}
            placeholder="Leave blank to auto-calculate"
            hint="Calculated from Ze if not provided"
          />
        </div>
      </div>

      {/* Consumer unit details */}
      <div className="space-y-3">
        <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/60">
          Consumer unit
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <IOSSelect
            label="Main switch rating"
            value={mainSwitchRating?.toString() || ''}
            onValueChange={(v) => setMainSwitchRating(v ? Number(v) : undefined)}
            placeholder="Auto"
            options={mainSwitchOptions}
          />
          <IOSSelect
            label="Number of ways"
            value="auto"
            onValueChange={() => {}}
            options={[
              { value: 'auto', label: 'Auto (based on circuits)' },
              { value: '6', label: '6 way' },
              { value: '8', label: '8 way' },
              { value: '10', label: '10 way' },
              { value: '12', label: '12 way' },
              { value: '16', label: '16 way' },
              { value: '18', label: '18 way' },
            ]}
          />
          <IOSSelect
            label="Type"
            value="split-load"
            onValueChange={() => {}}
            options={[
              { value: 'split-load', label: 'Split load (standard)' },
              { value: 'high-integrity', label: 'High integrity' },
              { value: 'main-switch', label: 'Main switch only' },
            ]}
          />
        </div>
        <p className="text-[12px] text-white/55 leading-relaxed">
          Leave blank to let the designer auto-select based on the circuit list.
        </p>
      </div>

      {/* Advanced — collapsible, plain button (no icons) */}
      <div className="space-y-3">
        <button
          type="button"
          onClick={() => setShowAdvanced((v) => !v)}
          className={cn(
            'w-full flex items-center justify-between gap-3 px-4 sm:px-5 py-4 rounded-2xl',
            'bg-[hsl(0_0%_10%)] border border-white/[0.10] text-left touch-manipulation',
            'hover:border-white/20 hover:bg-white/[0.04] transition-colors min-h-[56px]'
          )}
          aria-expanded={showAdvanced}
        >
          <div className="flex flex-col">
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/60">
              Advanced
            </span>
            <span className="mt-0.5 text-[14px] font-semibold text-white">
              Installation method, ambient temp, grouping
            </span>
          </div>
          <span
            className={cn(
              'text-[10.5px] font-semibold uppercase tracking-[0.18em] tabular-nums',
              showAdvanced ? 'text-elec-yellow' : 'text-white/55'
            )}
          >
            {showAdvanced ? 'Hide' : 'Show'}
          </span>
        </button>

        {showAdvanced && (
          <div className="space-y-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 sm:p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <IOSSelect
                label="Default installation method"
                value={installationMethod}
                onValueChange={setInstallationMethod}
                options={[
                  { value: 'clipped-direct', label: 'Clipped direct', description: 'Most common' },
                  { value: 'in-conduit', label: 'In conduit' },
                  { value: 'in-trunking', label: 'In trunking' },
                  { value: 'buried-direct', label: 'Buried direct' },
                  { value: 'in-insulation', label: 'In thermal insulation' },
                ]}
              />
              <IOSInput
                label="Ambient temperature (°C)"
                type="number"
                value={ambientTemp.toString()}
                onChange={(e) => setAmbientTemp(Number(e.target.value))}
                hint="Standard: 25 °C"
              />
            </div>
            <IOSInput
              label="Cable grouping factor"
              type="number"
              value={groupingFactor.toString()}
              onChange={(e) => setGroupingFactor(Number(e.target.value))}
              hint="1.0 = no grouping (default)"
            />
          </div>
        )}
      </div>
    </div>
  );
};
