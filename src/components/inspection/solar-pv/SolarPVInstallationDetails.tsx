/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Solar PV Installation Details Tab — Best-in-Class Mobile
 * Client details, property, MCS compliance, system overview
 */

import { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import {
  SolarPVFormData,
  WORK_TYPE_OPTIONS,
  SYSTEM_TYPE_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
  OWNERSHIP_TYPE_OPTIONS,
  CONSUMER_CODE_OPTIONS,
} from '@/types/solar-pv';
import { useSolarPVSmartForm } from '@/hooks/inspection/useSolarPVSmartForm';
import ComboboxCell from '@/components/table-cells/ComboboxCell';
import { Section, Field, inputCn, textareaCn, CheckboxCard, DesignWarningBanner } from './SolarPVSection';

interface Props {
  formData: SolarPVFormData;
  onUpdate: (field: string, value: unknown) => void;
}

const propertyAgeOptions = [
  { value: 'pre-1919', label: 'Pre-1919' },
  { value: '1919-1944', label: '1919-1944' },
  { value: '1945-1964', label: '1945-1964' },
  { value: '1965-1980', label: '1965-1980' },
  { value: '1981-2000', label: '1981-2000' },
  { value: '2001-2010', label: '2001-2010' },
  { value: '2011-present', label: '2011-Present' },
  { value: 'new-build', label: 'New Build' },
];

const roofConditionOptions = [
  { value: 'excellent', label: 'Excellent (new/recent)' },
  { value: 'good', label: 'Good (5-15 years)' },
  { value: 'fair', label: 'Fair (15-25 years)' },
  { value: 'poor', label: 'Poor (needs attention)' },
  { value: 'replaced', label: 'Recently Replaced' },
];

const SolarPVInstallationDetails: React.FC<Props> = ({ formData, onUpdate }) => {
  const { suggestDNOByPostcode, getDesignWarnings } = useSolarPVSmartForm(formData, onUpdate);

  // Auto-suggest DNO on postcode change
  useEffect(() => {
    const postcode = formData.installationSameAsClient
      ? formData.clientPostcode
      : formData.installationPostcode;
    if (postcode && !formData.gridConnection?.dnoName) {
      const dno = suggestDNOByPostcode(postcode);
      if (dno) {
        onUpdate('gridConnection', {
          ...formData.gridConnection,
          dnoName: dno.name,
          dnoRegion: dno.region,
        });
      }
    }
  }, [formData.clientPostcode, formData.installationPostcode, formData.installationSameAsClient]);

  const warnings = getDesignWarnings(formData as any);
  const isPreAsbestos =
    formData.propertyAge === 'pre-1919' ||
    formData.propertyAge === '1919-1944' ||
    formData.propertyAge === '1945-1964' ||
    formData.propertyAge === '1965-1980' ||
    formData.propertyAge === '1981-2000';

  return (
    <div className="space-y-6">
      {/* Design Warnings */}
      <DesignWarningBanner warnings={warnings} />

      {/* Certificate Details */}
      <Section title="Certificate Details" accentColor="from-amber-500/40 to-yellow-400/20">
        {/* System Type — tappable buttons */}
        <Field label="System Type *">
          <div className="grid grid-cols-3 gap-1.5">
            {SYSTEM_TYPE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onUpdate('systemType', opt.value)}
                className={cn(
                  'h-11 rounded-xl border text-xs font-semibold touch-manipulation active:scale-[0.98] transition-all flex flex-col items-center justify-center',
                  formData.systemType === opt.value
                    ? 'bg-amber-500/15 border-amber-500/30 text-amber-400'
                    : 'bg-white/[0.03] border-white/[0.06] text-white/50'
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </Field>

        {/* Work Type */}
        <Field label="Work Type *">
          <ComboboxCell
            value={formData.workType || 'new-installation'}
            onChange={(v) => onUpdate('workType', v)}
            options={WORK_TYPE_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
            placeholder="Select work type..."
            className="h-12 text-base"
            allowCustom
          />
        </Field>

        {/* Dates — side by side */}
        <div className="grid grid-cols-2 gap-2.5">
          <Field label="Installation Date *">
            <Input
              type="date"
              value={formData.installationDate || ''}
              onChange={(e) => onUpdate('installationDate', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Commissioning Date *">
            <Input
              type="date"
              value={formData.commissioningDate || ''}
              onChange={(e) => onUpdate('commissioningDate', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>

        {/* Cert number & reference — side by side */}
        <div className="grid grid-cols-2 gap-2.5">
          <Field label="Certificate Number">
            <Input
              value={formData.certificateNumber || ''}
              onChange={(e) => onUpdate('certificateNumber', e.target.value)}
              placeholder="SPV-2025-001"
              className={inputCn}
            />
          </Field>
          <Field label="Design/Quote Ref">
            <Input
              value={formData.designReference || ''}
              onChange={(e) => onUpdate('designReference', e.target.value)}
              placeholder="QT-2025-001"
              className={inputCn}
            />
          </Field>
        </div>

        {(formData.workType === 'retrofit' || formData.workType === 'extension') && (
          <Field label="Previous MCS Certificate No.">
            <Input
              value={formData.previousInstallationRef || ''}
              onChange={(e) => onUpdate('previousInstallationRef', e.target.value)}
              placeholder="Reference to existing installation"
              className={inputCn}
            />
          </Field>
        )}

        <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          <p className="text-[10px] text-white">
            <strong className="text-white">MCS:</strong> Certificate must be issued within 10 working days of commissioning.
          </p>
        </div>
      </Section>

      {/* Client Details */}
      <Section title="Client Details" accentColor="from-blue-500/40 to-cyan-400/20">
        <div className="space-y-3">
          <Field label="Client Name *">
            <Input
              value={formData.clientName || ''}
              onChange={(e) => onUpdate('clientName', e.target.value)}
              placeholder="Enter client name"
              className={inputCn}
            />
          </Field>

          <Field label="Address *">
            <Input
              value={formData.clientAddress || ''}
              onChange={(e) => onUpdate('clientAddress', e.target.value)}
              placeholder="Street address"
              className={inputCn}
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Postcode *">
              <Input
                value={formData.clientPostcode || ''}
                onChange={(e) => onUpdate('clientPostcode', e.target.value.toUpperCase())}
                placeholder="e.g., SW1A 1AA"
                className={cn(inputCn, 'uppercase')}
              />
            </Field>

            <Field label="Phone">
              <Input
                type="tel"
                value={formData.clientPhone || ''}
                onChange={(e) => onUpdate('clientPhone', e.target.value)}
                placeholder="e.g., 07123 456789"
                className={inputCn}
              />
            </Field>
          </div>

          <Field label="Email">
            <Input
              type="email"
              value={formData.clientEmail || ''}
              onChange={(e) => onUpdate('clientEmail', e.target.value)}
              placeholder="client@example.com"
              className={inputCn}
            />
          </Field>
        </div>
      </Section>

      {/* Property & Ownership */}
      <Section title="Property & Ownership" accentColor="from-green-500/40 to-emerald-400/20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <Field label="Property Type *">
            <ComboboxCell
              value={formData.propertyType || 'domestic'}
              onChange={(v) => onUpdate('propertyType', v)}
              options={PROPERTY_TYPE_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
              placeholder="Select property type..."
              className="h-12 text-base"
              allowCustom
            />
          </Field>

          <Field label="Ownership / Client Type *">
            <ComboboxCell
              value={formData.ownershipType || 'owner-occupied'}
              onChange={(v) => onUpdate('ownershipType', v)}
              options={OWNERSHIP_TYPE_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
              placeholder="Select ownership..."
              className="h-12 text-base"
              allowCustom
            />
          </Field>

          {formData.ownershipType === 'other' && (
            <div className="sm:col-span-2">
              <Field label="Specify Ownership Type">
                <Input
                  value={formData.ownershipOther || ''}
                  onChange={(e) => onUpdate('ownershipOther', e.target.value)}
                  placeholder="Describe ownership arrangement"
                  className={inputCn}
                />
              </Field>
            </div>
          )}

          <Field label="Property Age / Era">
            <ComboboxCell
              value={formData.propertyAge || ''}
              onChange={(v) => onUpdate('propertyAge', v)}
              options={propertyAgeOptions}
              placeholder="Select approximate age..."
              className="h-12 text-base"
              allowCustom
            />
          </Field>

          <Field label="Roof Condition / Age">
            <ComboboxCell
              value={formData.roofAge || ''}
              onChange={(v) => onUpdate('roofAge', v)}
              options={roofConditionOptions}
              placeholder="Select roof condition..."
              className="h-12 text-base"
              allowCustom
            />
          </Field>
        </div>
      </Section>

      {/* Site Access & Safety */}
      <Section title="Site Access & Safety" accentColor="from-orange-500/40 to-red-400/20">
        <Field label="Site Access Notes">
          <Textarea
            value={formData.siteAccessNotes || ''}
            onChange={(e) => onUpdate('siteAccessNotes', e.target.value)}
            placeholder="Parking, access restrictions, key holder details..."
            className={textareaCn}
          />
        </Field>

        <div className="space-y-2">
          <CheckboxCard
            label="Safe Isolation Verified"
            description="Confirmed safe isolation can be achieved at the property"
            checked={!!formData.safeIsolationVerified}
            onChange={(v) => onUpdate('safeIsolationVerified', v)}
            accentColor="green"
          />

          {isPreAsbestos && (
            <>
              <CheckboxCard
                label="Asbestos Survey Required"
                description="Pre-2000 property — check for asbestos in roof/soffit materials"
                checked={!!formData.asbestosCheckRequired}
                onChange={(v) => onUpdate('asbestosCheckRequired', v)}
                accentColor="red"
              />
              {formData.asbestosCheckRequired && (
                <CheckboxCard
                  label="Asbestos Check Completed — Safe to Proceed"
                  checked={!!formData.asbestosCheckCompleted}
                  onChange={(v) => onUpdate('asbestosCheckCompleted', v)}
                  accentColor="green"
                />
              )}
            </>
          )}

          <CheckboxCard
            label="Structural Assessment Required"
            description="For older roofs, flat roofs, or systems over 4kWp"
            checked={!!formData.structuralAssessmentRequired}
            onChange={(v) => onUpdate('structuralAssessmentRequired', v)}
            accentColor="amber"
          />

          {formData.structuralAssessmentRequired && (
            <CheckboxCard
              label="Structural Assessment Completed — Approved"
              checked={!!formData.structuralAssessmentCompleted}
              onChange={(v) => onUpdate('structuralAssessmentCompleted', v)}
              accentColor="green"
            />
          )}
        </div>
      </Section>

      {/* Installation Address */}
      <Section title="Installation Address" accentColor="from-cyan-500/40 to-blue-400/20">
        <CheckboxCard
          label="Same as Client Address"
          checked={!!formData.installationSameAsClient}
          onChange={(v) => {
            onUpdate('installationSameAsClient', v);
            if (v) {
              onUpdate('installationAddress', formData.clientAddress);
              onUpdate('installationPostcode', formData.clientPostcode);
            }
          }}
          accentColor="amber"
        />

        {!formData.installationSameAsClient && (
          <div className="space-y-3">
            <Field label="Installation Address *">
              <Input
                value={formData.installationAddress || ''}
                onChange={(e) => onUpdate('installationAddress', e.target.value)}
                placeholder="Street address"
                className={inputCn}
              />
            </Field>
            <Field label="Postcode *">
              <Input
                value={formData.installationPostcode || ''}
                onChange={(e) => onUpdate('installationPostcode', e.target.value.toUpperCase())}
                placeholder="e.g., SW1A 1AA"
                className={cn(inputCn, 'uppercase')}
              />
            </Field>
          </div>
        )}
      </Section>

      {/* MCS Compliance */}
      <Section title="MCS Compliance" accentColor="from-purple-500/40 to-violet-400/20">
        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          <p className="text-xs text-white">
            MCS certification is required for Smart Export Guarantee (SEG) eligibility and most grant schemes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <Field label="MCS Installer Number *">
            <Input
              value={formData.mcsDetails?.installerNumber || ''}
              onChange={(e) =>
                onUpdate('mcsDetails', { ...formData.mcsDetails, installerNumber: e.target.value })
              }
              placeholder="e.g., NAP-12345"
              className={inputCn}
            />
          </Field>

          <Field label="MCS Installation Number">
            <Input
              value={formData.mcsDetails?.installationNumber || ''}
              onChange={(e) =>
                onUpdate('mcsDetails', { ...formData.mcsDetails, installationNumber: e.target.value })
              }
              placeholder="Generated after registration"
              className={inputCn}
            />
          </Field>

          <Field label="Consumer Code">
            <ComboboxCell
              value={formData.mcsDetails?.consumerCode || ''}
              onChange={(v) =>
                onUpdate('mcsDetails', { ...formData.mcsDetails, consumerCode: v })
              }
              options={CONSUMER_CODE_OPTIONS.map((o) => ({ value: o.value, label: `${o.label} — ${o.description}` }))}
              placeholder="Select consumer code..."
              className="h-12 text-base"
              allowCustom
            />
          </Field>
        </div>
      </Section>

    </div>
  );
};

export default SolarPVInstallationDetails;
