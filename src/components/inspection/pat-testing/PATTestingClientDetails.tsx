import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, User, Building2, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface PATTestingClientDetailsProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

const PATTestingClientDetails: React.FC<PATTestingClientDetailsProps> = ({
  formData,
  onUpdate,
}) => {
  const isMobile = useIsMobile();
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    client: true,
    site: true,
    equipment: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const updateTestEquipment = (field: string, value: any) => {
    onUpdate('testEquipment', {
      ...formData.testEquipment,
      [field]: value,
    });
  };

  return (
    <div className="space-y-6">
      {/* Client Details */}
      <Collapsible open={openSections.client} onOpenChange={() => toggleSection('client')}>
        <div className={cn(isMobile ? "" : "eicr-section-card")}>
          <CollapsibleTrigger asChild>
            <div className={cn(
              "cursor-pointer transition-colors p-4",
              isMobile ? "bg-card/30 border-y border-border/20" : "hover:bg-muted/50"
            )}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-500" />
                  </div>
                  <span className="font-semibold text-lg">Client Details</span>
                </div>
                <ChevronDown className={cn("h-5 w-5 transition-transform", openSections.client && "rotate-180")} />
              </div>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="clientName">Client Name *</Label>
                  <Input
                    id="clientName"
                    placeholder="Enter client name"
                    value={formData.clientName || ''}
                    onChange={(e) => onUpdate('clientName', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div>
                  <Label htmlFor="contactPerson">Contact Person</Label>
                  <Input
                    id="contactPerson"
                    placeholder="Contact name"
                    value={formData.contactPerson || ''}
                    onChange={(e) => onUpdate('contactPerson', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="clientAddress">Client Address</Label>
                <Textarea
                  id="clientAddress"
                  placeholder="Full address"
                  value={formData.clientAddress || ''}
                  onChange={(e) => onUpdate('clientAddress', e.target.value)}
                  className="text-base touch-manipulation min-h-[80px] border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="clientTelephone">Telephone</Label>
                  <Input
                    id="clientTelephone"
                    type="tel"
                    placeholder="Contact number"
                    value={formData.clientTelephone || ''}
                    onChange={(e) => onUpdate('clientTelephone', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div>
                  <Label htmlFor="clientEmail">Email</Label>
                  <Input
                    id="clientEmail"
                    type="email"
                    placeholder="Email address"
                    value={formData.clientEmail || ''}
                    onChange={(e) => onUpdate('clientEmail', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* Site Details */}
      <Collapsible open={openSections.site} onOpenChange={() => toggleSection('site')}>
        <div className={cn(isMobile ? "" : "eicr-section-card")}>
          <CollapsibleTrigger asChild>
            <div className={cn(
              "cursor-pointer transition-colors p-4",
              isMobile ? "border-b border-border/20" : "hover:bg-muted/50"
            )}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-green-500" />
                  </div>
                  <span className="font-semibold text-lg">Site Details</span>
                </div>
                <ChevronDown className={cn("h-5 w-5 transition-transform", openSections.site && "rotate-180")} />
              </div>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4 space-y-4">
              <div>
                <Label htmlFor="siteName">Site Name</Label>
                <Input
                  id="siteName"
                  placeholder="Building or site name"
                  value={formData.siteName || ''}
                  onChange={(e) => onUpdate('siteName', e.target.value)}
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                />
              </div>
              <div>
                <Label htmlFor="siteAddress">Site Address *</Label>
                <Textarea
                  id="siteAddress"
                  placeholder="Full test location address"
                  value={formData.siteAddress || ''}
                  onChange={(e) => onUpdate('siteAddress', e.target.value)}
                  className="text-base touch-manipulation min-h-[80px] border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="siteContactName">Site Contact</Label>
                  <Input
                    id="siteContactName"
                    placeholder="On-site contact name"
                    value={formData.siteContactName || ''}
                    onChange={(e) => onUpdate('siteContactName', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div>
                  <Label htmlFor="siteContactPhone">Contact Phone</Label>
                  <Input
                    id="siteContactPhone"
                    type="tel"
                    placeholder="Contact number"
                    value={formData.siteContactPhone || ''}
                    onChange={(e) => onUpdate('siteContactPhone', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* Test Equipment */}
      <Collapsible open={openSections.equipment} onOpenChange={() => toggleSection('equipment')}>
        <div className={cn(isMobile ? "" : "eicr-section-card")}>
          <CollapsibleTrigger asChild>
            <div className={cn(
              "cursor-pointer transition-colors p-4",
              isMobile ? "border-b border-border/20" : "hover:bg-muted/50"
            )}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <Settings className="h-5 w-5 text-purple-500" />
                  </div>
                  <span className="font-semibold text-lg">Test Equipment</span>
                </div>
                <ChevronDown className={cn("h-5 w-5 transition-transform", openSections.equipment && "rotate-180")} />
              </div>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="equipmentMake">Make</Label>
                  <Input
                    id="equipmentMake"
                    placeholder="e.g., Megger, Seaward"
                    value={formData.testEquipment?.make || ''}
                    onChange={(e) => updateTestEquipment('make', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div>
                  <Label htmlFor="equipmentModel">Model</Label>
                  <Input
                    id="equipmentModel"
                    placeholder="Model number"
                    value={formData.testEquipment?.model || ''}
                    onChange={(e) => updateTestEquipment('model', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="equipmentSerial">Serial Number</Label>
                <Input
                  id="equipmentSerial"
                  placeholder="Equipment serial number"
                  value={formData.testEquipment?.serialNumber || ''}
                  onChange={(e) => updateTestEquipment('serialNumber', e.target.value)}
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="lastCalibration">Last Calibration Date</Label>
                  <Input
                    id="lastCalibration"
                    type="date"
                    value={formData.testEquipment?.lastCalibrationDate || ''}
                    onChange={(e) => updateTestEquipment('lastCalibrationDate', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div>
                  <Label htmlFor="nextCalibration">Next Calibration Due</Label>
                  <Input
                    id="nextCalibration"
                    type="date"
                    value={formData.testEquipment?.nextCalibrationDue || ''}
                    onChange={(e) => updateTestEquipment('nextCalibrationDue', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </div>
  );
};

export default PATTestingClientDetails;
