import React, { useState, useCallback, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import FormSelectSheet from '@/components/ui/form-select-sheet';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';
import ClientSelector from '@/components/ClientSelector';
import { Customer } from '@/hooks/inspection/useCustomers';
import { useMultiFieldSync } from '@/hooks/useFieldSync';

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const textareaCn =
  'textarea-soft rounded-xl border-0 bg-white/[0.05] px-3.5 py-3 text-base md:text-base text-white placeholder:text-white/25 caret-elec-yellow transition-colors focus:bg-white/[0.07] focus:ring-1 focus:ring-elec-yellow/50 focus-visible:ring-1 focus-visible:ring-elec-yellow/50 focus:outline-none focus:shadow-none min-h-[90px] touch-manipulation';

const labelCn = 'text-[12px] font-medium text-white mb-1 block';

const pickerTriggerCn =
  'rounded-none border-0 border-b border-white/[0.15] bg-transparent h-11 px-1 text-base font-medium text-white hover:border-white/[0.3] focus:border-elec-yellow focus:ring-0 focus-visible:ring-0 focus:outline-none touch-manipulation';

const chipOn = 'bg-elec-yellow border border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border border-white/[0.12] text-white font-medium';

const SectionHeading = ({ title }: { title: string }) => (
  <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">{title}</h2>
);

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
    <Label className={labelCn}>
      {label}
      {required && ' *'}
    </Label>
    {children}
  </div>
);

interface ClientDetailsSectionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: any;
  onUpdate: (field: string, value: string) => void;
  /**
   * Which certificate is rendering this shared section. EICR drops "Installation
   * Type" (always existing) in favour of property details; EIC keeps it. ELE-1105.
   */
  certType?: 'eicr' | 'eic';
}

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
  'propertyType',
  'numberOfBedrooms',
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
 * ClientDetailsSection - paper-form details step for client & installation details
 *
 * Performance optimised:
 * - Uses useMultiFieldSync for debounced state commits (500ms)
 * - Wrapped with React.memo for selective re-rendering
 * - Only re-renders when CLIENT_SECTION_FIELDS change
 */
const ClientDetailsSectionInner = ({ formData, onUpdate, certType }: ClientDetailsSectionProps) => {
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
    <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
      {/* Client details — the New/Existing toggle and CRM selector live INSIDE
          the card (EIC pattern) so they don't float as an unanchored band above
          the edge-to-edge cards on mobile. */}
      <div className={cardCn}>
        <SectionHeading title="Details of the client" />

        {/* Client type toggle */}
        <div className="flex gap-2">
          {[
            { val: 'new' as const, label: 'New client' },
            { val: 'existing' as const, label: 'Existing' },
          ].map((opt) => (
            <button
              key={opt.val}
              type="button"
              onClick={() => { haptic.light(); setClientType(opt.val); }}
              className={cn(
                'flex-1 h-11 rounded-xl text-sm touch-manipulation active:scale-[0.98] transition-all',
                clientType === opt.val ? chipOn : chipOff
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Existing client selector */}
        {clientType === 'existing' && (
          <ClientSelector onSelectCustomer={handleSelectCustomer} />
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <FormField label="Client name" required>
            <Input
              data-field="clientName"
              value={localValues.clientName || ''}
              onChange={(e) => handleFieldChange('clientName', e.target.value)}
              placeholder="Full name"
              className={inputCn}
            />
          </FormField>
          <FormField label="Occupier">
            <Input
              value={localValues.occupier || ''}
              onChange={(e) => handleFieldChange('occupier', e.target.value)}
              placeholder="If different"
              className={inputCn}
            />
          </FormField>
          <FormField label="Phone">
            <Input
              type="tel"
              value={localValues.clientPhone || ''}
              onChange={(e) => handleFieldChange('clientPhone', e.target.value)}
              placeholder="Contact number"
              className={inputCn}
            />
          </FormField>
          <FormField label="Email">
            <Input
              type="email"
              value={localValues.clientEmail || ''}
              onChange={(e) => handleFieldChange('clientEmail', e.target.value)}
              placeholder="Email address"
              className={inputCn}
            />
          </FormField>
        </div>

        <FormField label="Client address" required>
          <Textarea
            value={localValues.clientAddress || ''}
            onChange={(e) => handleFieldChange('clientAddress', e.target.value)}
            placeholder="Full postal address"
            className={textareaCn}
          />
        </FormField>
      </div>

      {/* Installation details */}
      <div className={cardCn}>
        <SectionHeading title="Installation details" />

        {/* Same address toggle */}
        <button
          type="button"
          onClick={() => handleSameAddressToggle(localValues.sameAsClientAddress !== 'true')}
          className={cn(
            'w-full h-11 rounded-xl text-sm transition-all touch-manipulation active:scale-[0.98] flex items-center justify-center',
            localValues.sameAsClientAddress === 'true' ? chipOn : chipOff
          )}
        >
          Same as client address
        </button>

        {localValues.sameAsClientAddress !== 'true' && (
          <FormField label="Installation address" required>
            <Textarea
              data-field="installationAddress"
              value={localValues.installationAddress || ''}
              onChange={(e) => handleFieldChange('installationAddress', e.target.value)}
              placeholder="Full address of the installation"
              className={textareaCn}
            />
          </FormField>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <FormField label="Premises type" required>
            <FormSelectSheet
              value={localValues.description || ''}
              onValueChange={(value) => {
                handleFieldChange('description', value);
                flush();
              }}
              label="Premises type"
              placeholder="Select type"
              options={[
                { value: 'domestic', label: 'Domestic' },
                { value: 'commercial', label: 'Commercial' },
                { value: 'industrial', label: 'Industrial' },
              ]}
              allowCustom
              customLabel="Other (include brief description)"
              className={pickerTriggerCn}
            />
          </FormField>

          {/* EICR is always an existing installation, so the Installation Type
              field is redundant — swap it for property details (ELE-1105).
              EIC keeps Installation Type (new/addition/alteration matters there). */}
          {certType === 'eicr' ? (
            <>
              <FormField label="Property type">
                <FormSelectSheet
                  value={localValues.propertyType || ''}
                  onValueChange={(value) => {
                    handleFieldChange('propertyType', value);
                    flush();
                  }}
                  label="Property type"
                  placeholder="Select type"
                  options={[
                    { value: 'house', label: 'House' },
                    { value: 'flat', label: 'Flat' },
                    { value: 'maisonette', label: 'Maisonette' },
                    { value: 'bungalow', label: 'Bungalow' },
                    { value: 'hmo', label: 'HMO' },
                    { value: 'commercial', label: 'Commercial' },
                  ]}
                  allowCustom
                  customLabel="Other (specify)"
                  className={pickerTriggerCn}
                />
              </FormField>
              <FormField label="No. of bedrooms">
                <Input
                  type="number"
                  min="0"
                  max="50"
                  value={localValues.numberOfBedrooms || ''}
                  onChange={(e) => handleFieldChange('numberOfBedrooms', e.target.value)}
                  placeholder="Bedrooms"
                  className={inputCn}
                  inputMode="numeric"
                />
              </FormField>
            </>
          ) : (
            <FormField label="Installation type">
              <FormSelectSheet
                value={localValues.installationType || ''}
                onValueChange={(value) => {
                  handleFieldChange('installationType', value);
                  flush();
                }}
                label="Installation type"
                placeholder="Select type"
                options={[
                  { value: 'new-installation', label: 'New Installation' },
                  { value: 'existing-installation', label: 'Existing Installation' },
                  { value: 'extended-installation', label: 'Extended Installation' },
                  { value: 'altered-installation', label: 'Altered Installation' },
                ]}
                allowCustom
                customLabel="Other (specify)"
                className={pickerTriggerCn}
              />
            </FormField>
          )}
        </div>
      </div>

      {/* Installation history */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeading title="Installation history" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <FormField label="Estimated age of installation">
            <Input
              type="number"
              min="0"
              max="100"
              value={localValues.estimatedAge || ''}
              onChange={(e) => handleFieldChange('estimatedAge', e.target.value)}
              placeholder="Years"
              className={inputCn}
              inputMode="numeric"
            />
          </FormField>
          <FormField label="Installation records available">
            <div className="grid grid-cols-2 gap-2">
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
                    'h-11 rounded-xl text-sm transition-all touch-manipulation active:scale-[0.98]',
                    localValues.installationRecordsAvailable === option.value ? chipOn : chipOff
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </FormField>
        </div>

        <FormField label="Evidence of alterations or additions">
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: 'no', label: 'No' },
              { value: 'yes', label: 'Yes' },
              { value: 'not-apparent', label: 'Not apparent' },
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
                  'h-11 rounded-xl text-sm transition-all touch-manipulation active:scale-[0.98] px-1',
                  localValues.evidenceOfAlterations === option.value ? chipOn : chipOff
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </FormField>

        {localValues.evidenceOfAlterations === 'yes' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <FormField label="Alteration details">
              <Textarea
                value={localValues.alterationsDetails || ''}
                onChange={(e) => handleFieldChange('alterationsDetails', e.target.value)}
                placeholder="Describe alterations"
                className={textareaCn}
              />
            </FormField>
            <FormField label="Age of alterations">
              <Input
                type="number"
                inputMode="numeric"
                min="0"
                max="100"
                value={localValues.alterationsAge || ''}
                onChange={(e) => handleFieldChange('alterationsAge', e.target.value)}
                placeholder="Years"
                className={inputCn}
              />
            </FormField>
          </div>
        )}

        <FormField label="Last inspection">
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
                  'h-11 rounded-xl text-sm transition-all touch-manipulation active:scale-[0.98]',
                  localValues.lastInspectionType === option.value ? chipOn : chipOff
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </FormField>

        {localValues.lastInspectionType === 'known' && (
          <FormField label="Date of last inspection">
            <Input
              type="date"
              value={localValues.dateOfLastInspection || ''}
              onChange={(e) => handleFieldChange('dateOfLastInspection', e.target.value)}
              onBlur={flush}
              className={inputCn}
            />
          </FormField>
        )}
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
