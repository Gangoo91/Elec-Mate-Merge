import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { SectionHeader } from '@/components/ui/section-header';
import { Users } from 'lucide-react';

interface EICClientDetailsSectionProps {
  formData: any;
  onUpdate: (field: string, value: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const EICClientDetailsSection = ({
  formData,
  onUpdate,
  isOpen,
  onToggle,
}: EICClientDetailsSectionProps) => {
  const handleSameAddressToggle = (checked: boolean) => {
    if (checked && formData.clientAddress) {
      onUpdate('installationAddress', formData.clientAddress);
    }
    onUpdate('sameAsClientAddress', checked ? 'true' : 'false');
  };

  return (
    <Card className="border border-border bg-card overflow-hidden">
      <Collapsible open={isOpen} onOpenChange={onToggle}>
        <SectionHeader
          title="Client & Installation Details"
          icon={Users}
          isOpen={isOpen}
          color="amber-500"
        />
        <CollapsibleContent>
          <CardContent className="space-y-6 p-4 sm:p-6">
            {/* Certificate Number (Read-only) */}
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-lg px-4 py-3">
                <h3 className="text-sm sm:text-base font-semibold text-foreground flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                  Certificate Details
                </h3>
              </div>
              <div className="space-y-2">
                <Label htmlFor="certificateNumber" className="font-medium text-sm">
                  Certificate Number
                </Label>
                <Input
                  id="certificateNumber"
                  value={formData.certificateNumber || ''}
                  readOnly
                  className="bg-muted/50 cursor-not-allowed font-mono text-foreground"
                  tabIndex={-1}
                />
                <p className="text-xs text-muted-foreground">
                  Auto-generated and cannot be changed
                </p>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Client Information */}
            <div className="space-y-4">
              <h3 className="text-sm sm:text-base font-semibold text-foreground border-b border-elec-gray pb-2 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                Client Information
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="clientName" className="font-medium text-sm">
                    Client Name *
                  </Label>
                  <Input
                    id="clientName"
                    value={formData.clientName || ''}
                    onChange={(e) => onUpdate('clientName', e.target.value)}
                    placeholder="Full name of person ordering work"
                    className="h-11 text-base touch-manipulation"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="clientPhone" className="font-medium text-sm">
                      Client Phone
                    </Label>
                    <Input
                      id="clientPhone"
                      type="tel"
                      value={formData.clientPhone || ''}
                      onChange={(e) => onUpdate('clientPhone', e.target.value)}
                      placeholder="Contact telephone number"
                      className="h-11 text-base touch-manipulation"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="clientEmail" className="font-medium text-sm">
                      Client Email
                    </Label>
                    <Input
                      id="clientEmail"
                      type="email"
                      value={formData.clientEmail || ''}
                      onChange={(e) => onUpdate('clientEmail', e.target.value)}
                      placeholder="Email address for correspondence"
                      className="h-11 text-base touch-manipulation"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientAddress" className="font-medium text-sm">
                    Client Address *
                  </Label>
                  <Textarea
                    id="clientAddress"
                    value={formData.clientAddress || ''}
                    onChange={(e) => onUpdate('clientAddress', e.target.value)}
                    placeholder="Client's full postal address"
                    rows={3}
                    className="text-base touch-manipulation min-h-[120px]"
                  />
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Installation Details */}
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-elec-yellow/20 to-amber-600/20 border border-elec-yellow/30 rounded-lg px-4 py-3">
                <h3 className="text-sm sm:text-base font-semibold text-foreground flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow"></div>
                  Installation Details
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-muted rounded-lg border border-border">
                  <Checkbox
                    id="sameAsClientAddress"
                    checked={formData.sameAsClientAddress === 'true'}
                    onCheckedChange={handleSameAddressToggle}
                  />
                  <Label
                    htmlFor="sameAsClientAddress"
                    className="text-base font-medium cursor-pointer leading-relaxed"
                  >
                    Installation address is the same as client address
                  </Label>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="installationAddress" className="font-medium text-sm">
                    Installation Address *
                  </Label>
                  <Textarea
                    id="installationAddress"
                    value={formData.installationAddress || ''}
                    onChange={(e) => onUpdate('installationAddress', e.target.value)}
                    placeholder="Full address of the installation"
                    rows={3}
                    disabled={formData.sameAsClientAddress === 'true'}
                    className="text-base touch-manipulation min-h-[120px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="description" className="font-medium text-sm">
                    Description of Work *
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description || ''}
                    onChange={(e) => onUpdate('description', e.target.value)}
                    placeholder="Describe the electrical installation or work carried out"
                    rows={3}
                    className="text-base touch-manipulation min-h-[120px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="installationType" className="font-medium text-sm">
                    Installation Type
                  </Label>
                  <Select
                    value={formData.installationType || ''}
                    onValueChange={(value) => onUpdate('installationType', value)}
                  >
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow">
                      <SelectValue placeholder="Select installation type" />
                    </SelectTrigger>
                    <SelectContent className="bg-elec-gray border-elec-gray text-foreground z-50">
                      <SelectItem value="domestic">Domestic</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="industrial">Industrial</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Installation Dates */}
            <div className="space-y-4">
              <h3 className="text-sm sm:text-base font-semibold text-foreground border-b border-border pb-2 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                Installation Dates
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="installationDate" className="font-medium text-sm">
                    Date of Installation *
                  </Label>
                  <Input
                    id="installationDate"
                    type="date"
                    value={formData.installationDate || ''}
                    onChange={(e) => onUpdate('installationDate', e.target.value)}
                    className="h-11 text-base touch-manipulation"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="testDate" className="font-medium text-sm">
                    Date of Testing
                  </Label>
                  <Input
                    id="testDate"
                    type="date"
                    value={formData.testDate || ''}
                    onChange={(e) => onUpdate('testDate', e.target.value)}
                    className="h-11 text-base touch-manipulation"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default EICClientDetailsSection;
