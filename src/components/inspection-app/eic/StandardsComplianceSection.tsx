import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
            <Select
              value={formData.designStandard || 'BS7671'}
              onValueChange={(value) => onUpdate('designStandard', value)}
            >
              <SelectTrigger className="bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow h-11">
                <SelectValue placeholder="Select standard" />
              </SelectTrigger>
              <SelectContent className="bg-elec-gray border-elec-gray text-foreground z-50">
                <SelectItem value="BS7671">BS 7671:18+A3:2024</SelectItem>
                <SelectItem value="other">Other Standard</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="partPCompliance" className="font-medium text-sm">Part P Compliance</Label>
            <Select
              value={formData.partPCompliance || ''}
              onValueChange={(value) => onUpdate('partPCompliance', value)}
            >
              <SelectTrigger className="bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow h-11">
                <SelectValue placeholder="Select compliance" />
              </SelectTrigger>
              <SelectContent className="bg-elec-gray border-elec-gray text-foreground z-50">
                <SelectItem value="compliant">Compliant</SelectItem>
                <SelectItem value="notApplicable">Not Applicable</SelectItem>
                <SelectItem value="nonNotifiable">Non-notifiable</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default StandardsComplianceSection;
