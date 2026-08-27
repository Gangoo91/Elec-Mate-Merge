import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
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

const FormField = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <div>
    <Label className={labelCn}>{label}{required && ' *'}</Label>
    {children}
  </div>
);

interface EICClientDetailsSectionProps {
  formData: Record<string, unknown>;
  onUpdate: (field: string, value: string) => void;
}

const CLIENT_SECTION_FIELDS = [
  'selectedCustomerId',
  'clientName', 'clientPhone', 'clientEmail', 'clientAddress', 'occupier',
  'sameAsClientAddress', 'installationAddress', 'description',
  'installationType', 'workType', 'extentOfInstallation',
  'continuationSheetNo', 'installationDate', 'constructionDate', 'testDate',
] as const;

type ClientSectionFields = { [K in (typeof CLIENT_SECTION_FIELDS)[number]]?: string };

const EICClientDetailsSection = ({ formData, onUpdate }: EICClientDetailsSectionProps) => {
  const haptic = useHaptic();
  // A cert linked to a CRM record reopens on 'Existing' with that client shown
  // (MW pattern) — the effect below covers async hydration after mount.
  const [clientType, setClientType] = useState<'new' | 'existing'>(() =>
    formData.selectedCustomerId ? 'existing' : 'new'
  );

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
    (field: keyof ClientSectionFields, value: string) => {
      // ELE-1578 — same fix as ClientDetailsSection (EICR). "Same as client
      // address" only copied on customer-select and on toggling ON, so editing
      // the client address afterwards left installationAddress stale — and the
      // installation field is hidden while the toggle is on, so nothing showed
      // they had diverged. Reported on EICR; the EIC form had it too.
      if (field === 'clientAddress' && localValues.sameAsClientAddress === 'true') {
        setValues({ clientAddress: value, installationAddress: value });
        return;
      }
      setValue(field, value);
    },
    [setValue, setValues, localValues.sameAsClientAddress]
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
        // Link the cert to the CRM record so the selector re-shows it on reopen.
        const updates: Partial<ClientSectionFields> = {
          selectedCustomerId: customer.id,
          clientName: customer.name || '',
        };
        // Guard each write — a sparse CRM record must not blank out typed fields.
        if (customer.email) updates.clientEmail = customer.email;
        if (customer.phone) updates.clientPhone = customer.phone;
        if (customer.address) {
          updates.clientAddress = customer.address;
          if (localValues.sameAsClientAddress === 'true') {
            updates.installationAddress = customer.address;
          }
        }
        setValues(updates);
        flush();
      } else {
        setValues({ selectedCustomerId: '' });
        flush();
      }
    },
    [haptic, localValues.sameAsClientAddress, setValues, flush]
  );

  // Hydration lands after mount — flip to 'Existing' once a linked client id
  // arrives so reopened certs don't show 'New client' with nothing selected.
  useEffect(() => {
    if (localValues.selectedCustomerId) setClientType('existing');
  }, [localValues.selectedCustomerId]);

  // On new certs (no client data yet), default the three dates to today.
  // Guard: never overwrite dates on an existing cert that has any client info loaded.
  useEffect(() => {
    const isNewCert = !localValues.clientName && !localValues.installationAddress;
    if (!isNewCert) return;
    const today = new Date().toISOString().split('T')[0];
    const updates: Partial<ClientSectionFields> = {};
    if (!localValues.installationDate) updates.installationDate = today;
    if (!localValues.constructionDate) updates.constructionDate = today;
    if (!localValues.testDate) updates.testDate = today;
    if (Object.keys(updates).length > 0) {
      setValues(updates);
      flush();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="lg:col-span-2 space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
      {/* Client Details — grouped card. The New/Existing toggle and CRM
          selector live INSIDE the card (MW pattern) so they don't float as an
          unanchored inset band above the edge-to-edge cards on mobile. */}
      <div className={cardCn}>
        <SectionHeading title="Details of the client" />

        {/* Client Type Toggle */}
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

        {/* Existing Client Selector */}
        {clientType === 'existing' && (
          <ClientSelector
            onSelectCustomer={handleSelectCustomer}
            selectedCustomerId={localValues.selectedCustomerId || undefined}
          />
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <FormField label="Client name" required>
            <Input
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

      {/* Installation Address — grouped card */}
      <div className={cardCn}>
        <SectionHeading title="Installation address" />
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
                value={localValues.installationAddress || ''}
                onChange={(e) => handleFieldChange('installationAddress', e.target.value)}
                placeholder="Full address of the installation"
                className={textareaCn}
              />
            </FormField>
          )}
      </div>

      {/* Description and Extent of Installation */}
      <div className={cardCn}>
        <SectionHeading title="Description & extent of installation" />
          {/* Work Type — multi-select (ELE-1315): a job is often an addition
              AND an alteration, and a DB upgrade deserves its own box. Stored
              comma-separated in workType. */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { value: 'new', label: 'New' },
              { value: 'addition', label: 'Addition' },
              { value: 'alteration', label: 'Alteration' },
              { value: 'db-upgrade', label: 'DB upgrade' },
            ].map((option) => {
              const selected = String(localValues.workType || '')
                .split(',')
                .filter(Boolean);
              const isActive = selected.includes(option.value);
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    haptic.light();
                    const next = isActive
                      ? selected.filter((v) => v !== option.value)
                      : [...selected, option.value];
                    handleFieldChange('workType', next.join(','));
                    flush();
                  }}
                  className={cn(
                    'h-11 rounded-xl text-sm transition-all touch-manipulation active:scale-[0.98] flex items-center justify-center',
                    isActive ? chipOn : chipOff
                  )}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
          <FormField label="Property type">
            <MobileSelectPicker
              value={localValues.installationType || ''}
              onValueChange={(value) => { haptic.light(); handleFieldChange('installationType', value); flush(); }}
              options={[
                { value: 'domestic', label: 'Domestic' },
                { value: 'commercial', label: 'Commercial' },
                { value: 'industrial', label: 'Industrial' },
                { value: 'other', label: 'Other' },
              ]}
              placeholder="Property type"
              title="Property Type"
              triggerClassName={pickerTriggerCn}
            />
          </FormField>

          {/*
            ELE-1630 — two fields again, after ELE-1387 merged them into one.
            They ARE the same thing on most jobs, which is why they were merged
            and why the formatter mirrored one into the other. But the merge
            made it impossible for them to differ, and on a rewire of part of a
            property they genuinely do: the description is what the installation
            IS, the extent is how much of it this certificate covers.

            The convenience ELE-1387 was protecting is kept as a one-tap copy
            rather than as a forced duplication.
          */}
          <FormField label="Description of installation" required>
            <Input
              value={localValues.description || ''}
              onChange={(e) => handleFieldChange('description', e.target.value)}
              placeholder="e.g., Full rewire of 3-bed semi-detached — all circuits from new consumer unit"
              className={inputCn}
            />
          </FormField>

          <FormField label="Extent covered by this certificate">
            <div className="flex items-end gap-2">
              <Input
                value={localValues.extentOfInstallation || ''}
                onChange={(e) => handleFieldChange('extentOfInstallation', e.target.value)}
                placeholder="Leave blank if the same as the description"
                className={inputCn}
              />
              <button
                type="button"
                onClick={() => handleFieldChange('extentOfInstallation', localValues.description || '')}
                disabled={!localValues.description}
                className="h-11 flex-shrink-0 rounded-xl border border-white/[0.16] bg-white/[0.06] px-3 text-[12px] font-semibold text-white transition-colors hover:bg-white/[0.12] touch-manipulation active:scale-[0.98] disabled:opacity-40"
              >
                Copy
              </button>
            </div>
          </FormField>
      </div>

      {/* Dates */}
      <div className={cardCn}>
        <SectionHeading title="Dates" />
          {/* Set all to today button — lit when all three dates ARE today
              (MW pattern: action buttons reflect the state they produce) */}
          <button
            type="button"
            onClick={() => {
              haptic.light();
              const today = new Date().toISOString().split('T')[0];
              setValues({ installationDate: today, constructionDate: today, testDate: today });
              flush();
            }}
            className={cn(
              'w-full h-11 rounded-xl text-sm touch-manipulation active:scale-[0.98] transition-all',
              (() => {
                const today = new Date().toISOString().split('T')[0];
                return (
                  localValues.installationDate === today &&
                  localValues.constructionDate === today &&
                  localValues.testDate === today
                );
              })()
                ? chipOn
                : chipOff
            )}
          >
            Set all to today
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-4">
            {[
              { field: 'installationDate' as const, label: 'Installation *' },
              { field: 'constructionDate' as const, label: 'Construction' },
              { field: 'testDate' as const, label: 'Testing' },
            ].map(({ field, label }) => (
              <div key={field}>
                <Label className={labelCn}>{label}</Label>
                <div className="relative">
                  <Input
                    type="date"
                    value={localValues[field] || ''}
                    onChange={(e) => handleFieldChange(field, e.target.value)}
                    onBlur={flush}
                    className={inputCn}
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
