import React, { useState, useCallback, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Check } from 'lucide-react';
// Icons removed — clean design
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useHaptic } from '@/hooks/useHaptic';
import ClientSelector from '@/components/ClientSelector';
import { Customer } from '@/hooks/inspection/useCustomers';
import { useMultiFieldSync } from '@/hooks/useFieldSync';

interface ClientDetailsSectionProps {
  formData: any;
  onUpdate: (field: string, value: string) => void;
}

// Section header — fire alarm pattern (gradient accent line + uppercase title)
const SectionTitle = ({
  title,
}: {
  icon?: React.ElementType;
  title: string;
  isMobile?: boolean;
}) => (
  <div className="border-b border-white/[0.06] pb-1 mb-3">
    <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
    <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
  </div>
);

// Field wrapper — fire alarm pattern
const FormField = ({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) => (
  <div>
    <Label className="text-white text-xs mb-1.5 block">
      {label}{required && ' *'}
    </Label>
    {children}
  </div>
);

// Fields managed by this section (for memoization comparison)
const CLIENT_SECTION_FIELDS = [
  'clientName',
  'clientPhone',
  'clientEmail',
  'clientAddress',
  'occupier',
  'sameAsClientAddress',
  'installationAddress',
  'description',
  'otherPremisesDescription',
  'installationType',
  'estimatedAge',
  'ageUnit',
  'lastInspectionType',
  'dateOfLastInspection',
  'evidenceOfAlterations',
  'alterationsDetails',
  'alterationsAge',
  'installationRecordsAvailable',
] as const;

type ClientSectionFields = {
  [K in (typeof CLIENT_SECTION_FIELDS)[number]]?: string;
};

/**
 * ClientDetailsSection - Best-in-class mobile form for client & installation details
 * Edge-to-edge design with large touch targets and native app feel
 *
 * Performance optimised:
 * - Uses useMultiFieldSync for debounced state commits (500ms)
 * - Wrapped with React.memo for selective re-rendering
 * - Only re-renders when CLIENT_SECTION_FIELDS change
 */
const ClientDetailsSectionInner = ({ formData, onUpdate }: ClientDetailsSectionProps) => {
  const isMobile = useIsMobile();
  const haptic = useHaptic();
  const [clientType, setClientType] = useState<'new' | 'existing'>('new');

  // Extract only the fields this section cares about
  const initialFieldValues = useMemo(() => {
    const values: ClientSectionFields = {};
    for (const field of CLIENT_SECTION_FIELDS) {
      values[field] = formData[field] || '';
    }
    return values;
  }, [formData]);

  // Batch updates to parent with debounce
  const handleBatchUpdate = useCallback(
    (updates: Partial<ClientSectionFields>) => {
      for (const [field, value] of Object.entries(updates)) {
        onUpdate(field, value);
      }
    },
    [onUpdate]
  );

  // Local state with debounced commits - 500ms delay prevents keystroke lag
  const {
    values: localValues,
    setValue,
    setValues,
    flush,
  } = useMultiFieldSync(initialFieldValues, handleBatchUpdate, 500);

  // Helper to update a single field
  const handleFieldChange = useCallback(
    (field: keyof ClientSectionFields, value: string) => {
      setValue(field, value);
    },
    [setValue]
  );

  const handleSameAddressToggle = useCallback(
    (checked: boolean) => {
      haptic.light();
      const updates: Partial<ClientSectionFields> = {
        sameAsClientAddress: checked ? 'true' : 'false',
      };
      if (checked && localValues.clientAddress) {
        updates.installationAddress = localValues.clientAddress;
      }
      setValues(updates);
      flush(); // Immediately commit toggle changes
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
        flush(); // Immediately commit customer selection
      }
    },
    [haptic, localValues.sameAsClientAddress, setValues, flush]
  );

  return (
    <div className={cn('space-y-6', '')}>
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
        <div className={cn('')}>
          <ClientSelector onSelectCustomer={handleSelectCustomer} />
        </div>
      )}

      {/* Client Information Section */}
      <div>
        <SectionTitle title="Client Information" />
        <div className="space-y-3 py-3">
          <div className="grid grid-cols-2 gap-3 items-end">
            <FormField label="Client Name" required>
              <Input
                value={localValues.clientName || ''}
                onChange={(e) => handleFieldChange('clientName', e.target.value)}
                placeholder="Full name"
                className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]"
              />
            </FormField>
            <FormField label="Occupier">
              <Input
                value={localValues.occupier || ''}
                onChange={(e) => handleFieldChange('occupier', e.target.value)}
                placeholder="If different"
                className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]"
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
                className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]"
              />
            </FormField>
            <FormField label="Email">
              <Input
                type="email"
                value={localValues.clientEmail || ''}
                onChange={(e) => handleFieldChange('clientEmail', e.target.value)}
                placeholder="Email address"
                className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]"
              />
            </FormField>
          </div>

          <FormField label="Client Address" required>
            <Textarea
              value={localValues.clientAddress || ''}
              onChange={(e) => handleFieldChange('clientAddress', e.target.value)}
              placeholder="Full postal address"
              className="min-h-[70px] text-base touch-manipulation resize-none bg-white/[0.06] border-white/[0.08] placeholder:text-white/30"
            />
          </FormField>
        </div>
      </div>

      {/* Installation Details Section */}
      <div>
        <SectionTitle title="Installation Details" />
        <div className="space-y-3 py-3">
          {/* Same Address Toggle */}
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
                className="min-h-[70px] text-base touch-manipulation resize-none bg-white/[0.06] border-white/[0.08] placeholder:text-white/30"
              />
            </FormField>
          )}

          <div className="grid grid-cols-2 gap-3 items-end">
            <FormField label="Premises Type" required>
              <Select
                value={localValues.description || ''}
                onValueChange={(value) => {
                  haptic.light();
                  handleFieldChange('description', value);
                  flush();
                }}
              >
                <SelectTrigger className="h-11 touch-manipulation bg-white/[0.06] border-white/[0.08]">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="domestic">Domestic</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {localValues.description === 'other' && (
                <Input
                  value={localValues.otherPremisesDescription || ''}
                  onChange={(e) => handleFieldChange('otherPremisesDescription', e.target.value)}
                  placeholder="Specify type"
                  className="mt-2 h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]"
                />
              )}
            </FormField>

            <FormField label="Installation Type">
              <Select
                value={localValues.installationType || ''}
                onValueChange={(value) => {
                  haptic.light();
                  handleFieldChange('installationType', value);
                  flush();
                }}
              >
                <SelectTrigger className="h-11 touch-manipulation bg-white/[0.06] border-white/[0.08]">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new-installation">New Installation</SelectItem>
                  <SelectItem value="existing-installation">Existing Installation</SelectItem>
                  <SelectItem value="extended-installation">Extended Installation</SelectItem>
                  <SelectItem value="altered-installation">Altered Installation</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </div>
        </div>
      </div>

      {/* Installation History Section */}
      <div>
        <SectionTitle title="Installation History" />
        <div className="space-y-3 py-3">
          {/* Age + Records */}
          <div className="grid grid-cols-3 gap-2">
            <FormField label="Est. Age">
              <Input
                type="number"
                min="0"
                max="100"
                value={localValues.estimatedAge || ''}
                onChange={(e) => handleFieldChange('estimatedAge', e.target.value)}
                placeholder="Years"
                className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]"
                inputMode="numeric"
              />
            </FormField>
            <FormField label="Records">
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      haptic.light();
                      handleFieldChange('installationRecordsAvailable', localValues.installationRecordsAvailable === option.value ? '' : option.value);
                      flush();
                    }}
                    className={cn(
                      'h-11 rounded-lg font-semibold transition-all touch-manipulation text-xs active:scale-[0.98]',
                      localValues.installationRecordsAvailable === option.value
                        ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                        : 'bg-white/[0.05] text-white border border-white/[0.08]'
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </FormField>
            <FormField label="Alterations">
              <div className="grid grid-cols-3 gap-1">
                {[
                  { value: 'no', label: 'No' },
                  { value: 'yes', label: 'Yes' },
                  { value: 'not-apparent', label: 'N/A' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      haptic.light();
                      if (localValues.evidenceOfAlterations === option.value) {
                        setValues({ evidenceOfAlterations: '', alterationsDetails: '', alterationsAge: '' });
                      } else {
                        const updates: Partial<ClientSectionFields> = { evidenceOfAlterations: option.value };
                        if (option.value !== 'yes') { updates.alterationsDetails = ''; updates.alterationsAge = ''; }
                        setValues(updates);
                      }
                      flush();
                    }}
                    className={cn(
                      'h-11 rounded-lg font-semibold transition-all touch-manipulation text-[10px] active:scale-[0.98]',
                      localValues.evidenceOfAlterations === option.value
                        ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                        : 'bg-white/[0.05] text-white border border-white/[0.08]'
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </FormField>
          </div>

          {/* Last Inspection — full width row */}
          <FormField label="Last Inspection">
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: 'known', label: 'Known' },
                { value: 'unknown', label: 'Unknown' },
                { value: 'not-applicable', label: 'First' },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    haptic.light();
                    if (localValues.lastInspectionType === option.value) {
                      setValues({ lastInspectionType: '', dateOfLastInspection: '' });
                    } else {
                      const updates: Partial<ClientSectionFields> = { lastInspectionType: option.value };
                      if (option.value !== 'known') updates.dateOfLastInspection = '';
                      setValues(updates);
                    }
                    flush();
                  }}
                  className={cn(
                    'h-11 rounded-lg font-semibold transition-all touch-manipulation text-sm active:scale-[0.98]',
                    localValues.lastInspectionType === option.value
                      ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                      : 'bg-white/[0.05] text-white border border-white/[0.08]'
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </FormField>

          {/* Conditional fields */}
          {localValues.lastInspectionType === 'known' && (
            <FormField label="Date of Last Inspection">
              <Input
                type="date"
                value={localValues.dateOfLastInspection || ''}
                onChange={(e) => handleFieldChange('dateOfLastInspection', e.target.value)}
                onBlur={flush}
                className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]"
              />
            </FormField>
          )}
          {localValues.evidenceOfAlterations === 'yes' && (
            <div className="grid grid-cols-2 gap-3 items-end">
              <FormField label="Alteration Details">
                <Textarea
                  value={localValues.alterationsDetails || ''}
                  onChange={(e) => handleFieldChange('alterationsDetails', e.target.value)}
                  placeholder="Describe alterations"
                  className="min-h-[70px] text-base touch-manipulation resize-none bg-white/[0.06] border-white/[0.08] placeholder:text-white/30"
                />
              </FormField>
              <FormField label="Age of Alterations">
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={localValues.alterationsAge || ''}
                  onChange={(e) => handleFieldChange('alterationsAge', e.target.value)}
                  placeholder="Years"
                  className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]"
                />
              </FormField>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Memoized component - only re-renders when CLIENT_SECTION_FIELDS change
const ClientDetailsSection = React.memo(ClientDetailsSectionInner, (prevProps, nextProps) => {
  // Compare only the fields this section cares about
  for (const field of CLIENT_SECTION_FIELDS) {
    if (prevProps.formData[field] !== nextProps.formData[field]) {
      return false; // Re-render needed
    }
  }
  // Also compare onUpdate reference
  return prevProps.onUpdate === nextProps.onUpdate;
});

ClientDetailsSection.displayName = 'ClientDetailsSection';

export default ClientDetailsSection;
