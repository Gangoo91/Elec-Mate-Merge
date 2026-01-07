import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertTriangle, User, Upload, X, Palette, Shield, Zap } from 'lucide-react';
import { useInspectorProfiles, InspectorProfile } from '@/hooks/useInspectorProfiles';
import { useProfileDataService } from '@/hooks/useProfileDataService';
import { getSourceDisplayInfo } from '@/services/profileDataService';
import InspectorProfileDialog from './InspectorProfileDialog';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { SectionHeader } from '@/components/ui/section-header';
import { cn } from '@/lib/utils';

interface EICRInspectorDetailsProps {
  formData: any;
  onUpdate: (field: string, value: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const EICRInspectorDetails = ({ formData, onUpdate, isOpen, onToggle }: EICRInspectorDetailsProps) => {
  const { profiles, getDefaultProfile } = useInspectorProfiles();
  const { profileData, dataSource, isVerified, inspectorDetails, isLoading: profileDataLoading } = useProfileDataService();
  const { toast } = useToast();
  const [availableQualifications] = useState([
    '18th Edition BS7671',
    'City & Guilds 2391-52',
    'City & Guilds 2391-51',
    'NICEIC Approved',
    'NAPIT Registered',
    'ECA Member',
    'JIB Approved',
    'CompEx Certified'
  ]);
  const [selectedQualifications, setSelectedQualifications] = useState<string[]>([]);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [isInitialMount, setIsInitialMount] = useState(true);

  // Load default profile on component mount if fields are empty
  useEffect(() => {
    if (isInitialMount) {
      const defaultProfile = getDefaultProfile();
      // Only auto-populate if inspector fields are truly empty
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
    // Personal details
    onUpdate('inspectorName', profile.name);
    onUpdate('inspectorQualifications', profile.qualifications.join(', '));
    onUpdate('inspectorSignature', profile.signatureData || '');

    // Registration details
    onUpdate('registrationScheme', profile.registrationScheme || '');
    onUpdate('registrationNumber', profile.registrationNumber || '');
    onUpdate('registrationExpiry', profile.registrationExpiry || '');

    // Insurance details
    onUpdate('insuranceProvider', profile.insuranceProvider || '');
    onUpdate('insurancePolicyNumber', profile.insurancePolicyNumber || '');
    onUpdate('insuranceCoverage', profile.insuranceCoverage || '');
    onUpdate('insuranceExpiry', profile.insuranceExpiry || '');

    // Company details
    onUpdate('companyName', profile.companyName || '');
    onUpdate('companyAddress', profile.companyAddress || '');
    onUpdate('companyPhone', profile.companyPhone || '');
    onUpdate('companyEmail', profile.companyEmail || '');
    onUpdate('companyLogo', profile.companyLogo || '');
    onUpdate('companyWebsite', profile.companyWebsite || '');

    setSelectedQualifications(profile.qualifications);
  };

  const toggleQualification = (qualification: string) => {
    const updated = selectedQualifications.includes(qualification)
      ? selectedQualifications.filter(q => q !== qualification)
      : [...selectedQualifications, qualification];

    setSelectedQualifications(updated);
    onUpdate('inspectorQualifications', updated.join(', '));
  };

  // Smart Auto-Fill from cascade (Elec-ID → Inspector Profile → Account)
  const handleSmartAutoFill = () => {
    if (!inspectorDetails) {
      toast({
        title: "No profile data",
        description: "Set up your profile in Settings to enable auto-fill.",
        variant: "destructive",
      });
      return;
    }

    // Fill from cascade data
    onUpdate('inspectorName', inspectorDetails.name || '');
    onUpdate('companyName', inspectorDetails.company || '');
    onUpdate('companyAddress', inspectorDetails.companyAddress || '');
    onUpdate('companyPhone', inspectorDetails.companyPhone || '');
    onUpdate('companyEmail', inspectorDetails.companyEmail || '');
    onUpdate('registrationScheme', inspectorDetails.registrationScheme || '');
    onUpdate('registrationNumber', inspectorDetails.registrationNumber || '');
    onUpdate('registrationExpiry', inspectorDetails.registrationExpiry || '');

    if (inspectorDetails.qualifications?.length) {
      const qualsList = inspectorDetails.qualifications.join(', ');
      onUpdate('inspectorQualifications', qualsList);
      setSelectedQualifications(inspectorDetails.qualifications);
    }

    if (inspectorDetails.signatureData) {
      onUpdate('inspectorSignature', inspectorDetails.signatureData);
    }

    const sourceInfo = dataSource ? getSourceDisplayInfo(dataSource) : null;
    toast({
      title: isVerified ? "Verified Data Loaded" : "Profile Data Loaded",
      description: `Auto-filled from ${sourceInfo?.label || 'profile'}${isVerified ? ' (verified)' : ''}.`,
    });
  };

  // Company Branding handlers
  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // File type validation
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a JPG, PNG, GIF, or WebP image.",
        variant: "destructive",
      });
      return;
    }

    // File size validation (5MB limit)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB.",
        variant: "destructive",
      });
      return;
    }

    // Convert to base64
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      onUpdate('companyLogo', base64);
      toast({
        title: "Logo uploaded",
        description: "Company logo uploaded successfully.",
      });
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveLogo = () => {
    onUpdate('companyLogo', '');
    toast({
      title: "Logo removed",
      description: "Company logo has been removed.",
    });
  };

  const handleQuickFillBranding = (template: string) => {
    switch (template) {
      case 'electrical-contractor':
        onUpdate('companyName', 'Your Electrical Services Ltd');
        onUpdate('companyTagline', 'Professional Electrical Testing & Inspection');
        onUpdate('companyAccentColor', '#f59e0b');
        onUpdate('companyWebsite', 'www.yourelectrical.co.uk');
        break;
      case 'niceic-approved':
        onUpdate('companyTagline', 'NICEIC Approved Contractor');
        onUpdate('companyAccentColor', '#0ea5e9');
        break;
      case 'independent':
        onUpdate('companyTagline', 'Independent Electrical Engineer');
        onUpdate('companyAccentColor', '#10b981');
        break;
      default:
        break;
    }

    toast({
      title: "Branding template applied",
      description: `${template} branding template has been applied.`,
    });
  };

  const getValidationStatus = () => {
    const required = ['inspectorName', 'inspectorQualifications'];
    const missing = required.filter(field => !formData[field]?.trim());
    return {
      isValid: missing.length === 0,
      missingFields: missing,
    };
  };

  const validation = getValidationStatus();

  return (
    <div className="md:max-w-6xl mx-auto pb-20 lg:pb-4">
      <div className="eicr-section-card">
        <Collapsible open={isOpen} onOpenChange={onToggle}>
          <SectionHeader
            title="Inspector & Company Details"
            icon={User}
            isOpen={isOpen}
            color="blue-500"
          />
          <CollapsibleContent>
            <div className="p-4 sm:p-5 md:p-6 space-y-4 sm:space-y-5">
              {/* Validation Alert */}
              {!validation.isValid && (
                <Alert className="border-orange-500/30 bg-orange-500/10 flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0" />
                  <AlertDescription className="text-orange-300 p-0 text-left">
                    <strong>Required fields missing:</strong> {validation.missingFields.join(', ')}
                  </AlertDescription>
                </Alert>
              )}

              {/* Smart Auto-Fill Card */}
              {(inspectorDetails || getDefaultProfile()) && (
                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-lg p-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                        {isVerified ? (
                          <Shield className="h-5 w-5 text-green-400" />
                        ) : (
                          <Zap className="h-5 w-5 text-elec-yellow" />
                        )}
                        {isVerified ? 'Verified Profile Available' : 'Quick Setup Available'}
                      </h3>
                      {dataSource && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Data from {getSourceDisplayInfo(dataSource).label}
                        </p>
                      )}
                    </div>
                    <Button
                      onClick={handleSmartAutoFill}
                      disabled={profileDataLoading || !inspectorDetails}
                      className={cn(
                        isVerified
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-primary hover:bg-primary/90"
                      )}
                    >
                      {isVerified ? (
                        <>
                          <Shield className="h-4 w-4 mr-2" />
                          Auto-Fill from Elec-ID
                        </>
                      ) : (
                        <>
                          <Zap className="h-4 w-4 mr-2" />
                          Smart Auto-Fill
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {/* Certificate Details */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-base sm:text-lg font-semibold text-foreground border-b border-elec-gray pb-2 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                  Certificate Details
                </h3>
                <div className="space-y-2">
                  <Label htmlFor="certificateNumber">Certificate Number</Label>
                  <Input
                    id="certificateNumber"
                    value={formData.certificateNumber || ''}
                    readOnly
                    className="bg-muted/50 cursor-not-allowed font-mono text-foreground h-11 text-base"
                    tabIndex={-1}
                  />
                  <p className="text-xs text-muted-foreground">Auto-generated and cannot be changed</p>
                </div>
              </div>

              {/* Personal Details */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-base sm:text-lg font-semibold text-foreground border-b border-elec-gray pb-2 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                  Personal Details
                </h3>
                <div className="space-y-2">
                  <Label htmlFor="inspectorName">Inspector Name *</Label>
                  <Input
                    id="inspectorName"
                    value={formData.inspectorName || ''}
                    onChange={(e) => onUpdate('inspectorName', e.target.value)}
                    placeholder="Full name of the inspector"
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                </div>
              </div>

              {/* Qualifications */}
              <div className="space-y-3 sm:space-y-4">
                <div className="bg-gradient-to-r from-elec-yellow/20 to-amber-600/20 border border-elec-yellow/30 rounded-lg px-4 py-3">
                  <h3 className="text-base sm:text-lg font-semibold text-foreground flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow"></div>
                    Qualifications *
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-card/50 rounded-lg border border-border">
                  {availableQualifications.map((qualification) => (
                    <div
                      key={qualification}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                      onClick={() => toggleQualification(qualification)}
                    >
                      <Checkbox
                        id={qualification}
                        checked={selectedQualifications.includes(qualification)}
                        onCheckedChange={() => toggleQualification(qualification)}
                        className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                      />
                      <Label
                        htmlFor={qualification}
                        className="text-sm cursor-pointer leading-tight flex-1"
                      >
                        {qualification}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="my-6" />

              {/* Company Branding */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-base sm:text-lg font-semibold text-foreground border-b border-elec-gray pb-2 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                  Company Branding
                </h3>

                {/* Company Logo */}
                <div className="space-y-4">
                  <div className="space-y-3">
                    <Label>Company Logo</Label>
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
                          className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-purple-400 hover:bg-purple-500/5 transition-all">
                        <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">Upload company logo</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="hidden"
                          id="logo-upload"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => document.getElementById('logo-upload')?.click()}
                          className="text-xs border-white/20"
                        >
                          Choose File
                        </Button>
                        <p className="text-xs text-muted-foreground mt-2">JPG, PNG, GIF or WebP (max 5MB)</p>
                      </div>
                    )}
                  </div>

                  {/* Branding Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyTagline">Company Tagline</Label>
                      <Input
                        id="companyTagline"
                        value={formData.companyTagline || ''}
                        onChange={(e) => onUpdate('companyTagline', e.target.value)}
                        placeholder="Professional Electrical Services"
                        className="h-11 text-base touch-manipulation border-white/30 focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyWebsite">Website</Label>
                      <Input
                        id="companyWebsite"
                        value={formData.companyWebsite || ''}
                        onChange={(e) => onUpdate('companyWebsite', e.target.value)}
                        placeholder="www.yourcompany.co.uk"
                        className="h-11 text-base touch-manipulation border-white/30 focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="companyAccentColor">Accent Colour</Label>
                      <div className="flex gap-2">
                        <Input
                          id="companyAccentColor"
                          type="color"
                          value={formData.companyAccentColor || '#3b82f6'}
                          onChange={(e) => onUpdate('companyAccentColor', e.target.value)}
                          className="w-16 h-11 p-1 border-white/30 focus:border-purple-500 focus:ring-purple-500 cursor-pointer"
                        />
                        <Input
                          value={formData.companyAccentColor || '#3b82f6'}
                          onChange={(e) => onUpdate('companyAccentColor', e.target.value)}
                          placeholder="#3b82f6"
                          className="flex-1 h-11 text-base touch-manipulation border-white/30 focus:border-purple-500 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Quick Fill Templates */}
                  <div className="space-y-2">
                    <Label>Quick Fill Templates</Label>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickFillBranding('electrical-contractor')}
                        className="text-xs border-white/20 hover:bg-white/5"
                      >
                        <Palette className="h-3 w-3 mr-1" />
                        Electrical Contractor
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickFillBranding('niceic-approved')}
                        className="text-xs border-white/20 hover:bg-white/5"
                      >
                        <Palette className="h-3 w-3 mr-1" />
                        NICEIC Approved
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickFillBranding('independent')}
                        className="text-xs border-white/20 hover:bg-white/5"
                      >
                        <Palette className="h-3 w-3 mr-1" />
                        Independent Engineer
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Company Details */}
              <div className="space-y-3 sm:space-y-4">
                <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 rounded-lg px-4 py-3 flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-semibold text-foreground flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                    Company Details
                  </h3>
                  <InspectorProfileDialog onProfileSelected={handleProfileSelect} />
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={formData.companyName || ''}
                      onChange={(e) => onUpdate('companyName', e.target.value)}
                      placeholder="Your Company Name Ltd"
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyAddress">Company Address</Label>
                    <Textarea
                      id="companyAddress"
                      value={formData.companyAddress || ''}
                      onChange={(e) => onUpdate('companyAddress', e.target.value)}
                      placeholder="Full company address including postcode"
                      rows={2}
                      className="touch-manipulation text-base min-h-[100px] focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyPhone">Company Phone</Label>
                      <Input
                        id="companyPhone"
                        type="tel"
                        value={formData.companyPhone || ''}
                        onChange={(e) => onUpdate('companyPhone', e.target.value)}
                        placeholder="Company phone number"
                        className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyEmail">Company Email</Label>
                      <Input
                        id="companyEmail"
                        type="email"
                        value={formData.companyEmail || ''}
                        onChange={(e) => onUpdate('companyEmail', e.target.value)}
                        placeholder="Company email address"
                        className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="registrationNumber">Registration Number</Label>
                    <Input
                      id="registrationNumber"
                      value={formData.registrationNumber || ''}
                      onChange={(e) => onUpdate('registrationNumber', e.target.value)}
                      placeholder="NICEIC/NAPIT/Company registration number"
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default EICRInspectorDetails;
