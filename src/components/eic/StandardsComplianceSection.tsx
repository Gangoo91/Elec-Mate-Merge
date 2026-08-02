import React from 'react';
import { useHaptic } from '@/hooks/useHaptic';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

const labelCn = 'text-[12px] font-medium text-white mb-1 block';

const chipOn = 'bg-elec-yellow border border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border border-white/[0.12] text-white font-medium';

const SectionHeading = ({ title }: { title: string }) => (
  <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">{title}</h2>
);

interface StandardsComplianceSectionProps {
  formData: Record<string, string | boolean | undefined>;
  onUpdate: (field: string, value: string | boolean) => void;
}

const StandardsComplianceSection: React.FC<StandardsComplianceSectionProps> = ({
  formData,
  onUpdate,
}) => {
  const haptic = useHaptic();
  return (
    <div
      className={cardCn}
      // Delegated press haptic — same pattern as the Supply / Electrical /
      // Earthing sections so every chip in the tab buzzes consistently.
      onPointerDown={(e) => {
        if ((e.target as HTMLElement).closest('button')) haptic.light();
      }}
    >
      <SectionHeading title="Standards and compliance" />

      <div className="space-y-4">
        <div>
          <Label className={labelCn}>Design standard</Label>
          {/* ELE-1390 — BS 7671:2018+A4:2026 is the current amendment, so new
              certs default to A4. A3 is kept as a selectable legacy value: a cert
              designed/certified under A3 must still state A3, so existing certs
              (stored as 'BS7671') keep showing A3 and aren't retrospectively
              relabelled. */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {[
              { value: 'BS7671-A4', label: 'BS 7671:2018+A4' },
              { value: 'BS7671', label: 'BS 7671:2018+A3' },
              { value: 'other', label: 'Other' },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onUpdate('designStandard', opt.value)}
                className={cn(
                  'h-11 rounded-xl text-sm transition-all touch-manipulation active:scale-[0.98] flex items-center justify-center',
                  (formData.designStandard || 'BS7671-A4') === opt.value ? chipOn : chipOff
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label className={labelCn}>Part P compliance</Label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
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
                  'h-11 rounded-xl text-sm transition-all touch-manipulation active:scale-[0.98] flex items-center justify-center',
                  (formData.partPCompliance as string) === opt.value ? chipOn : chipOff
                )}
              >
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
