import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
// Button removed — using native buttons
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  Upload,
  X,
  Check,
  ChevronDown,
} from 'lucide-react';
import { useInspectorProfiles, InspectorProfile } from '@/hooks/useInspectorProfiles';
import InspectorProfileDialog from './InspectorProfileDialog';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useHaptic } from '@/hooks/useHaptic';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import FormField from '@/components/ui/FormField';
import { INSPECTOR_QUALIFICATIONS } from '@/constants/inspectorQualifications';

interface EICRInspectorDetailsProps {
  formData: any;
  onUpdate: (field: string, value: string) => void;
  isOpen?: boolean;
  onToggle?: () => void;
}

// Single source of truth — ELE-850 (LCL/PAA/VTCT/NOCN + neutral L3 I&T options)
const availableQualifications = INSPECTOR_QUALIFICATIONS;

const EICRInspectorDetails = ({ formData, onUpdate }: EICRInspectorDetailsProps) => {
  const isMobile = useIsMobile();
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
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [isInitialMount, setIsInitialMount] = useState(true);

  // Accordion section states
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    personal: true,
    qualifications: false,
    registration: false,
    insurance: false,
    company: false,
    branding: false,
  });

  const toggleSection = (section: string) => {
    haptic.light();
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
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
    haptic.success();
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
    haptic.light();
    const updated = selectedQualifications.includes(qualification)
      ? selectedQualifications.filter((q) => q !== qualification)
      : [...selectedQualifications, qualification];
    setSelectedQualifications(updated);
    onUpdate('inspectorQualifications', updated.join(', '));
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
        title: 'No Saved Settings Found',
        description: 'Please set up your Business Settings or Inspector Profile first.',
        variant: 'destructive',
      });
      return;
    }

    haptic.success();
    let loadedItems: string[] = [];

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
      onUpdate('inspectorQualifications', qualifications.join(', '));
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
      title: 'Details Loaded',
      description:
        loadedItems.length > 0
          ? `Loaded: ${loadedItems.join(', ')}`
          : 'Your saved details have been applied.',
    });
  };

  const getValidationStatus = () => {
    const required = ['inspectorName', 'inspectorQualifications'];
    const missing = required.filter((field) => !formData[field]?.trim());
    return { isValid: missing.length === 0, missingFields: missing };
  };

  const validation = getValidationStatus();

  return (
    <div className={cn('space-y-2', '')}>
      {/* Validation */}
      {!validation.isValid && (
        <div className="px-4">
          <p className="text-[11px] text-amber-400/80">
            Required: {validation.missingFields.map(f => f.replace('inspector', '').replace('Qualifications', 'Qualifications')).join(', ')}
          </p>
        </div>
      )}

      {/* Quick Load Button - Loads ALL saved details */}
      {(companyProfile || getAvailableProfile()) && (
        <div className={cn('px-4 py-2', '')}>
          <button
            onClick={handleLoadFromBusinessSettings}
            disabled={companyProfileLoading}
            className="text-xs font-medium text-elec-yellow touch-manipulation active:scale-[0.98] disabled:opacity-50"
          >
            Load from profile
          </button>
        </div>
      )}

      {/* Personal Details Section */}
      <Collapsible open={openSections.personal} onOpenChange={() => toggleSection('personal')}>
        <CollapsibleTrigger asChild>
          <button className="w-full flex items-center justify-between py-3 touch-manipulation active:scale-[0.98]">
            <div className="flex-1 text-left">
              <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
              <h3 className="text-xs font-medium text-white uppercase tracking-wider">Personal Details</h3>
            </div>
            <ChevronDown className={cn('h-4 w-4 text-white transition-transform ml-3 flex-shrink-0', openSections.personal && 'rotate-180')} />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className={cn('space-y-4 py-4', '')}>
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
      <Collapsible
        open={openSections.qualifications}
        onOpenChange={() => toggleSection('qualifications')}
      >
        <CollapsibleTrigger asChild>
          <button className="w-full flex items-center justify-between py-3 touch-manipulation active:scale-[0.98]">
            <div className="flex-1 text-left">
              <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-medium text-white uppercase tracking-wider">Qualifications</h3>
                {selectedQualifications.length > 0 && (
                  <span className="text-[10px] text-white">{selectedQualifications.length} selected</span>
                )}
              </div>
            </div>
            <ChevronDown className={cn('h-4 w-4 text-white transition-transform ml-3 flex-shrink-0', openSections.qualifications && 'rotate-180')} />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="py-3">
            <div className="grid grid-cols-2 gap-1.5">
              {availableQualifications.map((qualification) => {
                const isSelected = selectedQualifications.includes(qualification);
                return (
                  <button
                    key={qualification}
                    type="button"
                    onClick={() => {
                      haptic.light();
                      toggleQualification(qualification);
                    }}
                    className={cn(
                      'h-11 px-3 rounded-lg text-[11px] font-medium transition-all touch-manipulation',
                      'flex items-center gap-2 text-left',
                      'active:scale-[0.98]',
                      isSelected
                        ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                        : 'bg-white/[0.05] text-white border border-white/[0.06]'
                    )}
                  >
                    <div className={cn(
                      'w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0',
                      isSelected ? 'bg-elec-yellow border-elec-yellow' : 'border-white/30'
                    )}>
                      {isSelected && <Check className="h-3 w-3 text-black" />}
                    </div>
                    <span className="truncate">{qualification}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Professional Registration Section */}
      <Collapsible
        open={openSections.registration}
        onOpenChange={() => toggleSection('registration')}
      >
        <CollapsibleTrigger asChild>
          <button className="w-full flex items-center justify-between py-3 touch-manipulation active:scale-[0.98]">
            <div className="flex-1 text-left">
              <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
              <h3 className="text-xs font-medium text-white uppercase tracking-wider">Professional Registration</h3>
            </div>
            <ChevronDown className={cn('h-4 w-4 text-white transition-transform ml-3 flex-shrink-0', openSections.registration && 'rotate-180')} />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className={cn('space-y-4 py-4', '')}>
            <FormField label="Registration Scheme">
              <Select
                value={formData.registrationScheme || ''}
                onValueChange={(value) => {
                  haptic.light();
                  onUpdate('registrationScheme', value);
                }}
              >
                <SelectTrigger className="h-11 touch-manipulation bg-white/[0.06] border-white/[0.08]">
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

      {/* Insurance Details Section */}
      <Collapsible
        open={openSections.insurance}
        onOpenChange={() => toggleSection('insurance')}
      >
        <CollapsibleTrigger asChild>
          <button className="w-full flex items-center justify-between py-3 touch-manipulation active:scale-[0.98]">
            <div className="flex-1 text-left">
              <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
              <h3 className="text-xs font-medium text-white uppercase tracking-wider">Insurance Details</h3>
            </div>
            <ChevronDown className={cn('h-4 w-4 text-white transition-transform ml-3 flex-shrink-0', openSections.insurance && 'rotate-180')} />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className={cn('space-y-4 py-4', '')}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Insurance Provider">
                <Input
                  value={formData.insuranceProvider || ''}
                  onChange={(e) => onUpdate('insuranceProvider', e.target.value)}
                  placeholder="e.g. Zurich, Hiscox"
                  className="h-11 text-base touch-manipulation"
                />
              </FormField>
              <FormField label="Policy Number">
                <Input
                  value={formData.insurancePolicyNumber || ''}
                  onChange={(e) => onUpdate('insurancePolicyNumber', e.target.value)}
                  placeholder="Policy number"
                  className="h-11 text-base touch-manipulation"
                />
              </FormField>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Coverage Amount">
                <Input
                  value={formData.insuranceCoverage || ''}
                  onChange={(e) => onUpdate('insuranceCoverage', e.target.value)}
                  placeholder="e.g. £5,000,000"
                  className="h-11 text-base touch-manipulation"
                />
              </FormField>
              <FormField label="Expiry Date">
                <Input
                  type="date"
                  value={formData.insuranceExpiry || ''}
                  onChange={(e) => onUpdate('insuranceExpiry', e.target.value)}
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
          <button className="w-full flex items-center justify-between py-3 touch-manipulation active:scale-[0.98]">
            <div className="flex-1 text-left">
              <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
              <h3 className="text-xs font-medium text-white uppercase tracking-wider">Company Details</h3>
            </div>
            <ChevronDown className={cn('h-4 w-4 text-white transition-transform ml-3 flex-shrink-0', openSections.company && 'rotate-180')} />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className={cn('space-y-4 py-4', '')}>
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
          <button className="w-full flex items-center justify-between py-3 touch-manipulation active:scale-[0.98]">
            <div className="flex-1 text-left">
              <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
              <h3 className="text-xs font-medium text-white uppercase tracking-wider">Company Branding</h3>
            </div>
            <ChevronDown className={cn('h-4 w-4 text-white transition-transform ml-3 flex-shrink-0', openSections.branding && 'rotate-180')} />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className={cn('space-y-4 py-4', '')}>
            {/* Logo Upload */}
            {/* Logo */}
            <div className="space-y-2">
              <label className="text-xs text-white block">Company Logo</label>
              {formData.companyLogo ? (
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                  <img
                    src={formData.companyLogo}
                    alt="Company Logo"
                    className="w-14 h-14 object-contain rounded-lg bg-white/[0.06] p-1.5"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white truncate">Logo uploaded</p>
                    <button
                      type="button"
                      onClick={handleRemoveLogo}
                      className="text-[10px] text-red-400/60 hover:text-red-400 touch-manipulation mt-0.5"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => document.getElementById('logo-upload')?.click()}
                  className="w-full border border-dashed border-white/[0.10] rounded-lg p-4 text-center hover:border-elec-yellow/30 transition-colors touch-manipulation active:scale-[0.98]"
                >
                  <Upload className="h-5 w-5 text-white mx-auto mb-1.5" />
                  <p className="text-[11px] text-white">Tap to upload logo</p>
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

            {/* Branding Details */}
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Company Tagline">
                <Input
                  value={formData.companyTagline || ''}
                  onChange={(e) => onUpdate('companyTagline', e.target.value)}
                  placeholder="Professional Electrical Services"
                  className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] placeholder:text-white/30"
                  style={{ fontSize: '16px' }}
                />
              </FormField>
              <FormField label="Website">
                <Input
                  value={formData.companyWebsite || ''}
                  onChange={(e) => onUpdate('companyWebsite', e.target.value)}
                  placeholder="www.company.co.uk"
                  className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] placeholder:text-white/30"
                  style={{ fontSize: '16px' }}
                />
              </FormField>
            </div>
            <FormField label="Accent Colour">
              <div className="flex items-center gap-2">
                <div className="relative w-11 h-11 rounded-lg overflow-hidden border border-white/[0.08] flex-shrink-0">
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
                  className="flex-1 h-11 text-base touch-manipulation font-mono bg-white/[0.06] border-white/[0.08] placeholder:text-white/30"
                  style={{ fontSize: '16px' }}
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
