import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Power } from 'lucide-react';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { SectionHeader } from '@/components/ui/section-header';
import InputWithValidation from './InputWithValidation';

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

  return (
    <Card className="border border-border bg-card overflow-hidden">
      <Collapsible open={isOpen} onOpenChange={onToggle}>
        <SectionHeader 
          title="Supply Characteristics" 
          icon={Power}
          isOpen={isOpen}
          color="amber-500"
        />
        <CollapsibleContent>
          <CardContent className="space-y-6 p-4 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="supplyVoltage" className="font-medium text-sm">Supply Voltage *</Label>
            <Select
              value={formData.supplyVoltage || ''}
              onValueChange={(value) => onUpdate('supplyVoltage', value)}
            >
              <SelectTrigger className="bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow h-11">
                <SelectValue placeholder="Select voltage" />
              </SelectTrigger>
              <SelectContent className="bg-elec-gray border-elec-gray text-foreground z-50">
                <SelectItem value="230V">230V (Single Phase)</SelectItem>
                <SelectItem value="400V">400V (Three Phase)</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <InputWithValidation
            id="supplyFrequency"
            label="Frequency (Hz)"
            value={formData.supplyFrequency || '50'}
            onChange={(value) => onUpdate('supplyFrequency', value)}
            placeholder="50"
            type="number"
            helpText="Typically 50Hz in the UK"
          />

          <div>
            <Label htmlFor="phases" className="font-medium text-sm">Number of Phases *</Label>
            <Select
              value={formData.phases || ''}
              onValueChange={handlePhasesChange}
            >
              <SelectTrigger className="bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow h-11">
                <SelectValue placeholder="Select phases" />
              </SelectTrigger>
              <SelectContent className="bg-elec-gray border-elec-gray text-foreground z-50">
                <SelectItem value="single">Single Phase</SelectItem>
                <SelectItem value="three">Three Phase</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="earthingArrangement" className="font-medium text-sm">Earthing Arrangement *</Label>
            <Select
              value={formData.earthingArrangement || ''}
              onValueChange={handleEarthingArrangementChange}
            >
              <SelectTrigger className="bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow h-11">
                <SelectValue placeholder="Select earthing type" />
              </SelectTrigger>
              <SelectContent className="bg-elec-gray border-elec-gray text-foreground z-50">
                <SelectItem value="tncs">TN-C-S (PME)</SelectItem>
                <SelectItem value="tns">TN-S</SelectItem>
                <SelectItem value="tt">TT</SelectItem>
                <SelectItem value="it">IT</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="supplyPME" className="font-medium text-sm">Supply PME</Label>
            <Select
              value={formData.supplyPME || ''}
              onValueChange={(value) => onUpdate('supplyPME', value)}
            >
              <SelectTrigger className="bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow h-11">
                <SelectValue placeholder="PME status" />
              </SelectTrigger>
              <SelectContent className="bg-elec-gray border-elec-gray text-foreground z-50">
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
                <SelectItem value="unknown">Unknown</SelectItem>
              </SelectContent>
            </Select>
            {formData.earthingArrangement === 'tncs' && formData.supplyPME !== 'yes' && (
              <p className="text-xs text-amber-600 mt-1">
                TN-C-S systems typically have PME
              </p>
            )}
          </div>
        </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default EICSupplyCharacteristicsSection;
