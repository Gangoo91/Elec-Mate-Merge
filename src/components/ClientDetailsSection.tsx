
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { SectionHeader } from '@/components/ui/section-header';
import { Users } from 'lucide-react';
import ClientSelector from '@/components/inspection-app/ClientSelector';
import { Customer } from '@/hooks/inspection/useCustomers';

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

  const handleSelectCustomer = (customer: Customer | null) => {
    if (customer) {
      onUpdate('clientName', customer.name || '');
      onUpdate('clientEmail', customer.email || '');
      onUpdate('clientPhone', customer.phone || '');
      onUpdate('clientAddress', customer.address || '');
      if (formData.sameAsClientAddress === 'true' && customer.address) {
        onUpdate('installationAddress', customer.address);
      }
    }
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
    <Card className="border border-border/30 bg-card overflow-hidden">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <SectionHeader
          title="Client & Installation Details"
          icon={Users}
          isOpen={isOpen}
          color="amber-500"
        />
        <CollapsibleContent>
          <CardContent className="p-4 space-y-6">
            {/* Client Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-elec-yellow"></div>
                Client Information
              </h3>

              {/* Client Selector */}
              <ClientSelector onSelectCustomer={handleSelectCustomer} />

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="clientName">Client Name <span className="text-elec-yellow">*</span></Label>
                  <Input
                    id="clientName"
                    value={formData.clientName || ''}
                    onChange={(e) => onUpdate('clientName', e.target.value)}
                    placeholder="Full name of person ordering work"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="clientPhone">Client Phone</Label>
                    <Input
                      id="clientPhone"
                      type="tel"
                      value={formData.clientPhone || ''}
                      onChange={(e) => onUpdate('clientPhone', e.target.value)}
                      placeholder="Contact telephone number"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="clientEmail">Client Email</Label>
                    <Input
                      id="clientEmail"
                      type="email"
                      value={formData.clientEmail || ''}
                      onChange={(e) => onUpdate('clientEmail', e.target.value)}
                      placeholder="Email address"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="clientAddress">Client Address <span className="text-elec-yellow">*</span></Label>
                  <Textarea
                    id="clientAddress"
                    value={formData.clientAddress || ''}
                    onChange={(e) => onUpdate('clientAddress', e.target.value)}
                    placeholder="Client's full postal address"
                    rows={3}
                  />
                </div>
              </div>
            </div>

            <Separator className="bg-border/30" />

            {/* Installation Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-elec-yellow"></div>
                Installation Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/30">
                  <Checkbox
                    id="sameAsClientAddress"
                    checked={formData.sameAsClientAddress === 'true'}
                    onCheckedChange={handleSameAddressToggle}
                  />
                  <Label htmlFor="sameAsClientAddress" className="cursor-pointer text-sm">
                    Installation address same as client address
                  </Label>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="installationAddress">Installation Address <span className="text-elec-yellow">*</span></Label>
                  <Textarea
                    id="installationAddress"
                    value={formData.installationAddress || ''}
                    onChange={(e) => onUpdate('installationAddress', e.target.value)}
                    placeholder="Full address of the installation"
                    rows={3}
                    disabled={formData.sameAsClientAddress === 'true'}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="description">Description of Premises <span className="text-elec-yellow">*</span></Label>
                    <Select value={formData.description || ''} onValueChange={(value) => onUpdate('description', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="domestic">Domestic</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="industrial">Industrial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="installationType">Installation Type</Label>
                    <Select value={formData.installationType || ''} onValueChange={(value) => onUpdate('installationType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new-installation">New Installation</SelectItem>
                        <SelectItem value="existing-installation">Existing Installation</SelectItem>
                        <SelectItem value="extended-installation">Extended Installation</SelectItem>
                        <SelectItem value="altered-installation">Altered Installation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-border/30" />

            {/* Installation History */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-elec-yellow"></div>
                Installation History
              </h3>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label>Estimated Age of Installation</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.estimatedAge || ''}
                      onChange={(e) => onUpdate('estimatedAge', e.target.value)}
                      placeholder="0"
                      className="flex-1"
                    />
                    <Select value={formData.ageUnit || 'years'} onValueChange={(value) => onUpdate('ageUnit', value)}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="years">Years</SelectItem>
                        <SelectItem value="months">Months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <p className="text-xs text-muted-foreground">Approximate age since installation</p>
                </div>

                <div className="space-y-2">
                  <Label>Date of Last Inspection</Label>
                  <RadioGroup
                    value={formData.lastInspectionType || 'unknown'}
                    onValueChange={handleLastInspectionChange}
                    className="space-y-1"
                  >
                    <div className="flex items-center gap-3 p-2.5 rounded-md hover:bg-muted/30 transition-colors">
                      <RadioGroupItem value="known" id="known-date" />
                      <Label htmlFor="known-date" className="cursor-pointer text-sm font-normal">Known Date</Label>
                    </div>
                    <div className="flex items-center gap-3 p-2.5 rounded-md hover:bg-muted/30 transition-colors">
                      <RadioGroupItem value="unknown" id="unknown-date" />
                      <Label htmlFor="unknown-date" className="cursor-pointer text-sm font-normal">Unknown</Label>
                    </div>
                    <div className="flex items-center gap-3 p-2.5 rounded-md hover:bg-muted/30 transition-colors">
                      <RadioGroupItem value="not-applicable" id="not-applicable" />
                      <Label htmlFor="not-applicable" className="cursor-pointer text-sm font-normal">Not Applicable (First Inspection)</Label>
                    </div>
                  </RadioGroup>
                  {formData.lastInspectionType === 'known' && (
                    <Input
                      type="date"
                      value={formData.dateOfLastInspection || ''}
                      onChange={(e) => onUpdate('dateOfLastInspection', e.target.value)}
                      className="mt-2"
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Evidence of Alterations or Additions</Label>
                  <RadioGroup
                    value={formData.evidenceOfAlterations || 'no'}
                    onValueChange={handleAlterationsChange}
                    className="space-y-1"
                  >
                    <div className="flex items-center gap-3 p-2.5 rounded-md hover:bg-muted/30 transition-colors">
                      <RadioGroupItem value="yes" id="alterations-yes" />
                      <Label htmlFor="alterations-yes" className="cursor-pointer text-sm font-normal">Yes</Label>
                    </div>
                    <div className="flex items-center gap-3 p-2.5 rounded-md hover:bg-muted/30 transition-colors">
                      <RadioGroupItem value="no" id="alterations-no" />
                      <Label htmlFor="alterations-no" className="cursor-pointer text-sm font-normal">No</Label>
                    </div>
                  </RadioGroup>
                  {formData.evidenceOfAlterations === 'yes' && (
                    <Textarea
                      value={formData.alterationsDetails || ''}
                      onChange={(e) => onUpdate('alterationsDetails', e.target.value)}
                      placeholder="Describe the alterations observed..."
                      rows={3}
                      className="mt-2"
                    />
                  )}
                  <p className="text-xs text-muted-foreground">
                    Note any visible modifications to the original installation
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default ClientDetailsSection;
