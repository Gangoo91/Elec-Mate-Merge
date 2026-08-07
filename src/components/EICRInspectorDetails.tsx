import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { useInspectorProfiles, InspectorProfile } from '@/hooks/useInspectorProfiles';
import InspectorProfileDialog from './InspectorProfileDialog';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import SignatureInput from '@/components/signature/SignatureInput';
import { INSPECTOR_QUALIFICATIONS } from '@/constants/inspectorQualifications';
import { joinQualifications, parseQualifications } from '@/utils/inspectorQualifications';
import { useEICRForm } from './eicr/EICRFormProvider';

interface EICRInspectorDetailsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: any;
  onUpdate: (field: string, value: string) => void;
}

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const textareaCn =
  'textarea-soft rounded-xl border-0 bg-white/[0.05] px-3.5 py-3 text-base md:text-base text-white placeholder:text-white/25 caret-elec-yellow transition-colors focus:bg-white/[0.07] focus:ring-1 focus:ring-elec-yellow/50 focus-visible:ring-1 focus-visible:ring-elec-yellow/50 focus:outline-none focus:shadow-none min-h-[80px] touch-manipulation';

const labelCn = 'text-[12px] font-medium text-white mb-1 block';

/**
 * Registration and insurance expiry both print on the certificate, and both
 * accepted a long-lapsed date in silence — an inspector with cover that ran out
 * years ago could issue a certificate showing exactly that, unchallenged.
 *
 * A warning rather than a block: the date may be lapsed because renewal is in
 * progress, and refusing to issue a certificate over it would be the app
 * overreaching. Saying so plainly is enough.
 *
 * Compared date-only, so a certificate issued on the expiry date itself is not
 * flagged — cover runs to the end of that day.
 */
const hasExpired = (value?: string): boolean => {
  if (!value) return false;
  const expiry = new Date(`${value}T23:59:59`);
  if (Number.isNaN(expiry.getTime())) return false;
  return expiry.getTime() < Date.now();
};

const formatExpiry = (value?: string): string => {
  if (!value) return '';
  const d = new Date(`${value}T00:00:00`);
  return Number.isNaN(d.getTime())
    ? value
    : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

const chipOn = 'bg-elec-yellow border border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border border-white/[0.12] text-white font-medium';

const pickerTriggerCn =
  'rounded-none border-0 border-b border-white/[0.15] bg-transparent h-11 px-1 text-base font-medium text-white hover:border-white/[0.3] focus:border-elec-yellow focus:ring-0 focus-visible:ring-0 focus:outline-none touch-manipulation';

// data-field anchor so the validation panel can scroll + flash the exact field.
const FormField = ({
  label,
  required,
  fieldName,
  children,
}: {
  label: string;
  required?: boolean;
  fieldName?: string;
  children: React.ReactNode;
}) => (
  <div data-field={fieldName}>
    <Label className={labelCn}>
      {label}
      {required && ' *'}
    </Label>
    {children}
  </div>
);

// Single source of truth — ELE-850 (LCL/PAA/VTCT/NOCN + neutral L3 I&T options)
const availableQualifications = INSPECTOR_QUALIFICATIONS;

const REGISTRATION_SCHEME_OPTIONS = [
  { value: 'NICEIC', label: 'NICEIC' },
  { value: 'NAPIT', label: 'NAPIT' },
  { value: 'ELECSA', label: 'ELECSA' },
  { value: 'STROMA', label: 'STROMA' },
  { value: 'BRE', label: 'BRE' },
  { value: 'other', label: 'Other' },
];

const EICRInspectorDetails = ({ formData, onUpdate }: EICRInspectorDetailsProps) => {
  const haptic = useHaptic();
  const { profiles, getDefaultProfile } = useInspectorProfiles();
  const { companyProfile, loading: companyProfileLoading } = useCompanyProfile();
  const { toast } = useToast();

  // Get the best available inspector profile (default first, then any profile)
  const getAvailableProfile = () => {
    const defaultProfile = getDefaultProfile();
    if (defaultProfile) return defaultProfile;
    // Fall back to the first profile if no default is set
    return profiles.length > 0 ? profiles[0] : null;
  };
  const [selectedQualifications, setSelectedQualifications] = useState<string[]>([]);
  const [isInitialMount, setIsInitialMount] = useState(true);

  // Load default profile on mount if fields are empty. NEVER while an
  // existing report hydrates (or after it loads): a saved cert whose name
  // happens to be blank may still hold registration/insurance/signature
  // values — auto-fill would silently replace them with the current user's
  // profile and autosave the damage (EIC hydration-guard parity).
  const { isHydrating, isExistingReport } = useEICRForm();
  useEffect(() => {
    if (isHydrating || isExistingReport) return;
    if (isInitialMount) {
      const defaultProfile = getDefaultProfile();
      const isInspectorEmpty = !formData.inspectorName && !formData.companyName;
      if (defaultProfile && isInspectorEmpty) {
        handleProfileSelect(defaultProfile);
      }
      setIsInitialMount(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialMount, isHydrating, isExistingReport]);

  // Parse qualifications from form data. Uses parseQualifications which
  // splits newline-delimited values (new format) and falls back to greedy
  // canonical matching for legacy comma-joined values — heals records
  // corrupted by qualification names containing literal commas.
  useEffect(() => {
    if (formData.inspectorQualifications) {
      setSelectedQualifications(parseQualifications(formData.inspectorQualifications));
    }
  }, [formData.inspectorQualifications]);

  const handleProfileSelect = (profile: InspectorProfile) => {
    haptic.success();
    onUpdate('inspectorName', profile.name);
    onUpdate('inspectorQualifications', joinQualifications(profile.qualifications));
    onUpdate('inspectorSignature', profile.signatureData || '');
    onUpdate('registrationScheme', profile.registrationScheme || '');
    onUpdate('registrationNumber', profile.registrationNumber || '');
    onUpdate('registrationExpiry', profile.registrationExpiry || '');
    onUpdate('insuranceProvider', profile.insuranceProvider || '');
    onUpdate('insurancePolicyNumber', profile.insurancePolicyNumber || '');
    onUpdate('insuranceCoverage', profile.insuranceCoverage || '');
    onUpdate('insuranceExpiry', profile.insuranceExpiry || '');
    onUpdate('companyName', profile.companyName || '');
    onUpdate('companyAddress', profile.companyAddress || '');
    onUpdate('companyPhone', profile.companyPhone || '');
    onUpdate('companyEmail', profile.companyEmail || '');
    onUpdate('companyLogo', profile.companyLogo || '');
    onUpdate('companyWebsite', profile.companyWebsite || '');
    setSelectedQualifications(profile.qualifications);
  };

  const toggleQualification = (qualification: string) => {
    haptic.light();
    const updated = selectedQualifications.includes(qualification)
      ? selectedQualifications.filter((q) => q !== qualification)
      : [...selectedQualifications, qualification];
    setSelectedQualifications(updated);
    onUpdate('inspectorQualifications', joinQualifications(updated));
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload a JPG, PNG, GIF, or WebP image.',
        variant: 'destructive',
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Please upload an image smaller than 5MB.',
        variant: 'destructive',
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      onUpdate('companyLogo', e.target?.result as string);
      haptic.success();
      toast({ title: 'Logo uploaded', description: 'Company logo uploaded successfully.' });
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveLogo = () => {
    haptic.light();
    onUpdate('companyLogo', '');
    toast({ title: 'Logo removed', description: 'Company logo has been removed.' });
  };

  // Load ALL details from both Business Settings AND saved Inspector Profile
  // Priority: Company Profile inspector details > Inspector Profile > fallback
  const handleLoadFromBusinessSettings = () => {
    const inspectorProfile = getAvailableProfile();

    if (!companyProfile && !inspectorProfile) {
      haptic.warning();
      toast({
        title: 'No saved settings found',
        description: 'Please set up your Business Settings or Inspector Profile first.',
        variant: 'destructive',
      });
      return;
    }

    haptic.success();
    const loadedItems: string[] = [];

    // Load inspector personal details - Company Profile takes priority
    const inspectorName = companyProfile?.inspector_name || inspectorProfile?.name;
    if (inspectorName) {
      onUpdate('inspectorName', inspectorName);
      loadedItems.push('Name');
    }

    // Load qualifications - Company Profile takes priority
    const qualifications = companyProfile?.inspector_qualifications?.length
      ? companyProfile.inspector_qualifications
      : inspectorProfile?.qualifications;
    if (qualifications?.length) {
      onUpdate('inspectorQualifications', joinQualifications(qualifications));
      setSelectedQualifications(qualifications);
      loadedItems.push('Qualifications');
    }

    // Load signature - Company Profile takes priority
    const signature = companyProfile?.signature_data || inspectorProfile?.signatureData;
    if (signature) {
      onUpdate('inspectorSignature', signature);
      loadedItems.push('Signature');
    }

    // Load registration details - Company Profile takes priority
    const registrationScheme =
      companyProfile?.registration_scheme || inspectorProfile?.registrationScheme;
    if (registrationScheme) {
      onUpdate('registrationScheme', registrationScheme);
      loadedItems.push('Registration');
    }
    const registrationNumber =
      companyProfile?.registration_number || inspectorProfile?.registrationNumber;
    if (registrationNumber) {
      onUpdate('registrationNumber', registrationNumber);
    }
    const registrationExpiry =
      companyProfile?.registration_expiry || inspectorProfile?.registrationExpiry;
    if (registrationExpiry) {
      onUpdate('registrationExpiry', registrationExpiry);
    }

    // Load insurance details - Company Profile takes priority
    const insuranceProvider =
      companyProfile?.insurance_provider || inspectorProfile?.insuranceProvider;
    if (insuranceProvider) {
      onUpdate('insuranceProvider', insuranceProvider);
      loadedItems.push('Insurance');
    }
    const insurancePolicyNumber =
      companyProfile?.insurance_policy_number || inspectorProfile?.insurancePolicyNumber;
    if (insurancePolicyNumber) {
      onUpdate('insurancePolicyNumber', insurancePolicyNumber);
    }
    const insuranceCoverage =
      companyProfile?.insurance_coverage || inspectorProfile?.insuranceCoverage;
    if (insuranceCoverage) {
      onUpdate('insuranceCoverage', insuranceCoverage);
    }
    const insuranceExpiry = companyProfile?.insurance_expiry || inspectorProfile?.insuranceExpiry;
    if (insuranceExpiry) {
      onUpdate('insuranceExpiry', insuranceExpiry);
    }

    // Load company details from Business Settings (CompanyProfile) - always takes priority
    if (companyProfile) {
      if (companyProfile.company_name) {
        onUpdate('companyName', companyProfile.company_name);
        loadedItems.push('Company');
      }
      if (companyProfile.company_address) {
        const fullAddress = companyProfile.company_postcode
          ? `${companyProfile.company_address}, ${companyProfile.company_postcode}`
          : companyProfile.company_address;
        onUpdate('companyAddress', fullAddress);
      }
      if (companyProfile.company_phone) {
        onUpdate('companyPhone', companyProfile.company_phone);
      }
      if (companyProfile.company_email) {
        onUpdate('companyEmail', companyProfile.company_email);
      }
      if (companyProfile.company_website) {
        onUpdate('companyWebsite', companyProfile.company_website);
      }
      if (companyProfile.logo_data_url || companyProfile.logo_url) {
        onUpdate('companyLogo', companyProfile.logo_data_url || companyProfile.logo_url || '');
        loadedItems.push('Logo');
      }
      if (companyProfile.primary_color) {
        onUpdate('companyAccentColor', companyProfile.primary_color);
      }
    } else if (inspectorProfile) {
      // Fallback to Inspector Profile company fields if no Business Settings
      if (inspectorProfile.companyName) {
        onUpdate('companyName', inspectorProfile.companyName);
        loadedItems.push('Company');
      }
      if (inspectorProfile.companyAddress) {
        onUpdate('companyAddress', inspectorProfile.companyAddress);
      }
      if (inspectorProfile.companyPhone) {
        onUpdate('companyPhone', inspectorProfile.companyPhone);
      }
      if (inspectorProfile.companyEmail) {
        onUpdate('companyEmail', inspectorProfile.companyEmail);
      }
      if (inspectorProfile.companyWebsite) {
        onUpdate('companyWebsite', inspectorProfile.companyWebsite);
      }
      if (inspectorProfile.companyLogo) {
        onUpdate('companyLogo', inspectorProfile.companyLogo);
        loadedItems.push('Logo');
      }
    }

    toast({
      title: 'Details loaded',
      description:
        loadedItems.length > 0
          ? `Loaded: ${loadedItems.join(', ')}`
          : 'Your saved details have been applied.',
    });
  };

  const getValidationStatus = () => {
    const required = ['inspectorName', 'inspectorQualifications', 'inspectorSignature'];
    const missing = required.filter((field) => !formData[field]?.trim());
    return { isValid: missing.length === 0, missingFields: missing };
  };

  const validation = getValidationStatus();
  const profilePopulated = !!(formData.inspectorName && formData.inspectorQualifications);

  return (
    <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
      {/* Validation notice + quick load from saved profile. Context-aware text:
          softens to "Reload" once the key fields are already populated, matching
          the MW/EIC pattern so the button reads as a normal action rather than
          the only path. */}
      {/*
        One row, not three stacked blocks. This was a full-width button with a
        right-aligned "Manage profiles" on its own line below it and a gap
        between each — roughly 130px of height to offer one action and one link.
      */}
      <div className="space-y-2 lg:col-span-2">
        {!validation.isValid && (
          <p className="text-[11px] text-orange-300">
            Required:{' '}
            {validation.missingFields
              .map((f) => f.replace('inspector', '').replace('Qualifications', 'Qualifications'))
              .join(', ')}
          </p>
        )}

        <div className="flex items-center gap-2">
          {(companyProfile || getAvailableProfile()) && (
            <button
              type="button"
              onClick={handleLoadFromBusinessSettings}
              disabled={companyProfileLoading}
              className={cn(
                'h-11 min-w-0 flex-1 rounded-xl text-sm touch-manipulation active:scale-[0.98] transition-all disabled:opacity-50',
                profilePopulated
                  ? chipOff
                  : 'bg-elec-yellow border border-elec-yellow text-black font-semibold'
              )}
            >
              {profilePopulated ? 'Reload from profile' : 'Load from profile'}
            </button>
          )}
          <div className="shrink-0">
            <InspectorProfileDialog onProfileSelected={handleProfileSelect} />
          </div>
        </div>
      </div>

      {/* ── INSPECTOR ── */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">Inspector</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <FormField label="Inspector name" required fieldName="inspectorName">
            <Input
              data-field="inspectorName"
              value={formData.inspectorName || ''}
              onChange={(e) => onUpdate('inspectorName', e.target.value)}
              placeholder="Full name of the inspector"
              className={inputCn}
            />
          </FormField>
          <FormField label="Certificate number">
            <Input
              value={formData.certificateNumber || ''}
              readOnly
              className={cn(inputCn, 'font-mono cursor-not-allowed opacity-80')}
            />
          </FormField>
        </div>
        {/* Inspector signature — the validator flags this and jumps here, so the
            pad must live on this tab. Draw or type; it appears on the certificate. */}
        <div data-field="inspectorSignature">
          <SignatureInput
            value={formData.inspectorSignature || ''}
            onChange={(value) => onUpdate('inspectorSignature', value || '')}
            placeholder="Type or draw your signature"
          />
        </div>
      </div>

      {/* ── QUALIFICATIONS ── */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 className="text-[15px] font-semibold tracking-tight text-white">Qualifications</h2>
          {selectedQualifications.length > 0 && (
            <span className="text-[11px] font-medium text-white">
              {selectedQualifications.length} selected
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2" data-field="inspectorQualifications">
          {availableQualifications.map((qualification) => {
            const isSelected = selectedQualifications.includes(qualification);
            return (
              <button
                key={qualification}
                type="button"
                onClick={() => toggleQualification(qualification)}
                className={cn(
                  'min-h-11 rounded-xl px-2 py-1.5 text-xs text-left transition-all touch-manipulation active:scale-[0.98]',
                  isSelected ? chipOn : chipOff
                )}
              >
                {qualification}
                {isSelected ? ' ✓' : ''}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── PROFESSIONAL REGISTRATION ── */}
      <div className={cardCn}>
        <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">
          Professional registration
        </h2>
        <FormField label="Registration scheme">
          <MobileSelectPicker
            value={formData.registrationScheme || ''}
            onValueChange={(value) => {
              haptic.light();
              onUpdate('registrationScheme', value);
            }}
            options={REGISTRATION_SCHEME_OPTIONS}
            placeholder="Select scheme"
            title="Registration scheme"
            triggerClassName={pickerTriggerCn}
          />
        </FormField>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <FormField label="Registration number">
            <Input
              value={formData.registrationNumber || ''}
              onChange={(e) => onUpdate('registrationNumber', e.target.value)}
              placeholder="e.g. NICEIC/12345"
              className={inputCn}
            />
          </FormField>
          <FormField label="Registration expiry">
            <Input
              type="date"
              value={formData.registrationExpiry || ''}
              onChange={(e) => onUpdate('registrationExpiry', e.target.value)}
              aria-invalid={hasExpired(formData.registrationExpiry) || undefined}
              className={cn(
                inputCn,
                hasExpired(formData.registrationExpiry) &&
                  'border-b-amber-400 focus:border-amber-400'
              )}
            />
            {hasExpired(formData.registrationExpiry) && (
              <p className="mt-1 text-[11.5px] font-medium text-amber-300">
                Expired {formatExpiry(formData.registrationExpiry)} — this date prints on the
                certificate.
              </p>
            )}
          </FormField>
        </div>
      </div>

      {/* ── INSURANCE ── */}
      <div className={cardCn}>
        <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">
          Insurance details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <FormField label="Insurance provider">
            <Input
              value={formData.insuranceProvider || ''}
              onChange={(e) => onUpdate('insuranceProvider', e.target.value)}
              placeholder="e.g. Zurich, Hiscox"
              className={inputCn}
            />
          </FormField>
          <FormField label="Policy number">
            <Input
              value={formData.insurancePolicyNumber || ''}
              onChange={(e) => onUpdate('insurancePolicyNumber', e.target.value)}
              placeholder="Policy number"
              className={inputCn}
            />
          </FormField>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <FormField label="Coverage amount">
            <Input
              value={formData.insuranceCoverage || ''}
              onChange={(e) => onUpdate('insuranceCoverage', e.target.value)}
              placeholder="e.g. £5,000,000"
              className={inputCn}
            />
          </FormField>
          <FormField label="Expiry date">
            <Input
              type="date"
              value={formData.insuranceExpiry || ''}
              onChange={(e) => onUpdate('insuranceExpiry', e.target.value)}
              aria-invalid={hasExpired(formData.insuranceExpiry) || undefined}
              className={cn(
                inputCn,
                hasExpired(formData.insuranceExpiry) && 'border-b-amber-400 focus:border-amber-400'
              )}
            />
            {hasExpired(formData.insuranceExpiry) && (
              <p className="mt-1 text-[11.5px] font-medium text-amber-300">
                Expired {formatExpiry(formData.insuranceExpiry)} — this date prints on the
                certificate.
              </p>
            )}
          </FormField>
        </div>
      </div>

      {/* ── COMPANY DETAILS ── */}
      <div className={cardCn}>
        <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">
          Company details
        </h2>
        <FormField label="Company name">
          <Input
            value={formData.companyName || ''}
            onChange={(e) => onUpdate('companyName', e.target.value)}
            placeholder="Your company name Ltd"
            className={inputCn}
          />
        </FormField>
        <FormField label="Company address">
          <Textarea
            value={formData.companyAddress || ''}
            onChange={(e) => onUpdate('companyAddress', e.target.value)}
            placeholder="Full company address including postcode"
            rows={2}
            className={cn(textareaCn, 'resize-none w-full')}
          />
        </FormField>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <FormField label="Company phone">
            <Input
              type="tel"
              value={formData.companyPhone || ''}
              onChange={(e) => onUpdate('companyPhone', e.target.value)}
              placeholder="Company phone number"
              className={inputCn}
            />
          </FormField>
          <FormField label="Company email">
            <Input
              type="email"
              value={formData.companyEmail || ''}
              onChange={(e) => onUpdate('companyEmail', e.target.value)}
              placeholder="Company email address"
              className={inputCn}
            />
          </FormField>
        </div>
      </div>

      {/* ── COMPANY BRANDING ── */}
      <div className={cardCn}>
        <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">
          Company branding
        </h2>

        {/* Logo */}
        <div>
          <span className={labelCn}>Company logo</span>
          {formData.companyLogo ? (
            <div className="flex items-center gap-3 rounded-xl bg-white/[0.05] p-3">
              <img
                src={formData.companyLogo}
                alt="Company logo"
                className="w-14 h-14 object-contain rounded-lg bg-white/[0.06] p-1.5"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-white truncate">Logo uploaded</p>
                <button
                  type="button"
                  onClick={handleRemoveLogo}
                  className="min-h-8 text-xs font-medium text-red-400 touch-manipulation mt-0.5"
                >
                  Remove
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => document.getElementById('logo-upload')?.click()}
              className="w-full min-h-11 border border-dashed border-white/[0.15] rounded-xl p-4 text-center text-sm text-white hover:border-elec-yellow transition-colors touch-manipulation active:scale-[0.98]"
            >
              Tap to upload logo
            </button>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="hidden"
            id="logo-upload"
          />
        </div>

        {/* Branding details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <FormField label="Company tagline">
            <Input
              value={formData.companyTagline || ''}
              onChange={(e) => onUpdate('companyTagline', e.target.value)}
              placeholder="Professional electrical services"
              className={inputCn}
            />
          </FormField>
          <FormField label="Website">
            <Input
              value={formData.companyWebsite || ''}
              onChange={(e) => onUpdate('companyWebsite', e.target.value)}
              placeholder="www.company.co.uk"
              className={inputCn}
            />
          </FormField>
        </div>
        <FormField label="Accent colour">
          <div className="flex items-center gap-2">
            <div className="relative w-11 h-11 rounded-lg overflow-hidden border border-white/[0.12] flex-shrink-0">
              <input
                type="color"
                value={formData.companyAccentColor || '#f59e0b'}
                onChange={(e) => onUpdate('companyAccentColor', e.target.value)}
                className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
              />
              <div
                className="w-full h-full"
                style={{ backgroundColor: formData.companyAccentColor || '#f59e0b' }}
              />
            </div>
            <Input
              value={formData.companyAccentColor || '#f59e0b'}
              onChange={(e) => onUpdate('companyAccentColor', e.target.value)}
              placeholder="#f59e0b"
              className={cn(inputCn, 'flex-1 font-mono')}
            />
          </div>
        </FormField>
      </div>
    </div>
  );
};

export default EICRInspectorDetails;
