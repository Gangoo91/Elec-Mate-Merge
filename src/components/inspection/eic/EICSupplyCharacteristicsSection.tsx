import React from 'react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import InputWithValidation from './InputWithValidation';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';
import { Check } from 'lucide-react';

const SectionTitle = ({ title }: { title: string }) => (
  <div className="border-b border-white/[0.06] pb-1 mb-3">
    <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
    <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
  </div>
);

const FormField = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <div>
    <Label className="text-white text-xs mb-1.5 block">{label}{required && ' *'}</Label>
    {children}
  </div>
);

interface EICSupplyCharacteristicsSectionProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

// BS 7671:2018+A4:2026 EIC Section F — six system earthing arrangements.
// `value` stays as the legacy code (templates/normaliser compare these); the
// TN-C-S options carry a `variant` (PME/PNB) tracked in `tncsVariant`.
const EARTHING_OPTIONS: { key: string; value: string; variant?: 'pme' | 'pnb'; label: string }[] = [
  { key: 'tns', value: 'tns', label: 'TN-S' },
  { key: 'tncs-pme', value: 'tncs', variant: 'pme', label: 'TN-C-S (PME)' },
  { key: 'tncs-pnb', value: 'tncs', variant: 'pnb', label: 'TN-C-S (PNB)' },
  { key: 'tt', value: 'tt', label: 'TT' },
  { key: 'tnc', value: 'tnc', label: 'TN-C' },
  { key: 'it', value: 'it', label: 'IT' },
];

const EICSupplyCharacteristicsSection: React.FC<EICSupplyCharacteristicsSectionProps> = ({
  formData,
  onUpdate,
}) => {
  const haptic = useHaptic();

  const handlePhasesChange = (value: string) => {
    onUpdate('phases', value);
    if (value === 'single' && formData.supplyVoltage !== '230V') {
      onUpdate('supplyVoltage', '230V');
    } else if (value === 'three' && formData.supplyVoltage !== '400V') {
      onUpdate('supplyVoltage', '400V');
    }
  };

  // A TN-C-S option matches when the arrangement is 'tncs' AND the variant lines
  // up (legacy 'tncs' with no variant is treated as PME). Other types match by value.
  const isEarthingActive = (option: (typeof EARTHING_OPTIONS)[number]) => {
    if (option.value !== 'tncs') return formData.earthingArrangement === option.value;
    if (formData.earthingArrangement !== 'tncs') return false;
    return (formData.tncsVariant || 'pme') === (option.variant || 'pme');
  };

  const handleEarthingArrangementChange = (option: (typeof EARTHING_OPTIONS)[number]) => {
    haptic.light();
    if (isEarthingActive(option)) {
      onUpdate('earthingArrangement', '');
      onUpdate('tncsVariant', '');
      return;
    }
    onUpdate('earthingArrangement', option.value);
    onUpdate('tncsVariant', option.variant || '');
    if (option.value === 'tncs') {
      // PME → PME supply; PNB is a distinct TN-C-S variant, not PME.
      onUpdate('supplyPME', option.variant === 'pnb' ? 'no' : 'yes');
    } else if (['tns', 'tt', 'it', 'tnc'].includes(option.value)) {
      onUpdate('supplyPME', 'no');
    }
  };

  return (
    <div className="space-y-4">
      <SectionTitle title="Supply Characteristics" />

      <div className="grid grid-cols-3 gap-2 items-end">
        <FormField label="Supply Voltage" required>
          <Select
            value={formData.supplyVoltage || ''}
            onValueChange={(value) => onUpdate('supplyVoltage', value)}
          >
            <SelectTrigger className="h-11 touch-manipulation bg-white/[0.06] border-white/[0.08] focus:border-elec-yellow focus:ring-elec-yellow">
              <SelectValue placeholder="Voltage" />
            </SelectTrigger>
            <SelectContent className="bg-white/[0.06] border-white/[0.08] text-white z-50">
              <SelectItem value="230V">230V</SelectItem>
              <SelectItem value="400V">400V</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </FormField>

        <InputWithValidation
          id="supplyFrequency"
          label="Frequency (Hz)"
          value={formData.supplyFrequency || '50'}
          onChange={(value) => onUpdate('supplyFrequency', value)}
          placeholder="50"
          type="number"
        />

        <FormField label="Phases" required>
          <Select value={formData.phases || ''} onValueChange={handlePhasesChange}>
            <SelectTrigger className="h-11 touch-manipulation bg-white/[0.06] border-white/[0.08] focus:border-elec-yellow focus:ring-elec-yellow">
              <SelectValue placeholder="Phases" />
            </SelectTrigger>
            <SelectContent className="bg-white/[0.06] border-white/[0.08] text-white z-50">
              <SelectItem value="single">Single</SelectItem>
              <SelectItem value="three">Three</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
      </div>

      {/* Earthing Arrangement — toggle buttons */}
      <FormField label="Earthing Arrangement" required>
        <div className="grid grid-cols-3 gap-2">
          {EARTHING_OPTIONS.map((option) => {
            const active = isEarthingActive(option);
            return (
              <button
                key={option.key}
                type="button"
                onClick={() => handleEarthingArrangementChange(option)}
                className={cn(
                  'h-11 rounded-lg px-1 font-semibold transition-all touch-manipulation text-xs active:scale-[0.98] flex items-center justify-center gap-1',
                  active
                    ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                    : 'bg-white/[0.05] border border-white/[0.08] text-white'
                )}
              >
                {active && <Check className="h-3.5 w-3.5 shrink-0" />}
                {option.label}
              </button>
            );
          })}
        </div>
      </FormField>
    </div>
  );
};

export default EICSupplyCharacteristicsSection;
