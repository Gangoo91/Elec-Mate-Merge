import React, { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import SectionHeader from '@/components/ui/section-header';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, FileText, Zap, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MWDetailsTabProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

const MWDetailsTab: React.FC<MWDetailsTabProps> = ({ formData, onUpdate }) => {
  const [openSections, setOpenSections] = useState({
    client: true,
    work: true,
    supply: true
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const getCompletionPercentage = (section: string) => {
    switch (section) {
      case 'client': {
        const fields = ['clientName', 'propertyAddress', 'workDate'];
        const filled = fields.filter(f => formData[f]).length;
        return Math.round((filled / fields.length) * 100);
      }
      case 'work': {
        const fields = ['workDescription', 'workType'];
        const filled = fields.filter(f => formData[f]).length;
        return Math.round((filled / fields.length) * 100);
      }
      case 'supply': {
        const fields = ['earthingArrangement'];
        const filled = fields.filter(f => formData[f]).length;
        return Math.round((filled / fields.length) * 100);
      }
      default:
        return 0;
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Client & Installation */}
      <div className="eicr-section-card">
        <Collapsible open={openSections.client} onOpenChange={() => toggleSection('client')}>
          <CollapsibleTrigger className="w-full">
            <SectionHeader
              title="Client & Installation"
              icon={Users}
              isOpen={openSections.client}
              color="amber-500"
              completionPercentage={getCompletionPercentage('client')}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4 sm:p-5 md:p-6 space-y-4">
              {/* Certificate Number (Read-only) */}
              {formData.certificateNumber && (
                <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-300">Certificate Number</span>
                    <span className="font-mono text-sm text-white">{formData.certificateNumber}</span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">Client Name *</Label>
                  <Input
                    value={formData.clientName || ''}
                    onChange={(e) => onUpdate('clientName', e.target.value)}
                    placeholder="Full name"
                    className={cn("h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow", !formData.clientName && "border-red-500/50")}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Person Ordering Work</Label>
                  <Input
                    value={formData.personOrderingWork || ''}
                    onChange={(e) => onUpdate('personOrderingWork', e.target.value)}
                    placeholder="If different from client"
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Property Address *</Label>
                <Textarea
                  value={formData.propertyAddress || ''}
                  onChange={(e) => onUpdate('propertyAddress', e.target.value)}
                  placeholder="Full installation address"
                  rows={2}
                  className={cn("text-base touch-manipulation min-h-[80px] border-white/30 focus:border-elec-yellow focus:ring-elec-yellow", !formData.propertyAddress && "border-red-500/50")}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">Postcode</Label>
                  <Input
                    value={formData.postcode || ''}
                    onChange={(e) => onUpdate('postcode', e.target.value.toUpperCase())}
                    placeholder="e.g., SW1A 1AA"
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow uppercase"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Date of Work *</Label>
                  <Input
                    type="date"
                    value={formData.workDate || ''}
                    onChange={(e) => onUpdate('workDate', e.target.value)}
                    className={cn("h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow", !formData.workDate && "border-red-500/50")}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">Contractor Name</Label>
                  <Input
                    value={formData.contractorName || ''}
                    onChange={(e) => onUpdate('contractorName', e.target.value)}
                    placeholder="Company name"
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Next Inspection Due</Label>
                  <Input
                    type="date"
                    value={formData.nextInspectionDue || ''}
                    onChange={(e) => onUpdate('nextInspectionDue', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Description of Work */}
      <div className="eicr-section-card">
        <Collapsible open={openSections.work} onOpenChange={() => toggleSection('work')}>
          <CollapsibleTrigger className="w-full">
            <SectionHeader
              title="Description of Work"
              icon={FileText}
              isOpen={openSections.work}
              color="blue-500"
              completionPercentage={getCompletionPercentage('work')}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4 sm:p-5 md:p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">Type of Work *</Label>
                  <Select value={formData.workType || ''} onValueChange={(v) => onUpdate('workType', v)}>
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-blue-500 focus:ring-blue-500 data-[state=open]:border-blue-500 data-[state=open]:ring-2">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                      <SelectItem value="addition">Addition to Existing Circuit</SelectItem>
                      <SelectItem value="alteration">Alteration to Existing Circuit</SelectItem>
                      <SelectItem value="replacement">Replacement of Equipment</SelectItem>
                      <SelectItem value="new">New Circuit</SelectItem>
                      <SelectItem value="repair">Repair</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Location of Work</Label>
                  <Input
                    value={formData.workLocation || ''}
                    onChange={(e) => onUpdate('workLocation', e.target.value)}
                    placeholder="e.g., Kitchen, Garage"
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Description of Work *</Label>
                <Textarea
                  value={formData.workDescription || ''}
                  onChange={(e) => onUpdate('workDescription', e.target.value)}
                  placeholder="Describe the electrical work carried out..."
                  rows={3}
                  className={cn("text-base touch-manipulation min-h-[100px] border-white/30 focus:border-blue-500 focus:ring-blue-500", !formData.workDescription && "border-red-500/50")}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Departures from BS 7671</Label>
                <Textarea
                  value={formData.departuresFromBS7671 || ''}
                  onChange={(e) => onUpdate('departuresFromBS7671', e.target.value)}
                  placeholder="Detail any departures from the standard and reasons..."
                  rows={2}
                  className="text-base touch-manipulation min-h-[80px] border-white/30 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Supply & Earthing */}
      <div className="eicr-section-card">
        <Collapsible open={openSections.supply} onOpenChange={() => toggleSection('supply')}>
          <CollapsibleTrigger className="w-full">
            <SectionHeader
              title="Supply & Earthing"
              icon={Zap}
              isOpen={openSections.supply}
              color="yellow-500"
              completionPercentage={getCompletionPercentage('supply')}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4 sm:p-5 md:p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">Supply Voltage</Label>
                  <Select value={formData.supplyVoltage || '230V'} onValueChange={(v) => onUpdate('supplyVoltage', v)}>
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                      <SelectItem value="230V">230V</SelectItem>
                      <SelectItem value="400V">400V</SelectItem>
                      <SelectItem value="110V">110V</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Frequency</Label>
                  <Input
                    value={formData.frequency || '50Hz'}
                    onChange={(e) => onUpdate('frequency', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Phases</Label>
                  <Select value={formData.supplyPhases || '1'} onValueChange={(v) => onUpdate('supplyPhases', v)}>
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                      <SelectItem value="1">Single Phase</SelectItem>
                      <SelectItem value="3">Three Phase</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Earthing Arrangement *</Label>
                <Select value={formData.earthingArrangement || ''} onValueChange={(v) => onUpdate('earthingArrangement', v)}>
                  <SelectTrigger className={cn("h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-green-500 focus:ring-green-500", !formData.earthingArrangement && "border-red-500/50")}>
                    <SelectValue placeholder="Select earthing type" />
                  </SelectTrigger>
                  <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                    <SelectItem value="TN-C-S">TN-C-S (PME)</SelectItem>
                    <SelectItem value="TN-S">TN-S</SelectItem>
                    <SelectItem value="TT">TT</SelectItem>
                    <SelectItem value="IT">IT</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">Main Earthing Conductor Size</Label>
                  <Select value={formData.mainEarthingConductorSize || ''} onValueChange={(v) => onUpdate('mainEarthingConductorSize', v)}>
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-green-500 focus:ring-green-500">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                      <SelectItem value="10mm2">10mm2</SelectItem>
                      <SelectItem value="16mm2">16mm2</SelectItem>
                      <SelectItem value="25mm2">25mm2</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Main Bonding Conductor Size</Label>
                  <Select value={formData.mainBondingConductorSize || ''} onValueChange={(v) => onUpdate('mainBondingConductorSize', v)}>
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-green-500 focus:ring-green-500">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                      <SelectItem value="6mm2">6mm2</SelectItem>
                      <SelectItem value="10mm2">10mm2</SelectItem>
                      <SelectItem value="16mm2">16mm2</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Bonding Connections */}
              <div className="space-y-3">
                <Label className="text-sm">Bonding Connections</Label>
                <div className="flex flex-wrap gap-4">
                  {['Water', 'Gas', 'Oil', 'Structural', 'Other'].map((item) => {
                    const fieldName = `bonding${item}`;
                    return (
                      <div key={item} className="flex items-center gap-2">
                        <Checkbox
                          id={fieldName}
                          checked={formData[fieldName] || false}
                          onCheckedChange={(c) => onUpdate(fieldName, c)}
                          className="border-white/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                        />
                        <Label htmlFor={fieldName} className="text-sm cursor-pointer">{item}</Label>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default MWDetailsTab;
