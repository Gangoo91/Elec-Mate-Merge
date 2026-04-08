import React, { useState, useCallback, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';
import ClientSelector from '@/components/ClientSelector';
import { Customer } from '@/hooks/inspection/useCustomers';
import { useMultiFieldSync } from '@/hooks/useFieldSync';

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

interface EICClientDetailsSectionProps {
  formData: Record<string, unknown>;
  onUpdate: (field: string, value: string) => void;
}

const CLIENT_SECTION_FIELDS = [
  'clientName', 'clientPhone', 'clientEmail', 'clientAddress', 'occupier',
  'sameAsClientAddress', 'installationAddress', 'description',
  'installationType', 'workType', 'extentOfInstallation',
  'continuationSheetNo', 'installationDate', 'constructionDate', 'testDate',
] as const;

type ClientSectionFields = { [K in (typeof CLIENT_SECTION_FIELDS)[number]]?: string };

const EICClientDetailsSection = ({ formData, onUpdate }: EICClientDetailsSectionProps) => {
  const haptic = useHaptic();
  const [clientType, setClientType] = useState<'new' | 'existing'>('new');

  const initialFieldValues = useMemo(() => {
    const values: ClientSectionFields = {};
    for (const field of CLIENT_SECTION_FIELDS) {
      values[field] = (formData[field] as string) || '';
    }
    return values;
  }, [formData]);

  const handleBatchUpdate = useCallback(
    (updates: Partial<ClientSectionFields>) => {
      for (const [field, value] of Object.entries(updates)) {
        onUpdate(field, value);
      }
    },
    [onUpdate]
  );

  const { values: localValues, setValue, setValues, flush } = useMultiFieldSync(initialFieldValues, handleBatchUpdate, 500);

  const handleFieldChange = useCallback(
    (field: keyof ClientSectionFields, value: string) => { setValue(field, value); },
    [setValue]
  );

  const handleSameAddressToggle = useCallback(
    (checked: boolean) => {
      haptic.light();
      const updates: Partial<ClientSectionFields> = { sameAsClientAddress: checked ? 'true' : 'false' };
      if (checked && localValues.clientAddress) { updates.installationAddress = localValues.clientAddress; }
      setValues(updates);
      flush();
    },
    [haptic, localValues.clientAddress, setValues, flush]
  );

  const handleSelectCustomer = useCallback(
    (customer: Customer | null) => {
      if (customer) {
        haptic.success();
        const updates: Partial<ClientSectionFields> = {
          clientName: customer.name || '',
          clientEmail: customer.email || '',
          clientPhone: customer.phone || '',
          clientAddress: customer.address || '',
        };
        if (localValues.sameAsClientAddress === 'true' && customer.address) {
          updates.installationAddress = customer.address;
        }
        setValues(updates);
        flush();
      }
    },
    [haptic, localValues.sameAsClientAddress, setValues, flush]
  );

  return (
    <div className="space-y-6">
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

      {/* Existing Client Selector */}
      {clientType === 'existing' && (
        <ClientSelector onSelectCustomer={handleSelectCustomer} />
      )}

      {/* Client Information */}
      {/* Client Details — grouped card */}
      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] space-y-3">
        <SectionTitle title="Details of the Client" />
        <div className="grid grid-cols-2 gap-3 items-end">
          <FormField label="Client Name" required>
            <Input
              value={localValues.clientName || ''}
              onChange={(e) => handleFieldChange('clientName', e.target.value)}
              placeholder="Full name"
              className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] focus:border-elec-yellow/50 focus:ring-1 focus:ring-elec-yellow/20"
            />
          </FormField>
          <FormField label="Occupier">
            <Input
              value={localValues.occupier || ''}
              onChange={(e) => handleFieldChange('occupier', e.target.value)}
              placeholder="If different"
              className="h-11 text-base touch-manipulation bg-white/[0.04] border-white/[0.06] placeholder:text-white"
            />
          </FormField>
        </div>

        <div className="grid grid-cols-2 gap-3 items-end">
          <FormField label="Phone">
            <Input
              type="tel"
              value={localValues.clientPhone || ''}
              onChange={(e) => handleFieldChange('clientPhone', e.target.value)}
              placeholder="Contact number"
              className="h-11 text-base touch-manipulation bg-white/[0.04] border-white/[0.06] focus:border-elec-yellow/50 focus:ring-1 focus:ring-elec-yellow/20"
            />
          </FormField>
          <FormField label="Email">
            <Input
              type="email"
              value={localValues.clientEmail || ''}
              onChange={(e) => handleFieldChange('clientEmail', e.target.value)}
              placeholder="Email address"
              className="h-11 text-base touch-manipulation bg-white/[0.04] border-white/[0.06] focus:border-elec-yellow/50 focus:ring-1 focus:ring-elec-yellow/20"
            />
          </FormField>
        </div>

        <FormField label="Client Address" required>
          <Textarea
            value={localValues.clientAddress || ''}
            onChange={(e) => handleFieldChange('clientAddress', e.target.value)}
            placeholder="Full postal address"
            className="min-h-[70px] text-base touch-manipulation resize-none bg-white/[0.06] border-white/[0.08] focus:border-elec-yellow/50 focus:ring-1 focus:ring-elec-yellow/20 placeholder:text-white"
          />
        </FormField>
      </div>

      {/* Installation Address — grouped card */}
      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] space-y-3">
        <SectionTitle title="Installation Address" />
        <button
          type="button"
          onClick={() => handleSameAddressToggle(localValues.sameAsClientAddress !== 'true')}
          className={cn(
            'w-full h-11 rounded-lg text-sm font-semibold transition-all touch-manipulation active:scale-[0.98] flex items-center justify-center gap-2',
            localValues.sameAsClientAddress === 'true'
              ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
              : 'bg-white/[0.05] border border-white/[0.08] text-white'
          )}
        >
          {localValues.sameAsClientAddress === 'true' && <Check className="h-3.5 w-3.5" />}
          Same as client address
        </button>

        {localValues.sameAsClientAddress !== 'true' && (
          <FormField label="Installation Address" required>
            <Textarea
                value={localValues.installationAddress || ''}
                onChange={(e) => handleFieldChange('installationAddress', e.target.value)}
                placeholder="Full address of the installation"
                className="min-h-[70px] text-base touch-manipulation resize-none bg-white/[0.06] border-white/[0.08] focus:border-elec-yellow/50 focus:ring-1 focus:ring-elec-yellow/20 placeholder:text-white"
              />
            </FormField>
          )}
      </div>

      {/* Description and Extent of Installation */}
      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] space-y-3">
        <SectionTitle title="Description & Extent of Installation" />
          {/* Work Type + Premises side by side */}
          <div className="grid grid-cols-4 gap-1.5">
            {[
              { value: 'new', label: 'New' },
              { value: 'addition', label: 'Addition' },
              { value: 'alteration', label: 'Alteration' },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  haptic.light();
                  handleFieldChange('workType', localValues.workType === option.value ? '' : option.value);
                  flush();
                }}
                className={cn(
                  'h-10 rounded-lg font-semibold transition-all touch-manipulation text-[11px] active:scale-[0.98] flex items-center justify-center gap-1',
                  localValues.workType === option.value
                    ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                    : 'bg-white/[0.05] border border-white/[0.08] text-white'
                )}
              >
                {localValues.workType === option.value && <Check className="h-3 w-3" />}
                {option.label}
              </button>
            ))}
            <MobileSelectPicker
              value={localValues.installationType || ''}
              onValueChange={(value) => { haptic.light(); handleFieldChange('installationType', value); flush(); }}
              options={[
                { value: 'domestic', label: 'Domestic' },
                { value: 'commercial', label: 'Commercial' },
                { value: 'industrial', label: 'Industrial' },
                { value: 'other', label: 'Other' },
              ]}
              placeholder="Premises"
              title="Premises Type"
              triggerClassName="h-10 text-[11px]"
            />
          </div>

          <FormField label="Description of Installation" required>
            <Input
              value={localValues.description || ''}
              onChange={(e) => handleFieldChange('description', e.target.value)}
              placeholder="e.g., Full rewire of 3-bed semi-detached"
              className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]"
            />
          </FormField>

          <FormField label="Extent Covered by this Certificate">
            <Input
              value={localValues.extentOfInstallation || ''}
              onChange={(e) => handleFieldChange('extentOfInstallation', e.target.value)}
              placeholder="e.g., All circuits from new consumer unit"
              className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]"
            />
          </FormField>
      </div>

      {/* Dates */}
      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] space-y-3">
        <SectionTitle title="Dates" />
          {/* Set all to today button */}
          <button
            type="button"
            onClick={() => {
              haptic.light();
              const today = new Date().toISOString().split('T')[0];
              setValues({ installationDate: today, constructionDate: today, testDate: today });
              flush();
            }}
            className="w-full h-9 rounded-lg text-xs font-medium bg-white/[0.05] border border-white/[0.08] text-white touch-manipulation active:scale-[0.98] transition-all"
          >
            Set all to today
          </button>
          <div className="grid grid-cols-3 gap-2">
            {[
              { field: 'installationDate' as const, label: 'Installation *' },
              { field: 'constructionDate' as const, label: 'Construction' },
              { field: 'testDate' as const, label: 'Testing' },
            ].map(({ field, label }) => (
              <div key={field}>
                <Label className="text-white text-xs mb-1.5 block">{label}</Label>
                <div className="relative">
                  <Input
                    type="date"
                    value={localValues[field] || ''}
                    onChange={(e) => handleFieldChange(field, e.target.value)}
                    onBlur={flush}
                    className="h-11 touch-manipulation bg-white/[0.06] border-white/[0.08] text-xs [&::-webkit-datetime-edit]:text-xs [&::-webkit-date-and-time-value]:text-xs"
                    style={{ fontSize: '12px' }}
                  />
                </div>
              </div>
            ))}
          </div>
      </div>
    </div>
  );
};

export default EICClientDetailsSection;
