import React, { useState, useMemo } from 'react';
import { Check } from 'lucide-react';
import { useHaptic } from '@/hooks/useHaptic';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { cn } from '@/lib/utils';
import {
  EARTHING_ARRANGEMENTS,
  EARTHING_CONDUCTOR_SIZES,
  WORK_TYPES,
} from '@/constants/minorWorksOptions';
import ClientSelector from '@/components/ClientSelector';
import { Customer } from '@/hooks/inspection/useCustomers';

interface MWDetailsTabProps {
  formData: Record<string, unknown>;
  onUpdate: (field: string, value: unknown) => void;
  isMobile?: boolean;
}

const SectionTitle = ({ title }: { title: string }) => (
  <div className="border-b border-white/[0.06] pb-1 mb-2 mt-2">
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

const inputClass = 'h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]';
const textareaClass = 'text-base touch-manipulation bg-white/[0.06] border-white/[0.08] resize-none';

const MWDetailsTab: React.FC<MWDetailsTabProps> = ({ formData, onUpdate }) => {
  const [clientType, setClientType] = useState<'new' | 'existing'>('new');
  const haptic = useHaptic();
  // Work description templates based on work type
  const WORK_DESCRIPTION_TEMPLATES: Record<string, string> = {
    addition: 'Addition of socket outlet/lighting point to existing circuit',
    alteration: 'Alteration to existing circuit including repositioning of accessories',
    replacement: 'Like-for-like replacement of consumer unit/distribution board',
    new: 'Installation of new radial/ring circuit for',
    repair: 'Fault finding and repair of circuit',
  };

  // Dynamic Zdb placeholder based on earthing arrangement
  const zdbPlaceholder = useMemo(() => {
    switch (formData.earthingArrangement) {
      case 'TN-C-S':
        return '0.20-0.35 typical for PME';
      case 'TN-S':
        return '0.35-0.80 typical for TN-S';
      case 'TT':
        return 'Varies with electrode';
      default:
        return 'e.g., 0.35';
    }
  }, [formData.earthingArrangement]);

  const handleSelectCustomer = (customer: Customer | null) => {
    if (customer) {
      onUpdate('clientName', customer.name || '');
      onUpdate('clientPhone', customer.phone || '');
      onUpdate('clientEmail', customer.email || '');
      onUpdate('propertyAddress', customer.address || '');
    }
  };

  const earthingOptions = ['TN-S', 'TN-C-S', 'TT', 'IT'];
  const voltageOptions = ['230V', '400V'];
  const phaseOptions = ['Single', 'Three'];
  const conductorMaterialOptions = ['Copper', 'Aluminium'];

  const ToggleButtons = ({
    options,
    value,
    onSelect,
  }: {
    options: string[];
    value: string;
    onSelect: (v: string) => void;
  }) => (
    <div className="flex gap-1.5">
      {options.map((opt) => {
        const isActive = value === opt || value === opt.toLowerCase();
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onSelect(opt)}
            className={cn(
              'flex-1 h-11 rounded-lg text-sm font-medium touch-manipulation transition-all',
              isActive
                ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                : 'bg-white/[0.05] border border-white/[0.08] text-white'
            )}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="space-y-3 pb-20 lg:pb-4">
      {/* Client Type Toggle */}
      <div className="flex gap-1.5">
        {[
          { val: 'new' as const, label: 'New Client' },
          { val: 'existing' as const, label: 'Existing' },
        ].map((opt) => (
          <button
            key={opt.val}
            type="button"
            onClick={() => { haptic.light(); setClientType(opt.val); }}
            className={cn(
              'flex-1 h-11 rounded-xl border text-xs font-semibold touch-manipulation active:scale-[0.98] transition-all',
              clientType === opt.val
                ? 'bg-elec-yellow/15 border-elec-yellow/30 text-elec-yellow'
                : 'bg-white/[0.03] border-white/[0.06] text-white'
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {clientType === 'existing' && (
        <ClientSelector onSelectCustomer={handleSelectCustomer} />
      )}

      {/* Client Details */}
      <SectionTitle title="Client Details" />

      <div className="grid grid-cols-2 gap-2 items-end">
        <FormField label="Client Name" required>
          <Input
            value={(formData.clientName as string) || ''}
            onChange={(e) => onUpdate('clientName', e.target.value)}
            placeholder="Full name"
            className={inputClass}
          />
        </FormField>
        <FormField label="Person Ordering Work">
          <Input
            value={(formData.personOrderingWork as string) || ''}
            onChange={(e) => onUpdate('personOrderingWork', e.target.value)}
            placeholder="If different"
            className={inputClass}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-2 gap-2 items-end">
        <FormField label="Phone">
          <Input
            type="tel"
            value={(formData.clientPhone as string) || ''}
            onChange={(e) => onUpdate('clientPhone', e.target.value)}
            placeholder="Contact number"
            className={inputClass}
          />
        </FormField>
        <FormField label="Email">
          <Input
            type="email"
            value={(formData.clientEmail as string) || ''}
            onChange={(e) => onUpdate('clientEmail', e.target.value)}
            placeholder="Email address"
            className={inputClass}
          />
        </FormField>
      </div>

      {/* Installation Address */}
      <SectionTitle title="Installation Address" />

      <FormField label="Property Address" required>
        <Input
          value={(formData.propertyAddress as string) || ''}
          onChange={(e) => onUpdate('propertyAddress', e.target.value)}
          placeholder="Full installation address including postcode"
          className={inputClass}
        />
      </FormField>

      {/* Dates */}
      <SectionTitle title="Dates" />

      <button
        type="button"
        onClick={() => {
          haptic.light();
          const today = new Date().toISOString().split('T')[0];
          onUpdate('workDate', today);
          onUpdate('dateOfCompletion', today);
          // Auto-set next inspection to 10 years from today
          const nextInsp = new Date();
          nextInsp.setFullYear(nextInsp.getFullYear() + 10);
          onUpdate('nextInspectionDue', nextInsp.toISOString().split('T')[0]);
        }}
        className="w-full h-9 rounded-lg text-xs font-medium bg-white/[0.05] border border-white/[0.08] text-white touch-manipulation active:scale-[0.98]"
      >
        Set dates (today + 10yr inspection)
      </button>

      <div className="grid grid-cols-2 gap-2 items-end">
        <FormField label="Date of Work *">
          <Input
            type="date"
            value={(formData.workDate as string) || ''}
            onChange={(e) => onUpdate('workDate', e.target.value)}
            className={cn(inputClass, 'text-xs')}
            style={{ fontSize: '12px' }}
          />
        </FormField>
        <FormField label="Completion">
          <Input
            type="date"
            value={(formData.dateOfCompletion as string) || ''}
            onChange={(e) => onUpdate('dateOfCompletion', e.target.value)}
            className={cn(inputClass, 'text-xs')}
            style={{ fontSize: '12px' }}
          />
        </FormField>
      </div>

      <FormField label="Next Inspection Due">
        <div className="grid grid-cols-4 gap-1 mb-2">
          {[1, 3, 5, 10].map((years) => (
            <button
              key={years}
              type="button"
              onClick={() => {
                haptic.light();
                const d = new Date();
                d.setFullYear(d.getFullYear() + years);
                onUpdate('nextInspectionDue', d.toISOString().split('T')[0]);
              }}
              className={cn(
                'h-9 rounded-lg font-semibold transition-all touch-manipulation text-[10px] active:scale-[0.98]',
                (() => {
                  if (!formData.nextInspectionDue) return false;
                  const d = new Date();
                  d.setFullYear(d.getFullYear() + years);
                  return (formData.nextInspectionDue as string) === d.toISOString().split('T')[0];
                })()
                  ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                  : 'bg-white/[0.05] border border-white/[0.08] text-white'
              )}
            >
              {years} {years === 1 ? 'year' : 'years'}
            </button>
          ))}
        </div>
        <Input
          type="date"
          value={(formData.nextInspectionDue as string) || ''}
          onChange={(e) => onUpdate('nextInspectionDue', e.target.value)}
          className={cn(inputClass, 'text-xs')}
          style={{ fontSize: '12px' }}
        />
      </FormField>

      <FormField label="Contractor Name">
        <Input
          value={(formData.contractorName as string) || ''}
          onChange={(e) => onUpdate('contractorName', e.target.value)}
          placeholder="Company name"
          className={inputClass}
        />
      </FormField>

      {/* Description of Work */}
      <SectionTitle title="Description of Work" />

      {/* Work type as toggle buttons */}
      <FormField label="Type of Work" required>
        <div className="grid grid-cols-3 gap-1">
          {WORK_TYPES.slice(0, 6).map((wt) => (
            <button
              key={wt.value}
              type="button"
              onClick={() => {
                haptic.light();
                onUpdate('workType', wt.value);
                if (WORK_DESCRIPTION_TEMPLATES[wt.value] && !formData.workDescription) {
                  onUpdate('workDescription', WORK_DESCRIPTION_TEMPLATES[wt.value]);
                }
              }}
              className={cn(
                'h-9 rounded-lg font-medium transition-all touch-manipulation text-[9px] active:scale-[0.98]',
                formData.workType === wt.value
                  ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                  : 'bg-white/[0.05] border border-white/[0.08] text-white'
              )}
            >
              {wt.label}
            </button>
          ))}
        </div>
      </FormField>

      <div className="grid grid-cols-2 gap-2 items-end">
        <FormField label="Location">
          <Input
            value={(formData.workLocation as string) || ''}
            onChange={(e) => onUpdate('workLocation', e.target.value)}
            placeholder="e.g., Kitchen"
            className={inputClass}
          />
        </FormField>
        <FormField label="Description *">
          <Input
            value={(formData.workDescription as string) || ''}
            onChange={(e) => onUpdate('workDescription', e.target.value)}
            placeholder="Work carried out"
            className={inputClass}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-2 gap-2 items-end">
        <FormField label="Departures (Reg 120.3, 133.5)">
          <Input
            value={(formData.departuresFromBS7671 as string) || ''}
            onChange={(e) => onUpdate('departuresFromBS7671', e.target.value)}
            placeholder="None"
            className={inputClass}
          />
        </FormField>
        <FormField label="Exceptions (Reg 411.3.3)">
          <Input
            value={(formData.permittedExceptions as string) || ''}
            onChange={(e) => onUpdate('permittedExceptions', e.target.value)}
            placeholder="None"
            className={inputClass}
          />
        </FormField>
      </div>

      {/* Risk Assessment toggle */}
      <button
        type="button"
        onClick={() => { haptic.light(); onUpdate('riskAssessmentAttached', !formData.riskAssessmentAttached); }}
        className={cn(
          'w-full h-10 rounded-lg font-semibold transition-all touch-manipulation text-xs active:scale-[0.98] flex items-center justify-center gap-1.5',
          formData.riskAssessmentAttached
            ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
            : 'bg-white/[0.05] border border-white/[0.08] text-white'
        )}
      >
        {formData.riskAssessmentAttached && <Check className="h-3.5 w-3.5" />}
        Risk Assessment Attached
      </button>

      <FormField label="Comments on Existing Installation (Reg 644.1.2)">
        <Input
          value={(formData.commentsOnExistingInstallation as string) || ''}
          onChange={(e) => onUpdate('commentsOnExistingInstallation', e.target.value)}
          placeholder="Any comments or 'None'"
          className={inputClass}
        />
      </FormField>

      {/* Supply & Earthing */}
      <SectionTitle title="Supply & Earthing" />

      <FormField label="Earthing Arrangement" required>
        <ToggleButtons
          options={earthingOptions}
          value={(formData.earthingArrangement as string) || ''}
          onSelect={(v) => onUpdate('earthingArrangement', v)}
        />
      </FormField>

      <div className="grid grid-cols-2 gap-2 items-end">
        <FormField label="Voltage">
          <ToggleButtons
            options={voltageOptions}
            value={(formData.supplyVoltage as string) || ''}
            onSelect={(v) => onUpdate('supplyVoltage', v)}
          />
        </FormField>
        <FormField label="Phases">
          <ToggleButtons
            options={phaseOptions}
            value={(formData.supplyPhases as string) || ''}
            onSelect={(v) => onUpdate('supplyPhases', v)}
          />
        </FormField>
      </div>

      <FormField label="Zdb — Earth fault loop at DB (Ω)">
        <Input
          type="text"
          inputMode="decimal"
          value={(formData.zdb as string) || ''}
          onChange={(e) => onUpdate('zdb', e.target.value)}
          placeholder={zdbPlaceholder}
          className={inputClass}
        />
      </FormField>

      <button
        type="button"
        onClick={() => { haptic.light(); onUpdate('earthingConductorPresent', !formData.earthingConductorPresent); }}
        className={cn(
          'w-full h-10 rounded-lg font-semibold transition-all touch-manipulation text-xs active:scale-[0.98] flex items-center justify-center gap-1.5',
          formData.earthingConductorPresent
            ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
            : 'bg-white/[0.05] border border-white/[0.08] text-white'
        )}
      >
        {formData.earthingConductorPresent && <Check className="h-3.5 w-3.5" />}
        Earthing Conductor Present
      </button>

      <div className="grid grid-cols-2 gap-2 items-end">
        <FormField label="Earthing Conductor Size">
          <MobileSelectPicker
            value={(formData.mainEarthingConductorSize as string) || ''}
            onValueChange={(v) => onUpdate('mainEarthingConductorSize', v)}
            options={EARTHING_CONDUCTOR_SIZES}
            placeholder="Select size"
            title="Earthing Conductor Size"
          />
        </FormField>
        <FormField label="Material">
          <ToggleButtons
            options={conductorMaterialOptions}
            value={(formData.mainEarthingConductorMaterial as string) || 'Copper'}
            onSelect={(v) => onUpdate('mainEarthingConductorMaterial', v.toLowerCase())}
          />
        </FormField>
      </div>

      <FormField label="Main Bonding Conductor Size">
        <MobileSelectPicker
          value={(formData.mainBondingConductorSize as string) || ''}
          onValueChange={(v) => onUpdate('mainBondingConductorSize', v)}
          options={EARTHING_CONDUCTOR_SIZES}
          placeholder="Select size"
          title="Bonding Conductor Size"
        />
      </FormField>

      {/* Bonding Connections */}
      <FormField label="Bonding Connections">
        <div className="grid grid-cols-3 gap-1">
          {['Water', 'Gas', 'Oil', 'Steel', 'Other'].map((item) => {
            const fieldName = item === 'Steel' ? 'bondingStructural' : `bonding${item}`;
            const isChecked = (formData[fieldName] as boolean) || false;
            return (
              <button
                key={item}
                type="button"
                onClick={() => { haptic.light(); onUpdate(fieldName, !isChecked); }}
                className={cn(
                  'h-10 rounded-lg font-semibold transition-all touch-manipulation text-xs active:scale-[0.98] flex items-center justify-center gap-1',
                  isChecked
                    ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                    : 'bg-white/[0.05] border border-white/[0.08] text-white'
                )}
              >
                {isChecked && <Check className="h-3 w-3" />}
                {item}
              </button>
            );
          })}
        </div>
      </FormField>
    </div>
  );
};

export default MWDetailsTab;
