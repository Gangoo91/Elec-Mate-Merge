
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { SectionHeader } from '@/components/ui/section-header';
import { Users } from 'lucide-react';

interface ClientDetailsSectionProps {
  formData: any;
  onUpdate: (field: string, value: string) => void;
}

const ClientDetailsSection = ({ formData, onUpdate }: ClientDetailsSectionProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleSameAddressToggle = (checked: boolean) => {
    if (checked && formData.clientAddress) {
      onUpdate('installationAddress', formData.clientAddress);
    }
    onUpdate('sameAsClientAddress', checked ? 'true' : 'false');
  };

  const handleLastInspectionChange = (value: string) => {
    onUpdate('lastInspectionType', value);
    if (value !== 'known') {
      onUpdate('dateOfLastInspection', '');
    }
  };

  const handleAlterationsChange = (value: string) => {
    onUpdate('evidenceOfAlterations', value);
    if (value === 'no') {
      onUpdate('alterationsDetails', '');
    }
  };

  return (
    <div className="eicr-section-card">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <SectionHeader
          title="Client & Installation Details"
          icon={Users}
          isOpen={isOpen}
          color="amber-500"
        />
        <CollapsibleContent>
          <div className="p-4 sm:p-5 md:p-6 space-y-4 sm:space-y-5">
        {/* Client Information */}
        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-base sm:text-lg font-semibold text-foreground border-b border-elec-gray pb-2 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
            Client Information
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="clientName">Client Name *</Label>
              <Input
                id="clientName"
                value={formData.clientName || ''}
                onChange={(e) => onUpdate('clientName', e.target.value)}
                placeholder="Full name of person ordering work"
                className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="clientPhone">Client Phone</Label>
                <Input
                  id="clientPhone"
                  type="tel"
                  value={formData.clientPhone || ''}
                  onChange={(e) => onUpdate('clientPhone', e.target.value)}
                  placeholder="Contact telephone number"
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientEmail">Client Email</Label>
                <Input
                  id="clientEmail"
                  type="email"
                  value={formData.clientEmail || ''}
                  onChange={(e) => onUpdate('clientEmail', e.target.value)}
                  placeholder="Email address for correspondence"
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientAddress">Client Address *</Label>
              <Textarea
                id="clientAddress"
                value={formData.clientAddress || ''}
                onChange={(e) => onUpdate('clientAddress', e.target.value)}
                placeholder="Client's full postal address"
                rows={3}
                className="touch-manipulation text-base min-h-[120px] focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500"
              />
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Installation Details */}
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-elec-yellow/20 to-amber-600/20 border border-elec-yellow/30 rounded-lg px-4 py-3">
            <h3 className="text-base sm:text-lg font-semibold text-foreground flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow"></div>
              Installation Details
            </h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-4 bg-card/50 rounded-lg border border-border">
              <Checkbox
                id="sameAsClientAddress"
                checked={formData.sameAsClientAddress === 'true'}
                onCheckedChange={handleSameAddressToggle}
                className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black mt-0.5"
              />
              <Label 
                htmlFor="sameAsClientAddress" 
                className="text-foreground cursor-pointer leading-relaxed"
              >
                Installation address is the same as client address
              </Label>
            </div>
            <div className="space-y-2">
              <Label htmlFor="installationAddress">Installation Address *</Label>
              <Textarea
                id="installationAddress"
                value={formData.installationAddress || ''}
                onChange={(e) => onUpdate('installationAddress', e.target.value)}
                placeholder="Full address of the installation being inspected"
                rows={3}
                disabled={formData.sameAsClientAddress === 'true'}
                className="touch-manipulation text-base min-h-[120px] focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500 disabled:bg-muted/30 disabled:text-foreground disabled:opacity-100 disabled:cursor-not-allowed"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="description">Description of Premises *</Label>
              <MobileSelectPicker
                value={formData.description || ''}
                onValueChange={(value) => onUpdate('description', value)}
                options={[
                  { value: 'domestic', label: 'Domestic' },
                  { value: 'commercial', label: 'Commercial' },
                  { value: 'industrial', label: 'Industrial' },
                ]}
                placeholder="Select property type"
                title="Description of Premises"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="installationType">Installation Type</Label>
              <MobileSelectPicker
                value={formData.installationType || ''}
                onValueChange={(value) => onUpdate('installationType', value)}
                options={[
                  { value: 'new-installation', label: 'New Installation' },
                  { value: 'existing-installation', label: 'Existing Installation' },
                  { value: 'extended-installation', label: 'Extended Installation' },
                  { value: 'altered-installation', label: 'Altered Installation' },
                ]}
                placeholder="Select installation type"
                title="Installation Type"
              />
            </div>
          </div>

        </div>

        <Separator className="my-6" />

        {/* Installation History */}
        <div className="space-y-4">
          <h3 className="text-base sm:text-lg font-semibold text-foreground border-b border-border pb-2 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
            Installation History
          </h3>
          <div className="space-y-6">
            {/* Records Available - IET Model Form Section C */}
            <div className="space-y-2">
              <Label>Records/Documentation Available</Label>
              <RadioGroup
                value={formData.recordsAvailable || 'no'}
                onValueChange={(value) => onUpdate('recordsAvailable', value)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-card/50 transition-colors">
                  <RadioGroupItem value="yes" id="records-yes" className="border-white/30" />
                  <Label htmlFor="records-yes" className="cursor-pointer">Yes - Previous records available</Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-card/50 transition-colors">
                  <RadioGroupItem value="no" id="records-no" className="border-white/30" />
                  <Label htmlFor="records-no" className="cursor-pointer">No - No previous records available</Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-card/50 transition-colors">
                  <RadioGroupItem value="partial" id="records-partial" className="border-white/30" />
                  <Label htmlFor="records-partial" className="cursor-pointer">Partial - Some records available</Label>
                </div>
              </RadioGroup>
              <p className="text-xs text-muted-foreground">
                Previous EICRs, EICs, or installation documentation
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Estimated Age of Installation</Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.estimatedAge || ''}
                    onChange={(e) => onUpdate('estimatedAge', e.target.value)}
                    placeholder="0"
                    className="h-11 text-base touch-manipulation flex-1 border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                  <MobileSelectPicker
                    value={formData.ageUnit || 'years'}
                    onValueChange={(value) => onUpdate('ageUnit', value)}
                    options={[
                      { value: 'years', label: 'Years' },
                      { value: 'months', label: 'Months' },
                    ]}
                    placeholder="Unit"
                    title="Age Unit"
                  />
                </div>
                <p className="text-xs text-muted-foreground">Approximate age since installation or last major work</p>
              </div>

              <div className="space-y-3">
                <Label>Date of Last Inspection</Label>
                <RadioGroup
                  value={formData.lastInspectionType || 'unknown'} 
                  onValueChange={handleLastInspectionChange}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-card/50 transition-colors">
                    <RadioGroupItem value="known" id="known-date" className="border-white/30" />
                    <Label htmlFor="known-date" className="cursor-pointer">Known Date</Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-card/50 transition-colors">
                    <RadioGroupItem value="unknown" id="unknown-date" className="border-white/30" />
                    <Label htmlFor="unknown-date" className="cursor-pointer">Unknown</Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-card/50 transition-colors">
                    <RadioGroupItem value="not-applicable" id="not-applicable" className="border-white/30" />
                    <Label htmlFor="not-applicable" className="cursor-pointer">Not Applicable (First Inspection)</Label>
                  </div>
                </RadioGroup>
                {formData.lastInspectionType === 'known' && (
                  <Input
                    type="date"
                    value={formData.dateOfLastInspection || ''}
                    onChange={(e) => onUpdate('dateOfLastInspection', e.target.value)}
                    className="h-11 text-base touch-manipulation mt-3 border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                )}
              </div>
            </div>

            <div className="space-y-3">
              <Label>Evidence of Alterations or Additions</Label>
              <RadioGroup
                value={formData.evidenceOfAlterations || 'no'} 
                onValueChange={handleAlterationsChange}
                className="space-y-3"
              >
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-card/50 transition-colors">
                  <RadioGroupItem value="yes" id="alterations-yes" className="border-white/30" />
                  <Label htmlFor="alterations-yes" className="cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-card/50 transition-colors">
                  <RadioGroupItem value="no" id="alterations-no" className="border-white/30" />
                  <Label htmlFor="alterations-no" className="cursor-pointer">No</Label>
                </div>
              </RadioGroup>
              {formData.evidenceOfAlterations === 'yes' && (
                <Textarea
                  value={formData.alterationsDetails || ''}
                  onChange={(e) => onUpdate('alterationsDetails', e.target.value)}
                  placeholder="Describe the alterations or additions observed..."
                  rows={3}
                  className="touch-manipulation text-base min-h-[120px] focus:ring-2 focus:ring-elec-yellow/20 mt-3 border-white/30 focus:border-yellow-500"
                />
              )}
              <p className="text-xs text-muted-foreground">
                Note any visible modifications, extensions, or additions to the original installation
              </p>
            </div>
          </div>
        </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default ClientDetailsSection;
