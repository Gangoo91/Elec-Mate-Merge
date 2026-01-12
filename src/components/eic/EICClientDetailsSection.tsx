import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import SectionHeader from '@/components/ui/section-header';
import { Users, Calendar, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EICClientDetailsSectionProps {
  formData: any;
  onUpdate: (field: string, value: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const EICClientDetailsSection = ({ formData, onUpdate, isOpen, onToggle }: EICClientDetailsSectionProps) => {
  const handleSameAddressToggle = (checked: boolean) => {
    if (checked && formData.clientAddress) {
      onUpdate('installationAddress', formData.clientAddress);
    }
    onUpdate('sameAsClientAddress', checked ? 'true' : 'false');
  };

  // Calculate completion percentage
  const getCompletionPercentage = () => {
    const requiredFields = ['clientName', 'clientAddress', 'installationAddress', 'description', 'installationDate'];
    const filled = requiredFields.filter(f => formData[f]).length;
    return Math.round((filled / requiredFields.length) * 100);
  };

  return (
    <div className="eicr-section-card">
      <Collapsible open={isOpen} onOpenChange={onToggle}>
        <CollapsibleTrigger className="w-full">
          <SectionHeader
            title="Client & Installation Details"
            icon={Users}
            isOpen={isOpen}
            color="amber-500"
            completionPercentage={getCompletionPercentage()}
          />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="p-4 sm:p-5 md:p-6 space-y-5 sm:space-y-6">
            {/* Certificate Number (Read-only) */}
            <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-300">Certificate Number</span>
              </div>
              <Input
                id="certificateNumber"
                value={formData.certificateNumber || ''}
                readOnly
                className="bg-white/5 cursor-not-allowed font-mono text-white border-blue-500/30"
                tabIndex={-1}
              />
              <p className="text-xs text-white/50 mt-1">Auto-generated and cannot be changed</p>
            </div>

            {/* Client Information */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-elec-yellow border-b border-white/10 pb-2 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow"></div>
                Client Information
              </h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="clientName" className="text-sm">Client Name *</Label>
                  <Input
                    id="clientName"
                    value={formData.clientName || ''}
                    onChange={(e) => onUpdate('clientName', e.target.value)}
                    placeholder="Full name of person ordering work"
                    className={cn(
                      "h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow",
                      !formData.clientName && "border-red-500/50"
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="clientPhone" className="text-sm">Client Phone</Label>
                    <Input
                      id="clientPhone"
                      type="tel"
                      value={formData.clientPhone || ''}
                      onChange={(e) => onUpdate('clientPhone', e.target.value)}
                      placeholder="Contact telephone"
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="clientEmail" className="text-sm">Client Email</Label>
                    <Input
                      id="clientEmail"
                      type="email"
                      value={formData.clientEmail || ''}
                      onChange={(e) => onUpdate('clientEmail', e.target.value)}
                      placeholder="Email address"
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientAddress" className="text-sm">Client Address *</Label>
                  <Textarea
                    id="clientAddress"
                    value={formData.clientAddress || ''}
                    onChange={(e) => onUpdate('clientAddress', e.target.value)}
                    placeholder="Client's full postal address"
                    rows={2}
                    className={cn(
                      "text-base touch-manipulation min-h-[80px] border-white/30 focus:border-elec-yellow focus:ring-elec-yellow",
                      !formData.clientAddress && "border-red-500/50"
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Installation Details */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-elec-yellow border-b border-white/10 pb-2 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow"></div>
                Installation Details
              </h4>

              {/* Same as client address checkbox */}
              <div className="flex items-start gap-3 p-3 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
                <Checkbox
                  id="sameAsClientAddress"
                  checked={formData.sameAsClientAddress === 'true'}
                  onCheckedChange={handleSameAddressToggle}
                  className="border-elec-yellow/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black mt-0.5"
                />
                <Label
                  htmlFor="sameAsClientAddress"
                  className="text-sm font-medium cursor-pointer leading-relaxed"
                >
                  Installation address is the same as client address
                </Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="installationAddress" className="text-sm">Installation Address *</Label>
                <Textarea
                  id="installationAddress"
                  value={formData.installationAddress || ''}
                  onChange={(e) => onUpdate('installationAddress', e.target.value)}
                  placeholder="Full address of the installation"
                  rows={2}
                  disabled={formData.sameAsClientAddress === 'true'}
                  className={cn(
                    "text-base touch-manipulation min-h-[80px] border-white/30 focus:border-elec-yellow focus:ring-elec-yellow",
                    !formData.installationAddress && "border-red-500/50",
                    formData.sameAsClientAddress === 'true' && "opacity-50"
                  )}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm">Description of Work *</Label>
                  <Textarea
                    id="description"
                    value={formData.description || ''}
                    onChange={(e) => onUpdate('description', e.target.value)}
                    placeholder="Describe the electrical installation"
                    rows={2}
                    className={cn(
                      "text-base touch-manipulation min-h-[80px] border-white/30 focus:border-elec-yellow focus:ring-elec-yellow",
                      !formData.description && "border-red-500/50"
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="installationType" className="text-sm">Installation Type</Label>
                  <Select value={formData.installationType || ''} onValueChange={(value) => onUpdate('installationType', value)}>
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow data-[state=open]:border-elec-yellow data-[state=open]:ring-2">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                      <SelectItem value="domestic">Domestic</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="industrial">Industrial</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Installation Dates */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-green-400 border-b border-white/10 pb-2 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Installation Dates
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="installationDate" className="text-sm">Date of Installation *</Label>
                  <Input
                    id="installationDate"
                    type="date"
                    value={formData.installationDate || ''}
                    onChange={(e) => onUpdate('installationDate', e.target.value)}
                    className={cn(
                      "h-11 text-base touch-manipulation border-white/30 focus:border-green-500 focus:ring-green-500",
                      !formData.installationDate && "border-red-500/50"
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="testDate" className="text-sm">Date of Testing</Label>
                  <Input
                    id="testDate"
                    type="date"
                    value={formData.testDate || ''}
                    onChange={(e) => onUpdate('testDate', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-green-500 focus:ring-green-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default EICClientDetailsSection;
