import { useInspectorProfiles, InspectorProfile } from "@/hooks/useInspectorProfiles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FormSection } from "./FormSection";
import { RegistrationSchemeSelect } from "./RegistrationSchemeSelect";
import { InsuranceDetailsForm } from "./InsuranceDetailsForm";
import { SignatureGenerator } from "./SignatureGenerator";
import SignaturePad, { SignaturePadRef } from "@/components/signature/SignaturePad";
import { ProfilePhotoUpload } from "./ProfilePhotoUpload";
import { InspectorProfileViewCard } from "./InspectorProfileViewCard";
import { User, Award, Building2, FileText, PenTool, Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

const qualificationOptions = [
  'C&G 2391-50 (Inspection & Testing)',
  'C&G 2391-52 (Inspection & Testing)', 
  '18th Edition BS7671',
  'C&G 2394/2395 (Design & Verification)',
  'AM2 (Achievement Measurement)',
  'EAL Level 3 Inspection & Testing',
  'EAL Level 4 Inspection & Testing'
];

export default function InspectorProfileForm() {
  const { profiles, addProfile, updateProfile, isLoading } = useInspectorProfiles();
  const currentProfile = profiles[0] || null;
  const [isEditing, setIsEditing] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    photoUrl: "",
    qualifications: [] as string[],
    companyName: "",
    companyAddress: "",
    companyPhone: "",
    companyEmail: "",
    companyLogo: "",
    companyWebsite: "",
    companyRegistrationNumber: "",
    vatNumber: "",
    registrationScheme: "none",
    registrationNumber: "",
    registrationExpiry: "",
    insuranceProvider: "none",
    insurancePolicyNumber: "",
    insuranceCoverage: "",
    insuranceExpiry: "",
    signatureData: "",
    isDefault: true,
  });
  const signaturePadRef = useRef<SignaturePadRef>(null);

  // Initialize editing state once profiles are loaded
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
        photoUrl: currentProfile.photoUrl || "",
        qualifications: currentProfile.qualifications,
        companyName: currentProfile.companyName,
        companyAddress: currentProfile.companyAddress,
        companyPhone: currentProfile.companyPhone,
        companyEmail: currentProfile.companyEmail,
        companyLogo: currentProfile.companyLogo || "",
        companyWebsite: currentProfile.companyWebsite || "",
        companyRegistrationNumber: currentProfile.companyRegistrationNumber || "",
        vatNumber: currentProfile.vatNumber || "",
        registrationScheme: currentProfile.registrationScheme || "none",
        registrationNumber: currentProfile.registrationNumber || "",
        registrationExpiry: currentProfile.registrationExpiry || "",
        insuranceProvider: currentProfile.insuranceProvider || "none",
        insurancePolicyNumber: currentProfile.insurancePolicyNumber || "",
        insuranceCoverage: currentProfile.insuranceCoverage || "",
        insuranceExpiry: currentProfile.insuranceExpiry || "",
        signatureData: currentProfile.signatureData || "",
        isDefault: true,
      });
      if (currentProfile.signatureData) {
        setTimeout(() => {
          signaturePadRef.current?.setSignature(currentProfile.signatureData!);
        }, 100);
      }
    }
  }, [currentProfile?.id]);

  const handleSave = () => {
    if (!formData.name.trim()) {
      toast.error("Inspector name is required");
      return;
    }

    if (currentProfile) {
      updateProfile(currentProfile.id, formData);
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } else {
      addProfile(formData);
      toast.success("Profile created successfully");
      setIsEditing(false);
    }

    // Scroll to top smoothly after save
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
      ? current.filter(q => q !== qual)
      : [...current, qual];
    setFormData({ ...formData, qualifications: updated });
  };

  // Show loading state while profiles are being loaded
  if (isLoading) {
    return (
      <div className="bg-elec-gray border border-elec-gray-light rounded-lg p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-5 w-5 bg-elec-gray-dark rounded animate-pulse" />
          <div className="h-6 w-32 bg-elec-gray-dark rounded animate-pulse" />
        </div>
        <div className="space-y-4">
          <div className="h-20 bg-elec-gray-dark rounded animate-pulse" />
          <div className="h-20 bg-elec-gray-dark rounded animate-pulse" />
        </div>
      </div>
    );
  }

  // Show view card if profile exists and not editing
  if (currentProfile && !isEditing) {
    return (
      <div className="animate-fade-in">
        <InspectorProfileViewCard 
          profile={currentProfile} 
          onEdit={() => setIsEditing(true)} 
        />
      </div>
    );
  }

  const completionPercentage = () => {
    let completed = 0;
    let total = 5;
    if (formData.name) completed++;
    if (formData.qualifications.length > 0) completed++;
    if (formData.companyName) completed++;
    if (formData.registrationScheme !== 'none') completed++;
    if (formData.signatureData) completed++;
    return Math.round((completed / total) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Completion Indicator */}
      {!currentProfile && (
        <div className="bg-elec-gray border border-elec-gray-light rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-white/70">Profile Completion</span>
            <span className="text-sm font-semibold text-elec-yellow">{completionPercentage()}%</span>
          </div>
          <div className="w-full bg-elec-gray-dark rounded-full h-2">
            <div 
              className="bg-elec-yellow h-2 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage()}%` }}
            />
          </div>
        </div>
      )}

      {/* Form Container */}
      <div className="bg-elec-gray border border-elec-gray-light rounded-lg p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8 pb-24 lg:pb-8">
        
        {/* Section 1: Personal Details */}
        <FormSection 
          icon={User} 
          title="1. Personal Details"
          description="Your basic information and profile photo"
        >
          <div className="space-y-6">
            <div>
              <Label htmlFor="profileName" className="text-foreground font-semibold">
                Inspector Name <span className="text-red-500 text-base font-bold">*</span>
              </Label>
              <Input
                id="profileName"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Full name of inspector"
                className="mt-1.5 min-h-[48px]"
              />
            </div>
            
            <ProfilePhotoUpload
              photoUrl={formData.photoUrl}
              onPhotoChange={(url) => setFormData({ ...formData, photoUrl: url || "" })}
              label="Profile Photo"
            />
          </div>
        </FormSection>

        {/* Section 2: Company & Branding */}
        <FormSection 
          icon={Building2} 
          title="2. Company & Branding"
          description="Optional company details and branding (skip if not applicable)"
        >
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="companyName" className="text-foreground font-semibold">Company Name</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="Company or organisation name"
                  className="mt-1.5 min-h-[48px]"
                />
              </div>
              <div>
                <Label htmlFor="companyPhone" className="text-foreground font-semibold">Phone Number</Label>
                <Input
                  id="companyPhone"
                  type="tel"
                  inputMode="tel"
                  value={formData.companyPhone}
                  onChange={(e) => setFormData({ ...formData, companyPhone: e.target.value })}
                  placeholder="Company phone number"
                  className="mt-1.5 min-h-[48px]"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="companyEmail" className="text-foreground font-semibold">Email Address</Label>
                <Input
                  id="companyEmail"
                  type="email"
                  inputMode="email"
                  value={formData.companyEmail}
                  onChange={(e) => setFormData({ ...formData, companyEmail: e.target.value })}
                  placeholder="Company email address"
                  className="mt-1.5 min-h-[48px]"
                />
              </div>
              <div>
                <Label htmlFor="companyWebsite" className="text-foreground font-semibold">Website</Label>
                <div className="relative mt-1.5">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70" />
                  <Input
                    id="companyWebsite"
                    value={formData.companyWebsite}
                    onChange={(e) => setFormData({ ...formData, companyWebsite: e.target.value })}
                    placeholder="www.example.co.uk"
                    className="pl-10 min-h-[48px]"
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="companyAddress" className="text-foreground font-semibold">Company Address</Label>
              <Textarea
                id="companyAddress"
                value={formData.companyAddress}
                onChange={(e) => setFormData({ ...formData, companyAddress: e.target.value })}
                placeholder="Full company address"
                rows={3}
                className="mt-1.5"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="companyRegNumber" className="text-foreground font-semibold">Company Registration Number</Label>
                <Input
                  id="companyRegNumber"
                  value={formData.companyRegistrationNumber}
                  onChange={(e) => setFormData({ ...formData, companyRegistrationNumber: e.target.value })}
                  placeholder="e.g., 12345678"
                  className="mt-1.5 min-h-[48px]"
                />
              </div>
              <div>
                <Label htmlFor="vatNumber" className="text-foreground font-semibold">VAT Number</Label>
                <Input
                  id="vatNumber"
                  value={formData.vatNumber}
                  onChange={(e) => setFormData({ ...formData, vatNumber: e.target.value })}
                  placeholder="e.g., GB123456789"
                  className="mt-1.5 min-h-[48px]"
                />
              </div>
            </div>

            <ProfilePhotoUpload
              photoUrl={formData.companyLogo}
              onPhotoChange={(url) => setFormData({ ...formData, companyLogo: url || "" })}
              label="Company Logo"
              isLogo={true}
            />
          </div>
        </FormSection>

        {/* Section 3: Qualifications */}
        <FormSection 
          icon={Award} 
          title="3. Qualifications"
          description="Select your professional qualifications"
        >
          <div className="space-y-4">
            <Label className="text-foreground font-semibold">Select all that apply:</Label>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {qualificationOptions.map((qual) => (
                <div
                  key={qual}
                  onClick={() => toggleQualification(qual)}
                  className="flex items-start gap-3 p-4 sm:p-5 min-h-[52px] rounded-lg border border-elec-gray-light hover:border-elec-yellow/30 transition-colors cursor-pointer"
                >
                  <Checkbox
                    id={qual}
                    checked={formData.qualifications.includes(qual)}
                    onCheckedChange={() => toggleQualification(qual)}
                    className="mt-0.5 scale-110"
                  />
                  <label
                    htmlFor={qual}
                    className="text-sm text-foreground cursor-pointer flex-1 leading-snug"
                  >
                    {qual}
                  </label>
                </div>
              ))}
            </div>
            {formData.qualifications.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {formData.qualifications.map((qual) => (
                  <Badge key={qual} className="bg-elec-yellow/20 text-white/80 border border-elec-yellow/30">
                    {qual}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </FormSection>

        {/* Section 4: Registration & Insurance */}
        <FormSection 
          icon={FileText} 
          title="4. Registration & Insurance"
          description="Professional registration and insurance details"
        >
          <RegistrationSchemeSelect
            scheme={formData.registrationScheme}
            registrationNumber={formData.registrationNumber}
            registrationExpiry={formData.registrationExpiry}
            onSchemeChange={(value) => setFormData({ ...formData, registrationScheme: value })}
            onNumberChange={(value) => setFormData({ ...formData, registrationNumber: value })}
            onExpiryChange={(value) => setFormData({ ...formData, registrationExpiry: value })}
          />

          <div className="pt-4 border-t border-elec-gray-light">
            <InsuranceDetailsForm
              provider={formData.insuranceProvider}
              policyNumber={formData.insurancePolicyNumber}
              coverage={formData.insuranceCoverage}
              expiry={formData.insuranceExpiry}
              onProviderChange={(value) => setFormData({ ...formData, insuranceProvider: value })}
              onPolicyNumberChange={(value) => setFormData({ ...formData, insurancePolicyNumber: value })}
              onCoverageChange={(value) => setFormData({ ...formData, insuranceCoverage: value })}
              onExpiryChange={(value) => setFormData({ ...formData, insuranceExpiry: value })}
            />
          </div>
        </FormSection>

        {/* Section 5: Digital Signature */}
        <FormSection 
          icon={PenTool} 
          title="5. Digital Signature"
          description="Create your signature for inspection certificates"
        >
          <Tabs defaultValue="draw" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-elec-gray-dark border border-elec-gray-light">
              <TabsTrigger value="draw" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-black">
                Draw Signature
              </TabsTrigger>
              <TabsTrigger value="type" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-black">
                Type Signature
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="draw" className="mt-4 space-y-4">
              <SignaturePad
                ref={signaturePadRef}
                width={400}
                height={150}
              />
              <Button 
                onClick={() => {
                  const data = signaturePadRef.current?.getSignature();
                  if (data) {
                    setFormData({ ...formData, signatureData: data });
                    toast.success("Signature saved to profile");
                  } else {
                    toast.error("Please draw a signature first");
                  }
                }}
                className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90"
              >
                Save Drawn Signature
              </Button>
            </TabsContent>
            
            <TabsContent value="type" className="mt-4">
              <SignatureGenerator
                onSave={(data) => {
                  setFormData({ ...formData, signatureData: data });
                  signaturePadRef.current?.setSignature(data);
                  toast.success("Signature saved to profile");
                }}
              />
            </TabsContent>
          </Tabs>

          {/* Signature Preview */}
          {formData.signatureData && (
            <div className="mt-4 p-4 bg-elec-gray-dark border border-elec-gray-light rounded-lg">
              <Label className="text-foreground mb-2 block">Current Signature Preview</Label>
              <div className="bg-white rounded-lg p-4 border-2 border-elec-yellow/50">
                <img 
                  src={formData.signatureData} 
                  alt="Signature preview" 
                  className="max-w-full h-auto"
                />
              </div>
              <p className="text-sm text-white/70 mt-2">
                ✓ Signature ready - click "Save Profile" or "Update Profile" below to save
              </p>
            </div>
          )}
        </FormSection>

        {/* Mobile Sticky Action Bar */}
        <div className="fixed bottom-16 left-0 right-0 p-3 bg-elec-gray border-t border-elec-gray-light lg:hidden z-40 flex gap-2">
          {currentProfile && (
            <Button
              onClick={handleCancel}
              variant="outline"
              className="flex-1 min-h-[48px] border-elec-gray-light"
            >
              Cancel
            </Button>
          )}
          <Button
            onClick={handleSave}
            disabled={!formData.name.trim()}
            className="flex-1 min-h-[48px] bg-elec-yellow text-black hover:bg-elec-yellow/90"
          >
            {currentProfile ? 'Update Profile' : 'Create Profile'}
          </Button>
        </div>

        {/* Desktop Action Buttons */}
        <div className="hidden lg:flex justify-between pt-6 border-t border-elec-gray-light">
          {currentProfile && (
            <Button
              onClick={handleCancel}
              variant="outline"
              className="border-elec-gray-light text-foreground hover:bg-elec-gray-dark min-h-[48px]"
            >
              Cancel
            </Button>
          )}
          <Button
            onClick={handleSave}
            disabled={!formData.name.trim()}
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold px-8 ml-auto min-h-[48px]"
          >
            {currentProfile ? 'Update Profile' : 'Create Profile'}
          </Button>
        </div>
      </div>
    </div>
  );
}
