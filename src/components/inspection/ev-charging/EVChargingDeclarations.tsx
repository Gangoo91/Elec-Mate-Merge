import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  ChevronDown,
  Shield,
  User,
  FileCheck,
  AlertTriangle,
  CheckCircle2,
  Receipt,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import SignatureInput from '@/components/signature/SignatureInput';
import { LoadInstallerButton } from './LoadInstallerButton';
import { useEVChargingSmartForm, InstallerDetails } from '@/hooks/inspection/useEVChargingSmartForm';

interface EVChargingDeclarationsProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

const EVChargingDeclarations: React.FC<EVChargingDeclarationsProps> = ({
  formData,
  onUpdate,
}) => {
  const isMobile = useIsMobile();
  const { hasSavedInstallerDetails } = useEVChargingSmartForm();
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    ozev: true,
    handover: true,
    installer: true,
    compliance: true,
  });
  const [detailsLoaded, setDetailsLoaded] = useState(false);

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Handle loading installer details from Business Settings / Inspector Profile
  const handleLoadInstallerDetails = (details: InstallerDetails) => {
    onUpdate('installerName', details.installerName);
    onUpdate('installerCompany', details.installerCompany);
    onUpdate('installerQualifications', details.installerQualifications);
    onUpdate('installerScheme', details.installerScheme);
    onUpdate('installerSchemeNumber', details.installerSchemeNumber);
    onUpdate('installerDate', details.installerDate);
    if (details.installerSignature) {
      onUpdate('installerSignature', details.installerSignature);
    }
    setDetailsLoaded(true);
  };

  const isComplete = formData.installerName && formData.installerSignature && formData.installerScheme;

  return (
    <div className={cn(isMobile ? "space-y-0" : "space-y-6")}>
      {/* OZEV Grant Section */}
      <div className={cn(isMobile ? "" : "eicr-section-card")}>
        <Collapsible open={openSections.ozev} onOpenChange={() => toggleSection('ozev')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-y border-border/20">
                <div className="h-10 w-10 rounded-xl bg-green-500/20 flex items-center justify-center shrink-0">
                  <Receipt className="h-5 w-5 text-green-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">OZEV Grant Details</h3>
                  <span className="text-xs text-muted-foreground">EVHS, WCS schemes</span>
                </div>
                <ChevronDown className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform shrink-0",
                  openSections.ozev && "rotate-180"
                )} />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-green-500/15 flex items-center justify-center">
                    <Receipt className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="text-white font-semibold">OZEV Grant Details</span>
                </div>
                <ChevronDown className={cn("h-5 w-5 text-white/40 transition-transform", openSections.ozev && "rotate-180")} />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn(
              "space-y-4",
              isMobile ? "px-4 py-4" : "px-4 pb-4"
            )}>
              <div className="flex items-start gap-3 p-3 bg-black/40 rounded-lg">
                <Checkbox
                  id="ozevGrantApplicable"
                  checked={formData.ozevGrantApplicable || false}
                  onCheckedChange={(checked) => onUpdate('ozevGrantApplicable', checked)}
                  className="mt-0.5 border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                />
                <div>
                  <Label htmlFor="ozevGrantApplicable" className="cursor-pointer text-base">
                    OZEV Grant Applicable
                  </Label>
                  <p className="text-xs text-muted-foreground">Electric Vehicle Homecharge Scheme (EVHS) or Workplace Charging Scheme (WCS)</p>
                </div>
              </div>

              {formData.ozevGrantApplicable && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-6">
                  <div className="space-y-2">
                    <Label htmlFor="ozevScheme">Grant Scheme</Label>
                    <Select
                      value={formData.ozevScheme || ''}
                      onValueChange={(value) => onUpdate('ozevScheme', value)}
                    >
                      <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow">
                        <SelectValue placeholder="Select scheme" />
                      </SelectTrigger>
                      <SelectContent className="z-[100] bg-background border-border text-foreground">
                        <SelectItem value="EVHS">EVHS - Electric Vehicle Homecharge Scheme</SelectItem>
                        <SelectItem value="WCS">WCS - Workplace Charging Scheme</SelectItem>
                        <SelectItem value="OZEV-flat">OZEV - Flat Owner-Occupier Grant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ozevGrantRef">Grant Reference Number</Label>
                    <Input
                      id="ozevGrantRef"
                      placeholder="e.g., EVHS-12345"
                      value={formData.ozevGrantRef || ''}
                      onChange={(e) => onUpdate('ozevGrantRef', e.target.value)}
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                    />
                  </div>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Handover */}
      <div className={cn(isMobile ? "" : "eicr-section-card")}>
        <Collapsible open={openSections.handover} onOpenChange={() => toggleSection('handover')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                <div className="h-10 w-10 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                  <FileCheck className="h-5 w-5 text-blue-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Handover & Documentation</h3>
                  <span className="text-xs text-muted-foreground">Instructions, manuals</span>
                </div>
                <ChevronDown className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform shrink-0",
                  openSections.handover && "rotate-180"
                )} />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/15 flex items-center justify-center">
                    <FileCheck className="h-4 w-4 text-blue-400" />
                  </div>
                  <span className="text-white font-semibold">Handover & Documentation</span>
                </div>
                <ChevronDown className={cn("h-5 w-5 text-white/40 transition-transform", openSections.handover && "rotate-180")} />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn(
              "space-y-4",
              isMobile ? "px-4 py-4" : "px-4 pb-4"
            )}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-start gap-3 p-3 bg-black/40 rounded-lg">
                  <Checkbox
                    id="userInstructionsProvided"
                    checked={formData.userInstructionsProvided || false}
                    onCheckedChange={(checked) => onUpdate('userInstructionsProvided', checked)}
                    className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                  />
                  <Label htmlFor="userInstructionsProvided" className="cursor-pointer text-sm">
                    User instructions provided
                  </Label>
                </div>
                <div className="flex items-start gap-3 p-3 bg-black/40 rounded-lg">
                  <Checkbox
                    id="operatingManualProvided"
                    checked={formData.operatingManualProvided || false}
                    onCheckedChange={(checked) => onUpdate('operatingManualProvided', checked)}
                    className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                  />
                  <Label htmlFor="operatingManualProvided" className="cursor-pointer text-sm">
                    Operating manual provided
                  </Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialConditions">Special Conditions / Notes</Label>
                <Textarea
                  id="specialConditions"
                  placeholder="Any special conditions, limitations, or notes for the user..."
                  value={formData.specialConditions || ''}
                  onChange={(e) => onUpdate('specialConditions', e.target.value)}
                  className="text-base touch-manipulation min-h-[80px] border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Installer Declaration */}
      <div className={cn(isMobile ? "" : "eicr-section-card")}>
        <Collapsible open={openSections.installer} onOpenChange={() => toggleSection('installer')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                <div className="h-10 w-10 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0">
                  <User className="h-5 w-5 text-purple-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Installer Declaration</h3>
                  <span className="text-xs text-muted-foreground">Name, signature, scheme</span>
                </div>
                <ChevronDown className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform shrink-0",
                  openSections.installer && "rotate-180"
                )} />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/15 flex items-center justify-center">
                    <User className="h-4 w-4 text-purple-400" />
                  </div>
                  <span className="text-white font-semibold">Installer Declaration</span>
                </div>
                <ChevronDown className={cn("h-5 w-5 text-white/40 transition-transform", openSections.installer && "rotate-180")} />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn(
              "space-y-4",
              isMobile ? "px-4 py-4" : "px-4 pb-4"
            )}>
              {/* Smart Auto-fill from Business Settings */}
              {hasSavedInstallerDetails && (
                <div className="bg-gradient-to-r from-elec-yellow/10 to-amber-600/10 border border-elec-yellow/30 rounded-lg p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <Sparkles className="h-4 w-4 text-elec-yellow shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground">Auto-fill from Business Settings</p>
                        <p className="text-[11px] text-muted-foreground">Load your saved installer profile</p>
                      </div>
                    </div>
                    <LoadInstallerButton
                      onLoadDetails={handleLoadInstallerDetails}
                      variant="compact"
                    />
                  </div>
                </div>
              )}

              <Alert className="border-amber-500/30 bg-amber-500/10">
                <Shield className="h-4 w-4 text-amber-400" />
                <AlertDescription className="text-amber-200 text-sm">
                  <strong>Declaration:</strong> I certify that the EV charging installation has been designed,
                  constructed, inspected and tested in accordance with BS 7671:2018+A3:2024, IET Code of Practice for
                  Electric Vehicle Charging Equipment Installation (5th Edition), and relevant Building Regulations.
                </AlertDescription>
              </Alert>

              {/* Show confirmation when details loaded */}
              {detailsLoaded && (
                <div className="flex items-center gap-2 text-green-400 text-sm">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Installer details loaded from your profile</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="installerName">Installer Name *</Label>
                    {detailsLoaded && formData.installerName && (
                      <Badge variant="outline" className="text-[9px] px-1 py-0 border-green-500/50 text-green-400">
                        Auto-filled
                      </Badge>
                    )}
                  </div>
                  <Input
                    id="installerName"
                    placeholder="Full name"
                    value={formData.installerName || ''}
                    onChange={(e) => onUpdate('installerName', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="installerCompany">Company</Label>
                    {detailsLoaded && formData.installerCompany && (
                      <Badge variant="outline" className="text-[9px] px-1 py-0 border-green-500/50 text-green-400">
                        Auto-filled
                      </Badge>
                    )}
                  </div>
                  <Input
                    id="installerCompany"
                    placeholder="Company name"
                    value={formData.installerCompany || ''}
                    onChange={(e) => onUpdate('installerCompany', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="installerScheme">Competent Person Scheme *</Label>
                  <Select
                    value={formData.installerScheme || ''}
                    onValueChange={(value) => onUpdate('installerScheme', value)}
                  >
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow">
                      <SelectValue placeholder="Select scheme" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-background border-border text-foreground">
                      <SelectItem value="NICEIC">NICEIC</SelectItem>
                      <SelectItem value="NAPIT">NAPIT</SelectItem>
                      <SelectItem value="ELECSA">ELECSA</SelectItem>
                      <SelectItem value="STROMA">STROMA</SelectItem>
                      <SelectItem value="BRE">BRE</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="installerSchemeNumber">Scheme Membership Number</Label>
                  <Input
                    id="installerSchemeNumber"
                    placeholder="e.g., 12345678"
                    value={formData.installerSchemeNumber || ''}
                    onChange={(e) => onUpdate('installerSchemeNumber', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="installerQualifications">Qualifications</Label>
                  <Input
                    id="installerQualifications"
                    placeholder="e.g., C&G 2391, EV Qualification"
                    value={formData.installerQualifications || ''}
                    onChange={(e) => onUpdate('installerQualifications', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="installerDate">Date</Label>
                  <Input
                    id="installerDate"
                    type="date"
                    value={formData.installerDate || new Date().toISOString().split('T')[0]}
                    onChange={(e) => onUpdate('installerDate', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
              </div>

              <SignatureInput
                label="Installer Signature *"
                value={formData.installerSignature}
                onChange={(sig) => onUpdate('installerSignature', sig)}
                placeholder="Draw or type signature"
                required
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Compliance */}
      <div className={cn(isMobile ? "" : "eicr-section-card")}>
        <Collapsible open={openSections.compliance} onOpenChange={() => toggleSection('compliance')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                <div className="h-10 w-10 rounded-xl bg-green-500/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-green-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Compliance & Standards</h3>
                  <span className="text-xs text-muted-foreground">BS 7671, IET, Part P</span>
                </div>
                <ChevronDown className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform shrink-0",
                  openSections.compliance && "rotate-180"
                )} />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-green-500/15 flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="text-white font-semibold">Compliance & Standards</span>
                </div>
                <ChevronDown className={cn("h-5 w-5 text-white/40 transition-transform", openSections.compliance && "rotate-180")} />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn(
              "space-y-4",
              isMobile ? "px-4 py-4" : "px-4 pb-4"
            )}>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-black/40 rounded-lg">
                  <Checkbox
                    id="bs7671Compliance"
                    checked={formData.bs7671Compliance || false}
                    onCheckedChange={(checked) => onUpdate('bs7671Compliance', checked)}
                    className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                  />
                  <Label htmlFor="bs7671Compliance" className="cursor-pointer text-base leading-relaxed">
                    Installation complies with BS 7671:2018+A3:2024 (18th Edition)
                  </Label>
                </div>
                <div className="flex items-start gap-3 p-3 bg-black/40 rounded-lg">
                  <Checkbox
                    id="ietCopCompliance"
                    checked={formData.ietCopCompliance || false}
                    onCheckedChange={(checked) => onUpdate('ietCopCompliance', checked)}
                    className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                  />
                  <Label htmlFor="ietCopCompliance" className="cursor-pointer text-base leading-relaxed">
                    Installation complies with IET Code of Practice for EV Charging Equipment (5th Edition)
                  </Label>
                </div>
                <div className="flex items-start gap-3 p-3 bg-black/40 rounded-lg">
                  <Checkbox
                    id="buildingRegsCompliance"
                    checked={formData.buildingRegsCompliance || false}
                    onCheckedChange={(checked) => onUpdate('buildingRegsCompliance', checked)}
                    className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                  />
                  <Label htmlFor="buildingRegsCompliance" className="cursor-pointer text-base leading-relaxed">
                    Installation complies with Building Regulations Part P
                  </Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalNotes">Additional Notes</Label>
                <Textarea
                  id="additionalNotes"
                  placeholder="Any additional notes or comments..."
                  value={formData.additionalNotes || ''}
                  onChange={(e) => onUpdate('additionalNotes', e.target.value)}
                  className="text-base touch-manipulation min-h-[100px] border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Final Status */}
      <div className={cn(isMobile ? "px-4 pb-4" : "")}>
        {isComplete ? (
          <Alert className="border-green-500/30 bg-green-500/10">
            <CheckCircle2 className="h-4 w-4 text-green-400" />
            <AlertDescription className="text-green-200 text-xs sm:text-sm">
              <strong>Certificate ready for generation.</strong> All required fields have been completed.
            </AlertDescription>
          </Alert>
        ) : (
          <Alert className="border-amber-500/30 bg-amber-500/10">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <AlertDescription className="text-amber-200 text-xs sm:text-sm">
              <strong>Incomplete declaration.</strong> Installer name, signature, and scheme registration
              are required before the certificate can be generated.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default EVChargingDeclarations;
