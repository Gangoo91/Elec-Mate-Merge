import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertCircle, Shield, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EICSupplyCharacteristicsSectionProps {
  formData: Record<string, string | boolean>;
  onUpdate: (field: string, value: string | boolean) => void;
}

const SectionTitle = ({ title }: { title: string }) => (
  <div className="border-b border-white/[0.06] pb-1 mb-3">
    <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
    <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
  </div>
);

const FormField = ({ label, required, hint, children }: { label: string; required?: boolean; hint?: string; children: React.ReactNode }) => (
  <div>
    <Label className="text-white text-xs mb-1.5 block">{label}{required && ' *'}</Label>
    {children}
    {hint && <span className="text-[10px] text-white block mt-1">{hint}</span>}
  </div>
);

// Smart device configuration - BS standard determines available types and ratings
const DEVICE_CONFIG: Record<
  string,
  { types: { value: string; label: string }[]; ratings: string[] }
> = {
  'BS EN 60898': {
    types: [
      { value: 'B', label: 'Type B' },
      { value: 'C', label: 'Type C' },
      { value: 'D', label: 'Type D' },
    ],
    ratings: ['6', '10', '16', '20', '25', '32', '40', '50', '63', '80', '100', '125'],
  },
  'BS EN 61009': {
    types: [
      { value: 'A', label: 'Type A (RCBO)' },
      { value: 'AC', label: 'Type AC (RCBO)' },
      { value: 'B', label: 'Type B (RCBO)' },
    ],
    ratings: ['6', '10', '16', '20', '25', '32', '40', '50', '63'],
  },
  'BS EN 60947-2': {
    types: [
      { value: 'B', label: 'Type B' },
      { value: 'C', label: 'Type C' },
      { value: 'D', label: 'Type D' },
    ],
    ratings: [
      '16', '20', '25', '32', '40', '50', '63', '80', '100',
      '125', '160', '200', '250', '315', '400', '500', '630',
      '800', '1000', '1250',
    ],
  },
  'BS 88-2': {
    types: [
      { value: 'gG', label: 'gG (General Purpose)' },
      { value: 'gM', label: 'gM (Motor)' },
      { value: 'aM', label: 'aM (Motor Starter)' },
    ],
    ratings: [
      '2', '4', '6', '10', '16', '20', '25', '32', '40', '50',
      '63', '80', '100', '125', '160', '200', '250', '315',
      '400', '500', '630', '800', '1000', '1250',
    ],
  },
  'BS 88-3': {
    types: [{ value: 'gG', label: 'gG (General Purpose)' }],
    ratings: ['5', '15', '20', '30', '45', '60', '80', '100'],
  },
  'BS 1361': {
    types: [
      { value: 'I', label: 'Type I (House Service)' },
      { value: 'II', label: 'Type II (Consumer Unit)' },
    ],
    ratings: ['5', '15', '20', '30', '45', '60', '80', '100'],
  },
  'BS 3036': {
    types: [
      { value: 'S1A', label: 'S1A (Rewirable)' },
      { value: 'S2A', label: 'S2A (Rewirable)' },
    ],
    ratings: ['5', '15', '20', '30', '45', '60', '100'],
  },
  other: {
    types: [
      { value: 'B', label: 'Type B' },
      { value: 'C', label: 'Type C' },
      { value: 'D', label: 'Type D' },
      { value: 'gG', label: 'gG Fuse' },
      { value: 'aM', label: 'aM Fuse' },
      { value: 'other', label: 'Other' },
    ],
    ratings: [
      '6', '10', '16', '20', '25', '32', '40', '50', '63', '80',
      '100', '125', '160', '200', '250', '315', '400', '500', '630',
    ],
  },
};

const EARTHING_OPTIONS = [
  { value: 'tnc', label: 'TN-C' },
  { value: 'tncs', label: 'TN-C-S (PME)' },
  { value: 'tns', label: 'TN-S' },
  { value: 'tt', label: 'TT' },
  { value: 'it', label: 'IT' },
];

const EICSupplyCharacteristicsSection: React.FC<EICSupplyCharacteristicsSectionProps> = ({
  formData,
  onUpdate,
}) => {
  // Get available types based on selected BS standard
  const getAvailableTypes = () => {
    const bsStandard = formData.supplyDeviceBsEn || '';
    return DEVICE_CONFIG[bsStandard]?.types || DEVICE_CONFIG['other'].types;
  };

  // Get available ratings based on selected BS standard
  const getAvailableRatings = () => {
    const bsStandard = formData.supplyDeviceBsEn || '';
    return DEVICE_CONFIG[bsStandard]?.ratings || DEVICE_CONFIG['other'].ratings;
  };

  // Handle BS standard change - reset type and rating if they're no longer valid
  const handleBsStandardChange = (value: string) => {
    onUpdate('supplyDeviceBsEn', value);

    const config = DEVICE_CONFIG[value] || DEVICE_CONFIG['other'];

    // Reset type if current value is not in the new options
    if (
      formData.supplyDeviceType &&
      !config.types.some((t) => t.value === formData.supplyDeviceType)
    ) {
      onUpdate('supplyDeviceType', '');
    }

    // Reset rating if current value is not in the new options
    if (formData.supplyDeviceRating && !config.ratings.includes(formData.supplyDeviceRating)) {
      onUpdate('supplyDeviceRating', '');
    }
  };

  const handlePhasesChange = (value: string) => {
    onUpdate('phases', value);

    // Auto-set supply voltage based on phases
    if (value === 'single' && formData.supplyVoltage !== '230V') {
      onUpdate('supplyVoltage', '230V');
    } else if (value === 'three' && formData.supplyVoltage !== '400V') {
      onUpdate('supplyVoltage', '400V');
    }
  };

  const handleEarthingArrangementChange = (value: string) => {
    onUpdate('earthingArrangement', value);

    // Auto-set PME status based on earthing arrangement
    if (value === 'tncs' && formData.supplyPME !== 'yes') {
      onUpdate('supplyPME', 'yes');
    } else if (['tnc', 'tns', 'tt', 'it'].includes(value) && formData.supplyPME !== 'no') {
      onUpdate('supplyPME', 'no');
    }
  };

  return (
    <div className="space-y-4">
      {/* Supply Details */}
      <SectionTitle title="Supply Details" />
      <div className="space-y-3">
        {/* Voltage + Phases as toggle buttons */}
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Voltage" required>
            <div className="grid grid-cols-3 gap-1">
              {[
                { value: '230V', label: '230V' },
                { value: '400V', label: '400V' },
                { value: 'other', label: 'Other' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onUpdate('supplyVoltage', opt.value)}
                  className={cn(
                    'h-10 rounded-lg font-semibold transition-all touch-manipulation text-xs active:scale-[0.98]',
                    formData.supplyVoltage === opt.value
                      ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                      : 'bg-white/[0.05] border border-white/[0.08] text-white'
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </FormField>
          <FormField label="Phases" required>
            <div className="grid grid-cols-2 gap-1">
              {[
                { value: 'single', label: '1-Phase' },
                { value: 'three', label: '3-Phase' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handlePhasesChange(opt.value)}
                  className={cn(
                    'h-10 rounded-lg font-semibold transition-all touch-manipulation text-xs active:scale-[0.98]',
                    formData.phases === opt.value
                      ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                      : 'bg-white/[0.05] border border-white/[0.08] text-white'
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </FormField>
        </div>

        <FormField label="Frequency (Hz)">
          <Input
            id="supplyFrequency"
            type="text"
            inputMode="decimal"
            value={formData.supplyFrequency ?? '50'}
            onChange={(e) => onUpdate('supplyFrequency', e.target.value)}
            placeholder="50"
            className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]"
          />
        </FormField>
      </div>

      {/* Earthing Arrangement */}
      <SectionTitle title="Earthing Arrangement" />
      <div className="space-y-3">
        <div className="grid grid-cols-5 gap-1">
          {EARTHING_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => handleEarthingArrangementChange(opt.value)}
              className={cn(
                'h-10 rounded-lg font-semibold transition-all touch-manipulation text-[11px] active:scale-[0.98]',
                formData.earthingArrangement === opt.value
                  ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                  : 'bg-white/[0.05] border border-white/[0.08] text-white'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <FormField label="PME">
          <div className="grid grid-cols-3 gap-1">
            {[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
              { value: 'unknown', label: 'Unknown' },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onUpdate('supplyPME', opt.value)}
                className={cn(
                  'h-10 rounded-lg font-semibold transition-all touch-manipulation text-xs active:scale-[0.98]',
                  formData.supplyPME === opt.value
                    ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                    : 'bg-white/[0.05] border border-white/[0.08] text-white'
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {formData.earthingArrangement === 'tncs' && formData.supplyPME !== 'yes' && (
            <span className="text-[10px] text-elec-yellow/80 block mt-1">TN-C-S systems typically have PME</span>
          )}
        </FormField>
      </div>

      {/* Number and Type of Live Conductors */}
      <SectionTitle title="Number and Type of Live Conductors" />
      <FormField label="Live Conductor Configuration" required>
        <MobileSelectPicker
          value={(formData.liveCondutorType as string) || ''}
          onValueChange={(value) => onUpdate('liveCondutorType', value)}
          options={[
            { value: 'ac-1ph-2w', label: 'AC: 1-phase, 2-wire' },
            { value: 'ac-2ph-3w', label: 'AC: 2-phase, 3-wire' },
            { value: 'ac-3ph-3w', label: 'AC: 3-phase, 3-wire' },
            { value: 'ac-3ph-4w', label: 'AC: 3-phase, 4-wire' },
            { value: 'dc-2w', label: 'DC: 2-wire' },
            { value: 'dc-3w', label: 'DC: 3-wire' },
            { value: 'other', label: 'Other' },
          ]}
          placeholder="Select configuration"
          title="Live Conductor Configuration"
        />
      </FormField>

      {/* Nature of Supply Parameters */}
      <SectionTitle title="Nature of Supply Parameters" />
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3 items-end">
          <FormField label="Ipf (kA)" required>
            <Input
              id="prospectiveFaultCurrent"
              type="text"
              inputMode="decimal"
              value={formData.prospectiveFaultCurrent || ''}
              onChange={(e) => onUpdate('prospectiveFaultCurrent', e.target.value)}
              placeholder="16"
              className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]"
            />
          </FormField>
          <FormField label="Ze (Ω)" required>
            <Input
              id="externalZe"
              type="text"
              inputMode="decimal"
              value={formData.externalZe || ''}
              onChange={(e) => onUpdate('externalZe', e.target.value)}
              placeholder="0.35"
              className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]"
            />
          </FormField>
        </div>

        {/* Polarity + Other Sources as toggle buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onUpdate('supplyPolarityConfirmed', !formData.supplyPolarityConfirmed)}
            className={cn(
              'h-11 rounded-lg font-semibold transition-all touch-manipulation text-xs active:scale-[0.98] flex items-center justify-center gap-1.5',
              formData.supplyPolarityConfirmed
                ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                : 'bg-white/[0.05] border border-white/[0.08] text-white'
            )}
          >
            {formData.supplyPolarityConfirmed && <Check className="h-3.5 w-3.5" />}
            Polarity Confirmed
          </button>
          <button
            type="button"
            onClick={() => onUpdate('otherSourcesOfSupply', !formData.otherSourcesOfSupply)}
            className={cn(
              'h-11 rounded-lg font-semibold transition-all touch-manipulation text-xs active:scale-[0.98] flex items-center justify-center gap-1.5',
              formData.otherSourcesOfSupply
                ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                : 'bg-white/[0.05] border border-white/[0.08] text-white'
            )}
          >
            {formData.otherSourcesOfSupply && <Check className="h-3.5 w-3.5" />}
            Other Sources
          </button>
        </div>

        {formData.otherSourcesOfSupply && (
          <FormField label="Details of Other Sources">
            <Input
              id="otherSourcesDetails"
              value={formData.otherSourcesDetails || ''}
              onChange={(e) => onUpdate('otherSourcesDetails', e.target.value)}
              placeholder="e.g., Solar PV, Generator"
              className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]"
            />
          </FormField>
        )}
      </div>

      {/* Supply Protective Device */}
      <SectionTitle title="Supply Protective Device" />
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-white">
          <Shield className="h-4 w-4" />
          <span className="text-xs font-medium">Device Details</span>
        </div>
        <button
          type="button"
          onClick={() => {
            if (formData.supplyDeviceRating === 'LIM') {
              onUpdate('supplyDeviceRating', '');
            } else {
              onUpdate('supplyDeviceRating', 'LIM');
            }
          }}
          className={cn(
            'h-9 px-3 rounded-md text-sm font-semibold touch-manipulation transition-colors shrink-0',
            formData.supplyDeviceRating === 'LIM'
              ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
              : 'bg-white/[0.05] border border-white/[0.08] text-white'
          )}
        >
          LIM
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2 items-end">
        <FormField label="BS (EN)">
          <MobileSelectPicker
            value={(formData.supplyDeviceBsEn as string) || ''}
            onValueChange={handleBsStandardChange}
            disabled={formData.supplyDeviceRating === 'LIM'}
            options={[
              { value: 'BS EN 60898', label: 'BS EN 60898 (MCB)' },
              { value: 'BS EN 61009', label: 'BS EN 61009 (RCBO)' },
              { value: 'BS EN 60947-2', label: 'BS EN 60947-2 (MCCB)' },
              { value: 'BS 88-2', label: 'BS 88-2 (HRC Fuse)' },
              { value: 'BS 88-3', label: 'BS 88-3 (Fuse)' },
              { value: 'BS 1361', label: 'BS 1361 (Fuse)' },
              { value: 'BS 3036', label: 'BS 3036 (Rewirable Fuse)' },
              { value: 'other', label: 'Other' },
            ]}
            placeholder="Select BS standard"
            title="BS (EN) Standard"
          />
        </FormField>
        <FormField label="Type">
          <MobileSelectPicker
            value={(formData.supplyDeviceType as string) || ''}
            onValueChange={(value) => onUpdate('supplyDeviceType', value)}
            disabled={formData.supplyDeviceRating === 'LIM'}
            options={getAvailableTypes().map((t) => ({ value: t.value, label: t.label }))}
            placeholder="Select type"
            title="Device Type"
          />
        </FormField>
        <FormField label="Rated Current (A)">
          <MobileSelectPicker
            value={
              formData.supplyDeviceRating === 'LIM' ? '' : (formData.supplyDeviceRating as string) || ''
            }
            onValueChange={(value) => onUpdate('supplyDeviceRating', value)}
            disabled={formData.supplyDeviceRating === 'LIM'}
            options={getAvailableRatings().map((rating) => ({ value: rating, label: `${rating}A` }))}
            placeholder={
              formData.supplyDeviceRating === 'LIM' ? 'LIM' : 'Select rating'
            }
            title="Rated Current"
          />
        </FormField>
      </div>
    </div>
  );
};

export default EICSupplyCharacteristicsSection;
