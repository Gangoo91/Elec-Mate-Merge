import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { SectionHeader } from '@/components/ui/section-header';
import { FileCheck } from 'lucide-react';

interface StandardsComplianceSectionProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const StandardsComplianceSection: React.FC<StandardsComplianceSectionProps> = ({ formData, onUpdate, isOpen, onToggle }) => {
  return (
    <Card className="border border-border bg-card overflow-hidden">
      <Collapsible open={isOpen} onOpenChange={onToggle}>
        <SectionHeader 
          title="Standards and Compliance" 
          icon={FileCheck}
          isOpen={isOpen}
          color="amber-500"
        />
        <CollapsibleContent>
          <CardContent className="space-y-6 p-4 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="designStandard" className="font-medium text-sm">Design Standard</Label>
            <MobileSelectPicker
              value={formData.designStandard || 'BS7671'}
              onValueChange={(value) => onUpdate('designStandard', value)}
              options={[
                { value: 'BS7671', label: 'BS 7671:18+A3:2024' },
                { value: 'other', label: 'Other Standard' },
              ]}
              placeholder="Select standard"
              title="Design Standard"
            />
          </div>

          <div>
            <Label htmlFor="partPCompliance" className="font-medium text-sm">Part P Compliance</Label>
            <MobileSelectPicker
              value={formData.partPCompliance || ''}
              onValueChange={(value) => onUpdate('partPCompliance', value)}
              options={[
                { value: 'compliant', label: 'Compliant' },
                { value: 'notApplicable', label: 'Not Applicable' },
                { value: 'nonNotifiable', label: 'Non-notifiable' },
              ]}
              placeholder="Select compliance"
              title="Part P Compliance"
            />
          </div>
        </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default StandardsComplianceSection;
