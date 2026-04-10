import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { cn } from '@/lib/utils';
import { useEmergencyLightingSmartForm } from '@/hooks/inspection/useEmergencyLightingSmartForm';
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

const inputCn =
  'h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white [color-scheme:dark]';
const textareaCn =
  'touch-manipulation text-base min-h-[80px] bg-white/[0.06] border-white/[0.08] text-white';
const pickerTrigger =
  'h-11 w-full touch-manipulation bg-white/[0.06] border-white/[0.08] text-white';

const SectionHeader = ({ title }: { title: string }) => (
  <div className="border-b border-white/[0.06] pb-1 mb-3">
    <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
    <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
  </div>
);

const Sub = ({ title }: { title: string }) => (
  <div className="flex items-center gap-2 pt-2">
    <p className="text-[10px] font-semibold text-white uppercase tracking-wider shrink-0">
      {title}
    </p>
    <div className="h-px flex-1 bg-white/[0.06]" />
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
    <Label className="text-white text-xs mb-1.5 block">
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
  <div className="flex items-center justify-between">
    <Label className="text-white text-xs font-medium">{label}</Label>
    <div className="flex gap-1.5">
      {[true, false].map((v) => (
        <button
          key={String(v)}
          type="button"
          onClick={() => onUpdate(field, v)}
          className={cn(
            'w-14 h-8 rounded-lg text-[11px] font-semibold touch-manipulation transition-all',
            value === v
              ? v
                ? 'bg-green-500 text-white'
                : 'bg-white/20 text-white'
              : 'bg-white/[0.06] text-white border border-white/[0.08]'
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
  const [sameAsClientAddress, setSameAsClientAddress] = useState(false);

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

  useEffect(() => {
    if (durationGuidance && durationGuidance.duration === 180 && formData.ratedDuration === 60) {
      onUpdate('ratedDuration', 180);
    }
  }, [formData.premisesType, durationGuidance]);

  const copyClientAddress = () => {
    if (formData.clientAddress) {
      onUpdate('premisesAddress', formData.clientAddress);
      setSameAsClientAddress(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Client Details */}
      <div className="space-y-4">
        <SectionHeader title="Client Details" />
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

        <div className="grid grid-cols-2 gap-3">
          <Field label="Client Name" required>
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
        <div className="grid grid-cols-2 gap-3">
          <Field label="Email">
            <Input
              type="email"
              value={formData.clientEmail || ''}
              onChange={(e) => onUpdate('clientEmail', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Certificate No.">
            <Input
              value={formData.certificateNumber || ''}
              onChange={(e) => onUpdate('certificateNumber', e.target.value)}
              className={inputCn}
              placeholder="Auto if blank"
            />
          </Field>
        </div>
        <Field label="Client Address">
          <Textarea
            value={formData.clientAddress || ''}
            onChange={(e) => onUpdate('clientAddress', e.target.value)}
            className={textareaCn}
            placeholder="Full address"
          />
        </Field>
      </div>

      {/* Premises */}
      <div className="space-y-4">
        <SectionHeader title="Premises Details" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Premises Name">
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
                className="h-11 w-full rounded-lg bg-white/[0.04] border border-white/[0.08] text-[11px] text-white touch-manipulation active:scale-[0.98]"
              >
                Same as client address
              </button>
            )}
          </div>
        </div>
        <Field label="Premises Address" required>
          <Textarea
            value={formData.premisesAddress || ''}
            onChange={(e) => {
              onUpdate('premisesAddress', e.target.value);
              setSameAsClientAddress(false);
            }}
            className={textareaCn}
            placeholder="Full installation address"
          />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Premises Type">
            <MobileSelectPicker
              value={formData.premisesType || ''}
              onValueChange={(v) => onUpdate('premisesType', v)}
              options={[
                { value: 'office', label: 'Office' },
                { value: 'retail', label: 'Retail' },
                { value: 'industrial', label: 'Industrial' },
                { value: 'educational', label: 'Educational' },
                { value: 'healthcare', label: 'Healthcare' },
                { value: 'residential-communal', label: 'Residential Communal' },
                { value: 'hotel', label: 'Hotel / Hospitality' },
                { value: 'entertainment', label: 'Entertainment' },
                { value: 'warehouse', label: 'Warehouse' },
              ]}
              placeholder="Select..."
              triggerClassName={pickerTrigger}
            />
          </Field>
          <Field label="Occupancy Risk">
            <MobileSelectPicker
              value={formData.occupancyType || ''}
              onValueChange={(v) => onUpdate('occupancyType', v)}
              options={[
                { value: 'sleeping', label: 'Sleeping Risk' },
                { value: 'high', label: 'High Risk' },
                { value: 'normal', label: 'Normal Risk' },
                { value: 'low', label: 'Low Risk' },
              ]}
              placeholder="Select..."
              triggerClassName={pickerTrigger}
            />
          </Field>
        </div>
        <Field label="Extent of Installation Covered">
          <Textarea
            value={formData.extentOfInstallation || ''}
            onChange={(e) => onUpdate('extentOfInstallation', e.target.value)}
            className={textareaCn}
            placeholder="e.g. All emergency lighting throughout ground and first floors"
          />
        </Field>
      </div>

      {/* System Classification */}
      <div className="space-y-4">
        <SectionHeader title="System Classification (BS 5266)" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Certificate Type">
            <MobileSelectPicker
              value={formData.certificateType || ''}
              onValueChange={(v) => onUpdate('certificateType', v)}
              options={[
                { value: 'completion', label: 'Completion' },
                { value: 'periodic', label: 'Periodic Inspection' },
                { value: 'existing-site', label: 'Existing Site' },
                { value: 'completion-small', label: 'Completion (Small)' },
              ]}
              placeholder="Select..."
              triggerClassName={pickerTrigger}
            />
          </Field>
          <Field label="Test Type">
            <MobileSelectPicker
              value={formData.testType || ''}
              onValueChange={(v) => onUpdate('testType', v)}
              options={[
                { value: 'commissioning', label: 'Commissioning' },
                { value: 'monthly', label: 'Monthly Functional' },
                { value: 'annual', label: 'Annual Duration' },
              ]}
              placeholder="Select..."
              triggerClassName={pickerTrigger}
            />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Test Date" required>
            <Input
              type="date"
              value={formData.testDate || ''}
              onChange={(e) => onUpdate('testDate', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="System Type" required>
            <MobileSelectPicker
              value={formData.systemType || ''}
              onValueChange={(v) => onUpdate('systemType', v)}
              options={[
                { value: 'maintained', label: 'Maintained' },
                { value: 'non-maintained', label: 'Non-Maintained' },
                { value: 'combined', label: 'Combined (Sustained)' },
              ]}
              placeholder="Select..."
              triggerClassName={pickerTrigger}
            />
          </Field>
        </div>

        <Sub title="Rated Duration" />
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <MobileSelectPicker
              value={formData.ratedDuration?.toString() || '180'}
              onValueChange={(v) => onUpdate('ratedDuration', parseInt(v))}
              options={[
                { value: '60', label: '1 Hour (60 min)' },
                { value: '180', label: '3 Hours (180 min)' },
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
          <div
            className={`rounded-lg p-2.5 border ${durationGuidance.duration === 180 ? 'bg-purple-500/5 border-purple-500/15' : 'bg-blue-500/5 border-blue-500/15'}`}
          >
            <p
              className={`text-[11px] font-semibold ${durationGuidance.duration === 180 ? 'text-purple-300' : 'text-blue-300'}`}
            >
              {durationGuidance.title}
            </p>
            <p className="text-[10px] text-white mt-0.5">{durationGuidance.content}</p>
            <p className="text-[9px] text-white mt-0.5">{durationGuidance.reference}</p>
          </div>
        )}

        <Sub title="Power Source" />
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
              <Field label="Central Battery Location">
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

        <Sub title="Compliance References" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Design Standard">
            <MobileSelectPicker
              value={formData.designStandard || 'BS 5266-1:2016'}
              onValueChange={(v) => onUpdate('designStandard', v)}
              options={[
                { value: 'BS 5266-1:2016', label: 'BS 5266-1:2016' },
                { value: 'BS EN 50172:2004', label: 'BS EN 50172:2004' },
                { value: 'BS 5266-1 + BS EN 50172', label: 'BS 5266-1 + BS EN 50172' },
              ]}
              placeholder="Select..."
              triggerClassName={pickerTrigger}
            />
          </Field>
          <Field label="Previous Cert No.">
            <Input
              value={formData.previousCertificateNumber || ''}
              onChange={(e) => onUpdate('previousCertificateNumber', e.target.value)}
              className={inputCn}
              placeholder="For periodic"
            />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Risk Assessment Ref">
            <Input
              value={formData.riskAssessmentReference || ''}
              onChange={(e) => onUpdate('riskAssessmentReference', e.target.value)}
              className={inputCn}
              placeholder="RA reference"
            />
          </Field>
          <Field label="Drawing Ref">
            <Input
              value={formData.drawingReference || ''}
              onChange={(e) => onUpdate('drawingReference', e.target.value)}
              className={inputCn}
              placeholder="As-installed"
            />
          </Field>
        </div>
        <Field label="Wiring System">
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
          label="Automatic Test System (BS EN 62034)"
          field="automaticTestSystem"
          value={formData.automaticTestSystem || false}
          onUpdate={onUpdate}
        />
        {formData.automaticTestSystem && (
          <div className="ml-4">
            <Field label="ATS Details">
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
      <div className="space-y-4">
        <SectionHeader title="Purpose of System (BS 5266)" />
        <div className="space-y-2">
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
      <div className="space-y-4">
        <SectionHeader title="Equipment Summary" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Luminaire Count">
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
          <Field label="Exit Sign Count">
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
          <Field label="Central Battery Units">
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
        <div className="rounded-lg bg-elec-yellow/5 border border-elec-yellow/15 p-3 text-center">
          <p className="text-2xl font-bold text-elec-yellow">
            {(formData.luminaireCount || 0) + (formData.exitSignCount || 0)}
          </p>
          <p className="text-[10px] text-white mt-0.5">
            {formData.luminaireCount || 0} luminaires + {formData.exitSignCount || 0} exit signs
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmergencyLightingInstallationDetails;
