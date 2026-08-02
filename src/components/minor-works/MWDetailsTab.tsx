import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useHaptic } from '@/hooks/useHaptic';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { cn } from '@/lib/utils';
import {
  EARTHING_CONDUCTOR_SIZES,
  WORK_TYPES,
} from '@/constants/minorWorksOptions';
import ClientSelector from '@/components/ClientSelector';
import { Customer } from '@/hooks/inspection/useCustomers';

interface MWDetailsTabProps {
  formData: Record<string, unknown>;
  onUpdate: (field: string, value: unknown) => void;
}

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const textareaCn =
  'textarea-soft rounded-xl border-0 bg-white/[0.05] px-3.5 py-3 text-base text-white placeholder:text-white/25 caret-elec-yellow transition-colors focus:bg-white/[0.07] focus:ring-1 focus:ring-elec-yellow/50 focus-visible:ring-1 focus-visible:ring-elec-yellow/50 focus:outline-none focus:shadow-none min-h-[90px] touch-manipulation';

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

const MWDetailsTab: React.FC<MWDetailsTabProps> = ({ formData, onUpdate }) => {
  const [clientType, setClientType] = useState<'new' | 'existing'>(() =>
    formData.selectedCustomerId ? 'existing' : 'new'
  );
  // A chosen client reads as one line, not six open inputs — Change reopens.
  const [clientCollapsed, setClientCollapsed] = useState<boolean>(
    () => !!(formData.clientName && formData.propertyAddress)
  );
  // True once the user has typed in a client field or tapped Change — from then
  // on we never auto-collapse under them. Hydration (cloud/draft load) doesn't
  // pass through these handlers, so it still collapses on arrival.
  const userEditedClientRef = useRef(false);
  useEffect(() => {
    if (userEditedClientRef.current) return;
    if (formData.clientName && formData.propertyAddress) {
      setClientCollapsed(true);
    }
  }, [formData.clientName, formData.propertyAddress]);
  // Reopening a cert linked to a CRM client should land on the Existing toggle.
  useEffect(() => {
    if (formData.selectedCustomerId) setClientType('existing');
  }, [formData.selectedCustomerId]);
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
      case 'TN-C-S-PME':
      case 'TN-C-S-PNB':
      case 'TN-C-S': // legacy value
        return '0.20-0.35 typical for PME';
      case 'TN-S':
        return '0.35-0.80 typical for TN-S';
      case 'TT':
        return 'Varies with electrode';
      default:
        return 'e.g., 0.35';
    }
  }, [formData.earthingArrangement]);

  // Inspection dates are anchored to the date of work, not today — backdating
  // the cert must not skew the due date, and chip highlights must survive
  // being reopened on a later day.
  const addYearsIso = (baseIso: string | undefined, years: number) => {
    const d = baseIso ? new Date(baseIso) : new Date();
    d.setFullYear(d.getFullYear() + years);
    return d.toISOString().split('T')[0];
  };

  const handleSelectCustomer = (customer: Customer | null) => {
    if (customer) {
      // Link the cert to the CRM record so the selector re-shows it on reopen.
      onUpdate('selectedCustomerId', customer.id);
      onUpdate('clientName', customer.name || '');
      // Guard each write — a sparse CRM record must not blank out typed fields.
      if (customer.phone) onUpdate('clientPhone', customer.phone);
      if (customer.email) onUpdate('clientEmail', customer.email);
      if (customer.address) onUpdate('propertyAddress', customer.address);
      haptic.success();
      // Collapse only when we have both lines to show (typed address counts).
      if (customer.name && (customer.address || formData.propertyAddress)) {
        setClientCollapsed(true);
      }
    } else {
      onUpdate('selectedCustomerId', '');
    }
  };

  // BS 7671:2018+A4:2026 MEIWC Section B — six system earthing arrangements.
  // Stored `value` must match the PDF template (TN-C-S-PME / TN-C-S-PNB / TN-C);
  // `label` is the friendly display. Legacy 'TN-C-S' is still treated as PME.
  const earthingOptions = [
    { value: 'TN-S', label: 'TN-S' },
    { value: 'TN-C-S-PME', label: 'TN-C-S (PME)' },
    { value: 'TN-C-S-PNB', label: 'TN-C-S (PNB)' },
    { value: 'TT', label: 'TT' },
    { value: 'TN-C', label: 'TN-C' },
    { value: 'IT', label: 'IT' },
  ];
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
    <div className="flex gap-2">
      {options.map((opt) => {
        const isActive = value === opt || value === opt.toLowerCase();
        return (
          <button
            key={opt}
            type="button"
            onClick={() => { haptic.light(); onSelect(opt); }}
            className={cn(
              'flex-1 h-11 rounded-xl text-sm touch-manipulation transition-all active:scale-[0.98]',
              isActive ? chipOn : chipOff
            )}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="space-y-4 pb-20 lg:pb-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
      {/* Client & property */}
      <div className={cardCn}>
        <SectionHeading title="Client & property" />

        {clientCollapsed ? (
          <div className="flex items-center gap-3 rounded-xl border border-white/[0.12] bg-white/[0.06] p-3">
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-semibold text-white truncate">
                {(formData.clientName as string) || ''}
              </p>
              <p className="text-sm text-white truncate">
                {(formData.propertyAddress as string) || ''}
              </p>
              {(formData.clientPhone || formData.clientEmail) && (
                <p className="text-sm text-white truncate">
                  {[formData.clientPhone, formData.clientEmail].filter(Boolean).join(' · ')}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => {
                haptic.light();
                userEditedClientRef.current = true;
                setClientCollapsed(false);
              }}
              className="h-11 px-3 text-sm font-semibold text-elec-yellow touch-manipulation active:scale-[0.97] shrink-0"
            >
              Change
            </button>
          </div>
        ) : (
          <>
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

            {clientType === 'existing' && (
              <ClientSelector
                onSelectCustomer={handleSelectCustomer}
                selectedCustomerId={(formData.selectedCustomerId as string) || undefined}
              />
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              <FormField label="Client name" required>
                <Input
                  data-field="clientName"
                  value={(formData.clientName as string) || ''}
                  onChange={(e) => {
                    userEditedClientRef.current = true;
                    onUpdate('clientName', e.target.value);
                  }}
                  placeholder="Full name"
                  className={inputCn}
                />
              </FormField>
              <FormField label="Person ordering work">
                <Input
                  value={(formData.personOrderingWork as string) || ''}
                  onChange={(e) => onUpdate('personOrderingWork', e.target.value)}
                  placeholder="If different"
                  className={inputCn}
                />
              </FormField>
              <FormField label="Phone">
                <Input
                  type="tel"
                  value={(formData.clientPhone as string) || ''}
                  onChange={(e) => onUpdate('clientPhone', e.target.value)}
                  placeholder="Contact number"
                  className={inputCn}
                />
              </FormField>
              <FormField label="Email">
                <Input
                  type="email"
                  value={(formData.clientEmail as string) || ''}
                  onChange={(e) => onUpdate('clientEmail', e.target.value)}
                  placeholder="Email address"
                  className={inputCn}
                />
              </FormField>
            </div>

            <FormField label="Property address" required>
              <Input
                data-field="propertyAddress"
                value={(formData.propertyAddress as string) || ''}
                onChange={(e) => {
                  userEditedClientRef.current = true;
                  onUpdate('propertyAddress', e.target.value);
                }}
                placeholder="Full installation address including postcode"
                className={inputCn}
              />
            </FormField>

            {(formData.clientName && formData.propertyAddress) && (
              <button
                type="button"
                onClick={() => {
                  haptic.light();
                  setClientCollapsed(true);
                }}
                className="w-full h-11 rounded-xl text-sm font-semibold border border-dashed border-elec-yellow/40 text-elec-yellow touch-manipulation active:scale-[0.98]"
              >
                Done — collapse client details
              </button>
            )}
          </>
        )}
      </div>

      {/* Dates */}
      <div className={cardCn}>
        <SectionHeading title="Dates" />

        <button
          type="button"
          onClick={() => {
            haptic.light();
            const today = new Date().toISOString().split('T')[0];
            onUpdate('workDate', today);
            onUpdate('dateOfCompletion', today);
            // Default next inspection to 5y — common for MW additions tied to next domestic EICR cycle.
            // 1/3/5/10 year chips below let the sparky override.
            onUpdate('nextInspectionDue', addYearsIso(today, 5));
          }}
          className={cn(
            'w-full h-11 rounded-xl text-sm touch-manipulation active:scale-[0.98] transition-all',
            (() => {
              const today = new Date().toISOString().split('T')[0];
              return (
                formData.workDate === today &&
                formData.dateOfCompletion === today &&
                formData.nextInspectionDue === addYearsIso(today, 5)
              );
            })()
              ? chipOn
              : chipOff
          )}
        >
          Set dates (today + 5yr inspection)
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <FormField label="Date of work *">
            <Input
              data-field="workDate"
              type="date"
              value={(formData.workDate as string) || ''}
              onChange={(e) => onUpdate('workDate', e.target.value)}
              className={inputCn}
            />
          </FormField>
          <FormField label="Completion">
            <Input
              type="date"
              value={(formData.dateOfCompletion as string) || ''}
              onChange={(e) => onUpdate('dateOfCompletion', e.target.value)}
              className={inputCn}
            />
          </FormField>
        </div>

        <FormField label="Next inspection due">
          <div className="grid grid-cols-4 gap-2 mb-2">
            {[1, 3, 5, 10].map((years) => (
              <button
                key={years}
                type="button"
                onClick={() => {
                  haptic.light();
                  onUpdate('nextInspectionDue', addYearsIso(formData.workDate as string, years));
                }}
                className={cn(
                  'h-11 rounded-xl text-xs transition-all touch-manipulation active:scale-[0.98]',
                  !!formData.nextInspectionDue &&
                    (formData.nextInspectionDue as string) ===
                      addYearsIso(formData.workDate as string, years)
                    ? chipOn
                    : chipOff
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
            className={inputCn}
          />
        </FormField>

        <FormField label="Contractor name">
          <Input
            value={(formData.contractorName as string) || ''}
            onChange={(e) => onUpdate('contractorName', e.target.value)}
            placeholder="Company name"
            className={inputCn}
          />
        </FormField>
      </div>

      {/* Description of work */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeading title="Description of work" />

        {/* Work type as toggle buttons */}
        <FormField label="Type of work" required>
          <div data-field="workType" className="grid grid-cols-3 gap-2">
            {WORK_TYPES.map((wt) => (
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
                  'h-11 rounded-xl text-xs transition-all touch-manipulation active:scale-[0.98] px-1',
                  formData.workType === wt.value ? chipOn : chipOff
                )}
              >
                {wt.label}
              </button>
            ))}
          </div>
        </FormField>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <FormField label="Location">
            <Input
              value={(formData.workLocation as string) || ''}
              onChange={(e) => onUpdate('workLocation', e.target.value)}
              placeholder="e.g., Kitchen"
              className={inputCn}
            />
          </FormField>
          <FormField label="Description of work *">
            <Input
              data-field="workDescription"
              value={(formData.workDescription as string) || ''}
              onChange={(e) => onUpdate('workDescription', e.target.value)}
              placeholder="e.g., Addition of socket outlet to kitchen circuit"
              className={inputCn}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <FormField label="Departures">
            <div className="flex gap-2">
              <Input
                value={(formData.departuresFromBS7671 as string) || ''}
                onChange={(e) => onUpdate('departuresFromBS7671', e.target.value)}
                placeholder="None"
                className={cn(inputCn, 'flex-1')}
              />
              <button
                type="button"
                onClick={() => { haptic.light(); onUpdate('departuresFromBS7671', 'None'); }}
                className={cn(
                  'h-11 px-4 rounded-xl text-xs touch-manipulation active:scale-[0.97] transition-all shrink-0',
                  formData.departuresFromBS7671 === 'None' ? chipOn : chipOff
                )}
              >
                None
              </button>
            </div>
            <span className="text-[11px] text-white mt-1 block whitespace-nowrap overflow-hidden text-ellipsis">Reg 120.3, 133.1.2, 133.1.3, 133.5</span>
          </FormField>
          <FormField label="Exceptions">
            <div className="flex gap-2">
              <Input
                value={(formData.permittedExceptions as string) || ''}
                onChange={(e) => onUpdate('permittedExceptions', e.target.value)}
                placeholder="None"
                className={cn(inputCn, 'flex-1')}
              />
              <button
                type="button"
                onClick={() => { haptic.light(); onUpdate('permittedExceptions', 'None'); }}
                className={cn(
                  'h-11 px-4 rounded-xl text-xs touch-manipulation active:scale-[0.97] transition-all shrink-0',
                  formData.permittedExceptions === 'None' ? chipOn : chipOff
                )}
              >
                None
              </button>
            </div>
            <span className="text-[11px] text-white mt-1 block whitespace-nowrap overflow-hidden text-ellipsis">Reg 411.3.3</span>
          </FormField>
        </div>

        {/* Risk Assessment toggle */}
        <button
          type="button"
          onClick={() => { haptic.light(); onUpdate('riskAssessmentAttached', !formData.riskAssessmentAttached); }}
          className={cn(
            'w-full h-11 rounded-xl text-sm transition-all touch-manipulation active:scale-[0.98] flex items-center justify-center gap-1.5',
            formData.riskAssessmentAttached ? chipOn : chipOff
          )}
        >
          Risk assessment attached
        </button>

        <FormField label="Comments on existing installation (Reg 644.1.2)">
          <div className="space-y-2">
            <Textarea
              value={(formData.commentsOnExistingInstallation as string) || ''}
              onChange={(e) => onUpdate('commentsOnExistingInstallation', e.target.value)}
              placeholder="Any comments on the existing installation"
              className={textareaCn}
              rows={3}
            />
            <button
              type="button"
              onClick={() => { haptic.light(); onUpdate('commentsOnExistingInstallation', 'None'); }}
              className={cn(
                'h-11 px-4 rounded-xl text-xs touch-manipulation active:scale-[0.97] transition-all',
                formData.commentsOnExistingInstallation === 'None' ? chipOn : chipOff
              )}
            >
              None
            </button>
          </div>
        </FormField>
      </div>

      {/* Supply */}
      <div className={cardCn}>
        <SectionHeading title="Supply" />

        {/* Quick-start presets — covers most UK installations */}
        <div>
          <Label className={labelCn}>Quick start</Label>
          <div className="grid grid-cols-3 gap-2">
            {[
              {
                key: 'mw-dom-tncs',
                label: 'Domestic',
                sub: '1ph 230V TN-C-S',
                values: {
                  earthingArrangement: 'TN-C-S-PME',
                  supplyVoltage: '230V',
                  supplyPhases: 'Single',
                },
              },
              {
                key: 'mw-com-tncs',
                label: 'Commercial',
                sub: '3ph 400V TN-C-S',
                values: {
                  earthingArrangement: 'TN-C-S-PME',
                  supplyVoltage: '400V',
                  supplyPhases: 'Three',
                },
              },
              {
                key: 'mw-tt-1ph',
                label: 'TT supply',
                sub: '1ph 230V electrode',
                values: {
                  earthingArrangement: 'TT',
                  supplyVoltage: '230V',
                  supplyPhases: 'Single',
                },
              },
            ].map((preset) => {
              const isActive = Object.entries(preset.values).every(
                ([field, value]) => formData[field] === value
              );
              return (
                <button
                  key={preset.key}
                  type="button"
                  onClick={() => {
                    haptic.light();
                    Object.entries(preset.values).forEach(([field, value]) =>
                      onUpdate(field, value)
                    );
                  }}
                  className={cn(
                    'h-12 rounded-xl touch-manipulation active:scale-[0.98] flex flex-col items-center justify-center gap-0.5 px-1 transition-all',
                    isActive
                      ? 'bg-elec-yellow border border-elec-yellow'
                      : 'bg-white/[0.06] border border-white/[0.12]'
                  )}
                >
                  <span
                    className={cn(
                      'text-[11px] font-semibold leading-none',
                      isActive ? 'text-black' : 'text-white'
                    )}
                  >
                    {preset.label}
                  </span>
                  <span
                    className={cn(
                      'text-[10px] leading-none text-center',
                      isActive ? 'text-black/70' : 'text-white'
                    )}
                  >
                    {preset.sub}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <FormField label="Earthing arrangement" required>
          <div data-field="earthingArrangement" className="grid grid-cols-3 gap-2">
            {earthingOptions.map((opt) => {
              const stored = (formData.earthingArrangement as string) || '';
              // legacy 'TN-C-S' (no PME/PNB suffix) maps onto the PME button
              const isActive =
                stored === opt.value || (opt.value === 'TN-C-S-PME' && stored === 'TN-C-S');
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => { haptic.light(); onUpdate('earthingArrangement', opt.value); }}
                  className={cn(
                    'h-11 rounded-xl px-1 text-xs touch-manipulation transition-all active:scale-[0.98]',
                    isActive ? chipOn : chipOff
                  )}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </FormField>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
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

        <FormField label="Zdb — earth fault loop at DB (Ω)">
          <Input
            type="text"
            inputMode="decimal"
            value={(formData.zdb as string) || ''}
            onChange={(e) => onUpdate('zdb', e.target.value)}
            placeholder={zdbPlaceholder}
            className={inputCn}
          />
        </FormField>
      </div>

      {/* Earthing & bonding */}
      <div className={cardCn}>
        <SectionHeading title="Earthing & bonding" />

        <button
          type="button"
          onClick={() => { haptic.light(); onUpdate('earthingConductorPresent', !formData.earthingConductorPresent); }}
          className={cn(
            'w-full h-11 rounded-xl text-sm transition-all touch-manipulation active:scale-[0.98] flex items-center justify-center gap-1.5',
            formData.earthingConductorPresent ? chipOn : chipOff
          )}
        >
          Earthing conductor present
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <FormField label="Earthing conductor size">
            <MobileSelectPicker
              value={(formData.mainEarthingConductorSize as string) || ''}
              onValueChange={(v) => onUpdate('mainEarthingConductorSize', v)}
              options={EARTHING_CONDUCTOR_SIZES}
              placeholder="Select size"
              title="Earthing Conductor Size"
              triggerClassName={pickerTriggerCn}
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

        <FormField label="Main bonding conductor size">
          <MobileSelectPicker
            value={(formData.mainBondingConductorSize as string) || ''}
            onValueChange={(v) => onUpdate('mainBondingConductorSize', v)}
            options={EARTHING_CONDUCTOR_SIZES}
            placeholder="Select size"
            title="Bonding Conductor Size"
            triggerClassName={pickerTriggerCn}
          />
        </FormField>

        {/* Bonding Connections */}
        <FormField label="Bonding connections">
          <div className="grid grid-cols-3 gap-2">
            {['Water', 'Gas', 'Oil', 'Steel', 'Other'].map((item) => {
              const fieldName = item === 'Steel' ? 'bondingStructural' : `bonding${item}`;
              const isChecked = (formData[fieldName] as boolean) || false;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    haptic.light();
                    const next = !isChecked;
                    onUpdate(fieldName, next);
                    // When turning Other off, also clear the specify text so we don't leak stale state.
                    if (item === 'Other' && !next && formData.bondingOtherSpecify) {
                      onUpdate('bondingOtherSpecify', '');
                    }
                  }}
                  className={cn(
                    'h-11 rounded-xl text-xs transition-all touch-manipulation active:scale-[0.98] flex items-center justify-center gap-1',
                    isChecked ? chipOn : chipOff
                  )}
                >
                  {item}
                </button>
              );
            })}
          </div>
          {formData.bondingOther && (
            <Input
              value={(formData.bondingOtherSpecify as string) || ''}
              onChange={(e) => onUpdate('bondingOtherSpecify', e.target.value)}
              placeholder="Specify other bonding (e.g. swimming pool, solar PV frame)"
              className={cn(inputCn, 'mt-2')}
            />
          )}
        </FormField>
      </div>
    </div>
  );
};

export default MWDetailsTab;
