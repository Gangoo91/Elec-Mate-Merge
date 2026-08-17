import React, { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { cn } from '@/lib/utils';
import { useEmergencyLightingSmartForm } from '@/hooks/inspection/useEmergencyLightingSmartForm';
import { useHaptic } from '@/hooks/useHaptic';
import {
  EL_CURRENT_DESIGN_STANDARD,
  EL_DESIGN_STANDARD_OPTIONS,
} from '@/data/emergencyLightingStandards';
import { DurationBadge } from './ValidationBadge';
import { supabase } from '@/integrations/supabase/client';
import CertificateClientSection from '@/components/inspection/shared/CertificateClientSection';
import type { EmergencyLightingFormData } from '@/types/emergency-lighting';

interface ExistingClient {
  id: string;
  clientName: string;
  clientAddress: string;
  clientTelephone: string;
  clientEmail: string;
  premisesName: string;
  premisesAddress: string;
  premisesType: string;
  occupancyType: string;
}

interface Props {
  formData: EmergencyLightingFormData;
  onUpdate: (
    field: string,
    value: EmergencyLightingFormData[keyof EmergencyLightingFormData]
  ) => void;
}

// Section card — the only box on the page
const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

// Paper-form underline input
const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const textareaCn =
  'textarea-soft rounded-xl border-0 bg-white/[0.05] px-3.5 py-3 text-base md:text-base text-white placeholder:text-white/25 caret-elec-yellow transition-colors focus:bg-white/[0.07] focus:ring-1 focus:ring-elec-yellow/50 focus-visible:ring-1 focus-visible:ring-elec-yellow/50 focus:outline-none focus:shadow-none min-h-[90px] touch-manipulation';

const labelCn = 'text-[12px] font-medium text-white mb-1 block';

const pickerTrigger =
  'rounded-none border-0 border-b border-white/[0.15] bg-transparent h-11 w-full px-1 text-base font-medium text-white hover:border-white/[0.3] focus:border-elec-yellow focus:ring-0 focus-visible:ring-0 focus:outline-none touch-manipulation';

const SectionHeader = ({ title }: { title: string }) => (
  <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">{title}</h2>
);

const Sub = ({ title }: { title: string }) => (
  <div className="border-t border-white/[0.1] pt-4">
    <h3 className="text-sm font-semibold text-white">{title}</h3>
  </div>
);

const Field = ({
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

const Toggle = ({
  label,
  field,
  value,
  onUpdate,
}: {
  label: string;
  field: string;
  value: boolean | undefined;
  onUpdate: (f: string, v: boolean) => void;
}) => (
  <div className="flex items-center justify-between gap-3">
    <Label className="text-[12px] font-medium text-white">{label}</Label>
    <div className="flex gap-2">
      {[true, false].map((v) => (
        <button
          key={String(v)}
          type="button"
          onClick={() => onUpdate(field, v)}
          className={cn(
            'h-11 w-16 rounded-xl text-sm transition-all touch-manipulation active:scale-[0.98]',
            value === v
              ? 'bg-elec-yellow border border-elec-yellow text-black font-semibold'
              : 'bg-white/[0.06] border border-white/[0.12] text-white font-medium'
          )}
        >
          {v ? 'Yes' : 'No'}
        </button>
      ))}
    </div>
  </div>
);

const EmergencyLightingInstallationDetails: React.FC<Props> = ({ formData, onUpdate }) => {
  const { getDurationForPremises } = useEmergencyLightingSmartForm();
  const haptic = useHaptic();

  // Fetch existing clients from previous certificates
  const { data: existingClients } = useQuery({
    queryKey: ['emergency-lighting-existing-clients'],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return [];
      const { data, error } = await supabase
        .from('reports')
        .select('id, data, created_at')
        .eq('report_type', 'emergency-lighting')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (error || !data) return [];
      const clientMap = new Map<string, ExistingClient>();
      data.forEach((report) => {
        const rd = report.data as Record<string, unknown>;
        if (!rd?.clientName) return;
        const key = `${rd.clientName}-${rd.clientAddress || ''}`;
        if (!clientMap.has(key)) {
          clientMap.set(key, {
            id: report.id,
            clientName: (rd.clientName as string) || '',
            clientAddress: (rd.clientAddress as string) || '',
            clientTelephone: (rd.clientTelephone as string) || '',
            clientEmail: (rd.clientEmail as string) || '',
            premisesName: (rd.premisesName as string) || '',
            premisesAddress: (rd.premisesAddress as string) || '',
            premisesType: (rd.premisesType as string) || '',
            occupancyType: (rd.occupancyType as string) || '',
          });
        }
      });
      return Array.from(clientMap.values());
    },
    staleTime: 5 * 60 * 1000,
  });

  const handleSelectExistingClient = (clientId: string) => {
    const client = existingClients?.find((c) => c.id === clientId);
    if (client) {
      onUpdate('clientName', client.clientName);
      onUpdate('clientAddress', client.clientAddress);
      onUpdate('clientTelephone', client.clientTelephone);
      onUpdate('clientEmail', client.clientEmail);
      onUpdate('premisesName', client.premisesName);
      onUpdate('premisesAddress', client.premisesAddress);
      onUpdate('premisesType', client.premisesType);
      onUpdate('occupancyType', client.occupancyType);
    }
  };

  const durationGuidance = formData.premisesType
    ? getDurationForPremises(formData.premisesType)
    : null;

  // Suggest the 3-hour duration ONCE, when the premises type actually changes.
  // getDurationForPremises returns a fresh object every call, so keying the
  // effect on `durationGuidance` re-ran it on every render — picking "1 Hour"
  // for a 3-hour premises snapped straight back to 180 and the option could
  // never be chosen. Track the premises type we last acted on instead.
  // Seeded with the premises type present at mount (the page blocks render
  // until the cert has hydrated), so re-opening a saved cert never overwrites
  // a duration the user deliberately set.
  const autoDurationFor = useRef<string>(formData.premisesType || '');
  useEffect(() => {
    const premisesType = formData.premisesType || '';
    if (autoDurationFor.current === premisesType) return;
    autoDurationFor.current = premisesType;
    if (durationGuidance?.duration === 180 && formData.ratedDuration === 60) {
      onUpdate('ratedDuration', 180);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.premisesType]);

  const copyClientAddress = () => {
    if (formData.clientAddress) {
      onUpdate('premisesAddress', formData.clientAddress);
    }
  };

  return (
    <div
      className="py-4 space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4"
      // Delegated press haptic — every chip/button tap in this tab buzzes
      // without wiring each onClick individually.
      onPointerDown={(e) => {
        if ((e.target as HTMLElement).closest('button')) haptic.light();
      }}
    >
      {/* Client details */}
      <div className={cardCn}>
        <SectionHeader title="Client details" />
        <CertificateClientSection formData={formData} onUpdate={onUpdate} />

        {existingClients && existingClients.length > 0 && (
          <MobileSelectPicker
            value=""
            onValueChange={handleSelectExistingClient}
            options={(existingClients || []).map((c) => ({
              value: c.id,
              label: c.clientName,
              description: c.premisesAddress || c.clientAddress || '',
            }))}
            placeholder="Load previous client..."
            triggerClassName={pickerTrigger}
          />
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Client name" required>
            <Input
              value={formData.clientName || ''}
              onChange={(e) => onUpdate('clientName', e.target.value)}
              className={inputCn}
              placeholder="Full name"
            />
          </Field>
          <Field label="Telephone">
            <Input
              type="tel"
              value={formData.clientTelephone || ''}
              onChange={(e) => onUpdate('clientTelephone', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Email">
            <Input
              type="email"
              value={formData.clientEmail || ''}
              onChange={(e) => onUpdate('clientEmail', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Certificate no.">
            <Input
              value={formData.certificateNumber || ''}
              onChange={(e) => onUpdate('certificateNumber', e.target.value)}
              className={inputCn}
              placeholder="Auto if blank"
            />
          </Field>
        </div>
        <Field label="Client address">
          <Textarea
            value={formData.clientAddress || ''}
            onChange={(e) => onUpdate('clientAddress', e.target.value)}
            className={textareaCn}
            placeholder="Full address"
          />
        </Field>
      </div>

      {/* Premises */}
      <div className={cardCn}>
        <SectionHeader title="Premises details" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Premises name">
            <Input
              value={formData.premisesName || ''}
              onChange={(e) => onUpdate('premisesName', e.target.value)}
              className={inputCn}
              placeholder="Building name"
            />
          </Field>
          <div className="flex items-end">
            {formData.clientAddress && (
              <button
                type="button"
                onClick={copyClientAddress}
                className="h-11 w-full rounded-xl bg-white/[0.06] border border-white/[0.12] text-sm font-medium text-white touch-manipulation active:scale-[0.98]"
              >
                Same as client address
              </button>
            )}
          </div>
        </div>
        <Field label="Premises address" required>
          <Textarea
            value={formData.premisesAddress || ''}
            // No sameAsClientAddress flag to clear here — unlike the EV
            // charging tab's checkbox, "Same as client address" on this form is
            // a one-shot copy button. A stray setSameAsClientAddress(false)
            // survived the copy-paste and threw ReferenceError on every
            // keystroke in this field (JAVASCRIPT-REACT-E5 / E1).
            onChange={(e) => onUpdate('premisesAddress', e.target.value)}
            className={textareaCn}
            placeholder="Full installation address"
          />
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Premises type">
            <MobileSelectPicker
              value={formData.premisesType || ''}
              onValueChange={(v) => onUpdate('premisesType', v)}
              options={[
                { value: 'office', label: 'Office' },
                { value: 'retail', label: 'Retail' },
                { value: 'industrial', label: 'Industrial' },
                { value: 'educational', label: 'Educational' },
                { value: 'healthcare', label: 'Healthcare' },
                { value: 'residential-communal', label: 'Residential communal' },
                { value: 'hotel', label: 'Hotel / hospitality' },
                { value: 'entertainment', label: 'Entertainment' },
                { value: 'warehouse', label: 'Warehouse' },
              ]}
              placeholder="Select..."
              triggerClassName={pickerTrigger}
            />
          </Field>
          <Field label="Occupancy risk">
            <MobileSelectPicker
              value={formData.occupancyType || ''}
              onValueChange={(v) => onUpdate('occupancyType', v)}
              options={[
                { value: 'sleeping', label: 'Sleeping risk' },
                { value: 'high', label: 'High risk' },
                { value: 'normal', label: 'Normal risk' },
                { value: 'low', label: 'Low risk' },
              ]}
              placeholder="Select..."
              triggerClassName={pickerTrigger}
            />
          </Field>
        </div>
        <Field label="Extent of installation covered">
          <Textarea
            value={formData.extentOfInstallation || ''}
            onChange={(e) => onUpdate('extentOfInstallation', e.target.value)}
            className={textareaCn}
            placeholder="e.g. All emergency lighting throughout ground and first floors"
          />
        </Field>
      </div>

      {/* System Classification */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="System classification (BS 5266)" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Certificate type">
            <MobileSelectPicker
              value={formData.certificateType || ''}
              onValueChange={(v) => onUpdate('certificateType', v)}
              options={[
                { value: 'completion', label: 'Completion' },
                { value: 'periodic', label: 'Periodic inspection' },
                { value: 'existing-site', label: 'Existing Site' },
                { value: 'completion-small', label: 'Completion (Small)' },
              ]}
              placeholder="Select..."
              triggerClassName={pickerTrigger}
            />
          </Field>
          <Field label="Test type">
            <MobileSelectPicker
              value={formData.testType || ''}
              onValueChange={(v) => onUpdate('testType', v)}
              options={[
                { value: 'commissioning', label: 'Commissioning' },
                { value: 'monthly', label: 'Monthly functional' },
                { value: 'annual', label: 'Annual duration' },
              ]}
              placeholder="Select..."
              triggerClassName={pickerTrigger}
            />
          </Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Test date" required>
            <Input
              type="date"
              value={formData.testDate || ''}
              onChange={(e) => onUpdate('testDate', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="System type" required>
            <MobileSelectPicker
              value={formData.systemType || ''}
              onValueChange={(v) => onUpdate('systemType', v)}
              options={[
                { value: 'maintained', label: 'Maintained' },
                { value: 'non-maintained', label: 'Non-maintained' },
                { value: 'combined', label: 'Combined (Sustained)' },
              ]}
              placeholder="Select..."
              triggerClassName={pickerTrigger}
            />
          </Field>
        </div>

        <Sub title="Rated duration" />
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <MobileSelectPicker
              value={formData.ratedDuration?.toString() || '180'}
              onValueChange={(v) => onUpdate('ratedDuration', parseInt(v))}
              options={[
                { value: '60', label: '1 hour (60 min)' },
                { value: '180', label: '3 hours (180 min)' },
              ]}
              placeholder="Select..."
              triggerClassName={pickerTrigger}
            />
          </div>
          {durationGuidance && (
            <DurationBadge
              duration={durationGuidance.duration}
              required={durationGuidance.duration === 180}
            />
          )}
        </div>
        {durationGuidance && (
          <div className="rounded-xl bg-white/[0.05] p-3.5">
            <p className="text-[12px] font-semibold text-white">{durationGuidance.title}</p>
            <p className="text-xs text-white/80 mt-1">{durationGuidance.content}</p>
            <p className="text-[11px] text-white/80 mt-1">{durationGuidance.reference}</p>
          </div>
        )}

        <Sub title="Power source" />
        <div className="space-y-3">
          <Toggle
            label="Self-contained luminaires"
            field="selfContainedUnits"
            value={formData.selfContainedUnits !== false}
            onUpdate={onUpdate}
          />
          <Toggle
            label="Central battery system"
            field="centralBatterySystem"
            value={formData.centralBatterySystem || false}
            onUpdate={onUpdate}
          />
          {formData.centralBatterySystem && (
            <div className="ml-4">
              <Field label="Central battery location">
                <Input
                  value={formData.centralBatteryLocation || ''}
                  onChange={(e) => onUpdate('centralBatteryLocation', e.target.value)}
                  className={inputCn}
                  placeholder="e.g. Electrical plant room"
                />
              </Field>
            </div>
          )}
        </div>

        <Sub title="Compliance references" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Design standard">
            <MobileSelectPicker
              value={formData.designStandard || EL_CURRENT_DESIGN_STANDARD}
              onValueChange={(v) => onUpdate('designStandard', v)}
              options={EL_DESIGN_STANDARD_OPTIONS}
              placeholder="Select..."
              triggerClassName={pickerTrigger}
            />
          </Field>
          <Field label="Previous cert no.">
            <Input
              value={formData.previousCertificateNumber || ''}
              onChange={(e) => onUpdate('previousCertificateNumber', e.target.value)}
              className={inputCn}
              placeholder="For periodic"
            />
          </Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Risk assessment ref">
            <Input
              value={formData.riskAssessmentReference || ''}
              onChange={(e) => onUpdate('riskAssessmentReference', e.target.value)}
              className={inputCn}
              placeholder="RA reference"
            />
          </Field>
          <Field label="Drawing ref">
            <Input
              value={formData.drawingReference || ''}
              onChange={(e) => onUpdate('drawingReference', e.target.value)}
              className={inputCn}
              placeholder="As-installed"
            />
          </Field>
        </div>
        <Field label="Wiring system">
          <MobileSelectPicker
            value={formData.wiringSystem || ''}
            onValueChange={(v) => onUpdate('wiringSystem', v)}
            options={[
              { value: 'Fire-resistant cable', label: 'Fire-resistant cable (BS 7629/8519)' },
              { value: 'Segregated circuit', label: 'Segregated circuit' },
              { value: 'Standard wiring', label: 'Standard wiring (self-contained only)' },
              { value: 'other', label: 'Other' },
            ]}
            placeholder="Select..."
            triggerClassName={pickerTrigger}
          />
        </Field>
        <Toggle
          label="Automatic test system (BS EN 62034)"
          field="automaticTestSystem"
          value={formData.automaticTestSystem || false}
          onUpdate={onUpdate}
        />
        {formData.automaticTestSystem && (
          <div className="ml-4">
            <Field label="ATS details">
              <Input
                value={formData.atsDetails || ''}
                onChange={(e) => onUpdate('atsDetails', e.target.value)}
                className={inputCn}
                placeholder="Make, model, type"
              />
            </Field>
          </div>
        )}
      </div>

      {/* Purpose of System */}
      <div className={cardCn}>
        <SectionHeader title="Purpose of system (BS 5266)" />
        <div className="space-y-3">
          <Toggle
            label="Escape route lighting"
            field="purposeEscapeRoute"
            value={formData.purposeEscapeRoute || false}
            onUpdate={onUpdate}
          />
          <Toggle
            label="Open area (anti-panic)"
            field="purposeOpenArea"
            value={formData.purposeOpenArea || false}
            onUpdate={onUpdate}
          />
          <Toggle
            label="High risk task area"
            field="purposeHighRisk"
            value={formData.purposeHighRisk || false}
            onUpdate={onUpdate}
          />
          <Toggle
            label="Standby lighting"
            field="purposeStandby"
            value={formData.purposeStandby || false}
            onUpdate={onUpdate}
          />
        </div>
      </div>

      {/* Equipment Summary */}
      <div className={cardCn}>
        <SectionHeader title="Equipment summary" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Luminaire count">
            <Input
              type="number"
              min="0"
              value={formData.luminaireCount ?? ''}
              onChange={(e) =>
                onUpdate(
                  'luminaireCount',
                  e.target.value === '' ? '' : parseInt(e.target.value) || 0
                )
              }
              className={inputCn}
            />
          </Field>
          <Field label="Exit sign count">
            <Input
              type="number"
              min="0"
              value={formData.exitSignCount ?? ''}
              onChange={(e) =>
                onUpdate(
                  'exitSignCount',
                  e.target.value === '' ? '' : parseInt(e.target.value) || 0
                )
              }
              className={inputCn}
            />
          </Field>
        </div>
        {formData.centralBatterySystem && (
          <Field label="Central battery units">
            <Input
              type="number"
              min="0"
              value={formData.centralBatteryCount ?? ''}
              onChange={(e) =>
                onUpdate(
                  'centralBatteryCount',
                  e.target.value === '' ? '' : parseInt(e.target.value) || 0
                )
              }
              className={inputCn}
            />
          </Field>
        )}
        <div className="rounded-xl bg-white/[0.05] p-4 text-center">
          <p className="text-2xl font-bold text-elec-yellow">
            {(formData.luminaireCount || 0) + (formData.exitSignCount || 0)}
          </p>
          <p className="text-xs text-white/80 mt-1">
            {formData.luminaireCount || 0} luminaires + {formData.exitSignCount || 0} exit signs
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmergencyLightingInstallationDetails;
