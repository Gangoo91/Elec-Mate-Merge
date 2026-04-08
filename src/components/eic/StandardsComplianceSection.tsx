import React from 'react';
import { Label } from '@/components/ui/label';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const SectionTitle = ({ title }: { title: string }) => (
  <div className="border-b border-white/[0.06] pb-1 mb-3">
    <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
    <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
  </div>
);

interface StandardsComplianceSectionProps {
  formData: Record<string, string | boolean | undefined>;
  onUpdate: (field: string, value: string | boolean) => void;
}

const StandardsComplianceSection: React.FC<StandardsComplianceSectionProps> = ({
  formData,
  onUpdate,
}) => {
  return (
    <div className="space-y-4">
      <SectionTitle title="Standards and Compliance" />

      <div className="space-y-3">
        <div>
          <Label className="text-white text-xs mb-1.5 block">Design Standard</Label>
          <div className="grid grid-cols-2 gap-1">
            {[
              { value: 'BS7671', label: 'BS 7671:2018+A3' },
              { value: 'other', label: 'Other' },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onUpdate('designStandard', opt.value)}
                className={cn(
                  'h-10 rounded-lg font-semibold transition-all touch-manipulation text-xs active:scale-[0.98] flex items-center justify-center gap-1.5',
                  (formData.designStandard || 'BS7671') === opt.value
                    ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                    : 'bg-white/[0.05] border border-white/[0.08] text-white'
                )}
              >
                {(formData.designStandard || 'BS7671') === opt.value && <Check className="h-3 w-3" />}
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-white text-xs mb-1.5 block">Part P Compliance</Label>
          <div className="grid grid-cols-3 gap-1">
            {[
              { value: 'compliant', label: 'Compliant' },
              { value: 'notApplicable', label: 'N/A' },
              { value: 'nonNotifiable', label: 'Non-notifiable' },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onUpdate('partPCompliance', (formData.partPCompliance as string) === opt.value ? '' : opt.value)}
                className={cn(
                  'h-10 rounded-lg font-semibold transition-all touch-manipulation text-[11px] active:scale-[0.98] flex items-center justify-center gap-1',
                  (formData.partPCompliance as string) === opt.value
                    ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                    : 'bg-white/[0.05] border border-white/[0.08] text-white'
                )}
              >
                {(formData.partPCompliance as string) === opt.value && <Check className="h-3 w-3" />}
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StandardsComplianceSection;
