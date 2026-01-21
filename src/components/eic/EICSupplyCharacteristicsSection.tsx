import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Zap, AlertCircle, Shield, Plug, ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import SectionHeader from '@/components/ui/section-header';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface EICSupplyCharacteristicsSectionProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const EICSupplyCharacteristicsSection: React.FC<EICSupplyCharacteristicsSectionProps> = ({ formData, onUpdate, isOpen, onToggle }) => {
  const isMobile = useIsMobile();

  const handlePhasesChange = (value: string) => {
    onUpdate('phases', value);

    // Auto-set supply voltage based on phases
    if (value === 'single' && formData.supplyVoltage !== '230V') {
      onUpdate('supplyVoltage', '230V');
    } else if (value === 'three' && formData.supplyVoltage !== '400V') {
      onUpdate('supplyVoltage', '400V');
    }
  };

  const handleEarthingArrangementChange = (value: string) => {
    onUpdate('earthingArrangement', value);

    // Auto-set PME status based on earthing arrangement
    if (value === 'tncs' && formData.supplyPME !== 'yes') {
      onUpdate('supplyPME', 'yes');
    } else if (['tns', 'tt', 'it'].includes(value) && formData.supplyPME !== 'no') {
      onUpdate('supplyPME', 'no');
    }
  };

  // Calculate completion percentage
  const getCompletionPercentage = () => {
    const requiredFields = ['supplyVoltage', 'phases', 'earthingArrangement', 'liveCondutorType', 'prospectiveFaultCurrent', 'externalZe'];
    const filled = requiredFields.filter(f => formData[f]).length;
    return Math.round((filled / requiredFields.length) * 100);
  };

  return (
    <div className={cn(isMobile ? "" : "eicr-section-card")}>
      <Collapsible open={isOpen} onOpenChange={onToggle}>
        <CollapsibleTrigger className="w-full">
          {isMobile ? (
            <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-y border-border/20">
              <div className="h-10 w-10 rounded-xl bg-yellow-500/20 flex items-center justify-center shrink-0">
                <Zap className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="flex-1 text-left min-w-0">
                <h3 className="font-semibold text-foreground">Supply Characteristics</h3>
                <span className="text-xs text-muted-foreground">{getCompletionPercentage()}% complete</span>
              </div>
              <ChevronDown className={cn(
                "h-5 w-5 text-muted-foreground transition-transform shrink-0",
                isOpen && "rotate-180"
              )} />
            </div>
          ) : (
            <SectionHeader
              title="Supply Characteristics"
              icon={Zap}
              isOpen={isOpen}
              color="yellow-500"
              completionPercentage={getCompletionPercentage()}
            />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className={cn(
            "space-y-5 sm:space-y-6",
            isMobile ? "px-4 py-4" : "p-4 sm:p-5 md:p-6"
          )}>
            {/* Voltage & Frequency */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="supplyVoltage" className="text-sm">Supply Voltage *</Label>
                <Select
                  value={formData.supplyVoltage || ''}
                  onValueChange={(value) => onUpdate('supplyVoltage', value)}
                >
                  <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow data-[state=open]:border-elec-yellow data-[state=open]:ring-2">
                    <SelectValue placeholder="Select voltage" />
                  </SelectTrigger>
                  <SelectContent className="z-[100] bg-background border-border text-foreground">
                    <SelectItem value="230V">230V (Single Phase)</SelectItem>
                    <SelectItem value="400V">400V (Three Phase)</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="supplyFrequency" className="text-sm">Frequency (Hz)</Label>
                <Input
                  id="supplyFrequency"
                  type="number"
                  value={formData.supplyFrequency || '50'}
                  onChange={(e) => onUpdate('supplyFrequency', e.target.value)}
                  placeholder="50"
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                />
                <p className="text-xs text-white/50">Typically 50Hz in the UK</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phases" className="text-sm">Number of Phases *</Label>
                <Select
                  value={formData.phases || ''}
                  onValueChange={handlePhasesChange}
                >
                  <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow data-[state=open]:border-elec-yellow data-[state=open]:ring-2">
                    <SelectValue placeholder="Select phases" />
                  </SelectTrigger>
                  <SelectContent className="z-[100] bg-background border-border text-foreground">
                    <SelectItem value="single">Single Phase</SelectItem>
                    <SelectItem value="three">Three Phase</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Earthing */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-green-400 border-b border-white/10 pb-2 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                Earthing Arrangement
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="earthingArrangement" className="text-sm">Earthing Type *</Label>
                  <Select
                    value={formData.earthingArrangement || ''}
                    onValueChange={handleEarthingArrangementChange}
                  >
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-green-500 focus:ring-green-500 data-[state=open]:border-green-500 data-[state=open]:ring-2">
                      <SelectValue placeholder="Select earthing type" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-background border-border text-foreground">
                      <SelectItem value="tncs">TN-C-S (PME)</SelectItem>
                      <SelectItem value="tns">TN-S</SelectItem>
                      <SelectItem value="tt">TT</SelectItem>
                      <SelectItem value="it">IT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="supplyPME" className="text-sm">Supply PME</Label>
                  <Select
                    value={formData.supplyPME || ''}
                    onValueChange={(value) => onUpdate('supplyPME', value)}
                  >
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-green-500 focus:ring-green-500 data-[state=open]:border-green-500 data-[state=open]:ring-2">
                      <SelectValue placeholder="PME status" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-background border-border text-foreground">
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                      <SelectItem value="unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                  {formData.earthingArrangement === 'tncs' && formData.supplyPME !== 'yes' && (
                    <p className="text-xs text-amber-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      TN-C-S systems typically have PME
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Number and Type of Live Conductors (IET Form) */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-blue-400 border-b border-white/10 pb-2 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                Number and Type of Live Conductors
              </h4>
              <div className="space-y-2">
                <Label className="text-sm">Live Conductor Configuration *</Label>
                <Select
                  value={formData.liveCondutorType || ''}
                  onValueChange={(value) => onUpdate('liveCondutorType', value)}
                >
                  <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-blue-500 focus:ring-blue-500 data-[state=open]:border-blue-500 data-[state=open]:ring-2">
                    <SelectValue placeholder="Select configuration" />
                  </SelectTrigger>
                  <SelectContent className="z-[100] bg-background border-border text-foreground">
                    <SelectItem value="ac-1ph-2w">AC: 1-phase, 2-wire</SelectItem>
                    <SelectItem value="ac-2ph-3w">AC: 2-phase, 3-wire</SelectItem>
                    <SelectItem value="ac-3ph-3w">AC: 3-phase, 3-wire</SelectItem>
                    <SelectItem value="ac-3ph-4w">AC: 3-phase, 4-wire</SelectItem>
                    <SelectItem value="dc-2w">DC: 2-wire</SelectItem>
                    <SelectItem value="dc-3w">DC: 3-wire</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Nature of Supply Parameters (IET Form) */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-purple-400 border-b border-white/10 pb-2 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                Nature of Supply Parameters
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="prospectiveFaultCurrent" className="text-sm">
                    Prospective Fault Current I<sub>pf</sub> (kA) *
                  </Label>
                  <Input
                    id="prospectiveFaultCurrent"
                    type="number"
                    step="0.1"
                    value={formData.prospectiveFaultCurrent || ''}
                    onChange={(e) => onUpdate('prospectiveFaultCurrent', e.target.value)}
                    placeholder="e.g., 16"
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-purple-500 focus:ring-purple-500"
                  />
                  <p className="text-xs text-white/50">By enquiry or measurement</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="externalZe" className="text-sm">
                    External Earth Fault Loop Impedance Z<sub>e</sub> (Ω) *
                  </Label>
                  <Input
                    id="externalZe"
                    type="number"
                    step="0.01"
                    value={formData.externalZe || ''}
                    onChange={(e) => onUpdate('externalZe', e.target.value)}
                    placeholder="e.g., 0.35"
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-purple-500 focus:ring-purple-500"
                  />
                  <p className="text-xs text-white/50">By enquiry or measurement</p>
                </div>
              </div>

              {/* Supply Polarity Confirmation */}
              <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                <Checkbox
                  id="supplyPolarityConfirmed"
                  checked={formData.supplyPolarityConfirmed === true}
                  onCheckedChange={(checked) => onUpdate('supplyPolarityConfirmed', checked)}
                  className="border-green-500/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 mt-0.5"
                />
                <Label htmlFor="supplyPolarityConfirmed" className="text-sm font-medium cursor-pointer leading-relaxed">
                  Confirmation of supply polarity
                </Label>
              </div>

              {/* Other Sources of Supply */}
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
                  <Checkbox
                    id="otherSourcesOfSupply"
                    checked={formData.otherSourcesOfSupply === true}
                    onCheckedChange={(checked) => onUpdate('otherSourcesOfSupply', checked)}
                    className="border-amber-500/40 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500 mt-0.5"
                  />
                  <Label htmlFor="otherSourcesOfSupply" className="text-sm font-medium cursor-pointer leading-relaxed">
                    Other sources of supply present (as detailed on attached schedule)
                  </Label>
                </div>
                {formData.otherSourcesOfSupply && (
                  <div className="space-y-2 ml-6">
                    <Label htmlFor="otherSourcesDetails" className="text-sm">Details of Other Sources</Label>
                    <Input
                      id="otherSourcesDetails"
                      value={formData.otherSourcesDetails || ''}
                      onChange={(e) => onUpdate('otherSourcesDetails', e.target.value)}
                      placeholder="e.g., Solar PV system, Generator backup"
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-amber-500 focus:ring-amber-500"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Supply Protective Device (IET Form) */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-orange-400 border-b border-white/10 pb-2 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Supply Protective Device
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="supplyDeviceBsEn" className="text-sm">BS (EN)</Label>
                  <Input
                    id="supplyDeviceBsEn"
                    value={formData.supplyDeviceBsEn || ''}
                    onChange={(e) => onUpdate('supplyDeviceBsEn', e.target.value)}
                    placeholder="e.g., BS EN 60898"
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supplyDeviceType" className="text-sm">Type</Label>
                  <Select
                    value={formData.supplyDeviceType || ''}
                    onValueChange={(value) => onUpdate('supplyDeviceType', value)}
                  >
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-orange-500 focus:ring-orange-500 data-[state=open]:border-orange-500 data-[state=open]:ring-2">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-background border-border text-foreground">
                      <SelectItem value="B">Type B</SelectItem>
                      <SelectItem value="C">Type C</SelectItem>
                      <SelectItem value="D">Type D</SelectItem>
                      <SelectItem value="gG">gG Fuse</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supplyDeviceRating" className="text-sm">Rated Current (A)</Label>
                  <Input
                    id="supplyDeviceRating"
                    type="number"
                    value={formData.supplyDeviceRating || ''}
                    onChange={(e) => onUpdate('supplyDeviceRating', e.target.value)}
                    placeholder="e.g., 100"
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-orange-500 focus:ring-orange-500"
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

export default EICSupplyCharacteristicsSection;
