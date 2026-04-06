import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Shield, Check, FileText, Pen, Loader2, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import SignatureInput from '@/components/signature/SignatureInput';
import { SchemeLogoPicker } from '@/components/settings/settings/SchemeLogoPicker';
import { CompanyProfile } from '@/types/company';
import { toast } from 'sonner';

const AVAILABLE_QUALIFICATIONS = [
  '18th Edition BS7671',
  'City & Guilds 2365 Level 2',
  'City & Guilds 2365 Level 3',
  'City & Guilds 2330 Level 2',
  'City & Guilds 2330 Level 3',
  'NVQ Level 3 Electrical Installation',
  'AM2 Assessment',
  'City & Guilds 2391-52',
  'City & Guilds 2391-51',
  'City & Guilds 2394/2395',
  'EAL Level 3 Inspection & Testing',
  'EAL Level 3 Initial Verification',
  'EAL Level 3 Periodic Inspection',
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
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-white/20" />
          </div>

          <div className="px-5 pb-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <Shield className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Inspector Details</h2>
              <p className="text-xs text-white">Credentials, qualifications and signature</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-5">
            {/* Inspector Name */}
            <div className="space-y-2">
              <Label className="text-xs font-medium text-white uppercase tracking-wider">Inspector Name</Label>
              <Input
                value={inspectorName}
                onChange={(e) => setInspectorName(e.target.value)}
                placeholder="Full name"
                className="h-11 rounded-xl bg-white/[0.03] border-white/[0.08] text-white focus:border-amber-500 focus:ring-amber-500"
              />
            </div>

            <div className="h-px bg-white/[0.06]" />

            {/* Registration Scheme */}
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
              <Label className="text-xs font-medium text-white uppercase tracking-wider">Qualifications</Label>
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
                        'px-3 py-2 rounded-xl text-[13px] font-medium transition-all touch-manipulation',
                        isSelected
                          ? 'bg-blue-500 text-white'
                          : 'bg-white/[0.04] text-white border border-white/[0.08] hover:bg-white/[0.08]'
                      )}
                    >
                      {isSelected && <Check className="h-3.5 w-3.5 inline mr-1.5" />}
                      {qual}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="h-px bg-white/[0.06]" />

            {/* Insurance */}
            <div className="space-y-3">
              <Label className="text-xs font-medium text-white uppercase tracking-wider flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue-400" />
                Insurance Details
              </Label>
              <div className="grid grid-cols-2 gap-3">
                <Select value={insuranceProvider} onValueChange={setInsuranceProvider}>
                  <SelectTrigger className="h-11 rounded-xl bg-white/[0.03] border-white/[0.08] text-white">
                    <SelectValue placeholder="Provider" />
                  </SelectTrigger>
                  <SelectContent className="bg-elec-dark border-white/[0.1]">
                    {INSURANCE_PROVIDERS.map((provider) => (
                      <SelectItem key={provider} value={provider}>{provider}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={insuranceCoverage} onValueChange={setInsuranceCoverage}>
                  <SelectTrigger className="h-11 rounded-xl bg-white/[0.03] border-white/[0.08] text-white">
                    <SelectValue placeholder="Coverage" />
                  </SelectTrigger>
                  <SelectContent className="bg-elec-dark border-white/[0.1]">
                    {INSURANCE_COVERAGE_OPTIONS.map((coverage) => (
                      <SelectItem key={coverage} value={coverage}>{coverage}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  value={insurancePolicyNumber}
                  onChange={(e) => setInsurancePolicyNumber(e.target.value)}
                  placeholder="Policy number"
                  className="h-11 rounded-xl bg-white/[0.03] border-white/[0.08] text-white focus:border-amber-500 focus:ring-amber-500"
                />
                <Input
                  type="date"
                  value={insuranceExpiry}
                  onChange={(e) => setInsuranceExpiry(e.target.value)}
                  className="h-11 rounded-xl bg-white/[0.03] border-white/[0.08] text-white focus:border-amber-500 focus:ring-amber-500"
                />
              </div>
            </div>

            <div className="h-px bg-white/[0.06]" />

            {/* Signature */}
            <div className="space-y-3">
              <Label className="text-xs font-medium text-white uppercase tracking-wider flex items-center gap-2">
                <Pen className="h-4 w-4 text-blue-400" />
                Signature
              </Label>
              <SignatureInput
                value={signatureData}
                onChange={(signature) => setSignatureData(signature || '')}
              />
            </div>
          </div>

          <div className="p-4 border-t border-white/[0.06]">
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="w-full h-14 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-bold text-base touch-manipulation active:scale-[0.98] shadow-lg shadow-amber-500/20"
            >
              {isSaving ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Saving...</> : <><CheckCircle className="mr-2 h-5 w-5" /> Save</>}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default InspectorSheet;
