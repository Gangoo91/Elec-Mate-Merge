import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
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
            <MobileSelectPicker
              value={formData.supplyVoltage || ''}
              onValueChange={(value) => onUpdate('supplyVoltage', value)}
              options={[
                { value: '230V', label: '230V (Single Phase)' },
                { value: '400V', label: '400V (Three Phase)' },
                { value: 'other', label: 'Other' },
              ]}
              placeholder="Select voltage"
              title="Supply Voltage"
            />
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
            <MobileSelectPicker
              value={formData.phases || ''}
              onValueChange={handlePhasesChange}
              options={[
                { value: 'single', label: 'Single Phase' },
                { value: 'three', label: 'Three Phase' },
              ]}
              placeholder="Select phases"
              title="Number of Phases"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="earthingArrangement" className="font-medium text-sm">Earthing Arrangement *</Label>
            <MobileSelectPicker
              value={formData.earthingArrangement || ''}
              onValueChange={handleEarthingArrangementChange}
              options={[
                { value: 'tncs', label: 'TN-C-S (PME)' },
                { value: 'tns', label: 'TN-S' },
                { value: 'tt', label: 'TT' },
                { value: 'it', label: 'IT' },
              ]}
              placeholder="Select earthing type"
              title="Earthing Arrangement"
            />
          </div>

          <div>
            <Label htmlFor="supplyPME" className="font-medium text-sm">Supply PME</Label>
            <MobileSelectPicker
              value={formData.supplyPME || ''}
              onValueChange={(value) => onUpdate('supplyPME', value)}
              options={[
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' },
                { value: 'unknown', label: 'Unknown' },
              ]}
              placeholder="PME status"
              title="Supply PME"
            />
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
