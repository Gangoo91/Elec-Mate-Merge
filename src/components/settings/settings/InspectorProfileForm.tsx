import { useEffect, useRef, useState } from 'react';
import { useInspectorProfiles } from '@/hooks/useInspectorProfiles';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import SignaturePad, { SignaturePadRef } from '@/components/signature/SignaturePad';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

import { FormSection } from './FormSection';
import { SchemeLogoPicker } from './SchemeLogoPicker';
import { InsuranceDetailsForm } from './InsuranceDetailsForm';
import { SignatureGenerator } from './SignatureGenerator';
import { ProfilePhotoUpload } from './ProfilePhotoUpload';
import { InspectorProfileViewCard } from './InspectorProfileViewCard';
import { Eyebrow } from '@/components/college/primitives';

const qualificationOptions = [
  'C&G 2391-50 (Inspection & Testing)',
  'C&G 2391-52 (Inspection & Testing)',
  '18th Edition BS7671',
  'C&G 2394/2395 (Design & Verification)',
  'AM2 (Achievement Measurement)',
  'EAL Level 3 Inspection & Testing',
  'EAL Level 4 Inspection & Testing',
];

export default function InspectorProfileForm() {
  const { profiles, addProfile, updateProfile, isLoading } = useInspectorProfiles();
  const currentProfile = profiles[0] || null;
  const [isEditing, setIsEditing] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    photoUrl: '',
    qualifications: [] as string[],
    companyName: '',
    companyAddress: '',
    companyPhone: '',
    companyEmail: '',
    companyLogo: '',
    companyWebsite: '',
    companyRegistrationNumber: '',
    vatNumber: '',
    registrationScheme: 'none',
    registrationNumber: '',
    registrationExpiry: '',
    schemeLogoDataUrl: '',
    insuranceProvider: 'none',
    insurancePolicyNumber: '',
    insuranceCoverage: '',
    insuranceExpiry: '',
    signatureData: '',
    isDefault: true,
  });
  const signaturePadRef = useRef<SignaturePadRef>(null);

  useEffect(() => {
    if (!isLoading && !hasInitialized) {
      setIsEditing(!currentProfile);
      setHasInitialized(true);
    }
  }, [isLoading, currentProfile, hasInitialized]);

  useEffect(() => {
    if (currentProfile) {
      setFormData({
        name: currentProfile.name,
        photoUrl: currentProfile.photoUrl || '',
        qualifications: currentProfile.qualifications,
        companyName: currentProfile.companyName,
        companyAddress: currentProfile.companyAddress,
        companyPhone: currentProfile.companyPhone,
        companyEmail: currentProfile.companyEmail,
        companyLogo: currentProfile.companyLogo || '',
        companyWebsite: currentProfile.companyWebsite || '',
        companyRegistrationNumber: currentProfile.companyRegistrationNumber || '',
        vatNumber: currentProfile.vatNumber || '',
        registrationScheme: currentProfile.registrationScheme || 'none',
        registrationNumber: currentProfile.registrationNumber || '',
        registrationExpiry: currentProfile.registrationExpiry || '',
        schemeLogoDataUrl: currentProfile.schemeLogoDataUrl || '',
        insuranceProvider: currentProfile.insuranceProvider || 'none',
        insurancePolicyNumber: currentProfile.insurancePolicyNumber || '',
        insuranceCoverage: currentProfile.insuranceCoverage || '',
        insuranceExpiry: currentProfile.insuranceExpiry || '',
        signatureData: currentProfile.signatureData || '',
        isDefault: true,
      });
      if (currentProfile.signatureData) {
        setTimeout(() => {
          signaturePadRef.current?.setSignature(currentProfile.signatureData!);
        }, 100);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentProfile?.id]);

  const handleSave = () => {
    if (!formData.name.trim()) {
      toast.error('Inspector name is required');
      return;
    }

    if (currentProfile) {
      updateProfile(currentProfile.id, formData);
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } else {
      addProfile(formData);
      toast.success('Profile created successfully');
      setIsEditing(false);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    if (currentProfile) {
      setIsEditing(false);
    }
  };

  const toggleQualification = (qual: string) => {
    const current = formData.qualifications;
    const updated = current.includes(qual)
      ? current.filter((q) => q !== qual)
      : [...current, qual];
    setFormData({ ...formData, qualifications: updated });
  };

  if (isLoading) {
    return (
      <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-6 md:p-8">
        <div className="h-6 w-40 bg-white/[0.04] rounded animate-pulse" />
        <div className="mt-6 space-y-4">
          <div className="h-20 bg-white/[0.04] rounded-xl animate-pulse" />
          <div className="h-20 bg-white/[0.04] rounded-xl animate-pulse" />
        </div>
      </div>
    );
  }

  if (currentProfile && !isEditing) {
    return (
      <div className="animate-fade-in">
        <InspectorProfileViewCard profile={currentProfile} onEdit={() => setIsEditing(true)} />
      </div>
    );
  }

  const completionPercentage = () => {
    let completed = 0;
    const total = 5;
    if (formData.name) completed++;
    if (formData.qualifications.length > 0) completed++;
    if (formData.companyName) completed++;
    if (formData.registrationScheme !== 'none') completed++;
    if (formData.signatureData) completed++;
    return Math.round((completed / total) * 100);
  };

  const completion = completionPercentage();

  return (
    <div className="space-y-6">
      {/* Completion indicator */}
      {!currentProfile && (
        <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-2">
            <Eyebrow>Profile completion</Eyebrow>
            <span className="text-[13px] font-semibold text-elec-yellow tabular-nums">
              {completion}%
            </span>
          </div>
          <div className="w-full bg-[#0a0a0a] rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-elec-yellow h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${completion}%` }}
            />
          </div>
        </div>
      )}

      {/* Form container */}
      <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6 md:p-8 space-y-8 pb-24 lg:pb-8">
        {/* Section 1: Personal details */}
        <FormSection
          title="1. Personal Details"
          description="Your basic information and profile photo"
        >
          <div className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="profileName" className="text-white font-medium text-[13px]">
                Inspector name <span className="text-red-400">*</span>
              </Label>
              <Input
                id="profileName"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Full name of inspector"
                className="h-11 bg-[#0a0a0a] border-white/[0.08] text-white focus:border-elec-yellow focus:ring-0 touch-manipulation"
              />
            </div>

            <ProfilePhotoUpload
              photoUrl={formData.photoUrl}
              onPhotoChange={(url) => setFormData({ ...formData, photoUrl: url || '' })}
              label="Profile Photo"
            />
          </div>
        </FormSection>

        {/* Section 2: Company & branding */}
        <FormSection
          title="2. Company & Branding"
          description="Optional company details and branding (skip if not applicable)"
        >
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="companyName" className="text-white font-medium text-[13px]">
                  Company name
                </Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="Company or organisation name"
                  className="h-11 bg-[#0a0a0a] border-white/[0.08] text-white focus:border-elec-yellow focus:ring-0 touch-manipulation"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="companyPhone" className="text-white font-medium text-[13px]">
                  Phone number
                </Label>
                <Input
                  id="companyPhone"
                  type="tel"
                  inputMode="tel"
                  value={formData.companyPhone}
                  onChange={(e) => setFormData({ ...formData, companyPhone: e.target.value })}
                  placeholder="Company phone number"
                  className="h-11 bg-[#0a0a0a] border-white/[0.08] text-white focus:border-elec-yellow focus:ring-0 touch-manipulation"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="companyEmail" className="text-white font-medium text-[13px]">
                  Email address
                </Label>
                <Input
                  id="companyEmail"
                  type="email"
                  inputMode="email"
                  value={formData.companyEmail}
                  onChange={(e) => setFormData({ ...formData, companyEmail: e.target.value })}
                  placeholder="Company email address"
                  className="h-11 bg-[#0a0a0a] border-white/[0.08] text-white focus:border-elec-yellow focus:ring-0 touch-manipulation"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="companyWebsite" className="text-white font-medium text-[13px]">
                  Website
                </Label>
                <Input
                  id="companyWebsite"
                  value={formData.companyWebsite}
                  onChange={(e) => setFormData({ ...formData, companyWebsite: e.target.value })}
                  placeholder="www.example.co.uk"
                  className="h-11 bg-[#0a0a0a] border-white/[0.08] text-white focus:border-elec-yellow focus:ring-0 touch-manipulation"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="companyAddress" className="text-white font-medium text-[13px]">
                Company address
              </Label>
              <Textarea
                id="companyAddress"
                value={formData.companyAddress}
                onChange={(e) => setFormData({ ...formData, companyAddress: e.target.value })}
                placeholder="Full company address"
                rows={3}
                className="bg-[#0a0a0a] border-white/[0.08] text-white focus:border-elec-yellow focus-visible:ring-0 touch-manipulation"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="companyRegNumber" className="text-white font-medium text-[13px]">
                  Company registration number
                </Label>
                <Input
                  id="companyRegNumber"
                  value={formData.companyRegistrationNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, companyRegistrationNumber: e.target.value })
                  }
                  placeholder="e.g., 12345678"
                  className="h-11 bg-[#0a0a0a] border-white/[0.08] text-white focus:border-elec-yellow focus:ring-0 touch-manipulation"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="vatNumber" className="text-white font-medium text-[13px]">
                  VAT number
                </Label>
                <Input
                  id="vatNumber"
                  value={formData.vatNumber}
                  onChange={(e) => setFormData({ ...formData, vatNumber: e.target.value })}
                  placeholder="e.g., GB123456789"
                  className="h-11 bg-[#0a0a0a] border-white/[0.08] text-white focus:border-elec-yellow focus:ring-0 touch-manipulation"
                />
              </div>
            </div>

            <ProfilePhotoUpload
              photoUrl={formData.companyLogo}
              onPhotoChange={(url) => setFormData({ ...formData, companyLogo: url || '' })}
              label="Company Logo"
              isLogo
            />
          </div>
        </FormSection>

        {/* Section 3: Qualifications */}
        <FormSection
          title="3. Qualifications"
          description="Select your professional qualifications"
        >
          <div className="space-y-4">
            <Eyebrow>Select all that apply</Eyebrow>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {qualificationOptions.map((qual) => {
                const isSelected = formData.qualifications.includes(qual);
                return (
                  <button
                    key={qual}
                    type="button"
                    onClick={() => toggleQualification(qual)}
                    className={cn(
                      'flex items-start gap-3 p-4 min-h-[56px] rounded-2xl border transition-colors text-left touch-manipulation',
                      isSelected
                        ? 'border-elec-yellow/60 bg-elec-yellow/10'
                        : 'border-white/[0.08] bg-[#0a0a0a] hover:bg-[hsl(0_0%_15%)]'
                    )}
                  >
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleQualification(qual)}
                      className="mt-0.5 border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <span className="text-[13px] text-white flex-1 leading-snug">{qual}</span>
                  </button>
                );
              })}
            </div>
            {formData.qualifications.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {formData.qualifications.map((qual) => (
                  <span
                    key={qual}
                    className="text-[11px] font-medium uppercase tracking-[0.12em] text-elec-yellow"
                  >
                    {qual}
                  </span>
                ))}
              </div>
            )}
          </div>
        </FormSection>

        {/* Section 4: Registration & insurance */}
        <FormSection
          title="4. Registration & Insurance"
          description="Professional registration and insurance details"
        >
          <div className="space-y-6">
            <SchemeLogoPicker
              scheme={formData.registrationScheme}
              registrationNumber={formData.registrationNumber}
              registrationExpiry={formData.registrationExpiry}
              onSchemeChange={(value) => setFormData({ ...formData, registrationScheme: value })}
              onNumberChange={(value) => setFormData({ ...formData, registrationNumber: value })}
              onExpiryChange={(value) => setFormData({ ...formData, registrationExpiry: value })}
              onLogoDataUrlChange={(dataUrl) =>
                setFormData({ ...formData, schemeLogoDataUrl: dataUrl || '' })
              }
            />

            <div className="h-px bg-white/[0.06]" />

            <InsuranceDetailsForm
              provider={formData.insuranceProvider}
              policyNumber={formData.insurancePolicyNumber}
              coverage={formData.insuranceCoverage}
              expiry={formData.insuranceExpiry}
              onProviderChange={(value) => setFormData({ ...formData, insuranceProvider: value })}
              onPolicyNumberChange={(value) =>
                setFormData({ ...formData, insurancePolicyNumber: value })
              }
              onCoverageChange={(value) =>
                setFormData({ ...formData, insuranceCoverage: value })
              }
              onExpiryChange={(value) => setFormData({ ...formData, insuranceExpiry: value })}
            />
          </div>
        </FormSection>

        {/* Section 5: Digital signature */}
        <FormSection
          title="5. Digital Signature"
          description="Create your signature for inspection certificates"
        >
          <Tabs defaultValue="draw" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-[#0a0a0a] border border-white/[0.08] p-1 rounded-xl">
              <TabsTrigger
                value="draw"
                className="rounded-lg data-[state=active]:bg-elec-yellow data-[state=active]:text-black text-white"
              >
                Draw signature
              </TabsTrigger>
              <TabsTrigger
                value="type"
                className="rounded-lg data-[state=active]:bg-elec-yellow data-[state=active]:text-black text-white"
              >
                Type signature
              </TabsTrigger>
            </TabsList>

            <TabsContent value="draw" className="mt-4 space-y-4">
              <SignaturePad ref={signaturePadRef} width={400} height={150} />
              <button
                type="button"
                onClick={() => {
                  const data = signaturePadRef.current?.getSignature();
                  if (data) {
                    setFormData({ ...formData, signatureData: data });
                    toast.success('Signature saved to profile');
                  } else {
                    toast.error('Please draw a signature first');
                  }
                }}
                className="w-full h-12 rounded-xl bg-elec-yellow text-black font-semibold text-[14px] hover:bg-elec-yellow/90 transition-colors touch-manipulation"
              >
                Save drawn signature
              </button>
            </TabsContent>

            <TabsContent value="type" className="mt-4">
              <SignatureGenerator
                onSave={(data) => {
                  setFormData({ ...formData, signatureData: data });
                  signaturePadRef.current?.setSignature(data);
                  toast.success('Signature saved to profile');
                }}
              />
            </TabsContent>
          </Tabs>

          {formData.signatureData && (
            <div className="mt-5 p-4 bg-[#0a0a0a] border border-white/[0.08] rounded-2xl">
              <Eyebrow>Current signature</Eyebrow>
              <div className="mt-3 bg-white rounded-xl p-4">
                <img
                  src={formData.signatureData}
                  alt="Signature preview"
                  className="max-w-full h-auto"
                />
              </div>
              <p className="mt-3 text-[12px] text-white">
                Signature ready — select save below to persist it to your profile.
              </p>
            </div>
          )}
        </FormSection>

        {/* Mobile sticky action bar */}
        <div className="fixed bottom-16 left-0 right-0 px-5 py-3 bg-[hsl(0_0%_12%)] border-t border-white/[0.06] lg:hidden z-40 flex gap-2">
          {currentProfile && (
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 h-12 rounded-xl border border-white/[0.08] bg-[#0a0a0a] text-white text-[14px] font-medium hover:bg-[hsl(0_0%_15%)] transition-colors touch-manipulation"
            >
              Cancel
            </button>
          )}
          <button
            type="button"
            onClick={handleSave}
            disabled={!formData.name.trim()}
            className="flex-1 h-12 rounded-xl bg-elec-yellow text-black text-[14px] font-semibold hover:bg-elec-yellow/90 transition-colors touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentProfile ? 'Update profile' : 'Create profile'}
          </button>
        </div>

        {/* Desktop actions */}
        <div className="hidden lg:flex justify-between pt-6 border-t border-white/[0.06]">
          {currentProfile && (
            <button
              type="button"
              onClick={handleCancel}
              className="h-12 px-6 rounded-xl border border-white/[0.08] bg-[#0a0a0a] text-white text-[14px] font-medium hover:bg-[hsl(0_0%_15%)] transition-colors touch-manipulation"
            >
              Cancel
            </button>
          )}
          <button
            type="button"
            onClick={handleSave}
            disabled={!formData.name.trim()}
            className="ml-auto h-12 px-8 rounded-xl bg-elec-yellow text-black text-[14px] font-semibold hover:bg-elec-yellow/90 transition-colors touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentProfile ? 'Update profile' : 'Create profile'}
          </button>
        </div>
      </div>
    </div>
  );
}
