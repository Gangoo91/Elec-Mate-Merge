import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, XCircle, AlertCircle, ClipboardCheck, ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useHaptic } from '@/hooks/useHaptic';

interface OverallAssessmentCardProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
  defaultOpen?: boolean;
}

const OverallAssessmentCard = ({
  formData,
  onUpdate,
  defaultOpen = true,
}: OverallAssessmentCardProps) => {
  const isMobile = useIsMobile();
  const haptic = useHaptic();
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  const handleAssessmentChange = (value: string) => {
    haptic.light();
    onUpdate('overallAssessment', value);
    if (value === 'unsatisfactory') {
      haptic.warning();
    } else {
      haptic.success();
    }
  };

  const handleContinuedUseChange = (value: string) => {
    haptic.light();
    onUpdate('satisfactoryForContinuedUse', value);
  };

  // Determine status for header display
  const assessmentStatus = formData.overallAssessment;
  const isComplete = assessmentStatus === 'satisfactory' || assessmentStatus === 'unsatisfactory';

  return (
    <div className={cn(isMobile && '-mx-4')}>
      <Collapsible
        open={isOpen}
        onOpenChange={(open) => {
          haptic.light();
          setIsOpen(open);
        }}
      >
        {/* Header — gradient line pattern */}
        <CollapsibleTrigger className="w-full" asChild>
          <button className="w-full flex items-center gap-2.5 p-3 text-left touch-manipulation active:scale-[0.98] transition-all">
            <div className="flex-1 min-w-0">
              <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
              <h2 className="text-xs font-medium text-white uppercase tracking-wider">Overall Assessment</h2>
            </div>
            {isComplete && (
              <span className={cn(
                'text-[10px] font-bold px-2 py-0.5 rounded flex-shrink-0',
                assessmentStatus === 'satisfactory' ? 'bg-green-500/15 text-green-400' : 'bg-red-500/15 text-red-400'
              )}>
                {assessmentStatus === 'satisfactory' ? 'PASS' : 'FAIL'}
              </span>
            )}
            <ChevronDown
              className={cn(
                'h-4 w-4 text-white/30 transition-transform duration-200 flex-shrink-0',
                isOpen && 'rotate-180'
              )}
            />
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="space-y-4 p-4">
            {/* Overall Assessment */}
            <div className="space-y-2">
              <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-1" />
              <Label className="text-white text-xs mb-1.5 block">Overall Assessment</Label>
              <div className="flex gap-2">
                {[
                  { val: 'satisfactory', label: 'Satisfactory', color: 'green' },
                  { val: 'unsatisfactory', label: 'Unsatisfactory', color: 'red' },
                ].map((opt) => (
                  <button
                    key={opt.val}
                    type="button"
                    onClick={() => handleAssessmentChange(opt.val)}
                    className={cn(
                      'flex-1 h-11 rounded-xl text-sm font-bold touch-manipulation active:scale-[0.98] transition-all',
                      formData.overallAssessment === opt.val
                        ? opt.color === 'green'
                          ? 'bg-green-500/15 border border-green-500/30 text-green-400'
                          : 'bg-red-500/15 border border-red-500/30 text-red-400'
                        : 'bg-white/[0.03] border border-white/[0.06] text-white/50'
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Continued Use */}
            <div className="space-y-2">
              <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-1" />
              <Label className="text-white text-xs mb-1.5 block">Satisfactory for Continued Use</Label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { value: 'yes', label: 'Yes', color: 'green' },
                  { value: 'no', label: 'No', color: 'red' },
                  { value: 'yes-with-observations', label: 'Yes*', color: 'yellow' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleContinuedUseChange(option.value)}
                    className={cn(
                      'h-11 rounded-xl text-xs font-semibold touch-manipulation active:scale-[0.98] transition-all',
                      formData.satisfactoryForContinuedUse === option.value
                        ? option.color === 'green'
                          ? 'bg-green-500/15 border border-green-500/30 text-green-400'
                          : option.color === 'red'
                            ? 'bg-red-500/15 border border-red-500/30 text-red-400'
                            : 'bg-yellow-500/15 border border-yellow-500/30 text-yellow-400'
                        : 'bg-white/[0.03] border border-white/[0.06] text-white/50'
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              {formData.satisfactoryForContinuedUse === 'yes-with-observations' && (
                <p className="text-[10px] text-yellow-400/70">* Subject to observations being addressed</p>
              )}
            </div>

            {/* Comments */}
            <div>
              <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
              <Label className="text-white text-xs mb-1.5 block">Additional Comments</Label>
              <Textarea
                placeholder="Any additional comments..."
                value={formData.additionalComments || ''}
                onChange={(e) => onUpdate('additionalComments', e.target.value)}
                rows={3}
                className="text-base touch-manipulation min-h-[80px] bg-white/[0.06] border-white/[0.08] text-white focus:border-elec-yellow focus:ring-elec-yellow resize-none"
              />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default OverallAssessmentCard;
