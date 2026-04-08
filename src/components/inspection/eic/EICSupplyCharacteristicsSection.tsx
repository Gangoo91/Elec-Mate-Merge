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

const EARTHING_OPTIONS = [
  { value: 'tncs', label: 'TN-C-S' },
  { value: 'tns', label: 'TN-S' },
  { value: 'tt', label: 'TT' },
  { value: 'it', label: 'IT' },
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

  const handleEarthingArrangementChange = (value: string) => {
    haptic.light();
    const newValue = formData.earthingArrangement === value ? '' : value;
    onUpdate('earthingArrangement', newValue);
    if (newValue === 'tncs') {
      onUpdate('supplyPME', 'yes');
    } else if (['tns', 'tt', 'it'].includes(newValue)) {
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
        <div className="grid grid-cols-4 gap-2">
          {EARTHING_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleEarthingArrangementChange(option.value)}
              className={cn(
                'h-11 rounded-lg font-semibold transition-all touch-manipulation text-sm active:scale-[0.98] flex items-center justify-center gap-1.5',
                formData.earthingArrangement === option.value
                  ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                  : 'bg-white/[0.05] border border-white/[0.08] text-white'
              )}
            >
              {formData.earthingArrangement === option.value && <Check className="h-3.5 w-3.5" />}
              {option.label}
            </button>
          ))}
        </div>
      </FormField>

      <div className="grid grid-cols-2 gap-2 items-end">
        <FormField label="Supply PME">
          <Select
            value={formData.supplyPME || ''}
            onValueChange={(value) => onUpdate('supplyPME', value)}
          >
            <SelectTrigger className="h-11 touch-manipulation bg-white/[0.06] border-white/[0.08] focus:border-elec-yellow focus:ring-elec-yellow">
              <SelectValue placeholder="PME status" />
            </SelectTrigger>
            <SelectContent className="bg-white/[0.06] border-white/[0.08] text-white z-50">
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
              <SelectItem value="unknown">Unknown</SelectItem>
            </SelectContent>
          </Select>
          {formData.earthingArrangement === 'tncs' && formData.supplyPME !== 'yes' && (
            <span className="text-[10px] text-elec-yellow/80 block mt-1">TN-C-S systems typically have PME</span>
          )}
        </FormField>
      </div>
    </div>
  );
};

export default EICSupplyCharacteristicsSection;
