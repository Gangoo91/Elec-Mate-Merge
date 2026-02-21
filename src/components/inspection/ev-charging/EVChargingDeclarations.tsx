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
import {
  useEVChargingSmartForm,
  InstallerDetails,
} from '@/hooks/inspection/useEVChargingSmartForm';

interface EVChargingDeclarationsProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

const EVChargingDeclarations: React.FC<EVChargingDeclarationsProps> = ({ formData, onUpdate }) => {
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

  const isComplete =
    formData.installerName && formData.installerSignature && formData.installerScheme;

  return (
    <div className={cn(isMobile ? 'space-y-0' : 'space-y-0 divide-y divide-white/[0.06]')}>
      {/* OZEV Grant Section */}
      <div>
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
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-muted-foreground transition-transform shrink-0',
                    openSections.ozev && 'rotate-180'
                  )}
                />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-green-500/15 flex items-center justify-center">
                    <Receipt className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="text-white font-semibold">OZEV Grant Details</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-white transition-transform',
                    openSections.ozev && 'rotate-180'
                  )}
                />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn('space-y-3', isMobile ? 'px-4 py-4' : 'px-4 pb-4')}>
              <label
                htmlFor="ozevGrantApplicable"
                className={cn(
                  'flex items-center justify-between px-4 py-3 rounded-xl border cursor-pointer transition-all touch-manipulation',
                  formData.ozevGrantApplicable
                    ? 'border-green-500/30 bg-green-500/[0.06]'
                    : 'border-white/10 bg-white/[0.02]'
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    'h-9 w-9 rounded-xl flex items-center justify-center shrink-0',
                    formData.ozevGrantApplicable ? 'bg-green-500/15' : 'bg-white/[0.06]'
                  )}>
                    <Receipt className={cn('h-4 w-4', formData.ozevGrantApplicable ? 'text-green-400' : 'text-white')} />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-white block">OZEV Grant Applicable</span>
                    <span className="text-xs text-white">EVHS or WCS scheme</span>
                  </div>
                </div>
                <Checkbox
                  id="ozevGrantApplicable"
                  checked={formData.ozevGrantApplicable || false}
                  onCheckedChange={(checked) => onUpdate('ozevGrantApplicable', checked)}
                  className="sr-only"
                />
                <div className={cn(
                  'h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors',
                  formData.ozevGrantApplicable
                    ? 'border-green-400 bg-green-400'
                    : 'border-white/30'
                )}>
                  {formData.ozevGrantApplicable && <CheckCircle2 className="h-3.5 w-3.5 text-white" />}
                </div>
              </label>

              {formData.ozevGrantApplicable && (
                <div className="grid grid-cols-2 gap-3 items-start">
                  <div className="space-y-1.5">
                    <Label htmlFor="ozevScheme" className="text-sm h-5 flex items-center">Grant Scheme</Label>
                    <Select
                      value={formData.ozevScheme || ''}
                      onValueChange={(value) => onUpdate('ozevScheme', value)}
                    >
                      <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent className="z-[100] bg-background border-border text-foreground">
                        <SelectItem value="EVHS">EVHS</SelectItem>
                        <SelectItem value="WCS">WCS</SelectItem>
                        <SelectItem value="OZEV-flat">Flat Owner-Occupier</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="ozevGrantRef" className="text-sm h-5 flex items-center">Reference Number</Label>
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
      <div>
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
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-muted-foreground transition-transform shrink-0',
                    openSections.handover && 'rotate-180'
                  )}
                />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/15 flex items-center justify-center">
                    <FileCheck className="h-4 w-4 text-blue-400" />
                  </div>
                  <span className="text-white font-semibold">Handover & Documentation</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-white transition-transform',
                    openSections.handover && 'rotate-180'
                  )}
                />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn('space-y-3', isMobile ? 'px-4 py-4' : 'px-4 pb-4')}>
              <div className="space-y-2">
                <label
                  htmlFor="userInstructionsProvided"
                  className={cn(
                    'flex items-center justify-between px-4 py-3 rounded-xl border cursor-pointer transition-all touch-manipulation',
                    formData.userInstructionsProvided
                      ? 'border-green-500/30 bg-green-500/[0.06]'
                      : 'border-white/10 bg-white/[0.02]'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'h-9 w-9 rounded-xl flex items-center justify-center shrink-0',
                      formData.userInstructionsProvided ? 'bg-green-500/15' : 'bg-white/[0.06]'
                    )}>
                      <FileCheck className={cn('h-4 w-4', formData.userInstructionsProvided ? 'text-green-400' : 'text-white')} />
                    </div>
                    <span className="text-sm font-medium text-white">User instructions provided</span>
                  </div>
                  <Checkbox
                    id="userInstructionsProvided"
                    checked={formData.userInstructionsProvided || false}
                    onCheckedChange={(checked) => onUpdate('userInstructionsProvided', checked)}
                    className="sr-only"
                  />
                  <div className={cn(
                    'h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors',
                    formData.userInstructionsProvided
                      ? 'border-green-400 bg-green-400'
                      : 'border-white/30'
                  )}>
                    {formData.userInstructionsProvided && <CheckCircle2 className="h-3.5 w-3.5 text-white" />}
                  </div>
                </label>
                <label
                  htmlFor="operatingManualProvided"
                  className={cn(
                    'flex items-center justify-between px-4 py-3 rounded-xl border cursor-pointer transition-all touch-manipulation',
                    formData.operatingManualProvided
                      ? 'border-green-500/30 bg-green-500/[0.06]'
                      : 'border-white/10 bg-white/[0.02]'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'h-9 w-9 rounded-xl flex items-center justify-center shrink-0',
                      formData.operatingManualProvided ? 'bg-green-500/15' : 'bg-white/[0.06]'
                    )}>
                      <FileCheck className={cn('h-4 w-4', formData.operatingManualProvided ? 'text-green-400' : 'text-white')} />
                    </div>
                    <span className="text-sm font-medium text-white">Operating manual provided</span>
                  </div>
                  <Checkbox
                    id="operatingManualProvided"
                    checked={formData.operatingManualProvided || false}
                    onCheckedChange={(checked) => onUpdate('operatingManualProvided', checked)}
                    className="sr-only"
                  />
                  <div className={cn(
                    'h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors',
                    formData.operatingManualProvided
                      ? 'border-green-400 bg-green-400'
                      : 'border-white/30'
                  )}>
                    {formData.operatingManualProvided && <CheckCircle2 className="h-3.5 w-3.5 text-white" />}
                  </div>
                </label>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="specialConditions" className="text-sm">Special Conditions / Notes</Label>
                <Textarea
                  id="specialConditions"
                  placeholder="Any special conditions, limitations, or notes..."
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
      <div>
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
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-muted-foreground transition-transform shrink-0',
                    openSections.installer && 'rotate-180'
                  )}
                />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/15 flex items-center justify-center">
                    <User className="h-4 w-4 text-purple-400" />
                  </div>
                  <span className="text-white font-semibold">Installer Declaration</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-white transition-transform',
                    openSections.installer && 'rotate-180'
                  )}
                />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn('space-y-3', isMobile ? 'px-4 py-4' : 'px-4 pb-4')}>
              {/* Smart Auto-fill from Business Settings */}
              {hasSavedInstallerDetails && (
                <div className={cn(
                  'flex items-center justify-between px-4 py-3 rounded-xl border transition-all',
                  detailsLoaded
                    ? 'border-green-500/30 bg-green-500/[0.06]'
                    : 'border-elec-yellow/30 bg-elec-yellow/[0.04]'
                )}>
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={cn(
                      'h-9 w-9 rounded-xl flex items-center justify-center shrink-0',
                      detailsLoaded ? 'bg-green-500/15' : 'bg-elec-yellow/15'
                    )}>
                      {detailsLoaded ? (
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                      ) : (
                        <Sparkles className="h-4 w-4 text-elec-yellow" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white">
                        {detailsLoaded ? 'Profile loaded' : 'Auto-fill available'}
                      </p>
                      <p className="text-xs text-white">
                        {detailsLoaded ? 'From your business settings' : 'Load your installer profile'}
                      </p>
                    </div>
                  </div>
                  <LoadInstallerButton
                    onLoadDetails={handleLoadInstallerDetails}
                    variant="compact"
                  />
                </div>
              )}

              <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.04] px-4 py-3">
                <p className="text-xs text-white leading-relaxed">
                  <span className="font-semibold text-amber-400">Declaration: </span>
                  I certify this EV charging installation has been designed, constructed, inspected and tested per BS 7671:2018+A3:2024, IET CoP for EV Charging (5th Ed), and Building Regulations.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 items-start">
                <div className="space-y-1.5">
                  <Label htmlFor="installerName" className="text-sm h-5 flex items-center gap-1">
                    Name *
                    {detailsLoaded && formData.installerName && (
                      <Badge variant="outline" className="text-[9px] px-1 py-0 border-green-500/50 text-green-400">
                        Auto
                      </Badge>
                    )}
                  </Label>
                  <Input
                    id="installerName"
                    placeholder="Full name"
                    value={formData.installerName || ''}
                    onChange={(e) => onUpdate('installerName', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="installerCompany" className="text-sm h-5 flex items-center gap-1">
                    Company
                    {detailsLoaded && formData.installerCompany && (
                      <Badge variant="outline" className="text-[9px] px-1 py-0 border-green-500/50 text-green-400">
                        Auto
                      </Badge>
                    )}
                  </Label>
                  <Input
                    id="installerCompany"
                    placeholder="Company name"
                    value={formData.installerCompany || ''}
                    onChange={(e) => onUpdate('installerCompany', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 items-start">
                <div className="space-y-1.5">
                  <Label htmlFor="installerScheme" className="text-sm h-5 flex items-center">Scheme *</Label>
                  <Select
                    value={formData.installerScheme || ''}
                    onValueChange={(value) => onUpdate('installerScheme', value)}
                  >
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow">
                      <SelectValue placeholder="Select" />
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
                <div className="space-y-1.5">
                  <Label htmlFor="installerSchemeNumber" className="text-sm h-5 flex items-center">Membership No.</Label>
                  <Input
                    id="installerSchemeNumber"
                    placeholder="e.g., 12345678"
                    value={formData.installerSchemeNumber || ''}
                    onChange={(e) => onUpdate('installerSchemeNumber', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 items-start">
                <div className="space-y-1.5">
                  <Label htmlFor="installerQualifications" className="text-sm h-5 flex items-center">Qualifications</Label>
                  <Input
                    id="installerQualifications"
                    placeholder="C&G 2391, EV Qual"
                    value={formData.installerQualifications || ''}
                    onChange={(e) => onUpdate('installerQualifications', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="installerDate" className="text-sm h-5 flex items-center">Date</Label>
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
      <div>
        <Collapsible
          open={openSections.compliance}
          onOpenChange={() => toggleSection('compliance')}
        >
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
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-muted-foreground transition-transform shrink-0',
                    openSections.compliance && 'rotate-180'
                  )}
                />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-green-500/15 flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="text-white font-semibold">Compliance & Standards</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-white transition-transform',
                    openSections.compliance && 'rotate-180'
                  )}
                />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn('space-y-3', isMobile ? 'px-4 py-4' : 'px-4 pb-4')}>
              <div className="space-y-2">
                {[
                  { id: 'bs7671Compliance', label: 'BS 7671:2018+A3:2024', sub: '18th Edition Wiring Regulations' },
                  { id: 'ietCopCompliance', label: 'IET CoP for EV Charging', sub: '5th Edition' },
                  { id: 'buildingRegsCompliance', label: 'Building Regulations Part P', sub: 'Electrical safety in dwellings' },
                ].map((item) => (
                  <label
                    key={item.id}
                    htmlFor={item.id}
                    className={cn(
                      'flex items-center justify-between px-4 py-3 rounded-xl border cursor-pointer transition-all touch-manipulation',
                      formData[item.id]
                        ? 'border-green-500/30 bg-green-500/[0.06]'
                        : 'border-white/10 bg-white/[0.02]'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'h-9 w-9 rounded-xl flex items-center justify-center shrink-0',
                        formData[item.id] ? 'bg-green-500/15' : 'bg-white/[0.06]'
                      )}>
                        <Shield className={cn('h-4 w-4', formData[item.id] ? 'text-green-400' : 'text-white')} />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-white block">{item.label}</span>
                        <span className="text-xs text-white">{item.sub}</span>
                      </div>
                    </div>
                    <Checkbox
                      id={item.id}
                      checked={formData[item.id] || false}
                      onCheckedChange={(checked) => onUpdate(item.id, checked)}
                      className="sr-only"
                    />
                    <div className={cn(
                      'h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors',
                      formData[item.id]
                        ? 'border-green-400 bg-green-400'
                        : 'border-white/30'
                    )}>
                      {formData[item.id] && <CheckCircle2 className="h-3.5 w-3.5 text-white" />}
                    </div>
                  </label>
                ))}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="additionalNotes" className="text-sm">Additional Notes</Label>
                <Textarea
                  id="additionalNotes"
                  placeholder="Any additional notes or comments..."
                  value={formData.additionalNotes || ''}
                  onChange={(e) => onUpdate('additionalNotes', e.target.value)}
                  className="text-base touch-manipulation min-h-[80px] border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Final Status */}
      <div className={cn(isMobile ? 'px-4 pb-4' : '')}>
        {isComplete ? (
          <Alert className="border-green-500/30 bg-green-500/10">
            <CheckCircle2 className="h-4 w-4 text-green-400" />
            <AlertDescription className="text-green-200 text-xs sm:text-sm">
              <strong>Certificate ready for generation.</strong> All required fields have been
              completed.
            </AlertDescription>
          </Alert>
        ) : (
          <Alert className="border-amber-500/30 bg-amber-500/10">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <AlertDescription className="text-amber-200 text-xs sm:text-sm">
              <strong>Incomplete declaration.</strong> Installer name, signature, and scheme
              registration are required before the certificate can be generated.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default EVChargingDeclarations;
