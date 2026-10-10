import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StepHeader, Section, ChipChoice, TextField, SelectRow, Hint } from './wizardUi';

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
    description: 'Site or temporary supply, transformer-fed.',
  },
  {
    value: '230-single',
    label: '230V single phase',
    description: 'UK standard domestic and light commercial.',
  },
  {
    value: '400-three',
    label: '400V three phase',
    description: 'Higher capacity for commercial and industrial.',
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
    description: 'PME, the most common UK arrangement.',
  },
  {
    value: 'TT',
    label: 'TT',
    description: 'Earth rod at the installation, rural or special.',
  },
] as const;

const PROPERTY_AGE_OPTIONS = [
  { value: 'new-build', label: 'New build', description: 'Less than 5 years old.' },
  { value: 'modern', label: 'Modern', description: '5 to 20 years old.' },
  { value: 'older', label: 'Older', description: '20 to 40 years old.' },
  { value: 'very-old', label: 'Very old', description: '40+ years, likely upgrade needed.' },
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

  return (
    <div className="space-y-8">
      <StepHeader
        title="Supply details"
        description="Confirm the incoming supply. The designer uses these figures to check Zs, PFC and earth fault loop calculations against BS 7671."
      />

      <Section title="Property age" aside="Optional">
        <ChipChoice
          ariaLabel="Property age"
          columns="grid-cols-2 sm:grid-cols-4"
          options={PROPERTY_AGE_OPTIONS}
          value={propertyAge}
          onSelect={(v) =>
            setPropertyAge(
              propertyAge === v ? undefined : (v as SupplyDetailsStepProps['propertyAge'])
            )
          }
        />
        <Hint>Helps the designer adjust diversity factors and flag upgrade recommendations.</Hint>
      </Section>

      <Section title="Primary supply *">
        <ChipChoice
          ariaLabel="Primary supply"
          options={SUPPLY_TYPES}
          value={supplyType}
          onSelect={handleSupplyTypeChange}
        />

        {supplyType === '110-single' && (
          <div className="rounded-xl border border-orange-500/30 bg-orange-500/10 px-4 py-3">
            <div className="text-[13px] font-semibold text-orange-300">Caution</div>
            <p className="mt-1 text-[13px] leading-snug text-white">
              110V requires reduced low voltage transformers. Ensure correct labelling and verify
              the supply source on site.
            </p>
          </div>
        )}

        {supplyType === '400-three' && (
          <div className="rounded-xl border border-white/[0.12] bg-white/[0.05] px-4 py-3">
            <div className="text-[13px] font-semibold text-white">Note</div>
            <p className="mt-1 text-[13px] leading-snug text-white">
              Three-phase provides higher capacity. Phase balance across final circuits is critical
              for compliance.
            </p>
          </div>
        )}
      </Section>

      <Section title="Earthing system *">
        <ChipChoice
          ariaLabel="Earthing system"
          options={EARTHING_SYSTEMS}
          value={earthingSystem}
          onSelect={(v) => setEarthingSystem(v as SupplyDetailsStepProps['earthingSystem'])}
        />
        <Hint>Check the consumer unit label or supplier paperwork if unsure.</Hint>
      </Section>

      <Section title="Earth fault loop">
        <div className="grid grid-cols-2 gap-x-3 gap-y-5 sm:gap-x-6">
          <TextField
            label="Ze (Ω) *"
            type="number"
            value={ze.toString()}
            onChange={(e) => setZe(Number(e.target.value))}
            hint={`Typical: ${earthingSystem === 'TT' ? '200 Ω' : '0.35 Ω'}`}
          />
          <TextField
            label="PSCC (kA)"
            type="number"
            value={pscc?.toString() || ''}
            onChange={(e) => setPscc(e.target.value ? Number(e.target.value) : undefined)}
            placeholder="Auto"
            hint="Leave blank to calculate from Ze"
          />
        </div>
      </Section>

      <Section title="Consumer unit">
        <div className="grid grid-cols-1 gap-y-5 sm:grid-cols-2 sm:gap-x-6 xl:grid-cols-3">
          <SelectRow
            label="Main switch rating"
            value={mainSwitchRating?.toString() || ''}
            onValueChange={(v) => setMainSwitchRating(v ? Number(v) : undefined)}
            placeholder="Auto"
            options={mainSwitchOptions}
          />
          <SelectRow
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
          <SelectRow
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
        <Hint>Leave blank to let the designer auto-select based on the circuit list.</Hint>
      </Section>

      <section className="space-y-4">
        <button
          type="button"
          onClick={() => setShowAdvanced((v) => !v)}
          className="flex min-h-[52px] w-full items-center justify-between gap-3 border-y border-white/[0.10] py-3 text-left touch-manipulation"
          aria-expanded={showAdvanced}
        >
          <span className="min-w-0">
            <span className="block text-[15px] font-semibold text-white">Advanced</span>
            <span className="block text-[13px] text-white">
              Installation method, ambient temperature, grouping
            </span>
          </span>
          <ChevronDown
            className={cn(
              'h-5 w-5 shrink-0 text-white transition-transform',
              showAdvanced && 'rotate-180'
            )}
          />
        </button>

        {showAdvanced && (
          <div className="grid grid-cols-1 gap-y-5 sm:grid-cols-2 sm:gap-x-6">
            <SelectRow
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
            <TextField
              label="Ambient temperature (°C)"
              type="number"
              value={ambientTemp.toString()}
              onChange={(e) => setAmbientTemp(Number(e.target.value))}
              hint="Standard: 25 °C"
            />
            <TextField
              label="Cable grouping factor"
              type="number"
              value={groupingFactor.toString()}
              onChange={(e) => setGroupingFactor(Number(e.target.value))}
              hint="1.0 = no grouping (default)"
            />
          </div>
        )}
      </section>
    </div>
  );
};
