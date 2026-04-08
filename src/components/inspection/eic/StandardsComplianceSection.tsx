import React from 'react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const SectionTitle = ({ title }: { title: string }) => (
  <div className="border-b border-white/[0.06] pb-1 mb-3">
    <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
    <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
  </div>
);

const FormField = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <Label className="text-white text-xs mb-1.5 block">{label}</Label>
    {children}
  </div>
);

interface StandardsComplianceSectionProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

const StandardsComplianceSection: React.FC<StandardsComplianceSectionProps> = ({
  formData,
  onUpdate,
}) => {
  return (
    <div className="space-y-4">
      <SectionTitle title="Standards and Compliance" />

      <div className="grid grid-cols-2 gap-2 items-end">
        <FormField label="Design Standard">
          <Select
            value={formData.designStandard || 'BS7671'}
            onValueChange={(value) => onUpdate('designStandard', value)}
          >
            <SelectTrigger className="h-11 touch-manipulation bg-white/[0.06] border-white/[0.08] focus:border-elec-yellow focus:ring-elec-yellow">
              <SelectValue placeholder="Select standard" />
            </SelectTrigger>
            <SelectContent className="bg-white/[0.06] border-white/[0.08] text-white z-50">
              <SelectItem value="BS7671">BS 7671:18+A3:2024</SelectItem>
              <SelectItem value="other">Other Standard</SelectItem>
            </SelectContent>
          </Select>
        </FormField>

        <FormField label="Part P Compliance">
          <Select
            value={formData.partPCompliance || ''}
            onValueChange={(value) => onUpdate('partPCompliance', value)}
          >
            <SelectTrigger className="h-11 touch-manipulation bg-white/[0.06] border-white/[0.08] focus:border-elec-yellow focus:ring-elec-yellow">
              <SelectValue placeholder="Compliance" />
            </SelectTrigger>
            <SelectContent className="bg-white/[0.06] border-white/[0.08] text-white z-50">
              <SelectItem value="compliant">Compliant</SelectItem>
              <SelectItem value="notApplicable">Not Applicable</SelectItem>
              <SelectItem value="nonNotifiable">Non-notifiable</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
      </div>
    </div>
  );
};

export default StandardsComplianceSection;
