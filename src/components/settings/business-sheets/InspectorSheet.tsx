import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormSheet from '@/components/forms/FormSheet';
import { PrimaryButton, SecondaryButton } from '@/components/employer/editorial';
import { useEmployerRole } from '@/hooks/useEmployerRole';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import SignatureInput from '@/components/signature/SignatureInput';
import { SchemeLogoPicker } from '@/components/settings/settings/SchemeLogoPicker';
import { CompanyProfile } from '@/types/company';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { INSPECTOR_QUALIFICATIONS } from '@/constants/inspectorQualifications';
import { useFirmCredentials } from '@/hooks/useFirmCredentials';
import {
  chipBase,
  chipOff,
  chipOn,
  inputCn,
  labelCn,
  selectTriggerCn,
} from '@/components/settings/formStyles';

// Single source of truth — shared with EICR Inspector Details + EIC Declarations
const AVAILABLE_QUALIFICATIONS = INSPECTOR_QUALIFICATIONS;

const INSURANCE_PROVIDERS = [
  'Zurich',
  'Hiscox',
  'AXA',
  'Aviva',
  'Allianz',
  'Markel',
  'NFU Mutual',
  'QBE',
  'Tradesman Saver',
  'Simply Business',
  'PolicyBee',
  'Kingsbridge',
  'Other',
];

/** An empty picker reads as a placeholder, not a bold value (the trigger's
 *  label is a span on both the phone and desktop pickers). */
const placeholderCn =
  'font-normal [color:rgba(255,255,255,0.4)] [&>span]:font-normal [&>span]:text-white/40';

const INSURANCE_COVERAGE_OPTIONS = ['£1,000,000', '£2,000,000', '£5,000,000', '£10,000,000'];

const INSURANCE_PROVIDER_PICKER_OPTIONS = INSURANCE_PROVIDERS.map((p) => ({ value: p, label: p }));
const INSURANCE_COVERAGE_PICKER_OPTIONS = INSURANCE_COVERAGE_OPTIONS.map((c) => ({
  value: c,
  label: c,
}));

interface InspectorSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: CompanyProfile | null;
  onSave: (data: Record<string, unknown>) => Promise<boolean>;
}

const InspectorSheet = ({ open, onOpenChange, profile, onSave }: InspectorSheetProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const [inspectorName, setInspectorName] = useState('');
  const [registrationScheme, setRegistrationScheme] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [registrationExpiry, setRegistrationExpiry] = useState('');
  const [schemeLogoDataUrl, setSchemeLogoDataUrl] = useState<string | null>(null);
  const [qualifications, setQualifications] = useState<string[]>([]);
  const [insuranceProvider, setInsuranceProvider] = useState('');
  const [insurancePolicyNumber, setInsurancePolicyNumber] = useState('');
  const [insuranceCoverage, setInsuranceCoverage] = useState('');
  const [insuranceExpiry, setInsuranceExpiry] = useState('');
  const [signatureData, setSignatureData] = useState('');
  const navigate = useNavigate();
  // The compliance register is in the Employer Hub; link it for firms only.
  const { data: employerRole } = useEmployerRole();
  const hasEmployerHub = !!employerRole?.role;

  // Gap #10: this is the one public liability record. The Compliance
  // register shows and edits these same fields and holds the certificate.
  const { data: creds } = useFirmCredentials({ firmId: profile?.user_id, enabled: open });
  const plCertificate = !!creds?.some(
    (c) => c.source === 'settings' && c.area === 'insurance' && c.has_file
  );
  // A value saved from Compliance may not be one of the preset options.
  const providerOptions = useMemo(
    () =>
      insuranceProvider && !INSURANCE_PROVIDERS.includes(insuranceProvider)
        ? [
            { value: insuranceProvider, label: insuranceProvider },
            ...INSURANCE_PROVIDER_PICKER_OPTIONS,
          ]
        : INSURANCE_PROVIDER_PICKER_OPTIONS,
    [insuranceProvider]
  );
  const coverageOptions = useMemo(
    () =>
      insuranceCoverage && !INSURANCE_COVERAGE_OPTIONS.includes(insuranceCoverage)
        ? [
            { value: insuranceCoverage, label: insuranceCoverage },
            ...INSURANCE_COVERAGE_PICKER_OPTIONS,
          ]
        : INSURANCE_COVERAGE_PICKER_OPTIONS,
    [insuranceCoverage]
  );

  // Hydrate ONCE per open transition (see CompanySheet for rationale).
  const hydratedForOpenRef = useRef(false);
  useEffect(() => {
    if (!open) {
      hydratedForOpenRef.current = false;
      return;
    }
    if (hydratedForOpenRef.current) return;
    if (!profile) return;
    setInspectorName(profile.inspector_name || '');
    setRegistrationScheme(profile.registration_scheme || '');
    setRegistrationNumber(profile.registration_number || '');
    setRegistrationExpiry(profile.registration_expiry || '');
    setSchemeLogoDataUrl(profile.scheme_logo_data_url || null);
    setQualifications(profile.inspector_qualifications || []);
    setInsuranceProvider(profile.insurance_provider || '');
    setInsurancePolicyNumber(profile.insurance_policy_number || '');
    setInsuranceCoverage(profile.insurance_coverage || '');
    setInsuranceExpiry(profile.insurance_expiry || '');
    setSignatureData(profile.signature_data || '');
    hydratedForOpenRef.current = true;
  }, [profile, open]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const success = await onSave({
        inspector_name: inspectorName || null,
        inspector_qualifications: qualifications.length > 0 ? qualifications : null,
        registration_scheme: registrationScheme || null,
        registration_number: registrationNumber || null,
        registration_expiry: registrationExpiry || null,
        registration_scheme_logo: schemeLogoDataUrl || null,
        scheme_logo_data_url: schemeLogoDataUrl || null,
        insurance_provider: insuranceProvider || null,
        insurance_policy_number: insurancePolicyNumber || null,
        insurance_coverage: insuranceCoverage || null,
        insurance_expiry: insuranceExpiry || null,
        signature_data: signatureData || null,
      });
      if (success) {
        toast.success('Inspector details saved');
        onOpenChange(false);
      }
    } catch {
      toast.error('Failed to save');
    } finally {
      setIsSaving(false);
    }
  };

  const heading = 'text-[15px] font-semibold tracking-tight text-white';
  const openRegister = () => {
    onOpenChange(false);
    navigate('/employer?section=compliance');
  };

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="Credentials"
      title="Inspector details"
      description="Your name, scheme, qualifications, insurance and signature. Certificates print them."
      bodyClassName="grid gap-8 lg:grid-cols-2 lg:gap-10 lg:items-start"
      footer={
        <div className="flex items-center justify-end gap-2">
          <SecondaryButton
            onClick={() => onOpenChange(false)}
            className="h-12 flex-1 px-5 sm:flex-none"
          >
            Cancel
          </SecondaryButton>
          <PrimaryButton
            onClick={handleSave}
            disabled={isSaving}
            className="h-12 flex-[2] px-6 sm:flex-none"
          >
            {isSaving ? 'Saving' : 'Save'}
          </PrimaryButton>
        </div>
      }
    >
      <div className="min-w-0 space-y-6">
        {/* Inspector name */}
        <div className="space-y-1.5">
          <Label className={labelCn}>Inspector name</Label>
          <Input
            value={inspectorName}
            onChange={(e) => setInspectorName(e.target.value)}
            placeholder="Full name"
            className={inputCn}
          />
        </div>

        <div className="h-px bg-white/[0.06]" />

        {/* Registration scheme */}
        <SchemeLogoPicker
          scheme={registrationScheme}
          registrationNumber={registrationNumber}
          registrationExpiry={registrationExpiry}
          onSchemeChange={setRegistrationScheme}
          onNumberChange={setRegistrationNumber}
          onExpiryChange={setRegistrationExpiry}
          onLogoDataUrlChange={setSchemeLogoDataUrl}
        />

        <div className="h-px bg-white/[0.06]" />

        {/* Qualifications */}
        <div className="space-y-3">
          <h3 className={heading}>Qualifications</h3>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_QUALIFICATIONS.map((qual) => {
              const isSelected = qualifications.includes(qual);
              return (
                <button
                  key={qual}
                  type="button"
                  onClick={() => {
                    setQualifications((prev) =>
                      isSelected ? prev.filter((q) => q !== qual) : [...prev, qual]
                    );
                  }}
                  className={cn(
                    chipBase,
                    'h-auto min-h-11 max-w-full flex-none px-3 py-2 text-left',
                    isSelected ? chipOn : chipOff
                  )}
                  aria-pressed={isSelected}
                >
                  {isSelected && <span className="mr-1.5 font-semibold">✓</span>}
                  {qual}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Desktop: insurance and signature stay in view beside the long qualifications list. */}
      <div className="min-w-0 space-y-6 lg:sticky lg:top-0">
        {/* Insurance */}
        <div className="space-y-3">
          <h3 className={heading}>Public liability insurance</h3>
          <p className="text-[13px] leading-snug text-white">
            Your certificates and quotes print it, and the compliance register shows the same
            record.
            {plCertificate ? ' The certificate is attached there.' : ''}
          </p>
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className={labelCn}>Provider</Label>
              <MobileSelectPicker
                value={insuranceProvider}
                onValueChange={setInsuranceProvider}
                options={providerOptions}
                placeholder="Choose your insurer"
                title="Insurer"
                triggerClassName={cn(selectTriggerCn, !insuranceProvider && placeholderCn)}
              />
            </div>
            <div className="space-y-1.5">
              <Label className={labelCn}>Cover</Label>
              <MobileSelectPicker
                value={insuranceCoverage}
                onValueChange={setInsuranceCoverage}
                options={coverageOptions}
                placeholder="Choose the cover"
                title="Cover"
                triggerClassName={cn(selectTriggerCn, !insuranceCoverage && placeholderCn)}
              />
            </div>
            <div className="space-y-1.5">
              <Label className={labelCn}>Policy number</Label>
              <Input
                value={insurancePolicyNumber}
                onChange={(e) => setInsurancePolicyNumber(e.target.value)}
                placeholder="Policy number"
                className={inputCn}
              />
            </div>
            <div className="space-y-1.5">
              <Label className={labelCn}>Expiry</Label>
              <Input
                type="date"
                value={insuranceExpiry}
                onChange={(e) => setInsuranceExpiry(e.target.value)}
                className={inputCn}
              />
            </div>
          </div>
          {hasEmployerHub && (
            <button
              type="button"
              onClick={openRegister}
              className="inline-flex h-11 items-center text-[13.5px] font-semibold text-elec-yellow touch-manipulation"
            >
              Open the compliance register
            </button>
          )}
        </div>

        <div className="h-px bg-white/[0.06]" />

        {/* Signature */}
        <div className="space-y-3">
          <h3 className={heading}>Signature</h3>
          <SignatureInput
            value={signatureData}
            onChange={(signature) => setSignatureData(signature || '')}
          />
        </div>
      </div>
    </FormSheet>
  );
};

export default InspectorSheet;
