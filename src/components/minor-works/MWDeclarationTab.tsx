/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import SignatureInput from '@/components/signature/SignatureInput';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { QUALIFICATION_LEVELS, SCHEME_PROVIDERS } from '@/constants/minorWorksOptions';
import { useMinorWorksSmartForm } from '@/hooks/useMinorWorksSmartForm';
import { useToast } from '@/hooks/use-toast';
import { useHaptic } from '@/hooks/useHaptic';

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const textareaCn =
  'textarea-soft rounded-xl border-0 bg-white/[0.05] px-3.5 py-3 text-base md:text-base text-white placeholder:text-white/25 caret-elec-yellow transition-colors focus:bg-white/[0.07] focus:ring-1 focus:ring-elec-yellow/50 focus-visible:ring-1 focus-visible:ring-elec-yellow/50 focus:outline-none focus:shadow-none min-h-[90px] touch-manipulation';

const labelCn = 'text-[12px] font-medium text-white mb-1 block';

const pickerTriggerCn =
  'rounded-none border-0 border-b border-white/[0.15] bg-transparent h-11 px-1 text-base font-medium text-white hover:border-white/[0.3] focus:border-elec-yellow focus:ring-0 focus-visible:ring-0 focus:outline-none touch-manipulation';

const SectionTitle = ({ title }: { title: string }) => (
  <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">{title}</h2>
);

const FormField = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <div>
    <Label className={labelCn}>{label}{required && ' *'}</Label>
    {children}
  </div>
);

interface MWDeclarationTabProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

const POSITION_PRESETS = [
  'Qualified Supervisor',
  'Approved Electrician',
  'Installation Electrician',
  'Electrical Engineer',
  'Site Manager',
];

const MWDeclarationTab: React.FC<MWDeclarationTabProps> = ({
  formData,
  onUpdate,
}) => {
  const { toast } = useToast();
  const haptic = useHaptic();
  const {
    loading: smartFormLoading,
    loadElectricianDetails,
    loadContractorDetails,
  } = useMinorWorksSmartForm();

  const handleUseMyProfile = () => {
    const details = loadElectricianDetails();
    if (!details) {
      toast({ title: 'No Profile Found', description: 'Set up your details in Business Settings.', variant: 'destructive' });
      return;
    }
    haptic.success();
    // Contractor/company name lives on the Details tab but comes from the same
    // Business Settings profile — fill it here too so drafts started before
    // settings were completed don't force a retype.
    const contractor = loadContractorDetails();
    if (contractor?.contractorName) onUpdate('contractorName', contractor.contractorName);
    if (details.electricianName) onUpdate('electricianName', details.electricianName);
    if (details.forAndOnBehalfOf) onUpdate('forAndOnBehalfOf', details.forAndOnBehalfOf);
    if (details.position) onUpdate('position', details.position);
    if (details.qualificationLevel) onUpdate('qualificationLevel', details.qualificationLevel);
    if (details.schemeProvider) onUpdate('schemeProvider', details.schemeProvider);
    if (details.registrationNumber) onUpdate('registrationNumber', details.registrationNumber);
    if (details.contractorAddress) onUpdate('contractorAddress', details.contractorAddress);
    if (details.electricianPhone) onUpdate('electricianPhone', details.electricianPhone);
    if (details.electricianEmail) onUpdate('electricianEmail', details.electricianEmail);
    if (details.signature) onUpdate('signature', details.signature);
    if (details.signatureDate) onUpdate('signatureDate', details.signatureDate);
    toast({ title: 'Profile Applied', description: 'Your details have been filled.' });
  };

  // If the key electrician fields are already populated (auto-loaded on mount or saved),
  // soften the button text so it's clear it's a reload rather than the only way to fill.
  const profilePopulated = !!(formData.electricianName && formData.position);

  return (
    <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
      {/* Electrician details */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionTitle title="Electrician details" />

        {/* Load from Business Settings */}
        <button
          type="button"
          onClick={handleUseMyProfile}
          disabled={smartFormLoading}
          className={cn(
            'w-full h-11 rounded-xl text-sm touch-manipulation transition-all active:scale-[0.98]',
            profilePopulated
              ? 'bg-white/[0.06] border border-white/[0.12] text-white font-medium'
              : 'bg-elec-yellow border border-elec-yellow text-black font-semibold'
          )}
        >
          {profilePopulated ? 'Reload from Business Settings' : 'Load from Business Settings'}
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <FormField label="Name" required>
            <Input
              data-field="electricianName"
              value={formData.electricianName || ''}
              onChange={(e) => onUpdate('electricianName', e.target.value)}
              placeholder="Full name"
              className={inputCn}
            />
          </FormField>
          <FormField label="Company">
            <Input
              value={formData.forAndOnBehalfOf || ''}
              onChange={(e) => onUpdate('forAndOnBehalfOf', e.target.value)}
              placeholder="Company"
              className={inputCn}
            />
          </FormField>
        </div>

        {/* Position — preset chips + free-text so any stored value (e.g. a
            profile-applied position that matches no preset) is always visible
            and editable */}
        <FormField label="Position" required>
          <div data-field="position" className="space-y-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {POSITION_PRESETS.map((pos) => (
                <button
                  key={pos}
                  type="button"
                  onClick={() => { haptic.light(); onUpdate('position', pos); }}
                  className={cn(
                    'min-h-11 rounded-xl px-2 py-1.5 text-xs transition-all touch-manipulation active:scale-[0.98]',
                    formData.position === pos
                      ? 'bg-elec-yellow border border-elec-yellow text-black font-semibold'
                      : 'bg-white/[0.06] border border-white/[0.12] text-white font-medium'
                  )}
                >
                  {pos}
                </button>
              ))}
            </div>
            <Input
              value={formData.position || ''}
              onChange={(e) => onUpdate('position', e.target.value)}
              placeholder="Or type a position"
              className={inputCn}
            />
          </div>
        </FormField>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-4">
          <FormField label="Qualification">
            <MobileSelectPicker
              value={formData.qualificationLevel || ''}
              onValueChange={(v) => onUpdate('qualificationLevel', v)}
              options={QUALIFICATION_LEVELS.map((o) => ({ value: o.value, label: o.label }))}
              placeholder="Level"
              title="Qualification Level"
              triggerClassName={pickerTriggerCn}
            />
          </FormField>
          <FormField label="Scheme">
            <MobileSelectPicker
              value={formData.schemeProvider || ''}
              onValueChange={(v) => onUpdate('schemeProvider', v)}
              options={SCHEME_PROVIDERS.map((o) => ({ value: o.value, label: o.label }))}
              placeholder="Provider"
              title="Scheme Provider"
              triggerClassName={pickerTriggerCn}
            />
          </FormField>
          <FormField label="Reg no.">
            <Input
              value={formData.registrationNumber || ''}
              onChange={(e) => onUpdate('registrationNumber', e.target.value)}
              placeholder="Number"
              className={inputCn}
            />
          </FormField>
        </div>

        <FormField label="Business address">
          <Input
            value={formData.contractorAddress || ''}
            onChange={(e) => onUpdate('contractorAddress', e.target.value)}
            placeholder="Full business address including postcode"
            className={inputCn}
          />
        </FormField>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <FormField label="Telephone">
            <Input
              type="tel"
              value={formData.electricianPhone || ''}
              onChange={(e) => onUpdate('electricianPhone', e.target.value)}
              placeholder="Phone"
              className={inputCn}
            />
          </FormField>
          <FormField label="Email">
            <Input
              type="email"
              value={formData.electricianEmail || ''}
              onChange={(e) => onUpdate('electricianEmail', e.target.value)}
              placeholder="Email"
              className={inputCn}
            />
          </FormField>
        </div>
      </div>

      {/* Compliance */}
      <div className={cardCn}>
        <SectionTitle title="Compliance" />

        <p className="text-[13px] leading-relaxed text-white">
          I CERTIFY that the work covered by this certificate does not impair the safety of the existing
          installation and has been designed, constructed, inspected and tested in accordance with
          BS 7671:2018+A4:2026.
        </p>

        <div className="grid grid-cols-3 gap-2">
          {[
            { field: 'ietDeclaration', label: 'BS 7671 *' },
            { field: 'partPNotification', label: 'Part P' },
            { field: 'copyProvided', label: 'Copy Given' },
          ].map(({ field, label }) => (
            <button
              key={field}
              type="button"
              onClick={() => { haptic.light(); onUpdate(field, !formData[field]); }}
              className={cn(
                'min-h-11 rounded-xl px-2 py-1.5 text-xs transition-all touch-manipulation active:scale-[0.98]',
                formData[field]
                  ? 'bg-elec-yellow border border-elec-yellow text-black font-semibold'
                  : 'bg-white/[0.06] border border-white/[0.12] text-white font-medium'
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <FormField label="Additional notes">
          <Textarea
            value={formData.additionalNotes || ''}
            onChange={(e) => onUpdate('additionalNotes', e.target.value)}
            placeholder="Notes, comments or recommendations..."
            className={cn(textareaCn, 'resize-none')}
            rows={3}
          />
        </FormField>
      </div>

      {/* Signature */}
      <div className={cardCn}>
        <SectionTitle title="Signature" />

        <FormField label="Date" required>
          <Input
            data-field="signatureDate"
            type="date"
            value={formData.signatureDate || ''}
            onChange={(e) => onUpdate('signatureDate', e.target.value)}
            className={inputCn}
          />
        </FormField>

        <div data-field="signature">
          <SignatureInput
            value={formData.signature || ''}
            onChange={(v) => onUpdate('signature', v)}
            placeholder="Sign here"
          />
        </div>
      </div>
    </div>
  );
};

export default MWDeclarationTab;
