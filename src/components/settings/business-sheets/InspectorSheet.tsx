import React, { useEffect, useRef, useState } from 'react';
import { Sheet } from '@/components/ui/sheet';
import SettingsSheetContent from '@/components/settings/SettingsSheetContent';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import SignatureInput from '@/components/signature/SignatureInput';
import { SchemeLogoPicker } from '@/components/settings/settings/SchemeLogoPicker';
import { CompanyProfile } from '@/types/company';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Eyebrow } from '@/components/college/primitives';
import { INSPECTOR_QUALIFICATIONS } from '@/constants/inspectorQualifications';
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

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SettingsSheetContent className="bg-elec-dark" title="Inspector details">
        <div className="flex flex-col h-full bg-elec-dark">
          <div className="lg:hidden flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-white/20" />
          </div>

          <header className="px-5 sm:px-6 lg:pt-6 pb-4">
            <Eyebrow>Credentials</Eyebrow>
            <h2 className="mt-1.5 text-xl font-semibold text-white tracking-tight">
              Inspector details
            </h2>
            <p className="mt-1 text-[13px] text-white">Credentials, qualifications and signature</p>
          </header>

          <div className="flex-1 overflow-y-auto px-5 sm:px-6 pb-6 space-y-6">
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
              <Eyebrow>Qualifications</Eyebrow>
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
                      className={cn(chipBase, 'flex-none px-3', isSelected ? chipOn : chipOff)}
                      aria-pressed={isSelected}
                    >
                      {isSelected && <span className="mr-1.5 font-semibold">✓</span>}
                      {qual}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="h-px bg-white/[0.06]" />

            {/* Insurance */}
            <div className="space-y-3">
              <Eyebrow>Insurance details</Eyebrow>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className={labelCn}>Provider</Label>
                  <MobileSelectPicker
                    value={insuranceProvider}
                    onValueChange={setInsuranceProvider}
                    options={INSURANCE_PROVIDER_PICKER_OPTIONS}
                    placeholder="Provider"
                    triggerClassName={selectTriggerCn}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className={labelCn}>Coverage</Label>
                  <MobileSelectPicker
                    value={insuranceCoverage}
                    onValueChange={setInsuranceCoverage}
                    options={INSURANCE_COVERAGE_PICKER_OPTIONS}
                    placeholder="Coverage"
                    triggerClassName={selectTriggerCn}
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
            </div>

            <div className="h-px bg-white/[0.06]" />

            {/* Signature */}
            <div className="space-y-3">
              <Eyebrow>Signature</Eyebrow>
              <SignatureInput
                value={signatureData}
                onChange={(signature) => setSignatureData(signature || '')}
              />
            </div>
          </div>

          <div className="px-5 sm:px-6 py-4 border-t border-white/[0.06]">
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="w-full h-12 rounded-xl bg-elec-yellow text-black font-semibold text-[14px] hover:bg-elec-yellow/90 transition-colors touch-manipulation disabled:bg-white/[0.08] disabled:text-white disabled:cursor-not-allowed"
            >
              {isSaving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </div>
      </SettingsSheetContent>
    </Sheet>
  );
};

export default InspectorSheet;
