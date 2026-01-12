import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Zap, AlertCircle } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import SectionHeader from '@/components/ui/section-header';

interface EICSupplyCharacteristicsSectionProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const EICSupplyCharacteristicsSection: React.FC<EICSupplyCharacteristicsSectionProps> = ({ formData, onUpdate, isOpen, onToggle }) => {
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
    const requiredFields = ['supplyVoltage', 'phases', 'earthingArrangement'];
    const filled = requiredFields.filter(f => formData[f]).length;
    return Math.round((filled / requiredFields.length) * 100);
  };

  return (
    <div className="eicr-section-card">
      <Collapsible open={isOpen} onOpenChange={onToggle}>
        <CollapsibleTrigger className="w-full">
          <SectionHeader
            title="Supply Characteristics"
            icon={Zap}
            isOpen={isOpen}
            color="yellow-500"
            completionPercentage={getCompletionPercentage()}
          />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="p-4 sm:p-5 md:p-6 space-y-5 sm:space-y-6">
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
                  <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
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
                  <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
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
                    <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
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
                    <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
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
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default EICSupplyCharacteristicsSection;
