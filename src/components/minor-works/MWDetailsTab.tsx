import React, { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import SectionHeader from '@/components/ui/section-header';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FieldTooltip } from '@/components/ui/field-tooltip';
import { Users, FileText, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  EARTHING_ARRANGEMENTS,
  EARTHING_CONDUCTOR_SIZES,
  WORK_TYPES,
} from '@/constants/minorWorksOptions';
import ClientSelector from '@/components/ClientSelector';
import { Customer } from '@/hooks/inspection/useCustomers';

interface MWDetailsTabProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
  isMobile?: boolean;
}

const MWDetailsTab: React.FC<MWDetailsTabProps> = ({ formData, onUpdate, isMobile = false }) => {
  const [openSections, setOpenSections] = useState({
    client: true,
    work: true,
    supply: true
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSelectCustomer = (customer: Customer | null) => {
    if (customer) {
      onUpdate('clientName', customer.name || '');
      onUpdate('clientEmail', customer.email || '');
      onUpdate('propertyAddress', customer.address || '');
    }
  };

  // Helper for conditional section card styling - no card on mobile, full card on desktop
  const sectionCardClass = cn(isMobile ? "" : "eicr-section-card");

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Client & Installation */}
      <div className={sectionCardClass}>
        <Collapsible open={openSections.client} onOpenChange={() => toggleSection('client')}>
          <CollapsibleTrigger className="w-full">
            <SectionHeader
              title="Client & Installation"
              icon={Users}
              isOpen={openSections.client}
              color="amber-500"
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4 sm:p-5 md:p-6 space-y-4">
              {/* Certificate Number (Read-only) */}
              {formData.certificateNumber && (
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-300">Certificate Number</span>
                    <span className="font-mono text-sm text-white">{formData.certificateNumber}</span>
                  </div>
                </div>
              )}

              {/* Client Selector */}
              <ClientSelector onSelectCustomer={handleSelectCustomer} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Client Name *</Label>
                  <Input
                    value={formData.clientName || ''}
                    onChange={(e) => onUpdate('clientName', e.target.value)}
                    placeholder="Full name"
                    className={cn(!formData.clientName && "border-red-500/50")}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Client Email</Label>
                  <Input
                    type="email"
                    value={formData.clientEmail || ''}
                    onChange={(e) => onUpdate('clientEmail', e.target.value)}
                    placeholder="client@email.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Person Ordering Work</Label>
                <Input
                  value={formData.personOrderingWork || ''}
                  onChange={(e) => onUpdate('personOrderingWork', e.target.value)}
                  placeholder="If different from client"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Property Address *</Label>
                <Textarea
                  value={formData.propertyAddress || ''}
                  onChange={(e) => onUpdate('propertyAddress', e.target.value)}
                  placeholder="Full installation address"
                  rows={2}
                  className={cn("min-h-[80px]", !formData.propertyAddress && "border-red-500/50")}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Postcode</Label>
                  <Input
                    value={formData.postcode || ''}
                    onChange={(e) => onUpdate('postcode', e.target.value.toUpperCase())}
                    placeholder="e.g., SW1A 1AA"
                    className="uppercase"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Date of Work *</Label>
                  <Input
                    type="date"
                    value={formData.workDate || ''}
                    onChange={(e) => onUpdate('workDate', e.target.value)}
                    className={cn(!formData.workDate && "border-red-500/50")}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Contractor Name</Label>
                <Input
                  value={formData.contractorName || ''}
                  onChange={(e) => onUpdate('contractorName', e.target.value)}
                  placeholder="Company name"
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Description of Work */}
      <div className={sectionCardClass}>
        <Collapsible open={openSections.work} onOpenChange={() => toggleSection('work')}>
          <CollapsibleTrigger className="w-full">
            <SectionHeader
              title="Description of Work"
              icon={FileText}
              isOpen={openSections.work}
              color="blue-500"
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4 sm:p-5 md:p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Type of Work *</Label>
                  <Select value={formData.workType || ''} onValueChange={(v) => onUpdate('workType', v === '__clear__' ? '' : v)}>
                    <SelectTrigger className={cn(!formData.workType && "border-red-500/50")}>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__clear__"><span className="text-muted-foreground">Clear selection</span></SelectItem>
                      {WORK_TYPES.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Location of Work</Label>
                  <Input
                    value={formData.workLocation || ''}
                    onChange={(e) => onUpdate('workLocation', e.target.value)}
                    placeholder="e.g., Kitchen, Garage"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Description of Work *</Label>
                <Textarea
                  value={formData.workDescription || ''}
                  onChange={(e) => onUpdate('workDescription', e.target.value)}
                  placeholder="Describe the electrical work carried out..."
                  rows={3}
                  className={cn("min-h-[100px]", !formData.workDescription && "border-red-500/50")}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Departures from BS 7671 (Reg 120.3, 133.1.3, 133.5)</Label>
                <Textarea
                  value={formData.departuresFromBS7671 || ''}
                  onChange={(e) => onUpdate('departuresFromBS7671', e.target.value)}
                  placeholder="Detail any departures from the standard and reasons, or enter 'None'..."
                  rows={2}
                  className="min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Permitted Exceptions (Reg 411.3.3)</Label>
                <Textarea
                  value={formData.permittedExceptions || ''}
                  onChange={(e) => onUpdate('permittedExceptions', e.target.value)}
                  placeholder="Detail any permitted exceptions under Regulation 411.3.3, or enter 'None'..."
                  rows={2}
                  className="min-h-[80px]"
                />
              </div>

              {/* Risk Assessment Attached */}
              <div className="flex items-center gap-3 p-4 min-h-[52px] rounded-xl bg-amber-500/5 border border-amber-500/20">
                <Checkbox
                  id="riskAssessmentAttached"
                  checked={formData.riskAssessmentAttached || false}
                  onCheckedChange={(c) => onUpdate('riskAssessmentAttached', c)}
                  className="h-6 w-6 border-white/40 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500 touch-manipulation"
                />
                <Label htmlFor="riskAssessmentAttached" className="text-sm font-medium cursor-pointer">
                  Risk assessment attached (where applicable)
                </Label>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Comments on Existing Installation (Reg 644.1.2)</Label>
                <Textarea
                  value={formData.commentsOnExistingInstallation || ''}
                  onChange={(e) => onUpdate('commentsOnExistingInstallation', e.target.value)}
                  placeholder="Enter any comments regarding the condition of the existing installation that may affect the safety of the new work..."
                  rows={3}
                  className="min-h-[100px]"
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Supply & Earthing */}
      <div className={sectionCardClass}>
        <Collapsible open={openSections.supply} onOpenChange={() => toggleSection('supply')}>
          <CollapsibleTrigger className="w-full">
            <SectionHeader
              title="Supply & Earthing"
              icon={Zap}
              isOpen={openSections.supply}
              color="yellow-500"
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4 sm:p-5 md:p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-1">
                    <Label className="text-sm font-medium">Earthing Arrangement *</Label>
                    <FieldTooltip
                      content="The type of earthing system determines how protective and neutral conductors are arranged between the supply and installation."
                      regulation="411.4"
                      example="Most UK domestic supplies are TN-C-S (PME). TT systems require an earth electrode."
                    />
                  </div>
                  <Select value={formData.earthingArrangement || ''} onValueChange={(v) => onUpdate('earthingArrangement', v === '__clear__' ? '' : v)}>
                    <SelectTrigger className={cn(!formData.earthingArrangement && "border-red-500/50")}>
                      <SelectValue placeholder="Select earthing type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__clear__"><span className="text-muted-foreground">Clear selection</span></SelectItem>
                      {EARTHING_ARRANGEMENTS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          <div className="flex flex-col gap-1">
                            <span className="font-semibold text-white">{opt.label}</span>
                            {opt.description && (
                              <span className="text-[13px] text-white/60 leading-snug">{opt.description}</span>
                            )}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formData.earthingArrangement && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {EARTHING_ARRANGEMENTS.find(e => e.value === formData.earthingArrangement)?.description}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-1">
                    <Label className="text-sm font-medium">Zdb - Earth fault loop at DB (Ω)</Label>
                    <FieldTooltip
                      content="External earth fault loop impedance measured at the distribution board. This value is used to verify circuit disconnection times."
                      regulation="411.4.5"
                      example="Typical values: TN-C-S: 0.20-0.35Ω, TN-S: 0.35-0.80Ω, TT: varies with electrode"
                    />
                  </div>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.zdb || ''}
                    onChange={(e) => onUpdate('zdb', e.target.value)}
                    placeholder="e.g., 0.35"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 min-h-[52px] rounded-xl bg-muted/30">
                <Checkbox
                  id="earthingConductorPresent"
                  checked={formData.earthingConductorPresent || false}
                  onCheckedChange={(checked) => onUpdate('earthingConductorPresent', checked)}
                  className="h-6 w-6 border-white/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 touch-manipulation"
                />
                <Label htmlFor="earthingConductorPresent" className="text-sm font-medium cursor-pointer">
                  Earthing conductor present
                </Label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Main Earthing Conductor Size</Label>
                  <Select value={formData.mainEarthingConductorSize || ''} onValueChange={(v) => onUpdate('mainEarthingConductorSize', v === '__clear__' ? '' : v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__clear__"><span className="text-muted-foreground">Clear selection</span></SelectItem>
                      {EARTHING_CONDUCTOR_SIZES.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Main Bonding Conductor Size</Label>
                  <Select value={formData.mainBondingConductorSize || ''} onValueChange={(v) => onUpdate('mainBondingConductorSize', v === '__clear__' ? '' : v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__clear__"><span className="text-muted-foreground">Clear selection</span></SelectItem>
                      {EARTHING_CONDUCTOR_SIZES.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Bonding Connections */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Bonding Connections</Label>
                <div className="flex flex-wrap gap-3">
                  {['Water', 'Gas', 'Oil', 'Structural', 'Other'].map((item) => {
                    const fieldName = `bonding${item}`;
                    return (
                      <div key={item} className="flex items-center gap-2 p-3 min-h-[48px] rounded-xl bg-card/50 border border-border/30">
                        <Checkbox
                          id={fieldName}
                          checked={formData[fieldName] || false}
                          onCheckedChange={(c) => onUpdate(fieldName, c)}
                          className="h-5 w-5 border-white/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 touch-manipulation"
                        />
                        <Label htmlFor={fieldName} className="text-sm font-medium cursor-pointer">{item}</Label>
                      </div>
                    );
                  })}
                </div>

                {/* Other Bonding Specification - shown when Other is checked */}
                {formData.bondingOther && (
                  <div className="space-y-2 mt-2">
                    <Label className="text-sm font-medium">Other Bonding - Specify</Label>
                    <Input
                      value={formData.bondingOtherSpecify || ''}
                      onChange={(e) => onUpdate('bondingOtherSpecify', e.target.value)}
                      placeholder="e.g., Incoming metallic services, extraneous conductive parts"
                    />
                  </div>
                )}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default MWDetailsTab;
