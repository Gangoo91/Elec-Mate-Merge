import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import SignatureInput from '@/components/signature/SignatureInput';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { QUALIFICATION_LEVELS, SCHEME_PROVIDERS } from '@/constants/minorWorksOptions';
import { useMinorWorksSmartForm } from '@/hooks/useMinorWorksSmartForm';
import { useToast } from '@/hooks/use-toast';
import { useHaptic } from '@/hooks/useHaptic';

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

const inputClass = 'h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]';

interface MWDeclarationTabProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
  isMobile?: boolean;
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
    hasSavedElectricianDetails,
    loadElectricianDetails,
  } = useMinorWorksSmartForm();

  const handleUseMyProfile = () => {
    const details = loadElectricianDetails();
    if (!details) {
      toast({ title: 'No Profile Found', description: 'Set up your details in Business Settings.', variant: 'destructive' });
      return;
    }
    haptic.success();
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

  return (
    <div className="space-y-6">
      {/* Load from Business Settings */}
      <button
        type="button"
        onClick={handleUseMyProfile}
        disabled={smartFormLoading}
        className="w-full h-10 rounded-lg font-semibold text-xs bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow touch-manipulation active:scale-[0.98]"
      >
        Load from Business Settings
      </button>

      {/* Electrician Details */}
      <div className="space-y-3">
        <SectionTitle title="Electrician Details" />

        <div className="grid grid-cols-2 gap-2 items-end">
          <FormField label="Name" required>
            <Input
              value={formData.electricianName || ''}
              onChange={(e) => onUpdate('electricianName', e.target.value)}
              placeholder="Full name"
              className={inputClass}
            />
          </FormField>
          <FormField label="Company">
            <Input
              value={formData.forAndOnBehalfOf || ''}
              onChange={(e) => onUpdate('forAndOnBehalfOf', e.target.value)}
              placeholder="Company"
              className={inputClass}
            />
          </FormField>
        </div>

        {/* Position presets */}
        <FormField label="Position" required>
          <div className="grid grid-cols-3 gap-1">
            {POSITION_PRESETS.map((pos) => (
              <button
                key={pos}
                type="button"
                onClick={() => { haptic.light(); onUpdate('position', pos); }}
                className={cn(
                  'h-8 rounded-md font-medium text-[9px] touch-manipulation transition-all active:scale-[0.98]',
                  formData.position === pos
                    ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                    : 'bg-white/[0.05] border border-white/[0.08] text-white'
                )}
              >
                {pos}
              </button>
            ))}
          </div>
        </FormField>

        <div className="grid grid-cols-3 gap-2 items-end">
          <FormField label="Qualification">
            <MobileSelectPicker
              value={formData.qualificationLevel || ''}
              onValueChange={(v) => onUpdate('qualificationLevel', v)}
              options={QUALIFICATION_LEVELS.map((o) => ({ value: o.value, label: o.label }))}
              placeholder="Level"
              title="Qualification Level"
            />
          </FormField>
          <FormField label="Scheme">
            <MobileSelectPicker
              value={formData.schemeProvider || ''}
              onValueChange={(v) => onUpdate('schemeProvider', v)}
              options={SCHEME_PROVIDERS.map((o) => ({ value: o.value, label: o.label }))}
              placeholder="Provider"
              title="Scheme Provider"
            />
          </FormField>
          <FormField label="Reg No.">
            <Input
              value={formData.registrationNumber || ''}
              onChange={(e) => onUpdate('registrationNumber', e.target.value)}
              placeholder="Number"
              className={inputClass}
            />
          </FormField>
        </div>

        <FormField label="Business Address">
          <Input
            value={formData.contractorAddress || ''}
            onChange={(e) => onUpdate('contractorAddress', e.target.value)}
            placeholder="Full business address including postcode"
            className={inputClass}
          />
        </FormField>

        <div className="grid grid-cols-2 gap-2 items-end">
          <FormField label="Tel">
            <Input
              type="tel"
              value={formData.electricianPhone || ''}
              onChange={(e) => onUpdate('electricianPhone', e.target.value)}
              placeholder="Phone"
              className={inputClass}
            />
          </FormField>
          <FormField label="Email">
            <Input
              type="email"
              value={formData.electricianEmail || ''}
              onChange={(e) => onUpdate('electricianEmail', e.target.value)}
              placeholder="Email"
              className={inputClass}
            />
          </FormField>
        </div>
      </div>

      {/* Compliance */}
      <div className="space-y-3">
        <SectionTitle title="Compliance" />

        <p className="text-[10px] text-white leading-relaxed">
          I CERTIFY that the work covered by this certificate does not impair the safety of the existing
          installation and has been designed, constructed, inspected and tested in accordance with
          BS 7671:2018+A3:2024.
        </p>

        <div className="grid grid-cols-3 gap-1">
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
                'h-10 rounded-lg font-semibold transition-all touch-manipulation text-[10px] active:scale-[0.98] flex items-center justify-center gap-1',
                formData[field]
                  ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                  : 'bg-white/[0.05] border border-white/[0.08] text-white'
              )}
            >
              {formData[field] && <Check className="h-3 w-3" />}
              {label}
            </button>
          ))}
        </div>

        <FormField label="Additional Notes">
          <Input
            value={formData.additionalNotes || ''}
            onChange={(e) => onUpdate('additionalNotes', e.target.value)}
            placeholder="Notes, comments or recommendations..."
            className={inputClass}
          />
        </FormField>
      </div>

      {/* Signature */}
      <div className="space-y-3">
        <SectionTitle title="Signature" />

        <FormField label="Date" required>
          <Input
            type="date"
            value={formData.signatureDate || ''}
            onChange={(e) => onUpdate('signatureDate', e.target.value)}
            className={cn(inputClass, 'text-xs')}
            style={{ fontSize: '12px' }}
          />
        </FormField>

        <SignatureInput
          value={formData.signature || ''}
          onChange={(v) => onUpdate('signature', v)}
          placeholder="Sign here"
        />
      </div>
    </div>
  );
};

export default MWDeclarationTab;
