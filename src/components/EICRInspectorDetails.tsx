import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { AlertTriangle, User, Upload, X, ChevronDown, Award, Building2, Palette, Shield, Check, Settings } from 'lucide-react';
import { useInspectorProfiles, InspectorProfile } from '@/hooks/useInspectorProfiles';
import InspectorProfileDialog from './InspectorProfileDialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useHaptics } from '@/hooks/useHaptics';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';

interface EICRInspectorDetailsProps {
  formData: any;
  onUpdate: (field: string, value: string) => void;
  isOpen?: boolean;
  onToggle?: () => void;
}

const availableQualifications = [
  '18th Edition BS7671',
  'City & Guilds 2391-52',
  'City & Guilds 2391-51',
  'NICEIC Approved',
  'NAPIT Registered',
  'ECA Member',
  'JIB Approved',
  'CompEx Certified'
];

const EICRInspectorDetails = ({ formData, onUpdate }: EICRInspectorDetailsProps) => {
  const isMobile = useIsMobile();
  const haptics = useHaptics();
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
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [isInitialMount, setIsInitialMount] = useState(true);

  // Accordion section states
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    personal: true,
    qualifications: false,
    registration: false,
    company: false,
    branding: false,
  });

  const toggleSection = (section: string) => {
    haptics.tap();
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Load default profile on mount if fields are empty
  useEffect(() => {
    if (isInitialMount) {
      const defaultProfile = getDefaultProfile();
      const isInspectorEmpty = !formData.inspectorName && !formData.companyName;
      if (defaultProfile && isInspectorEmpty) {
        handleProfileSelect(defaultProfile);
      }
      setIsInitialMount(false);
    }
  }, [isInitialMount]);

  // Parse qualifications from form data
  useEffect(() => {
    if (formData.inspectorQualifications) {
      const quals = formData.inspectorQualifications
        .split(',')
        .map((q: string) => q.trim())
        .filter((q: string) => q);
      setSelectedQualifications(quals);
    }
  }, [formData.inspectorQualifications]);

  const handleProfileSelect = (profile: InspectorProfile) => {
    haptics.success();
    onUpdate('inspectorName', profile.name);
    onUpdate('inspectorQualifications', profile.qualifications.join(', '));
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
    haptics.tap();
    const updated = selectedQualifications.includes(qualification)
      ? selectedQualifications.filter(q => q !== qualification)
      : [...selectedQualifications, qualification];
    setSelectedQualifications(updated);
    onUpdate('inspectorQualifications', updated.join(', '));
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast({ title: "Invalid file type", description: "Please upload a JPG, PNG, GIF, or WebP image.", variant: "destructive" });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "File too large", description: "Please upload an image smaller than 5MB.", variant: "destructive" });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      onUpdate('companyLogo', e.target?.result as string);
      haptics.success();
      toast({ title: "Logo uploaded", description: "Company logo uploaded successfully." });
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveLogo = () => {
    haptics.tap();
    onUpdate('companyLogo', '');
    toast({ title: "Logo removed", description: "Company logo has been removed." });
  };

  // Load ALL details from both Business Settings AND saved Inspector Profile
  const handleLoadFromBusinessSettings = () => {
    const inspectorProfile = getAvailableProfile();

    if (!companyProfile && !inspectorProfile) {
      haptics.warning();
      toast({
        title: "No Saved Settings Found",
        description: "Please set up your Business Settings or Inspector Profile first.",
        variant: "destructive"
      });
      return;
    }

    haptics.success();
    let loadedItems: string[] = [];

    // Load personal details from Inspector Profile (name, qualifications, signature)
    if (inspectorProfile) {
      if (inspectorProfile.name) {
        onUpdate('inspectorName', inspectorProfile.name);
        loadedItems.push('Name');
      }
      if (inspectorProfile.qualifications?.length > 0) {
        onUpdate('inspectorQualifications', inspectorProfile.qualifications.join(', '));
        setSelectedQualifications(inspectorProfile.qualifications);
        loadedItems.push('Qualifications');
      }
      if (inspectorProfile.signatureData) {
        onUpdate('inspectorSignature', inspectorProfile.signatureData);
        loadedItems.push('Signature');
      }
      if (inspectorProfile.registrationScheme) {
        onUpdate('registrationScheme', inspectorProfile.registrationScheme);
      }
      if (inspectorProfile.registrationNumber) {
        onUpdate('registrationNumber', inspectorProfile.registrationNumber);
      }
      if (inspectorProfile.registrationExpiry) {
        onUpdate('registrationExpiry', inspectorProfile.registrationExpiry);
      }
      if (inspectorProfile.insuranceProvider) {
        onUpdate('insuranceProvider', inspectorProfile.insuranceProvider);
      }
      if (inspectorProfile.insurancePolicyNumber) {
        onUpdate('insurancePolicyNumber', inspectorProfile.insurancePolicyNumber);
      }
      if (inspectorProfile.insuranceCoverage) {
        onUpdate('insuranceCoverage', inspectorProfile.insuranceCoverage);
      }
      if (inspectorProfile.insuranceExpiry) {
        onUpdate('insuranceExpiry', inspectorProfile.insuranceExpiry);
      }
    }

    // Load company details from Business Settings (CompanyProfile) - takes priority
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
      title: "Details Loaded",
      description: loadedItems.length > 0
        ? `Loaded: ${loadedItems.join(', ')}`
        : "Your saved details have been applied."
    });
  };

  const getValidationStatus = () => {
    const required = ['inspectorName', 'inspectorQualifications'];
    const missing = required.filter(field => !formData[field]?.trim());
    return { isValid: missing.length === 0, missingFields: missing };
  };

  const validation = getValidationStatus();

  // Section header component - now a div since CollapsibleTrigger handles click
  const SectionTitle = ({ icon: Icon, title, color = "blue", isOpen, badge }: {
    icon: React.ElementType;
    title: string;
    color?: string;
    isOpen: boolean;
    badge?: string;
  }) => (
    <div
      className={cn(
        "w-full flex items-center gap-3 py-4 text-left touch-manipulation transition-colors cursor-pointer",
        isMobile ? "px-4 bg-card/30 border-y border-border/20" : "pb-3 border-b border-border/30",
        "active:bg-card/50"
      )}
    >
      <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center", `bg-${color}-500/20`)}>
        <Icon className={cn("h-5 w-5", `text-${color}-400`)} />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground">{title}</h3>
        {badge && <span className="text-xs text-muted-foreground">{badge}</span>}
      </div>
      <ChevronDown className={cn(
        "h-5 w-5 text-muted-foreground transition-transform",
        isOpen && "rotate-180"
      )} />
    </div>
  );

  // Form field wrapper
  const FormField = ({ label, required, hint, children }: {
    label: string;
    required?: boolean;
    hint?: string;
    children: React.ReactNode;
  }) => (
    <div className="space-y-2">
      <Label className="text-sm text-foreground/80">
        {label}
        {required && <span className="text-elec-yellow ml-1">*</span>}
      </Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );

  return (
    <div className={cn("space-y-2", isMobile && "-mx-4")}>
      {/* Validation Alert */}
      {!validation.isValid && (
        <div className={cn("px-4", isMobile && "px-4")}>
          <Alert className="border-orange-500/30 bg-orange-500/10">
            <AlertTriangle className="h-4 w-4 text-orange-400" />
            <AlertDescription className="text-orange-400 text-sm">
              Missing: {validation.missingFields.join(', ')}
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Quick Load Button - Loads ALL saved details */}
      {(companyProfile || getAvailableProfile()) && (
        <div className={cn("px-4 py-2", isMobile && "px-4")}>
          <Button
            onClick={handleLoadFromBusinessSettings}
            disabled={companyProfileLoading}
            className="w-full h-14 bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold touch-manipulation"
          >
            <Settings className="h-5 w-5 mr-2" />
            Load My Saved Details
          </Button>
          <p className="text-xs text-muted-foreground text-center mt-2">
            Loads from Business Settings + Inspector Profile
          </p>
        </div>
      )}

      {/* Personal Details Section */}
      <Collapsible open={openSections.personal} onOpenChange={() => toggleSection('personal')}>
        <CollapsibleTrigger asChild>
          <div>
            <SectionTitle
              icon={User}
              title="Personal Details"
              color="blue"
              isOpen={openSections.personal}
            />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className={cn("space-y-4 py-4", isMobile ? "px-4" : "")}>
            <FormField label="Inspector Name" required>
              <Input
                value={formData.inspectorName || ''}
                onChange={(e) => onUpdate('inspectorName', e.target.value)}
                placeholder="Full name of the inspector"
                className="h-11 text-base touch-manipulation"
              />
            </FormField>
            <FormField label="Certificate Number" hint="Auto-generated">
              <Input
                value={formData.certificateNumber || ''}
                readOnly
                className="h-11 text-base bg-muted/50 cursor-not-allowed font-mono"
              />
            </FormField>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Qualifications Section */}
      <Collapsible open={openSections.qualifications} onOpenChange={() => toggleSection('qualifications')}>
        <CollapsibleTrigger asChild>
          <div>
            <SectionTitle
              icon={Award}
              title="Qualifications"
              color="yellow"
              isOpen={openSections.qualifications}
              badge={`${selectedQualifications.length} selected`}
            />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className={cn("py-4", isMobile ? "px-4" : "")}>
            <p className="text-xs text-muted-foreground mb-3">Tap to select your qualifications</p>
            <div className="flex flex-wrap gap-2">
              {availableQualifications.map((qualification) => {
                const isSelected = selectedQualifications.includes(qualification);
                return (
                  <button
                    key={qualification}
                    type="button"
                    onClick={() => toggleQualification(qualification)}
                    className={cn(
                      "px-3 py-2 rounded-lg text-sm font-medium transition-all touch-manipulation",
                      "flex items-center gap-2",
                      "active:scale-95",
                      isSelected
                        ? "bg-elec-yellow text-black"
                        : "bg-card/50 text-foreground border border-border/30 hover:bg-card"
                    )}
                  >
                    {isSelected && <Check className="h-4 w-4" />}
                    {qualification}
                  </button>
                );
              })}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Professional Registration Section */}
      <Collapsible open={openSections.registration} onOpenChange={() => toggleSection('registration')}>
        <CollapsibleTrigger asChild>
          <div>
            <SectionTitle
              icon={Shield}
              title="Professional Registration"
              color="green"
              isOpen={openSections.registration}
            />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className={cn("space-y-4 py-4", isMobile ? "px-4" : "")}>
            <FormField label="Registration Scheme">
              <Select value={formData.registrationScheme || ''} onValueChange={(value) => { haptics.tap(); onUpdate('registrationScheme', value); }}>
                <SelectTrigger className="h-11 touch-manipulation bg-card/50 border-border/30">
                  <SelectValue placeholder="Select scheme" />
                </SelectTrigger>
                <SelectContent className="z-[200]" position="popper" sideOffset={4}>
                  <SelectItem value="NICEIC">NICEIC</SelectItem>
                  <SelectItem value="NAPIT">NAPIT</SelectItem>
                  <SelectItem value="ELECSA">ELECSA</SelectItem>
                  <SelectItem value="STROMA">STROMA</SelectItem>
                  <SelectItem value="BRE">BRE</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Registration Number">
                <Input
                  value={formData.registrationNumber || ''}
                  onChange={(e) => onUpdate('registrationNumber', e.target.value)}
                  placeholder="e.g., NICEIC/12345"
                  className="h-11 text-base touch-manipulation"
                />
              </FormField>
              <FormField label="Registration Expiry">
                <Input
                  type="date"
                  value={formData.registrationExpiry || ''}
                  onChange={(e) => onUpdate('registrationExpiry', e.target.value)}
                  className="h-11 text-base touch-manipulation"
                />
              </FormField>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Company Details Section */}
      <Collapsible open={openSections.company} onOpenChange={() => toggleSection('company')}>
        <CollapsibleTrigger asChild>
          <div>
            <SectionTitle
              icon={Building2}
              title="Company Details"
              color="purple"
              isOpen={openSections.company}
            />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className={cn("space-y-4 py-4", isMobile ? "px-4" : "")}>
            <div className="flex justify-end">
              <InspectorProfileDialog onProfileSelected={handleProfileSelect} />
            </div>
            <FormField label="Company Name">
              <Input
                value={formData.companyName || ''}
                onChange={(e) => onUpdate('companyName', e.target.value)}
                placeholder="Your Company Name Ltd"
                className="h-11 text-base touch-manipulation"
              />
            </FormField>
            <FormField label="Company Address">
              <Textarea
                value={formData.companyAddress || ''}
                onChange={(e) => onUpdate('companyAddress', e.target.value)}
                placeholder="Full company address including postcode"
                rows={2}
                className="touch-manipulation text-base min-h-[80px] resize-none"
              />
            </FormField>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Company Phone">
                <Input
                  type="tel"
                  value={formData.companyPhone || ''}
                  onChange={(e) => onUpdate('companyPhone', e.target.value)}
                  placeholder="Company phone number"
                  className="h-11 text-base touch-manipulation"
                />
              </FormField>
              <FormField label="Company Email">
                <Input
                  type="email"
                  value={formData.companyEmail || ''}
                  onChange={(e) => onUpdate('companyEmail', e.target.value)}
                  placeholder="Company email address"
                  className="h-11 text-base touch-manipulation"
                />
              </FormField>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Company Branding Section */}
      <Collapsible open={openSections.branding} onOpenChange={() => toggleSection('branding')}>
        <CollapsibleTrigger asChild>
          <div>
            <SectionTitle
              icon={Palette}
              title="Company Branding"
              color="orange"
              isOpen={openSections.branding}
            />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className={cn("space-y-4 py-4", isMobile ? "px-4" : "")}>
            {/* Logo Upload */}
            <div className="space-y-3">
              <Label className="text-sm text-foreground/80">Company Logo</Label>
              {formData.companyLogo ? (
                <div className="relative w-fit">
                  <img
                    src={formData.companyLogo}
                    alt="Company Logo"
                    className="max-w-48 max-h-32 object-contain rounded-lg border border-border bg-background/50 p-2"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={handleRemoveLogo}
                    className="absolute -top-2 -right-2 w-8 h-8 rounded-full p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => document.getElementById('logo-upload')?.click()}
                  className="w-full border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-elec-yellow/50 transition-colors touch-manipulation"
                >
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Tap to upload logo</p>
                  <p className="text-xs text-muted-foreground mt-1">JPG, PNG, GIF or WebP (max 5MB)</p>
                </button>
              )}
              <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" id="logo-upload" />
            </div>

            {/* Branding Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Company Tagline">
                <Input
                  value={formData.companyTagline || ''}
                  onChange={(e) => onUpdate('companyTagline', e.target.value)}
                  placeholder="Professional Electrical Services"
                  className="h-11 text-base touch-manipulation"
                />
              </FormField>
              <FormField label="Website">
                <Input
                  value={formData.companyWebsite || ''}
                  onChange={(e) => onUpdate('companyWebsite', e.target.value)}
                  placeholder="www.yourcompany.co.uk"
                  className="h-11 text-base touch-manipulation"
                />
              </FormField>
            </div>
            <FormField label="Accent Colour">
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={formData.companyAccentColor || '#f59e0b'}
                  onChange={(e) => onUpdate('companyAccentColor', e.target.value)}
                  className="w-14 h-11 p-1 cursor-pointer"
                />
                <Input
                  value={formData.companyAccentColor || '#f59e0b'}
                  onChange={(e) => onUpdate('companyAccentColor', e.target.value)}
                  placeholder="#f59e0b"
                  className="flex-1 h-11 text-base touch-manipulation font-mono"
                />
              </div>
            </FormField>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default EICRInspectorDetails;
