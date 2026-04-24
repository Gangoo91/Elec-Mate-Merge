import React, { useEffect, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import SignatureInput from '@/components/signature/SignatureInput';
import { SchemeLogoPicker } from '@/components/settings/settings/SchemeLogoPicker';
import { CompanyProfile } from '@/types/company';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Eyebrow } from '@/components/college/primitives';

const AVAILABLE_QUALIFICATIONS = [
  '18th Edition BS7671',
  'City & Guilds 2365 Level 2',
  'City & Guilds 2365 Level 3',
  'City & Guilds 2330 Level 2',
  'City & Guilds 2330 Level 3',
  'NVQ Level 3 Electrical Installation',
  'AM2 Assessment',
  // ELE-850 — Awarding-body-neutral Level 3 I&T options. Use these if you
  // hold an LCL / PAA / VTCT / NOCN / equivalent qualification and do NOT
  // hold the specific City & Guilds 2391-xx number. Misrepresenting a
  // specific qualification on a signed statutory document is a legal risk.
  'Level 3 Award in Inspection & Testing (any awarding body)',
  'Level 3 Award in Initial Verification & Certification (any awarding body)',
  'Level 3 Award in Periodic Inspection, Testing & Certification (any awarding body)',
  'City & Guilds 2391-52',
  'City & Guilds 2391-51',
  'City & Guilds 2394/2395',
  'EAL Level 3 Inspection & Testing',
  'EAL Level 3 Initial Verification',
  'EAL Level 3 Periodic Inspection',
  'LCL Level 3 Inspection & Testing',
  'PAA/VTCT Level 3 Inspection & Testing',
  'NOCN Level 3 Inspection & Testing',
  'City & Guilds 2377 PAT Testing',
  'PAT Testing Certified',
  'NICEIC Approved',
  'NICEIC Domestic Installer',
  'NAPIT Registered',
  'ELECSA Registered',
  'ECA Member',
  'SELECT Member',
  'JIB Approved',
  'JIB Graded Electrician',
  'CompEx Certified',
  'EV Charging Installation',
  'Solar PV Installation',
  'Battery Storage Installation',
  'Fire Alarm (BS 5839)',
  'Emergency Lighting (BS 5266)',
  'Data & Fibre Installation',
];

const INSURANCE_PROVIDERS = [
  'Zurich', 'Hiscox', 'AXA', 'Aviva', 'Allianz', 'Markel', 'NFU Mutual', 'QBE',
  'Tradesman Saver', 'Simply Business', 'PolicyBee', 'Kingsbridge', 'Other',
];

const INSURANCE_COVERAGE_OPTIONS = ['£1,000,000', '£2,000,000', '£5,000,000', '£10,000,000'];

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

  useEffect(() => {
    if (profile && open) {
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
    }
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
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 rounded-t-2xl overflow-hidden border-white/[0.06] bg-[#0a0a0a]"
      >
        <div className="flex flex-col h-full bg-[#0a0a0a]">
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-white/20" />
          </div>

          <header className="px-5 sm:px-6 pb-4">
            <Eyebrow>Credentials</Eyebrow>
            <h2 className="mt-1.5 text-xl font-semibold text-white tracking-tight">
              Inspector details
            </h2>
            <p className="mt-1 text-[13px] text-white">
              Credentials, qualifications and signature
            </p>
          </header>

          <div className="flex-1 overflow-y-auto px-5 sm:px-6 pb-6 space-y-6">
            {/* Inspector name */}
            <div className="space-y-1.5">
              <Label className="text-white font-medium text-[13px]">Inspector name</Label>
              <Input
                value={inspectorName}
                onChange={(e) => setInspectorName(e.target.value)}
                placeholder="Full name"
                className="h-11 bg-[#0a0a0a] border-white/[0.08] text-white focus:border-elec-yellow focus:ring-0 touch-manipulation"
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
                      className={cn(
                        'px-3 py-2 rounded-xl text-[13px] font-medium transition-colors touch-manipulation border',
                        isSelected
                          ? 'bg-elec-yellow text-black border-elec-yellow'
                          : 'bg-[#0a0a0a] text-white border-white/[0.08] hover:bg-[hsl(0_0%_15%)]'
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

            <div className="h-px bg-white/[0.06]" />

            {/* Insurance */}
            <div className="space-y-3">
              <Eyebrow>Insurance details</Eyebrow>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-white font-medium text-[12px]">Provider</Label>
                  <Select value={insuranceProvider} onValueChange={setInsuranceProvider}>
                    <SelectTrigger className="h-11 bg-[#0a0a0a] border-white/[0.08] text-white focus:border-elec-yellow focus:ring-0 touch-manipulation">
                      <SelectValue placeholder="Provider" />
                    </SelectTrigger>
                    <SelectContent className="bg-[hsl(0_0%_12%)] border-white/[0.08] text-white">
                      {INSURANCE_PROVIDERS.map((provider) => (
                        <SelectItem key={provider} value={provider}>
                          {provider}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-white font-medium text-[12px]">Coverage</Label>
                  <Select value={insuranceCoverage} onValueChange={setInsuranceCoverage}>
                    <SelectTrigger className="h-11 bg-[#0a0a0a] border-white/[0.08] text-white focus:border-elec-yellow focus:ring-0 touch-manipulation">
                      <SelectValue placeholder="Coverage" />
                    </SelectTrigger>
                    <SelectContent className="bg-[hsl(0_0%_12%)] border-white/[0.08] text-white">
                      {INSURANCE_COVERAGE_OPTIONS.map((coverage) => (
                        <SelectItem key={coverage} value={coverage}>
                          {coverage}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-white font-medium text-[12px]">Policy number</Label>
                  <Input
                    value={insurancePolicyNumber}
                    onChange={(e) => setInsurancePolicyNumber(e.target.value)}
                    placeholder="Policy number"
                    className="h-11 bg-[#0a0a0a] border-white/[0.08] text-white focus:border-elec-yellow focus:ring-0 touch-manipulation"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-white font-medium text-[12px]">Expiry</Label>
                  <Input
                    type="date"
                    value={insuranceExpiry}
                    onChange={(e) => setInsuranceExpiry(e.target.value)}
                    className="h-11 bg-[#0a0a0a] border-white/[0.08] text-white focus:border-elec-yellow focus:ring-0 touch-manipulation"
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
              className="w-full h-12 rounded-xl bg-elec-yellow text-black font-semibold text-[14px] hover:bg-elec-yellow/90 transition-colors touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default InspectorSheet;
