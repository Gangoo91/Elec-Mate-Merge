import React, { useEffect, useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import SectionHeader from '@/components/ui/section-header';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Shield, FileCheck, User, PenTool, Hammer, Search, Calendar, MapPin, Phone, Building2, FileWarning, ClipboardCheck, ChevronDown, Wrench, UserCheck, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SignatureInput from '@/components/signature/SignatureInput';
import { useInspectorProfiles } from '@/hooks/useInspectorProfiles';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useHaptics } from '@/hooks/useHaptics';

interface EICDeclarationsProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

// Reusable glass card component for consistent styling
const GlassCard = ({ children, className, color = 'white' }: { children: React.ReactNode; className?: string; color?: string }) => {
  const borderColors: Record<string, string> = {
    white: 'border-white/[0.08]',
    blue: 'border-blue-500/20',
    green: 'border-green-500/20',
    amber: 'border-amber-500/20',
    purple: 'border-purple-500/20',
    orange: 'border-orange-500/20',
  };

  return (
    <div className={cn(
      "rounded-xl bg-white/[0.02] backdrop-blur-sm border p-5",
      borderColors[color] || borderColors.white,
      className
    )}>
      {children}
    </div>
  );
};

// Sub-section header component
const SubSectionHeader = ({ icon: Icon, title, color }: { icon: any; title: string; color: string }) => (
  <div className="flex items-center gap-2.5 mb-4">
    <div className={cn("p-1.5 rounded-lg", `bg-${color}/10`)}>
      <Icon className={cn("h-4 w-4", `text-${color}`)} />
    </div>
    <h4 className={cn("text-sm font-semibold", `text-${color}`)}>{title}</h4>
  </div>
);

const EICDeclarations: React.FC<EICDeclarationsProps> = ({ formData, onUpdate }) => {
  const isMobile = useIsMobile();
  const haptics = useHaptics();
  const { getDefaultProfile } = useInspectorProfiles();
  const { toast } = useToast();
  const [isInitialMount, setIsInitialMount] = useState(true);
  const [openSections, setOpenSections] = useState({
    designer: true,
    constructor: true,
    inspector: true
  });

  const toggleSection = (section: keyof typeof openSections) => {
    haptics.tap();
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Check if all required fields are completed
  const isDesignerComplete = formData.designerName && formData.designerSignature;
  const isConstructorComplete = formData.constructorName && formData.constructorSignature;
  const isInspectorComplete = formData.inspectorName && formData.inspectorSignature;
  const allDeclarationsComplete = isDesignerComplete && isConstructorComplete && isInspectorComplete;

  const getCompletionPercentage = (section: string) => {
    switch (section) {
      case 'designer': {
        const fields = ['designerName', 'designerSignature'];
        const filled = fields.filter(f => formData[f]).length;
        return Math.round((filled / fields.length) * 100);
      }
      case 'constructor': {
        const fields = ['constructorName', 'constructorSignature'];
        const filled = fields.filter(f => formData[f]).length;
        return Math.round((filled / fields.length) * 100);
      }
      case 'inspector': {
        const fields = ['inspectorName', 'inspectorSignature'];
        const filled = fields.filter(f => formData[f]).length;
        return Math.round((filled / fields.length) * 100);
      }
      default:
        return 0;
    }
  };

  // Auto-fill from default profile on initial mount
  useEffect(() => {
    if (isInitialMount) {
      const defaultProfile = getDefaultProfile();
      const areAllFieldsEmpty = !formData.designerName && !formData.constructorName && !formData.inspectorName;

      if (defaultProfile && areAllFieldsEmpty) {
        loadProfileToSection('designer', defaultProfile);
        loadProfileToSection('constructor', defaultProfile);
        loadProfileToSection('inspector', defaultProfile);
      }
      setIsInitialMount(false);
    }
  }, [isInitialMount]);

  // Load profile data into a specific declaration section
  const loadProfileToSection = (section: 'designer' | 'constructor' | 'inspector', profile?: any) => {
    const selectedProfile = profile || getDefaultProfile();
    if (!selectedProfile) return;

    const today = new Date().toISOString().split('T')[0];
    const qualifications = Array.isArray(selectedProfile.qualifications)
      ? selectedProfile.qualifications.join(', ')
      : '';

    onUpdate(`${section}Name`, selectedProfile.name);
    onUpdate(`${section}Qualifications`, qualifications);
    onUpdate(`${section}Company`, selectedProfile.companyName);
    onUpdate(`${section}Address`, selectedProfile.companyAddress || '');
    onUpdate(`${section}Postcode`, selectedProfile.companyAddress?.match(/[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}/i)?.[0] || '');
    onUpdate(`${section}Phone`, selectedProfile.companyPhone || '');
    onUpdate(`${section}Date`, today);
    if (selectedProfile.signatureData) {
      onUpdate(`${section}Signature`, selectedProfile.signatureData);
    }
  };

  // Manual fill button handler with haptic feedback
  const handleFillFromProfile = (section: 'designer' | 'constructor' | 'inspector') => {
    const defaultProfile = getDefaultProfile();
    if (!defaultProfile) {
      toast({
        title: 'No Profile Found',
        description: 'Please create an inspector profile in Settings first.',
        variant: 'destructive'
      });
      return;
    }
    haptics.tap();
    loadProfileToSection(section, defaultProfile);
    toast({
      title: 'Profile Applied',
      description: 'Your inspector profile details have been filled in.'
    });
  };

  return (
    <div className={cn("space-y-4", isMobile && "-mx-4")}>
      {/* Legal Notice */}
      <div className={cn(isMobile && "px-4")}>
        <GlassCard color="amber" className="border-amber-500/30 bg-amber-500/5">
          <div className="flex gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 h-fit">
              <Shield className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-amber-300 mb-1">Legal Requirement</p>
              <p className="text-sm text-white leading-relaxed">
                This EIC must be completed by competent persons responsible for the design, construction,
                and inspection & testing of the electrical installation per BS 7671.
              </p>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Use Saved Profile Button */}
      {getDefaultProfile() && (
        <div className={cn(isMobile && "px-4")}>
          <Button
            onClick={() => {
              haptics.tap();
              const profile = getDefaultProfile();
              if (profile) {
                loadProfileToSection('designer', profile);
                loadProfileToSection('constructor', profile);
                loadProfileToSection('inspector', profile);
                toast({
                  title: "Profile Loaded",
                  description: "Your saved profile has been applied to all declaration sections.",
                });
              }
            }}
            className="h-14 w-full touch-manipulation bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold rounded-xl active:scale-[0.98] transition-transform"
            size="lg"
          >
            <User className="h-5 w-5 mr-2" />
            Load My Saved Details
          </Button>
        </div>
      )}

      {/* Designer Declaration */}
      <div className={cn(isMobile ? "" : "eicr-section-card")}>
        <Collapsible open={openSections.designer} onOpenChange={() => toggleSection('designer')}>
          {isMobile ? (
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-y border-border/20">
                <div className="h-10 w-10 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                  <PenTool className="h-5 w-5 text-blue-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Designer Declaration</h3>
                  <span className="text-xs text-muted-foreground">{getCompletionPercentage('designer')}% complete</span>
                </div>
                <ChevronDown className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform shrink-0",
                  openSections.designer && "rotate-180"
                )} />
              </div>
            </CollapsibleTrigger>
          ) : (
            <CollapsibleTrigger className="w-full">
              <SectionHeader
                title="Designer Declaration"
                icon={PenTool}
                isOpen={openSections.designer}
                color="blue-500"
                completionPercentage={getCompletionPercentage('designer')}
              />
            </CollapsibleTrigger>
          )}
          <CollapsibleContent>
            <div className="p-4 sm:p-5 space-y-5">
              {/* Declaration Text */}
              <GlassCard className="bg-blue-500/5 border-blue-500/20">
                <p className="text-xs text-white/70 leading-relaxed">
                  I being the person responsible for the design of the electrical installation, having exercised
                  reasonable skill and care when carrying out the design hereby CERTIFY that the design work for which
                  I have been responsible is to the best of my knowledge and belief in accordance with{' '}
                  <span className="text-blue-400 font-medium">BS 7671:2018</span>, amended to{' '}
                  <Input
                    id="designerBs7671Date"
                    value={formData.designerBs7671Date || ''}
                    onChange={(e) => onUpdate('designerBs7671Date', e.target.value)}
                    placeholder="date"
                    className="inline-block w-24 h-7 text-xs px-2 bg-white/5 border-blue-500/30 focus:border-blue-500 rounded-lg"
                  />{' '}
                  except for the departures, if any, detailed below.
                </p>
              </GlassCard>

              {/* Departures & Exceptions */}
              <GlassCard color="blue">
                <SubSectionHeader icon={FileWarning} title="Departures & Exceptions" color="blue-400" />
                <div className="space-y-5">
                  <div className="space-y-2.5">
                    <Label className="text-sm text-white">
                      Details of departures from BS 7671 (Regs 120.3, 133.1.3, 133.5):
                    </Label>
                    <Textarea
                      id="designerDepartures"
                      value={formData.designerDepartures || ''}
                      onChange={(e) => onUpdate('designerDepartures', e.target.value)}
                      placeholder="Enter departures or 'None'"
                      rows={2}
                      className="text-base touch-manipulation min-h-[70px] bg-white/[0.03] border-white/10 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2.5">
                    <Label className="text-sm text-white">
                      Details of permitted exceptions (Reg 411.3.3):
                    </Label>
                    <Textarea
                      id="permittedExceptions"
                      value={formData.permittedExceptions || ''}
                      onChange={(e) => onUpdate('permittedExceptions', e.target.value)}
                      placeholder="Enter exceptions or 'None'"
                      rows={2}
                      className="text-base touch-manipulation min-h-[70px] bg-white/[0.03] border-white/10 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                    />
                  </div>
                  <label className="flex items-center gap-3 p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 cursor-pointer touch-manipulation active:scale-[0.99] transition-transform">
                    <Checkbox
                      id="riskAssessmentAttached"
                      checked={formData.riskAssessmentAttached === true}
                      onCheckedChange={(checked) => onUpdate('riskAssessmentAttached', checked)}
                      className="h-5 w-5 border-purple-500/40 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                    />
                    <span className="text-sm text-purple-200">Risk assessment attached to this Certificate</span>
                  </label>
                </div>
              </GlassCard>

              {/* Signatory Details */}
              <GlassCard color="blue">
                <div className="flex items-center justify-between mb-4">
                  <SubSectionHeader icon={User} title="Signatory Details" color="blue-400" />
                  <Button
                    onClick={() => handleFillFromProfile('designer')}
                    variant="outline"
                    size="sm"
                    className="h-9 bg-blue-500/10 hover:bg-blue-500/20 border-blue-500/30 text-blue-300 text-xs font-medium rounded-lg touch-manipulation"
                  >
                    <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                    Fill from Profile
                  </Button>
                </div>
                <div className="space-y-5">
                  {/* Name & Company Row */}
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2.5">
                      <Label className="text-sm text-white">Name *</Label>
                      <Input
                        id="designerName"
                        placeholder="Full name"
                        value={formData.designerName || ''}
                        onChange={(e) => onUpdate('designerName', e.target.value)}
                        className={cn(
                          "h-12 text-base touch-manipulation bg-white/[0.03] border-white/10 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl",
                          !formData.designerName && 'border-red-500/30'
                        )}
                      />
                    </div>
                    <div className="space-y-2.5">
                      <Label className="text-sm text-white">Company / For and on behalf of</Label>
                      <Input
                        id="designerCompany"
                        placeholder="Company name"
                        value={formData.designerCompany || ''}
                        onChange={(e) => onUpdate('designerCompany', e.target.value)}
                        className="h-12 text-base touch-manipulation bg-white/[0.03] border-white/10 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-2.5">
                    <Label className="text-sm text-white">Address</Label>
                    <Textarea
                      id="designerAddress"
                      value={formData.designerAddress || ''}
                      onChange={(e) => onUpdate('designerAddress', e.target.value)}
                      placeholder="Full business address"
                      rows={2}
                      className="text-base touch-manipulation min-h-[70px] bg-white/[0.03] border-white/10 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                    />
                  </div>

                  {/* Postcode, Tel, Date Row - Stack on mobile */}
                  <div className={cn(
                    "grid gap-4",
                    isMobile ? "grid-cols-1" : "grid-cols-3"
                  )}>
                    <div className="space-y-2.5">
                      <Label className="text-sm text-white">Postcode</Label>
                      <Input
                        id="designerPostcode"
                        value={formData.designerPostcode || ''}
                        onChange={(e) => onUpdate('designerPostcode', e.target.value)}
                        placeholder="AB1 2CD"
                        className="h-12 text-base touch-manipulation bg-white/[0.03] border-white/10 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2.5">
                      <Label className="text-sm text-white">Tel No</Label>
                      <Input
                        id="designerPhone"
                        type="tel"
                        value={formData.designerPhone || ''}
                        onChange={(e) => onUpdate('designerPhone', e.target.value)}
                        placeholder="Phone number"
                        className="h-12 text-base touch-manipulation bg-white/[0.03] border-white/10 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2.5">
                      <Label className="text-sm text-white">Date</Label>
                      <Input
                        id="designerDate"
                        type="date"
                        value={formData.designerDate || new Date().toISOString().split('T')[0]}
                        onChange={(e) => onUpdate('designerDate', e.target.value)}
                        className="h-12 text-base touch-manipulation bg-white/[0.03] border-white/10 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Signature */}
              <GlassCard color="blue">
                <SubSectionHeader icon={PenTool} title="Digital Signature *" color="blue-400" />
                <SignatureInput
                  value={formData.designerSignature}
                  onChange={(signature) => onUpdate('designerSignature', signature)}
                  placeholder="Draw or type designer signature"
                  required={true}
                />
              </GlassCard>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Constructor Declaration */}
      <div className={cn(isMobile ? "" : "eicr-section-card")}>
        <Collapsible open={openSections.constructor} onOpenChange={() => toggleSection('constructor')}>
          {isMobile ? (
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-y border-border/20">
                <div className="h-10 w-10 rounded-xl bg-orange-500/20 flex items-center justify-center shrink-0">
                  <Wrench className="h-5 w-5 text-orange-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Constructor Declaration</h3>
                  <span className="text-xs text-muted-foreground">{getCompletionPercentage('constructor')}% complete</span>
                </div>
                <ChevronDown className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform shrink-0",
                  openSections.constructor && "rotate-180"
                )} />
              </div>
            </CollapsibleTrigger>
          ) : (
            <CollapsibleTrigger className="w-full">
              <SectionHeader
                title="Constructor Declaration"
                icon={Hammer}
                isOpen={openSections.constructor}
                color="green-500"
                completionPercentage={getCompletionPercentage('constructor')}
              />
            </CollapsibleTrigger>
          )}
          <CollapsibleContent>
            <div className={cn("space-y-5", isMobile ? "px-4 py-4" : "p-4 sm:p-5")}>
              {/* Same as Designer Toggle */}
              <label className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/30 cursor-pointer touch-manipulation active:scale-[0.99] transition-transform">
                <Checkbox
                  id="sameAsDesigner"
                  checked={formData.sameAsDesigner || false}
                  onCheckedChange={(checked) => {
                    onUpdate('sameAsDesigner', checked);
                    if (checked) {
                      onUpdate('constructorName', formData.designerName);
                      onUpdate('constructorQualifications', formData.designerQualifications);
                      onUpdate('constructorCompany', formData.designerCompany);
                      onUpdate('constructorAddress', formData.designerAddress);
                      onUpdate('constructorPostcode', formData.designerPostcode);
                      onUpdate('constructorPhone', formData.designerPhone);
                      onUpdate('constructorDate', formData.designerDate);
                      onUpdate('constructorSignature', formData.designerSignature);
                      onUpdate('constructorBs7671Date', formData.designerBs7671Date);
                      onUpdate('constructorDepartures', formData.designerDepartures);
                    }
                  }}
                  className="h-5 w-5 border-green-500/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                />
                <span className="text-sm font-medium text-green-200">Same person as Designer</span>
              </label>

              {/* Declaration Text */}
              <GlassCard className={cn("bg-green-500/5 border-green-500/20", formData.sameAsDesigner && 'opacity-50')}>
                <p className="text-xs text-white/70 leading-relaxed">
                  I being the person responsible for the construction of the electrical installation, having exercised
                  reasonable skill and care when carrying out the construction work hereby CERTIFY that the construction
                  work for which I have been responsible is to the best of my knowledge and belief in accordance with{' '}
                  <span className="text-green-400 font-medium">BS 7671:2018</span>, amended to{' '}
                  <Input
                    id="constructorBs7671Date"
                    value={formData.constructorBs7671Date || ''}
                    onChange={(e) => onUpdate('constructorBs7671Date', e.target.value)}
                    placeholder="date"
                    disabled={formData.sameAsDesigner}
                    className="inline-block w-24 h-7 text-xs px-2 bg-white/5 border-green-500/30 focus:border-green-500 rounded-lg disabled:opacity-50"
                  />{' '}
                  except for the departures, if any, detailed below.
                </p>
              </GlassCard>

              {/* Departures */}
              <GlassCard color="green" className={cn(formData.sameAsDesigner && 'opacity-50 pointer-events-none')}>
                <SubSectionHeader icon={FileWarning} title="Departures from BS 7671" color="green-400" />
                <div className="space-y-2.5">
                  <Label className="text-sm text-white">
                    Details of departures (Regs 120.3, 133.1.3, 133.5):
                  </Label>
                  <Textarea
                    id="constructorDepartures"
                    value={formData.constructorDepartures || ''}
                    onChange={(e) => onUpdate('constructorDepartures', e.target.value)}
                    placeholder="Enter departures or 'None'"
                    rows={2}
                    disabled={formData.sameAsDesigner}
                    className="text-base touch-manipulation min-h-[70px] bg-white/[0.03] border-white/10 focus:border-green-500 focus:ring-green-500/20 rounded-xl"
                  />
                </div>
              </GlassCard>

              {/* Signatory Details */}
              <GlassCard color="green" className={cn(formData.sameAsDesigner && 'opacity-50 pointer-events-none')}>
                <div className="flex items-center justify-between mb-4">
                  <SubSectionHeader icon={User} title="Signatory Details" color="green-400" />
                  <Button
                    onClick={() => handleFillFromProfile('constructor')}
                    variant="outline"
                    size="sm"
                    disabled={formData.sameAsDesigner}
                    className="h-9 bg-green-500/10 hover:bg-green-500/20 border-green-500/30 text-green-300 text-xs font-medium rounded-lg touch-manipulation"
                  >
                    <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                    Fill from Profile
                  </Button>
                </div>
                <div className="space-y-5">
                  {/* Name & Company Row */}
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2.5">
                      <Label className="text-sm text-white">Name *</Label>
                      <Input
                        id="constructorName"
                        placeholder="Full name"
                        value={formData.constructorName || ''}
                        onChange={(e) => onUpdate('constructorName', e.target.value)}
                        disabled={formData.sameAsDesigner}
                        className={cn(
                          "h-12 text-base touch-manipulation bg-white/[0.03] border-white/10 focus:border-green-500 focus:ring-green-500/20 rounded-xl",
                          !formData.constructorName && 'border-red-500/30'
                        )}
                      />
                    </div>
                    <div className="space-y-2.5">
                      <Label className="text-sm text-white">Company / For and on behalf of</Label>
                      <Input
                        id="constructorCompany"
                        placeholder="Company name"
                        value={formData.constructorCompany || ''}
                        onChange={(e) => onUpdate('constructorCompany', e.target.value)}
                        disabled={formData.sameAsDesigner}
                        className="h-12 text-base touch-manipulation bg-white/[0.03] border-white/10 focus:border-green-500 focus:ring-green-500/20 rounded-xl"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-2.5">
                    <Label className="text-sm text-white">Address</Label>
                    <Textarea
                      id="constructorAddress"
                      value={formData.constructorAddress || ''}
                      onChange={(e) => onUpdate('constructorAddress', e.target.value)}
                      placeholder="Full business address"
                      rows={2}
                      disabled={formData.sameAsDesigner}
                      className="text-base touch-manipulation min-h-[70px] bg-white/[0.03] border-white/10 focus:border-green-500 focus:ring-green-500/20 rounded-xl"
                    />
                  </div>

                  {/* Postcode, Tel, Date Row - Stack on mobile */}
                  <div className={cn(
                    "grid gap-4",
                    isMobile ? "grid-cols-1" : "grid-cols-3"
                  )}>
                    <div className="space-y-2.5">
                      <Label className="text-sm text-white">Postcode</Label>
                      <Input
                        id="constructorPostcode"
                        value={formData.constructorPostcode || ''}
                        onChange={(e) => onUpdate('constructorPostcode', e.target.value)}
                        placeholder="AB1 2CD"
                        disabled={formData.sameAsDesigner}
                        className="h-12 text-base touch-manipulation bg-white/[0.03] border-white/10 focus:border-green-500 focus:ring-green-500/20 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2.5">
                      <Label className="text-sm text-white">Tel No</Label>
                      <Input
                        id="constructorPhone"
                        type="tel"
                        value={formData.constructorPhone || ''}
                        onChange={(e) => onUpdate('constructorPhone', e.target.value)}
                        placeholder="Phone number"
                        disabled={formData.sameAsDesigner}
                        className="h-12 text-base touch-manipulation bg-white/[0.03] border-white/10 focus:border-green-500 focus:ring-green-500/20 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2.5">
                      <Label className="text-sm text-white">Date</Label>
                      <Input
                        id="constructorDate"
                        type="date"
                        value={formData.constructorDate || new Date().toISOString().split('T')[0]}
                        onChange={(e) => onUpdate('constructorDate', e.target.value)}
                        disabled={formData.sameAsDesigner}
                        className="h-12 text-base touch-manipulation bg-white/[0.03] border-white/10 focus:border-green-500 focus:ring-green-500/20 rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Signature */}
              <GlassCard color="green" className={cn(formData.sameAsDesigner && 'opacity-50 pointer-events-none')}>
                <SubSectionHeader icon={PenTool} title="Digital Signature *" color="green-400" />
                <SignatureInput
                  value={formData.constructorSignature}
                  onChange={(signature) => onUpdate('constructorSignature', signature)}
                  placeholder="Draw or type constructor signature"
                  required={true}
                />
              </GlassCard>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Inspector Declaration */}
      <div className={cn(isMobile ? "" : "eicr-section-card")}>
        <Collapsible open={openSections.inspector} onOpenChange={() => toggleSection('inspector')}>
          {isMobile ? (
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-y border-border/20">
                <div className="h-10 w-10 rounded-xl bg-green-500/20 flex items-center justify-center shrink-0">
                  <UserCheck className="h-5 w-5 text-green-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Inspector Declaration</h3>
                  <span className="text-xs text-muted-foreground">{getCompletionPercentage('inspector')}% complete</span>
                </div>
                <ChevronDown className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform shrink-0",
                  openSections.inspector && "rotate-180"
                )} />
              </div>
            </CollapsibleTrigger>
          ) : (
            <CollapsibleTrigger className="w-full">
              <SectionHeader
                title="Inspector Declaration"
                icon={Search}
                isOpen={openSections.inspector}
                color="amber-500"
                completionPercentage={getCompletionPercentage('inspector')}
              />
            </CollapsibleTrigger>
          )}
          <CollapsibleContent>
            <div className={cn("space-y-5", isMobile ? "px-4 py-4" : "p-4 sm:p-5")}>
              {/* Same as Constructor Toggle */}
              <label className="flex items-center gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 cursor-pointer touch-manipulation active:scale-[0.99] transition-transform">
                <Checkbox
                  id="sameAsConstructor"
                  checked={formData.sameAsConstructor || false}
                  onCheckedChange={(checked) => {
                    onUpdate('sameAsConstructor', checked);
                    if (checked) {
                      onUpdate('inspectorName', formData.constructorName);
                      onUpdate('inspectorQualifications', formData.constructorQualifications);
                      onUpdate('inspectorCompany', formData.constructorCompany);
                      onUpdate('inspectorAddress', formData.constructorAddress);
                      onUpdate('inspectorPostcode', formData.constructorPostcode);
                      onUpdate('inspectorPhone', formData.constructorPhone);
                      onUpdate('inspectorDate', formData.constructorDate);
                      onUpdate('inspectorSignature', formData.constructorSignature);
                      onUpdate('inspectorBs7671Date', formData.constructorBs7671Date);
                      onUpdate('inspectorDepartures', formData.constructorDepartures);
                    }
                  }}
                  className="h-5 w-5 border-amber-500/40 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                />
                <span className="text-sm font-medium text-amber-200">Same person as Constructor</span>
              </label>

              {/* Declaration Text */}
              <GlassCard className={cn("bg-amber-500/5 border-amber-500/20", formData.sameAsConstructor && 'opacity-50')}>
                <p className="text-xs text-white/70 leading-relaxed">
                  I being the person responsible for the inspection & testing of the electrical installation, having
                  exercised reasonable skill and care when carrying out the inspection & testing hereby CERTIFY that
                  the work for which I have been responsible is to the best of my knowledge and belief in accordance
                  with <span className="text-amber-400 font-medium">BS 7671:2018</span>, amended to{' '}
                  <Input
                    id="inspectorBs7671Date"
                    value={formData.inspectorBs7671Date || ''}
                    onChange={(e) => onUpdate('inspectorBs7671Date', e.target.value)}
                    placeholder="date"
                    disabled={formData.sameAsConstructor}
                    className="inline-block w-24 h-7 text-xs px-2 bg-white/5 border-amber-500/30 focus:border-amber-500 rounded-lg disabled:opacity-50"
                  />{' '}
                  except for the departures, if any, detailed below.
                </p>
              </GlassCard>

              {/* Departures */}
              <GlassCard color="amber" className={cn(formData.sameAsConstructor && 'opacity-50 pointer-events-none')}>
                <SubSectionHeader icon={FileWarning} title="Departures from BS 7671" color="amber-400" />
                <div className="space-y-2.5">
                  <Label className="text-sm text-white">
                    Details of departures (Regs 120.3, 133.1.3, 133.5):
                  </Label>
                  <Textarea
                    id="inspectorDepartures"
                    value={formData.inspectorDepartures || ''}
                    onChange={(e) => onUpdate('inspectorDepartures', e.target.value)}
                    placeholder="Enter departures or 'None'"
                    rows={2}
                    disabled={formData.sameAsConstructor}
                    className="text-base touch-manipulation min-h-[70px] bg-white/[0.03] border-white/10 focus:border-amber-500 focus:ring-amber-500/20 rounded-xl"
                  />
                </div>
              </GlassCard>

              {/* Signatory Details */}
              <GlassCard color="amber" className={cn(formData.sameAsConstructor && 'opacity-50 pointer-events-none')}>
                <div className="flex items-center justify-between mb-4">
                  <SubSectionHeader icon={User} title="Signatory Details" color="amber-400" />
                  <Button
                    onClick={() => handleFillFromProfile('inspector')}
                    variant="outline"
                    size="sm"
                    disabled={formData.sameAsConstructor}
                    className="h-9 bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/30 text-amber-300 text-xs font-medium rounded-lg touch-manipulation"
                  >
                    <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                    Fill from Profile
                  </Button>
                </div>
                <div className="space-y-5">
                  {/* Name & Company Row */}
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2.5">
                      <Label className="text-sm text-white">Name *</Label>
                      <Input
                        id="inspectorName"
                        placeholder="Full name"
                        value={formData.inspectorName || ''}
                        onChange={(e) => onUpdate('inspectorName', e.target.value)}
                        disabled={formData.sameAsConstructor}
                        className={cn(
                          "h-12 text-base touch-manipulation bg-white/[0.03] border-white/10 focus:border-amber-500 focus:ring-amber-500/20 rounded-xl",
                          !formData.inspectorName && 'border-red-500/30'
                        )}
                      />
                    </div>
                    <div className="space-y-2.5">
                      <Label className="text-sm text-white">Company / For and on behalf of</Label>
                      <Input
                        id="inspectorCompany"
                        placeholder="Company name"
                        value={formData.inspectorCompany || ''}
                        onChange={(e) => onUpdate('inspectorCompany', e.target.value)}
                        disabled={formData.sameAsConstructor}
                        className="h-12 text-base touch-manipulation bg-white/[0.03] border-white/10 focus:border-amber-500 focus:ring-amber-500/20 rounded-xl"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-2.5">
                    <Label className="text-sm text-white">Address</Label>
                    <Textarea
                      id="inspectorAddress"
                      value={formData.inspectorAddress || ''}
                      onChange={(e) => onUpdate('inspectorAddress', e.target.value)}
                      placeholder="Full business address"
                      rows={2}
                      disabled={formData.sameAsConstructor}
                      className="text-base touch-manipulation min-h-[70px] bg-white/[0.03] border-white/10 focus:border-amber-500 focus:ring-amber-500/20 rounded-xl"
                    />
                  </div>

                  {/* Postcode, Tel, Date Row - Stack on mobile */}
                  <div className={cn(
                    "grid gap-4",
                    isMobile ? "grid-cols-1" : "grid-cols-3"
                  )}>
                    <div className="space-y-2.5">
                      <Label className="text-sm text-white">Postcode</Label>
                      <Input
                        id="inspectorPostcode"
                        value={formData.inspectorPostcode || ''}
                        onChange={(e) => onUpdate('inspectorPostcode', e.target.value)}
                        placeholder="AB1 2CD"
                        disabled={formData.sameAsConstructor}
                        className="h-12 text-base touch-manipulation bg-white/[0.03] border-white/10 focus:border-amber-500 focus:ring-amber-500/20 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2.5">
                      <Label className="text-sm text-white">Tel No</Label>
                      <Input
                        id="inspectorPhone"
                        type="tel"
                        value={formData.inspectorPhone || ''}
                        onChange={(e) => onUpdate('inspectorPhone', e.target.value)}
                        placeholder="Phone number"
                        disabled={formData.sameAsConstructor}
                        className="h-12 text-base touch-manipulation bg-white/[0.03] border-white/10 focus:border-amber-500 focus:ring-amber-500/20 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2.5">
                      <Label className="text-sm text-white">Date</Label>
                      <Input
                        id="inspectorDate"
                        type="date"
                        value={formData.inspectorDate || new Date().toISOString().split('T')[0]}
                        onChange={(e) => onUpdate('inspectorDate', e.target.value)}
                        disabled={formData.sameAsConstructor}
                        className="h-12 text-base touch-manipulation bg-white/[0.03] border-white/10 focus:border-amber-500 focus:ring-amber-500/20 rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Next Inspection */}
              <GlassCard color="purple">
                <SubSectionHeader icon={Calendar} title="Next Inspection" color="purple-400" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2.5">
                    <Label className="text-sm text-white">Interval (months)</Label>
                    <Input
                      id="nextInspectionInterval"
                      type="number"
                      value={formData.nextInspectionInterval || ''}
                      onChange={(e) => onUpdate('nextInspectionInterval', e.target.value)}
                      placeholder="e.g., 60"
                      className="h-12 text-base touch-manipulation bg-white/[0.03] border-white/10 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl"
                    />
                    <p className="text-xs text-white/70">60m domestic, 12-60m commercial</p>
                  </div>
                  <div className="space-y-2.5">
                    <Label className="text-sm text-white">Next Date</Label>
                    <Input
                      id="nextInspectionDate"
                      type="date"
                      value={formData.nextInspectionDate || ''}
                      onChange={(e) => onUpdate('nextInspectionDate', e.target.value)}
                      className="h-12 text-base touch-manipulation bg-white/[0.03] border-white/10 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl"
                    />
                  </div>
                </div>
              </GlassCard>

              {/* Comments on Existing Installation */}
              <GlassCard color="orange">
                <SubSectionHeader icon={ClipboardCheck} title="Comments on Existing Installation" color="orange-400" />
                <div className="space-y-2.5">
                  <Label className="text-sm text-white">
                    Record observations about the existing installation (for additions/alterations):
                  </Label>
                  <Textarea
                    id="existingInstallationComments"
                    value={formData.existingInstallationComments || ''}
                    onChange={(e) => onUpdate('existingInstallationComments', e.target.value)}
                    placeholder="Any observations affecting the new work..."
                    rows={3}
                    className="text-base touch-manipulation min-h-[80px] bg-white/[0.03] border-white/10 focus:border-orange-500 focus:ring-orange-500/20 rounded-xl"
                  />
                </div>
              </GlassCard>

              {/* Signature */}
              <GlassCard color="amber" className={cn(formData.sameAsConstructor && 'opacity-50 pointer-events-none')}>
                <SubSectionHeader icon={PenTool} title="Digital Signature *" color="amber-400" />
                <SignatureInput
                  value={formData.inspectorSignature}
                  onChange={(signature) => onUpdate('inspectorSignature', signature)}
                  placeholder="Draw or type inspector signature"
                  required={true}
                />
              </GlassCard>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Final Validation Summary */}
      {allDeclarationsComplete ? (
        <GlassCard className="border-green-500/30 bg-green-500/10">
          <div className="flex gap-3">
            <div className="p-2 rounded-lg bg-green-500/20 h-fit">
              <FileCheck className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-green-300 mb-1">All Declarations Complete</p>
              <p className="text-sm text-white">
                Proceed to the Certificate tab to complete authorisation signatures and generate the EIC.
              </p>
            </div>
          </div>
        </GlassCard>
      ) : (
        <GlassCard className="border-amber-500/30 bg-amber-500/10">
          <div className="flex gap-3">
            <div className="p-2 rounded-lg bg-amber-500/20 h-fit">
              <AlertTriangle className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-amber-300 mb-1">Incomplete Declarations</p>
              <p className="text-sm text-white">
                All three declarations must have names and signatures before the EIC can be finalised.
              </p>
            </div>
          </div>
        </GlassCard>
      )}
    </div>
  );
};

export default EICDeclarations;
